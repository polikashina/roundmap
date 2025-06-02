import { v4 as uuidv4 } from "uuid";
import { Express, Request, Response, NextFunction } from "express";
import { Lang } from "~src/types/lang";

const SUPPORTED_LANGUAGES: Lang[] = ["en", "ru"];

export const setRequestId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = uuidv4();
  res.header("Request-id", uuid);
  next();
};

export const detectLanguage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let detectedLang: Lang = "en";

  // Check Accept-Language header
  if (req.headers["accept-language"]) {
    const acceptLanguage = req.headers["accept-language"];
    // Parse the Accept-Language header
    const languages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [langCode, weight] = lang.trim().split(";q=");
        const code = langCode.substring(0, 2).toLowerCase();

        if (code === "ru") {
          return { code, weight: 2 };
        }

        return {
          code,
          weight: weight ? parseFloat(weight) : 1.0,
        };
      })
      .sort((a, b) => b.weight - a.weight);

    // Find the first supported language
    for (const lang of languages) {
      if (SUPPORTED_LANGUAGES.includes(lang.code as Lang)) {
        detectedLang = lang.code as Lang;
        break;
      }
    }
  }

  // Store detected language in request object for use in routes
  req.lang = detectedLang;

  // Set language in response locals for use in templates
  res.locals.lang = detectedLang;

  next();
};
