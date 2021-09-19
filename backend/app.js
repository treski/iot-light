// Express HTTP server
require('dotenv').config()
const express = require("express"),
  expressPort = 80
  app = express(),
  routes = express(),
  bodyParser = require("body-parser"),
  // Aedes MQTT server
  aedes = require('aedes')(),
  server = require('net').createServer(aedes.handle),
  aedesPort = process.env.AEDES_PORT,
  // MQTT client
  mqtt = require('mqtt'),
  client = mqtt.connect('mqtt://localhost:1883'),
  //Controller imports
  { health } = require("./controllers/health"),
  { toggleLight } = require("./controllers/toggle-light"),

// middleware
app.use(express.json());

app.use("/", routes);

routes.disable("etag");

routes.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE");
  next();
});

app.listen(expressPort, () => {
  console.log(`HTTP server listening on port: ${expressPort}`)
})

server.listen(aedesPort, function () {
  console.log(`MQTT server listening on port: ${aedesPort}`)
})

// routes
routes.get("/health", health());
routes.post("/toggle-light", toggleLight());

// not found error handling
app.get("*", (req, res) =>
  res.status(404).json({ message: "Route not found." })
);
app.post("*", (req, res) =>
  res.status(404).json({ message: "Route not found." })
);