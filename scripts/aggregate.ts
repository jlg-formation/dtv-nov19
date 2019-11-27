import { parse, writeToString } from "fast-csv";
import * as fs from "fs";
import * as path from "path";
import { IGroup } from "./interfaces/Group";
import { ICategory } from "./interfaces/Category";
import { IVehicule } from "./interfaces/Vehicule";

function getCategories() {
  return new Promise<ICategory[]>((resolve, reject) => {
    const categories: ICategory[] = [];
    fs.createReadStream(path.resolve(__dirname, "../data/catv.csv"))
      .pipe(parse({ headers: true }))
      .on("data", (row: ICategory) => {
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

const acc: IGroup[] = [];

fs.createReadStream(path.resolve(__dirname, "../data/small-data.csv"))
  .pipe(parse({ headers: true }))
  .on("data", (row: IVehicule) => {
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
      const formattedCsv = await writeToString(acc, {
        headers: true,
        quoteColumns: [true, false]
      });

      await fs.promises.writeFile(
        path.resolve(__dirname, "../data/group.csv"),
        formattedCsv
      );
    } catch (e) {
      console.error(e);
    }
  });
