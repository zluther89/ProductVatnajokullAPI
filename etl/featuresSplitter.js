const fs = require("fs");
const csv = require("csv-parser");

let readStream = fs.createReadStream("./data/features.csv");
let writeStream = fs.createWriteStream("./data/features_join.csv");

let features = {};

//Tool to find all features and their coinciding values

readStream
  .pipe(csv())
  .on("data", (data) => {
    if (data.productid === "1") {
      console.log(data);
    }
    if (!features[data.feature]) {
      features[data.feature] = {};
    }
    if (!features[data.feature][data.value]) {
      features[data.feature][data.value] = [data.productid];
    } else {
      features[data.feature][data.value].push(data.productid);
    }
  })
  .on("end", () => splitFileRelations(features));

const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const csvStringifier = createCsvStringifier({
  header: [
    { id: "feature_set_id", title: "feature_set_id" },
    { id: "product_id", title: "product_id" },
  ],
});

writeStream.write(csvStringifier.getHeaderString());

const splitFileRelations = (features) => {
  let count = 0;
  let joinTable = {};
  for (let feature in features) {
    let featureSet = features[feature];
    for (let value in featureSet) {
      count += 1;
      for (let i = 0; i < featureSet[value].length; i++) {
        writeStream.write(
          csvStringifier.stringifyRecords([
            {
              feature_set_id: count,
              product_id: featureSet[value][i],
            },
          ])
        );
      }
    }
  }
};
