/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const axios = require("axios");
// this is the new way to import modules:
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as axios from "axios";
// import * as onRequest from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

admin.initializeApp();

exports.fetchDataAndSaveToFirestore = functions.https.onRequest(
  async (req, res) => {
    try {
      const response = await axios.get("https://api.brawlapi.com/v1/brawlers"); // Replace with your API endpoint

      const data = response.data.list; // .list because the API returns an object with a "list" property
      // console.log('Fetched data:', data);

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format. Expected an array.");
      }

      const firestore = admin.firestore();
      const collectionRef = firestore.collection("brawlers"); // Replace with your Firestore collection name

      // Loop through the data and update existing documents or create new ones
      data.forEach(async (item) => {
        const documentSnapshot = await collectionRef
          .where("id", "==", item.id)
          .get(); // Check if a document with the same "id" exists

        if (documentSnapshot.empty) {
          // Create a new document with the fetched data
          await collectionRef.doc().set(item);
        } else {
          // Update the existing document with the fetched data
          const documentRef = documentSnapshot.docs[0].ref;
          await documentRef.update(item);
        }
      });

      res.status(200).send("Data saved to Firestore successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data and saving to Firestore.");
    }
  }
);
