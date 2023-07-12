import * as functions from "firebase-functions";

const goodbyeWorld = functions.https.onRequest((req, res) => {
  res.send("Goodbye, World!");
});

export default goodbyeWorld;
