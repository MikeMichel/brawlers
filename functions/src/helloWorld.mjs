import * as functions from "firebase-functions";

const helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello, World!");
});

export default helloWorld;
