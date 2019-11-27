const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");



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
      
      const formattedCsv = await csv.writeToString(acc, { headers: true });

      
      await fs.promises.writeFile(
        path.resolve(__dirname, "../data/group.csv"),
        formattedCsv
      );
      
    } catch (e) {
      
    }
  });
