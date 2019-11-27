import { drawHisto } from "./histo-d3.js";

console.log("startxxx");

d3.dsv(",", "data/data.csv").then(function(data) {
  const histoData = data.reduce((acc, d) => {
    const group = acc.find(e => e.name === d.catv);
    if (group) {
      group.nbr++;
    } else {
      acc.push({ name: d.catv, nbr: 1 });
    }
    return acc;
  }, []);

  console.log("histoData: ", histoData);

  const svg = document.querySelector("svg");
  drawHisto(svg, histoData);

  console.log("end");
});
