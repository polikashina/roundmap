import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
import { detectLanguage } from "./middlewares";
import { renderLayout } from "~src/utils/renderLayout";

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));

const app: express.Application = express();
app.use(detectLanguage);
app.use(express.static(path.join(__dirname, "../dist")));

const PORT: number = 3000;

// Content for different languages
const content = {
  en: {
    title: "roundMap: Wheel of Balance",
    description:
      "Create a wheel of balance and track growth areas for harmonious development",
    homeLink: "Home",
  },
  ru: {
    title: "roundMap: Колесо баланса",
    description:
      "Создавайте колесо баланса и отслеживайте зоны роста для гармоничного развития",
    homeLink: "На главную",
  },
};

const About: React.FC<{ language: string }> = ({
  language,
}): React.ReactElement => {
  const texts = content[language as keyof typeof content] || content.ru;

  return jsx("section", {
    children: [
      jsx("h1", { children: texts.title }),
      jsx("p", { children: texts.description }),
      jsx("a", { children: texts.homeLink, href: "/" }),
    ],
  });
};

app.get("/about", (req: Request, res: Response): void => {
  // Use the detected language from the middleware
  const language = req.language || "ru";

  const html: string = renderToString(jsx(About, { language }));
  const pageTitle =
    content[language as keyof typeof content]?.title || content.ru.title;

  res.send(
    `<!DOCTYPE html><html lang="${language}"><head><title>${pageTitle}</title></head><body>${html}</body></html>`
  );
});

app.get("*", function (req: Request, res: Response): void {
  res.send(renderLayout(req.language));
});

app.listen(PORT, (): void => {
  console.log(`App listening on port ${PORT}`);
});
