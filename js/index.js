import { processText, sheHer, heHim, theyThem } from "./pronouns.js";

const pronounDict = {
  sheHer: sheHer,
  heHim: heHim,
  theyThem: theyThem,
};
const catDict = {
  m_c: ["Main Cat", theyThem],
  p_l: ["Patrol Leader", theyThem],
  r_c: ["Random Cat", theyThem],
  s_c: ["Stat Cat", theyThem],
  app1: ["App1", theyThem],
  app1: ["App2", theyThem],
  app1: ["App3", theyThem],
  app1: ["App4", theyThem],
  app1: ["App5", theyThem],
  app1: ["App6", theyThem],
  lead_name: ["Leader Name", theyThem],
  dep_name: ["Deputy Name", theyThem],
  c_n: ["ClanName", null],
  o_c_n: ["OtherClan", null],
};
const outputText = document.getElementById("outputText");
const inputText = document.getElementById("inputText");

function refreshOutput() {
  const input = inputText.value;
  outputText.value = processText(input, catDict);
}
inputText.addEventListener("input", (e) => {
  refreshOutput();
});

for (const replacer in catDict) {
  const pronounSelector = document.createElement("div");
  pronounSelector.classList = ["my-2"];
  pronounSelector.innerHTML = `
  <label for="${replacer}Pronouns">Pronouns for ${replacer}:</label>
  <select data-replacer="${replacer}" class="form-select" name="${replacer}Pronouns"">
    <option value="theyThem">They / them</option>
    <option value="sheHer">She / her</option>
    <option value="heHim">He / him</option>
  </select>`;
  pronounSelector
    .getElementsByClassName("form-select")[0]
    .addEventListener("change", (e) => {
      catDict[replacer][1] = pronounDict[e.target.value];
      refreshOutput();
    });

  document.getElementById("pronoun-selectors").appendChild(pronounSelector);
}
