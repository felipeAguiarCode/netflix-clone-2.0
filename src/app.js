const express = require("express");
const path = require("path");

function createApp() {
  const app = express()
  const publicDirectoryPath = path.join(__dirname, "public")

  app.use(express.static(publicDirectoryPath))

  return app;
}

function startServer() {
  const app = createApp();

  app.get("/", (req, res) => {
    const indexPath = path.join(__dirname, "public", "index.html")
    res.sendFile(indexPath)
  })


  return app
}

module.exports = startServer()
