import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import React from "react";
import { renderToString } from "react-dom/server";
import { jsx } from "react/jsx-runtime";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static(path.join(__dirname, "../dist")));

const PORT = 3000;

const About = () => {
  return jsx("section", {
    children: [
      jsx("h1", { children: "roundMap: Колесо баланса" }),
      jsx("p", {
        children:
          "Создавайте колесо баланса и отслеживайте зоны роста для гармоничного развития",
      }),
      jsx("a", { children: "На главную", href: "/" }),
    ],
  });
};

app.get("/about", (req, res) => {
  const html = renderToString(jsx(About, {}));
  res.send(
    `<!DOCTYPE html><html><head><title>roundMap: Колесо баланса</title></head><body>${html}</body></html>`
  );
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
