import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import React from "react";
import { renderToString } from "react-dom/server";
import { jsx } from "react/jsx-runtime";

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));

const app: express.Application = express();
app.use(express.static(path.join(__dirname, "../dist")));

const PORT: number = 3000;

const About: React.FC = (): React.ReactElement => {
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

app.get("/about", (req: Request, res: Response): void => {
  const html: string = renderToString(jsx(About, {}));
  res.send(
    `<!DOCTYPE html><html><head><title>roundMap: Колесо баланса</title></head><body>${html}</body></html>`
  );
});

app.get("*", function (req: Request, res: Response): void {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, (): void => {
  console.log(`App listening on port ${PORT}`);
});
