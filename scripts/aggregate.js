const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

console.log("start agregate");

// open a csv file

fs.createReadStream(path.resolve(__dirname, "../data/small-data.csv"))
  .pipe(csv.parse({ headers: true }))
  .on("data", row => console.log(row));

// group

// write a csv file
