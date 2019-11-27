const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

function getCategories() {
  return new Promise((resolve, reject) => {
    const categories = [];
    fs.createReadStream(path.resolve(__dirname, "../data/catv.csv"))
      .pipe(csv.parse({ headers: true }))
      .on("data", row => {
        categories.push(row);
      })
      .on("end", () => {
        resolve(categories);
      })
      .on("error", err => {
        reject(err);
      });
  });
}

// open a csv file

const acc = [];

fs.createReadStream(path.resolve(__dirname, "../data/data.csv"))
  .pipe(csv.parse({ headers: true }))
  .on("data", row => {
    // group

    const group = acc.find(e => e.name === row.catv);
    if (group) {
      group.nbr++;
    } else {
      acc.push({ name: row.catv, nbr: 1 });
    }
  })
  .on("end", async () => {
    // write a csv file
    try {
      const categories = await getCategories();
      acc.forEach(d => (d.name = categories.find(x => x.id === d.name).name));
      const formattedCsv = await csv.writeToString(acc, {
        headers: true,
        quoteColumns: [true, false]
      });

      await fs.promises.writeFile(
        path.resolve(__dirname, "../data/group.csv"),
        formattedCsv
      );
    } catch (e) {}
  });
