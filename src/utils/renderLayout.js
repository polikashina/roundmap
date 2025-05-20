import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../../dist");

export function renderLayout(lang = "ru") {
  // Get all JavaScript and CSS files from the dist directory
  let jsFiles = "";
  let cssFiles = "";

  try {
    const files = fs.readdirSync(distPath);

    // Find all JS files
    const jsFileNames = files.filter((file) => file.endsWith(".js"));
    jsFiles = jsFileNames
      .map((file) => `<script src="./${file}"></script>`)
      .join("\n    ");

    // Find all CSS files
    const cssFileNames = files.filter((file) => file.endsWith(".css"));
    cssFiles = cssFileNames
      .map((file) => `<link rel="stylesheet" href="./${file}">`)
      .join("\n    ");
  } catch (error) {
    console.error("Error reading dist directory:", error);
  }

  return `
<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="yandex-verification" content="1e86330536c8dfb9" />
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon/favicon-16x16.png" />
    ${cssFiles}
    <title>roundMap: Колесо баланса</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
      // Pass detected language to client
      window.__INITIAL_LANGUAGE__ = "${lang}";
    </script>
    <script src="./main.bundle.js"></script>
  </body>
</html>
    `.trim();
}
