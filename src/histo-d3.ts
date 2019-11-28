import * as d3 from 'd3';
import { IGroup } from './interfaces/Group';

export function drawHisto(element: HTMLElement, data: IGroup[]) {
  const svg = element.querySelector("svg");
  const scale = (1000 / Math.max(...data.map(d => d.nbr))) * 0.95;
  console.log("scale: ", scale);

  const height = 60;
  const margin = 30;
  const paddingTop = 20;
  const offset = 5;
  const paddingRight = 5;

  const delayIncr = 100;

  const selection = d3
    .select(svg)
    .selectAll("rect")
    .data(data);

  console.log("selection: ", selection);

  selection
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => paddingTop + (height + margin) * i)
    .attr("width", 0)
    .attr("height", height)
    .transition()
    .duration(2000)
    .delay((d, i) => (i * delayIncr) + 200)
    .attr("width", d => scale * d.nbr);

  selection
    .enter()
    .append("text")
    .attr("x", 0)
    .attr("y", (d, i) => paddingTop + (height + margin) * i - offset)
    .attr("class", "label")
    .text(d => d.name);

  selection
    .enter()
    .append("text")
    .attr("x", d => scale * d.nbr + paddingRight)
    .attr("y", (d, i) => paddingTop + (height + margin) * i + height * 0.66)
    .attr("class", "nbr")
    .attr("opacity", "0")
    .text(d => d.nbr)
    .transition()
    .duration(2000)
    .delay((d, i) => (i * delayIncr) + 1000)
    .attr("opacity", "1");


    element.querySelector(".sort").addEventListener("click", () => {
      console.log("toto");
    });
}
