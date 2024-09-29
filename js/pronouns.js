export const theyThem = {
  subject: "they",
  object: "them",
  poss: "their",
  inposs: "theirs",
  self: "themself",
  conju: 1,
};

export const sheHer = {
  subject: "she",
  object: "her",
  poss: "her",
  inposs: "hers",
  self: "herself",
  conju: 2,
};

export const heHim = {
  subject: "he",
  object: "him",
  poss: "his",
  inposs: "his",
  self: "himself",
  conju: 2,
};

// adapted from https://github.com/Thlumyn/clangen/blob/69ab97d8a44eca70a018fd91d29b7d8f60e5736f/scripts/utility.py#L737
export function processText(text, catDict) {
  // pronouns
  let processedText = text.replace(/{(.*?)}/g, (m, g1, offset, s) => {
    try {
      const innerDetails = g1.split("/");
      const type = innerDetails[0].toUpperCase(); // type of tag
      const cat = innerDetails[1]; // m_c, p_l, etc.
      const pronounType = innerDetails[2];
      const pronouns = catDict[cat][1]; // maps pronoun type to pronoun
      if (type === "PRONOUN") {
        let pronoun = pronouns[pronounType];
        if (pronoun === undefined) {
          throw new Error(`${pronoun} not found in pronouns dict`);
        }
        if (innerDetails.slice(-1)[0] === "CAP") {
          pronoun = pronoun.charAt(0).toUpperCase() + pronoun.substring(1); // title case
        }
        return pronoun;
      } else if (type === "VERB") {
        const verb = innerDetails[pronouns.conju + 1];
        return verb;
      }
      return "error1";
    } catch (err) {
      console.error(err);
      return "error2";
    }
  });

  // names
  for (const toReplace in catDict) {
    processedText = processedText.replaceAll(toReplace, catDict[toReplace][0]);
  }
  processedText = processedText.replaceAll("o_c_n", "OtherClan");
  processedText = processedText.replaceAll("c_n", "ClanName");

  return processedText;
}
