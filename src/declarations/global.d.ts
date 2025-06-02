import { Lang } from "~src/types/lang";

declare global {
  interface Window {
    __INITIAL_LANGUAGE__?: string;
  }

  namespace Express {
    interface Request {
      lang: Lang;
    }
  }
}
