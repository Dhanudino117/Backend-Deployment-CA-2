import express from "express";
import dotenv from "dotenv/config";
import ConnectDb from "./Controllers/ConnectDb.js";
import User from "./UserSchema.js";
import bcrypt from 'bcryptjs'

const app = express();
app.use(express.json());
ConnectDb();

const port = process.env.PORT || 3000;

app.post("/signup", async (req, res) => {
  const { username, email, password, dob } = req.body;

  try {
    if (!username) {
      res.status(400).json({ error: "User name cannot be empty" });
    }
    if (!email) {
      res.status(400).json({ error: "Email cannot be empty" });
    }
    if (password.length < 8) {
      res.status(400).json({
        error:
          "password is too short it should be greater than  8 or less than 16 characters",
      });
    }
    if (password.length > 16) {
      res.status(400).json({
        error:
          "password is too Long it should be greater than  8 or less than 16 characters",
      });
    }
    if (!dob) {
      res.status(400).json({ error: "Date of birth cannot be empty" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      dob,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "user created" });
  } catch (error) {
    console.log(error.message);
  }
});


app.get('/',(req, res)=>[
    res.json({message: " This API is working .... "})
])

app.listen(port, () => {
  console.log(`This server is running on the http://localhost:${port}`);
});
