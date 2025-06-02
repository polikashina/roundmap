import path from "path";

interface LocalIdentContext {
  resourcePath: string;
  rootContext: string;
}

export const getLocalIdent = (
  context: LocalIdentContext,
  _: unknown,
  localName: string
): string => {
  const relativePath = context.resourcePath.replace(context.rootContext, "");
  const fullPath = context.resourcePath;
  const fileName = path.basename(fullPath).replace(/\.[^.]+$/, "");
  return relativePath.startsWith("/src/ui/components/")
    ? localName
    : `${fileName}__${localName}--${Math.random().toString(36).substring(2, 7)}`.toLowerCase();
};
