import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../../dist");

const YM = `<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(101053224, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/101053224" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->`;

export function renderLayout({ lang, title, description, body }) {
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
    <title>${title}</title>
    <meta name="description" content="${description}">
  </head>
  <body>
    <div id="root">${body || ""}</div>
    <script>
      // Pass detected language to client
      window.__INITIAL_LANGUAGE__ = "${lang}";
    </script>
    <script src="./main.bundle.js"></script>
${YM}
  </body>
</html>
    `.trim();
}
