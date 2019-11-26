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

const scale = 1000 / Math.max(...data.map(d => d.nbr));
console.log("scale: ", scale);

const height = 60;
const margin = 20;

function addRect(parentSvg) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  parentSvg.appendChild(rect);
  return rect;
}

data.forEach((d, i) => {
  // ajoute un rect dans svg
  // met sa longueur a d.nbr
  const svg = document.querySelector("svg");
  const rect = addRect(svg);
  rect.setAttribute("x", 0);
  rect.setAttribute("y", 10 + (height + margin) * i);
  rect.setAttribute("width", Math.floor(scale * d.nbr));
  rect.setAttribute("height", height);
});

console.log("end");
