import express from "express";
import admin from "firebase-admin";
import multer from "multer";
import nodemailer from "nodemailer";

// Initialize Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Replace environment variables with direct values (consider using dotenv)
const FIREBASE_STORAGE_BUCKET = "persnal-website-9ab5f.firebasestorage.app"; // Use environment variable
const EMAIL_USER = "venug3727@gmail.com"; // Use environment variable
const EMAIL_PASS = "lrac bvqu obec sbmw"; // Use environment variable
//const RECIPIENT_EMAIL = "recipient-email@gmail.com"; // Use environment variable
const PORT = process.env.PORT || 5000; // Use environment variable for port

// Initialize Firebase Admin
admin.initializeApp({
  storageBucket: FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();
const db = admin.firestore();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Multer configuration for in-memory storage
const upload = multer({ storage: multer.memoryStorage() });

// API to send a message

app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body; // Only destructure name, email, and message

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Create mail options
  const mailOptions = {
    from: email, // The sender's email
    to: email, // Use the same email as the recipient
    subject: `Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send the message." });
  }
});

// API to upload CV
app.post("/upload-cv", upload.single("resume"), async (req, res) => {
  try {
    const resumeFile = req.file;

    // Validate file upload
    if (!resumeFile) {
      return res.status(400).send({ error: "No file uploaded." });
    }

    // Create a reference to the file in Firebase Storage
    const resumeRef = bucket.file(
      `resumes/${Date.now()}-${resumeFile.originalname}`
    );
    const stream = resumeRef.createWriteStream({
      metadata: {
        contentType: resumeFile.mimetype,
      },
    });

    // End the stream with the file buffer
    stream.end(resumeFile.buffer);

    stream.on("finish", async () => {
      const [signedUrl] = await resumeRef.getSignedUrl({
        action: "read",
        expires: "03-09-2491", // Consider using a more reasonable expiration time
      });

      const userId = "dynamic_user_id"; // Replace with actual user ID logic
      await db.collection("users").doc(userId).update({
        resumeUrl: signedUrl,
      });

      res.status(200).send({
        message: "Resume uploaded and URL saved.",
        url: signedUrl,
      });
    });

    stream.on("error", (error) => {
      console.error("Error uploading file:", error);
      res.status(500).send({ error: "File upload failed." });
    });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send({ error: "Internal server error." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
