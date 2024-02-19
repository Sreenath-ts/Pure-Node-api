//Consoling data in the terminal
const reset = "\x1b[0m";

const log = {
  green: (text,...args) => console.log("\x1b[32m" + text + reset,...args),
  red: (text,...args) => console.log("\x1b[31m" + text + reset,...args),
  blue: (text,...args) => console.log("\x1b[34m" + text + reset,...args),
  yellow: (text,...args) => console.log("\x1b[33m" + text + reset,...args),
};

module.exports = log