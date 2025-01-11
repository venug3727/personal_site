/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addProject = functions.https.onCall(async (data, context) => {
  try {
    const projectData = {
      title: data.title,
      description: data.description,
      image: data.imageUrl,
      tags: data.tags,
      links: data.links,
      resume: data.resumeUrl,
      skills: data.skills,
      certificates: data.certificates,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await admin
      .firestore()
      .collection("projects")
      .add(projectData);
    return { message: "Project added successfully!", projectId: docRef.id };
  } catch (error) {
    console.error("Error adding project: ", error);
    throw new functions.https.HttpsError("internal", "Error adding project");
  }
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
