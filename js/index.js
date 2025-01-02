import { processText, sheHer, heHim, theyThem } from "./pronouns.js";
import { pronounify } from "./pronounify.js";

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
  n_c: ["New Cat", theyThem],
  cat_tag: ["Cat Tag", theyThem],
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
const characterCount = document.getElementById("output-character-count");
const pronounifySelect = document.getElementById("pronounify-select");
const pronounifyButton = document.getElementById("pronounify-button");

function refreshOutput() {
  const input = inputText.value;
  showOnlyUsedReplacers();
  outputText.value = processText(input, catDict);
  characterCount.textContent = outputText.value.length;
}

function showOnlyUsedReplacers() {
  var showPlaceholder = false;
  for (const replacer in catDict) {
    const elem = document.getElementById(`${replacer}-div`);
    if (inputText.value.includes(replacer)) {
      showPlaceholder = true;
      elem.classList.remove("d-none");
    } else {
      elem.classList.add("d-none");
    }
  }

  if (showPlaceholder) {
    document
      .getElementById("pronoun-selectors-placeholder")
      .classList.add("d-none");
  } else {
    document
      .getElementById("pronoun-selectors-placeholder")
      .classList.remove("d-none");
  }
}

new bootstrap.Tooltip(document.getElementById("pronounify-tooltip"));

inputText.addEventListener("input", (e) => {
  refreshOutput();
});

pronounifyButton.addEventListener("click", (e) => {
  const input = inputText.value;
  const selectStart = inputText.selectionStart;
  const selectEnd = inputText.selectionEnd;
  const selectedText = input.substring(selectStart, selectEnd);
  const replaceText = pronounify(pronounifySelect.value, selectedText);

  inputText.value =
    input.substring(0, selectStart) + replaceText + input.substring(selectEnd);
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
      catDict[e.target.dataset.replacer][1] = pronounDict[e.target.value];
      refreshOutput();
    });

  document.getElementById("pronoun-selectors").appendChild(pronounSelector);

  // add to pronounify selector
  pronounifySelect.options.add(
    new Option(`${catDict[replacer][0]} (${replacer})`, replacer),
  );
}
