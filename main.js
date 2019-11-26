import { drawHisto } from "./histo-d3.js";

console.log("start");

const data = [
  {
    name: "scooter",
    nbr: 34
  },
  {
    name: "VL",
    nbr: 50
  },
  {
    name: "VU",
    nbr: 67
  },
  {
    name: "Moto",
    nbr: 45
  }
];

const svg = document.querySelector("svg");
drawHisto(svg, data);

console.log("end");
