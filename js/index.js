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
  c_n: ["ClanName", null],
};
const outputText = document.getElementById("outputText");
const inputText = document.getElementById("inputText");
const mcprn = document.getElementById("mcprn");
const plprn = document.getElementById("plprn");
const rcprn = document.getElementById("rcprn");
const scprn = document.getElementById("scprn");

function refreshOutput() {
  const input = inputText.value;
  outputText.value = processText(input, catDict);
}
inputText.addEventListener("input", (e) => {
  refreshOutput();
});
mcprn.addEventListener("change", (e) => {
  catDict.m_c[1] = pronounDict[mcprn.value];
  refreshOutput();
});
plprn.addEventListener("change", (e) => {
  catDict.p_l[1] = pronounDict[plprn.value];
  refreshOutput();
});
rcprn.addEventListener("change", (e) => {
  catDict.r_c[1] = pronounDict[rcprn.value];
  refreshOutput();
});
scprn.addEventListener("change", (e) => {
  catDict.s_c[1] = pronounDict[scprn.value];
  refreshOutput();
});
