import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import React from "react";
import { renderToString } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
import { detectLanguage } from "./middlewares";
import { renderLayout } from "../src/utils/renderLayout";
import { Lang } from "../src/types/lang";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(detectLanguage);
app.use(express.static(path.join(__dirname, "../dist")));

const PORT = 3000;

// Content for different languages
interface ContentTexts {
  title: string;
  description: string;
  homeLink: string;
}

interface Content {
  [key: string]: ContentTexts;
}

const content: Content = {
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

interface LayoutMeta {
  title: string;
  description: string;
}

interface LayoutMetaByLang {
  [key: string]: LayoutMeta;
}

const LAYOUT_META: LayoutMetaByLang = {
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

interface AboutProps {
  lang: Lang;
}

const About = ({ lang }: AboutProps) => {
  const texts = content[lang] || content.ru;

  return jsx("section", {
    children: [
      jsx("h1", { children: texts.title }),
      jsx("p", { children: texts.description }),
      jsx("a", { children: texts.homeLink, href: "/" }),
    ],
  });
};

app.get("/about", (req: Request, res: Response) => {
  // Use the detected language from the middleware
  const lang = (req as any).lang || "ru";

  const html = renderToString(jsx(About, { lang }));
  const title = content[lang]?.title || content.ru.title;

  res.send(
    renderLayout({
      lang,
      title,
      description: "Колесо баланса",
      body: html,
    })
  );
});

app.get("/login", (_req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirect</title>
    <script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js"></script>
</head>
<body>
    Login
    <script>
        window.onload = function() {
            window.YaSendSuggestToken('https://roundmap.app')
        }
    </script>
</body>
</html>
`);
});

app.get("*", (req: Request, res: Response) => {
  const lang = (req as any).lang as Lang;
  res.send(
    renderLayout({
      lang,
      title: LAYOUT_META[lang].title,
      description: LAYOUT_META[lang].description,
    })
  );
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
