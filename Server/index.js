const express = require("express");
const bodyparser = require("body-parser").json;
const app = express();
const PORT = 3005;
const router = require("./router");
const cors = require("cors");
const fs = require("fs");
const loaderVer = fs.readFileSync(
  "./loaderio-4c1c67354901c94f9258b56a3a529bb2.txt"
);

app.use(cors());

app.use(bodyparser());

app.get("/loaderio-5c8725c0d0605d29cd759a1b0f7b2b7a/", (req, res) => {
  res.send(loaderVer);
});

app.use("/", router);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
