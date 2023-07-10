// Description: This file is the entry point for all the functions.
// It imports the functions from their respective submodules and exports them.
// https://firebase.google.com/docs/functions/organize-functions?hl=en&gen=2nd#write_functions_in_multiple_files
// import * as fetchDataAndSaveToFirestore from "./fetchDataAndSaveToFirestore";
// exports.fetchDataAndSaveToFirestore =
//   fetchDataAndSaveToFirestore.fetchDataAndSaveToFirestore;
// https://firebase.google.com/docs/functions/organize-functions?hl=en&gen=2nd
exports.firestore = require("./firestore.mjs");
