import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

export function getHexFromTailwind(className: string): string {
  if (!className) return "";

  const parts = className.split("-");
  const colorName = parts[1];
  const colorShade = parts[2];

  if (!colorName) return className; 

  const colors = fullConfig.theme.colors as Record<string, any>;

  if (colorShade) {
    return colors[colorName]?.[colorShade] ?? className;
  } else {
    return colors[colorName] ?? className;
  }
}