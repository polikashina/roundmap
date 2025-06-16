import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
import { detectLanguage } from "./middlewares";
import { renderLayout } from "../src/utils/renderLayout";
import { Lang } from "../src/types/lang";

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

const LAYOUT_META: { [key in Lang]: { title: string; description: string } } = {
  ru: {
    title: "Колесо баланса - нарисовать онлайн бесплатно",
    description:
      "Оценить сферы своей жизни, расставить приоритеты, улучшить качество жизни",
  },
  en: {
    title: "Balance wheel - create online for free",
    description:
      "Rate areas of your life, set priorities, improve quality of life",
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
  const lang = req.lang || "ru";

  const html: string = renderToString(jsx(About, { lang }));
  const title =
    content[lang as keyof typeof content]?.title || content.ru.title;

  res.send(
    renderLayout({
      lang,
      title,
      description: "Колесо баланса",
      body: html,
    })
  );
});

app.get("*", function (req: Request, res: Response): void {
  const lang = req.lang;
  res.send(
    renderLayout({
      lang,
      title: LAYOUT_META[lang].title,
      description: LAYOUT_META[lang].description,
    })
  );
});

app.listen(PORT, (): void => {
  console.log(`App listening on port ${PORT}`);
});
