/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require("node:fs");
const path = require("node:path");

function removeConsoleLogs(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      removeConsoleLogs(filePath);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".js") || file.endsWith(".jsx")) {
      let content = fs.readFileSync(filePath, "utf8");
      const originalContent = content;
      // Simple regex to match console.log(...) ; assuming single line and no nested parens
      content = content.replaceAll(/console\.log\([^)]*\);/g, "");
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`Removed console.log from ${filePath}`);
      }
    }
  }
}

console.log("Starting to remove console.log statements from src directory...");
removeConsoleLogs("./src");
console.log("Done.");
