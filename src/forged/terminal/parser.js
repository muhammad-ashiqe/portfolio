export function tokenize(input) {
  if (input.length > 2000) throw new Error("Command is too long.");
  const tokens = [];
  let word = "";
  let quote = null;
  let started = false;
  for (const char of input.trim()) {
    if (quote) {
      if (char === quote) quote = null;
      else word += char;
    } else if (char === '"' || char === "'") {
      quote = char;
      started = true;
    } else if (/\s/.test(char)) {
      if (started) {
        tokens.push(word);
        word = "";
        started = false;
      }
    } else {
      word += char;
      started = true;
    }
  }
  if (quote) throw new Error("Close the quotation mark and try again.");
  if (started) tokens.push(word);
  return tokens;
}
