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
  app2: ["App2", theyThem],
  app3: ["App3", theyThem],
  app4: ["App4", theyThem],
  app5: ["App5", theyThem],
  app6: ["App6", theyThem],
  lead_name: ["Leader Name", theyThem],
  dep_name: ["Deputy Name", theyThem],
};
const outputText = document.getElementById("outputText");
const inputText = document.getElementById("inputText");

function refreshOutput() {
  const input = inputText.value;
  showOnlyUsedReplacers();
  outputText.value = processText(input, catDict);
}

function showOnlyUsedReplacers() {
  for (const replacer in catDict) {
    const elem = document.getElementById(`${replacer}-div`);
    if (inputText.value.includes(replacer)) {
      elem.classList.remove("d-none");
    }
    else {
      elem.classList.add("d-none");
    }
  }
}

inputText.addEventListener("input", (e) => {
  refreshOutput();
});

for (const replacer in catDict) {
  const pronounSelector = document.createElement("div");
  pronounSelector.id = `${replacer}-div`;
  pronounSelector.classList.add("d-none", "my-2");
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
