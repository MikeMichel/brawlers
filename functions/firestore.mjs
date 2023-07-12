import "../firebaseConfig.mjs";
import * as functions from "firebase-functions";
import * as axios from "axios";

const fetchDataAndSaveToFirestore = functions.https.onRequest(
  async (req, res) => {
    try {
      const response = await axios.get("https://api.brawlapi.com/v1/brawlers");
      console.log("API call succeeded.");

      const data = response.data.list;

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format. Expected an array.");
      }

      const firestore = app.firestore();
      const collectionRef = firestore.collection("brawlers");

      for (const item of data) {
        const documentSnapshot = await collectionRef
          .where("id", "==", item.id)
          .get();

        if (documentSnapshot.empty) {
          console.log("Document not found. Creating a new one.");
          await collectionRef.doc().set(item);
        } else {
          console.log("Document found. Updating the existing one.");
          const documentRef = documentSnapshot.docs[0].ref;
          await documentRef.update(item);
        }
      }

      res.status(200).send("Data saved to Firestore successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data and saving to Firestore.");
    }
  }
);

export { fetchDataAndSaveToFirestore };
