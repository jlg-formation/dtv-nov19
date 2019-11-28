import * as d3 from "d3";
import { IGroup } from "./interfaces/Group";

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

  redraw();

  element.querySelector(".reverse").addEventListener("click", () => {
    console.log("sort");
    data = data.reverse();
    redraw();
  });

  element.querySelector(".remove").addEventListener("click", () => {
    console.log("sort");
    data.shift();
    redraw();
  });

  element.querySelector(".insert").addEventListener("click", () => {
    console.log("insert");
    data.push({ name: "toto" + Math.random(), nbr: 15000 });
    redraw();
  });

  function redraw() {
    redrawText();
    redrawNbr();
    redrawBar();

    

    //   selection

    //     .text(d => d.nbr)
    //     .transition()
    //     .duration(2000)
    //     .delay((d, i) => i * delayIncr + 1000)
    //     .attr("opacity", "1");
  }

  function redrawNbr(){
    const selection = d3
    .select(svg)
    .selectAll("text.nbr")
    .data(data, (d: IGroup) => {
      return d.name;
    });

    selection
      .exit()
      .attr("opacity", 1)
      .transition()
      .delay(0)
      .duration(500)
      .attr("opacity", 0)
      .transition()
      .remove();

    selection
      .transition()
      .delay(500)
      .duration(500)
      .attr("x", d => scale * d.nbr + paddingRight)
      .attr("y", (d, i) => paddingTop + (height + margin) * i + height * 0.66)
      .attr("class", "nbr")
      .text(d => d.nbr);

    selection
      .enter()
      .append("text")
      .attr("x", d => scale * d.nbr + paddingRight)
      .attr("y", (d, i) => paddingTop + (height + margin) * i + height * 0.66)
      .attr("class", "nbr")
      .text(d => d.nbr)
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 1);


  }

  function redrawBar() {
    const selection = d3
    .select(svg)
    .selectAll("rect")
    .data(data, (d: IGroup) => {
      return d.name;
    });

  console.log("selection: ", selection);

  selection
    .exit()
    .attr("opacity", 1)
    .transition()
    .delay(0)
    .duration(500)
    .attr("opacity", 0)
    .transition()
    .remove();

  selection
    .transition()
    .delay(500)
    .duration(500)
    .attr("x", 0)
    .attr("y", (d, i) => paddingTop + (height + margin) * i)
    .attr("width", 0)
    .attr("height", height)
    .attr("width", d => {
      console.log("update");
      return scale * d.nbr;
    });

  selection
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => paddingTop + (height + margin) * i)
    .attr("width", 0)
    .attr("height", height)
    .transition()
    .duration(1000)
    .attr("width", d => scale * d.nbr);
  }

  function redrawText() {
    console.log("redrawText: ", redrawText);
    const selection = d3
      .select(svg)
      .selectAll("text.label")
      .data(data, (d: IGroup) => {
        return d.name;
      });

    selection
      .exit()
      .attr("opacity", 1)
      .transition()
      .delay(0)
      .duration(500)
      .attr("opacity", 0)
      .transition()
      .remove();

    selection
      .transition()
      .delay(500)
      .duration(500)
      .attr("x", 0)
      .attr("y", (d, i) => paddingTop + (height + margin) * i - offset)
      .attr("class", "label")
      .text(d => d.name);

    selection
      .enter()
      .append("text")
      .attr("x", 0)
      .attr("y", (d, i) => paddingTop + (height + margin) * i - offset)
      .attr("class", "label")
      .text(d => d.name)
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 1);
  }
}
