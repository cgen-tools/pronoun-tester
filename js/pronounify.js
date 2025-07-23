const wordToTag = {
  they: "{PRONOUN/@@@/subject}",
  them: "{PRONOUN/@@@/object}",
  their: "{PRONOUN/@@@/poss}",
  theirs: "{PRONOUN/@@@/inposs}",
  themself: "{PRONOUN/@@@/self}",
  themselves: "{PRONOUN/@@@/self}",
  "they're": "{PRONOUN/@@@/subject}{VERB/@@@/'re/'s}",

  are: "{VERB/@@@/are/is}",
  do: "{VERB/@@@/do/does}",
  have: "{VERB/@@@/have/has}",
  "aren't": "{VERB/@@@/aren't/isn't}",
  "don't": "{VERB/@@@/don't/doesn't}",
  "haven't": "{VERB/@@@/haven't/hasn't}",

  were: "{VERB/@@@/were/was}",
  "weren't": "{VERB/@@@/were/was}n't",
};

export function pronounify(cat, wordRaw) {
  if (wordRaw === null || wordRaw === "") {
    return "";
  }
  // if word is capital at beginning or not
  const cap = wordRaw.charAt(0) == wordRaw.charAt(0).toUpperCase();

  // needs to be lower case without spaces
  // so we can compare against irregular template object
  const word = wordRaw.toLowerCase().trim();

  const tagTemplate = wordToTag[word];
  if (tagTemplate !== undefined) {
    // irregular verb or a pronoun
    const tag = tagTemplate.replace(/@@@/g, cat);
    if (cap) {
      return tag.replace("}", "/CAP}");
    }
    return tag;
  } else {
    // assume it's a regular verb in present tense
    if (cap) {
      return `{VERB/${cat}/${word}/${word}s/CAP}`;
    }
    return `{VERB/${cat}/${word}/${word}s}`;
  }
}
