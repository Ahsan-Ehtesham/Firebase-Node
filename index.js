const express = require("express");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");


// Firebase Config
const serviceAccount = require("./service_key.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const app = express();

// Adding Data to db

// const docRef = db.collection("users").doc("alovelace");

// docRef.set({
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815,
// });

// const aTuringRef = db.collection("users").doc("aturing");

// aTuringRef.set({
//   first: "Alan",
//   middle: "Mathison",
//   last: "Turing",
//   born: 1912,
// });

// Getting data and sending to API

const aTuringRef = db.collection("users").doc("aturing");

async function start() {
  const doc = await aTuringRef.get();
  app.get("/", (req, res) => {
    console.info("Document data:", doc.data());
    res.send(doc.data());
  });
}

start();

app.listen(3005, () => {
  console.log("App listening on port 3005!");
});
