const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use("/", express.static("dist/socketio-angular"));

app.listen(port, () => {
  console.log("app running on port:", port);
});
