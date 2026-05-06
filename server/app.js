const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const crypto = require("crypto");
const Todo = require("./models/todo");
const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todo-app";
const SESSION_SECRET =
  process.env.SESSION_SECRET || "dev-secret-change-this";

// ================== DATABASE ==================
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ================== MIDDLEWARE ==================
app.use(express.json());

// ✅ ONLY serve built frontend (IMPORTANT)
const builtClientPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(builtClientPath));

// ================== HELPERS ==================
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function createToken(user) {
  const payload = {
    userId: user._id.toString(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };

  const payloadString = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );

  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadString)
    .digest("hex");

  return `${payloadString}.${signature}`;
}

function verifyToken(token) {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadString, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadString)
    .digest("hex");

  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  ) {
    return null;
  }

  let payload;

  try {
    payload = JSON.parse(
      Buffer.from(payloadString, "base64url").toString("utf8")
    );
  } catch (error) {
    return null;
  }

  if (!payload.userId || !payload.exp || payload.exp < Date.now()) {
    return null;
  }

  return payload;
}

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "You must be logged in" });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ message: "Session expired or invalid" });
  }

  const user = await User.findById(payload.userId);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  req.user = user;
  req.token = token;
  next();
}

// ================== AUTH ROUTES ==================
app.post("/api/register", async (req, res) => {
  try {
    const name = cleanText(req.body.name);
    const email = cleanText(req.body.email).toLowerCase();
    const password = cleanText(req.body.password);

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User({
      name,
      email,
      password: hashPassword(password),
    });

    await user.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error creating account" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const email = cleanText(req.body.email).toLowerCase();
    const password = cleanText(req.body.password);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== hashPassword(password)) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const token = createToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

app.get("/api/me", authMiddleware, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

app.post("/api/logout", authMiddleware, async (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// ================== TODO ROUTES ==================
app.get("/api/todos", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error getting todos" });
  }
});

app.post("/api/todos", authMiddleware, async (req, res) => {
  try {
    const title = cleanText(req.body.title);

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = new Todo({
      title,
      user: req.user._id,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: "Error creating todo" });
  }
});

app.put("/api/todos/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (req.body.title !== undefined) {
      const title = cleanText(req.body.title);

      if (!title) {
        return res
          .status(400)
          .json({ message: "Title cannot be empty" });
      }

      todo.title = title;
    }

    if (req.body.completed !== undefined) {
      todo.completed = Boolean(req.body.completed);
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: "Error updating todo" });
  }
});

app.delete("/api/todos/:id", authMiddleware, async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({
      message: "Todo deleted",
      deletedTodo,
    });
  } catch (err) {
    res.status(400).json({ message: "Error deleting todo" });
  }
});

// ================== FRONTEND CATCH-ALL ==================
// MUST BE LAST
app.get("*", (req, res) => {
  res.sendFile(path.join(builtClientPath, "index.html"));
});

// ================== START SERVER ==================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});