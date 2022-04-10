const db = require("./db.js");
const http = require("http");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use("/celeste", routes);

db.sync({ force: false });

server.listen(port, () => {
  console.log("listening on *:" + port);
});
