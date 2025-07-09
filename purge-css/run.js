import { PurgeCSS } from "purgecss";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import config from "./purgecss.config.js";
import { getDiff } from "./getDiff.js";

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure consistent folder name
const OUTPUT_FOLDER = "./output";
config.output = OUTPUT_FOLDER;

async function main() {
  const args = process.argv.slice(2);
  const hasDiff = args.includes("-diff");

  try {
    // Clear directory
    const outputPath = path.resolve(__dirname, OUTPUT_FOLDER);
    if (fs.existsSync(outputPath)) {
      fs.readdir(outputPath, (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join(outputPath, file), (err) => {
            if (err) throw err;
          });
        }
      });
    } else {
      // Or create a new one
      console.log(`Creating output directory: ${outputPath}`);
      fs.mkdirSync(outputPath, { recursive: true });
    }

    console.log("Starting PurgeCSS with output to:", outputPath);
    const purgeCSSResults = await new PurgeCSS().purge(config);
    console.log(
      `PurgeCSS completed successfully. Processed ${purgeCSSResults.length} files.`
    );

    // Save each result to the output directory
    purgeCSSResults.forEach((result) => {
      const fileName = path.basename(result.file);
      const outputFilePath = path.join(outputPath, fileName);

      // Write the purged CSS to file
      fs.writeFileSync(outputFilePath, result.css);
    });

    console.log(`\nAll purged CSS files have been saved to ${OUTPUT_FOLDER}`);

    if (hasDiff) {
      getDiff(OUTPUT_FOLDER);
    }
  } catch (error) {
    console.error("Error running PurgeCSS:", error);
  }
}

main();
