import path from "path";

export const getLocalIdent = (context, _, localName) => {
  const relativePath = context.resourcePath.replace(context.rootContext, "");
  const fullPath = context.resourcePath;
  const fileName = path.basename(fullPath).replace(/\.[^.]+$/, "");
  return relativePath.startsWith("/src/ui/components/")
    ? localName
    : `${fileName}__${localName}--${Math.random().toString(36).substring(2, 7)}`.toLowerCase();
};
