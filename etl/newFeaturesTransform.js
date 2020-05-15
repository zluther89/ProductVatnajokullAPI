const fs = require("fs");
const csv = require("csv-parser");

let readStream = fs.createReadStream("./data/features.csv");
let writeStream = fs.createWriteStream("./data/trimmed_features.csv");

let features = {};

//Tool to find all features and their coinciding values

readStream
  .pipe(csv())
  .on("data", (data) => {
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
    { id: "feature", title: "feature" },
    { id: "value", title: "value" },
  ],
});

writeStream.write(csvStringifier.getHeaderString());

const splitFileRelations = (object) => {
  let count = 0;
  let featureSetDict = {};
  for (let feature in features) {
    let featureSet = features[feature];
    for (let value in featureSet) {
      count += 1;
      for (let i = 0; i < featureSet[value].length; i++) {
        let featureSet = {
          feature_set_id: count,
          feature: feature,
          value: value,
        };

        let joinTable = {
          feature_set_id: count,
          product_id: featureSet[value][i],
        };

        let featureSetString = "" + feature + value;

        // console.log(feature, value);
        // console.log({
        //   feature_set_id: count,
        //   product_id: featureSet[value][i],
        // });
        console.log(featureSetDict);
        if (!featureSetDict.hasOwnProperty(featureSetString)) {
          featureSetDict[featureSetString] = true;
          writeStream.write(csvStringifier.stringifyRecords([featureSet]));
        }
      }
    }
  }
};
