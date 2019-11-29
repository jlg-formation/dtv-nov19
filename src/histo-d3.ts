import * as d3 from "d3";
import { IGroup } from "./interfaces/Group";

export function drawHisto(element: HTMLElement, data: IGroup[]) {
  const svg = element.querySelector("svg");

  const restoredData = [...data];

  let scale: number;

  const height = 60;
  const margin = 30;
  const paddingTop = 20;
  const offset = 5;
  const paddingRight = 5;

  redraw();

  element.querySelector(".reverse").addEventListener("click", () => {
    data = data.reverse();
    redraw();
  });

  element.querySelector(".remove").addEventListener("click", () => {
    const elts = element.querySelectorAll(".selected");
    elts.forEach((elt: any) => {
      const d = elt.__data__;
      data.splice(
        data.findIndex(n => n === d),
        1
      );
    });
    redraw();
  });

  element.querySelector(".restore").addEventListener("click", () => {
    data = restoredData;
    redraw();
  });

  element.querySelector(".update-nbr").addEventListener("click", () => {
    data[0].nbr = data[0].nbr / 2;
    redraw();
  });

  function redraw() {
    scale = (1000 / Math.max(...data.map(d => d.nbr))) * 0.95;

    redrawText();
    redrawNbr();
    redrawBar();
  }

  function redrawNbr() {
    d3.select(svg)
      .selectAll("text.nbr")
      .data(data, (d: IGroup) => {
        return d.name;
      })
      .join(
        enter =>
          enter
            .append("text")
            .attr("x", d => scale * d.nbr + paddingRight)
            .attr(
              "y",
              (d, i) => paddingTop + (height + margin) * i + height * 0.66
            )
            .attr("class", "nbr")
            .text(d => d.nbr)
            .attr("opacity", 0)
            .call(e =>
              e
                .transition()
                .duration(1000)
                .attr("opacity", 1)
            ),
        update =>
          update.call(u =>
            u
              .transition()
              .delay(500)
              .duration(500)
              .attr("x", d => scale * d.nbr + paddingRight)
              .attr(
                "y",
                (d, i) => paddingTop + (height + margin) * i + height * 0.66
              )
              .attr("class", "nbr")
              .text(d => d.nbr)
          ),
        exit =>
          exit
            .attr("opacity", 1)
            .call(ex =>
              ex
                .transition()
                .delay(0)
                .duration(500)
                .attr("opacity", 0)
                .transition()
            )
            .remove()
      );
  }

  function redrawBar() {
    const selection = d3
      .select(svg)
      .selectAll("rect")
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
      .attr("y", (d, i) => paddingTop + (height + margin) * i)
      .attr("width", d => {
        return scale * d.nbr;
      });

    selection
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => paddingTop + (height + margin) * i)
      .attr("width", 0)
      .attr("height", height)
      .on("click", function(d) {
        console.log("click", this);
        this.classList.contains("selected")
          ? this.classList.remove("selected")
          : this.classList.add("selected");

        // const i = data.findIndex(n => n === d);
        // data.splice(i, 1);
        // redraw();
      })
      .transition()
      .duration(1000)
      .attr("width", d => scale * d.nbr);
  }

  function redrawText() {
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
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .attr("opacity", 1);
  }
}
