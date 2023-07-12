import { firestoreDB } from "../firebaseConfig.mjs";
import * as functions from "firebase-functions";
import axios from "axios";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const fetchDataAndSaveToFirestore = functions.https.onRequest(
  async (req, res) => {
    try {
      // Fetch data from an API
      const response = await axios.get("https://api.brawlapi.com/v1/brawlers");

      // Assume the response data is an array of objects
      const data = response.data.list;
      console.log("Fetched data:", data);
      // Reference to a Firestore collection
      const collectionRef = collection(firestoreDB, "brawlers");

      // Loop over each object in the data
      for (const item of data) {
        // Try to find a document in the collection with the same id as the item
        const documentSnapshot = await getDocs(
          query(collectionRef, where("id", "==", item.id)),
        );

        if (documentSnapshot.empty) {
          // If no such document exists, create a new document with the item data
          console.log("Document not found. Creating a new one.");
          await addDoc(collectionRef, item);
        } else {
          // If such a document exists, update it with the item data
          console.log("Document found. Updating the existing one.");
          const documentRef = documentSnapshot.docs[0].ref;
          await updateDoc(documentRef, item);
        }
      }

      // Send a success response
      res.send("Data saved to Firestore successfully!");
    } catch (error) {
      // Log any errors and send an error response
      console.error("Error saving data to Firestore:", error);
      res.status(500).send("Error saving data to Firestore.");
    }
  },
);

export default fetchDataAndSaveToFirestore;
