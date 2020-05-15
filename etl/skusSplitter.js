const db = require("./postGresConnect");
const fs = require("fs");
const csv = require("csv-parser");

let readStream = fs.createReadStream("./data/newSkus.csv");
let writeStream = fs.createWriteStream("./data/JSONSkus.json");

var skus = [];
let styles = {};
let style;

readStream
  .pipe(csv())
  .on("data", async (data) => {
    if (style !== data.style && skus.length > 0) {
      let jsonData = JSON.stringify(skus);
      skus = [];
      try {
        await db.query(
          `UPDATE styles SET skus = '${jsonData}' WHERE id = ${style}`
        );
      } catch (err) {
        console.log(err);
      }
    }

    style = data.style;
    delete data.style;
    delete data.id;
    skus.push(data);
  })
  .on("end", () => {
    console.log("end");
  });
