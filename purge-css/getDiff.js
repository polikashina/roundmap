import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to get all files from a directory
function getAllFiles(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    return files.map((file) => ({
      name: file,
      path: path.join(dirPath, file),
      size: fs.statSync(path.join(dirPath, file)).size,
    }));
  } catch (error) {
    console.error(chalk.red(`Error reading directory ${dirPath}:`), error);
    return [];
  }
}

// Function to recursively find files in a directory
function findFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findFilesRecursively(filePath, fileList);
    } else if (path.extname(file) === ".css") {
      fileList.push({
        name: file,
        path: filePath,
        size: stat.size,
      });
    }
  });

  return fileList;
}

// Function to find the original CSS file in src/ directory
function findOriginalFile(fileName, srcFiles) {
  return srcFiles.find((file) => file.name === fileName) || null;
}

// Function to compare purged CSS with original CSS
function compareFiles(purgedFile, originalFile) {
  if (!originalFile) {
    return {
      purgedSize: purgedFile.size,
      originalSize: 0,
      difference: 0,
      percentReduction: 0,
      found: false,
    };
  }

  const difference = originalFile.size - purgedFile.size;
  const percentReduction =
    originalFile.size > 0
      ? ((difference / originalFile.size) * 100).toFixed(2)
      : 0;

  return {
    purgedSize: purgedFile.size,
    originalSize: originalFile.size,
    difference,
    percentReduction,
    found: true,
  };
}

// Main function
export function getDiff(purgedSrc) {
  const purgedCssDir = path.resolve(__dirname, purgedSrc);
  const srcDir = path.resolve(__dirname, "../src");

  console.log(chalk.blue(`Reading files from ${purgedCssDir}...\n`));
  console.log(chalk.blue(`Searching for original CSS files in ${srcDir}...\n`));

  // Check if purge-css directory exists
  if (!fs.existsSync(purgedCssDir)) {
    console.log(chalk.yellow(`The directory ${purgedCssDir} does not exist.`));
    console.log(
      chalk.yellow("Run 'node script.js' first to generate purged CSS files.")
    );
    return;
  }

  // Get all purged CSS files
  const purgedFiles = getAllFiles(purgedCssDir);

  if (purgedFiles.length === 0) {
    console.log(chalk.yellow("No files found in the purge-css directory."));
    return;
  }

  // Find all CSS files in src directory recursively
  const srcFiles = findFilesRecursively(srcDir);

  console.log(
    chalk.green(`Found ${purgedFiles.length} files in the purge-css directory`)
  );
  console.log(
    chalk.green(`Found ${srcFiles.length} CSS files in the src directory\n`)
  );

  let totalPurgedSize = 0;
  let totalOriginalSize = 0;
  let totalDifference = 0;

  // Process all files and collect comparison data
  const fileComparisons = [];

  purgedFiles.forEach((purgedFile) => {
    const originalFile = findOriginalFile(purgedFile.name, srcFiles);
    const comparison = compareFiles(purgedFile, originalFile);

    // Add to totals regardless of reduction
    totalPurgedSize += purgedFile.size;
    if (comparison.found) {
      totalOriginalSize += comparison.originalSize;
      totalDifference += comparison.difference;
    }

    // Store comparison data
    fileComparisons.push({
      fileName: purgedFile.name,
      purgedSize: purgedFile.size,
      originalSize: comparison.originalSize,
      difference: comparison.difference,
      percentReduction: comparison.percentReduction,
      found: comparison.found,
    });
  });

  // Filter files with reduction > 0
  const filesWithReduction = fileComparisons.filter(
    (file) => file.found && file.difference > 0
  );

  // Display files with reduction > 0
  if (filesWithReduction.length === 0) {
    console.log(chalk.yellow("No files with CSS reduction found."));
  } else {
    console.log(
      chalk.green(
        `Found ${filesWithReduction.length} files with CSS reduction:\n`
      )
    );

    console.log(
      chalk.bold(
        "File Name".padEnd(20) +
          "Original".padEnd(15) +
          "Purged".padEnd(15) +
          "Reduction".padEnd(15) +
          "% Saved"
      )
    );
    console.log(chalk.gray("-".repeat(80)));

    // Sort by percentage reduction (highest first)
    filesWithReduction
      .sort(
        (a, b) =>
          parseFloat(b.percentReduction) - parseFloat(a.percentReduction)
      )
      .forEach((file) => {
        const purgedSizeKB = (file.purgedSize / 1024).toFixed(2) + " KB";
        const originalSizeKB = (file.originalSize / 1024).toFixed(2) + " KB";
        const differenceSizeKB = (file.difference / 1024).toFixed(2) + " KB";
        const percentText = file.percentReduction + "%";

        console.log(
          chalk.cyan(file.fileName.padEnd(20)) +
            originalSizeKB.padEnd(15) +
            purgedSizeKB.padEnd(15) +
            differenceSizeKB.padEnd(15) +
            chalk.green(percentText)
        );
      });
  }

  // Calculate total stats
  const totalPurgedSizeKB = (totalPurgedSize / 1024).toFixed(2);
  const totalOriginalSizeKB = (totalOriginalSize / 1024).toFixed(2);
  const totalDifferenceKB = (totalDifference / 1024).toFixed(2);
  const totalPercentReduction =
    totalOriginalSize > 0
      ? ((totalDifference / totalOriginalSize) * 100).toFixed(2)
      : 0;

  console.log(chalk.gray("-".repeat(80)));
  console.log(
    chalk.bold("TOTAL".padEnd(20)) +
      (totalOriginalSizeKB + " KB").padEnd(15) +
      (totalPurgedSizeKB + " KB").padEnd(15) +
      (totalDifferenceKB + " KB").padEnd(15) +
      chalk.green(totalPercentReduction + "%")
  );
}
