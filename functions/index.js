// Description: This file is the entry point for all the functions.
// https://firebase.google.com/docs/functions/organize-functions?hl=en&gen=2nd

import("./firestore.mjs").then((module) => {
  exports.fetchDataAndSaveToFirestore = module.fetchDataAndSaveToFirestore;
});
