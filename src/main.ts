import "./style.css";
import "isomorphic-fetch";
import { sparql } from "d3-sparql";

import { drawHisto } from "./histo-d3";
import { IGroup } from "./interfaces/Group";

const wikidataUrl = "https://query.wikidata.org/bigdata/namespace/wdq/sparql";
const request = `
SELECT ?name (COUNT(?h) as ?nbr)  WHERE {
  ?h wdt:P31 wd:Q5;
    wdt:P570 ?death;
    wdt:P509 wd:Q61037771;
    wdt:P27 ?country.
  SERVICE wikibase:label { 
    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
    ?country rdfs:label ?name.
  }
}
GROUP BY ?name
ORDER BY DESC(?nbr)
`;

(async () => {
  try {
    console.log("startxxx");
    const str = localStorage.getItem('data');
    if (!str) {
      const origData: any[] = await sparql(wikidataUrl, request);
      const sortedData: any[] = origData.sort((a, b) => Math.sign(+b.nbr - +a.nbr));
      sortedData.length = 10;
      localStorage.setItem('origData', JSON.stringify(origData));
      drawHisto(document.querySelector(".histo-car"), sortedData as IGroup[]);
      console.log("end");
      return;
    }
    const data = JSON.parse(str);
    drawHisto(document.querySelector(".histo-car"), data as IGroup[]);
    
  } catch (e) {
    console.error(e);
  }
})();
