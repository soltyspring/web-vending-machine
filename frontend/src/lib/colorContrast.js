const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

export const isHexColor = (value) => HEX_COLOR_PATTERN.test(value || "");

export function safeColor(value, fallback) {
  return isHexColor(value) ? value : fallback;
}

function hexToRgb(hex) {
  if (!isHexColor(hex)) return null;

  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function toLinearChannel(value) {
  const next = value / 255;
  return next <= 0.03928 ? next / 12.92 : ((next + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  return (
    0.2126 * toLinearChannel(rgb.r) +
    0.7152 * toLinearChannel(rgb.g) +
    0.0722 * toLinearChannel(rgb.b)
  );
}

export function contrastRatio(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

export function readableTextColor(background, preferred = "") {
  const preferredColor = isHexColor(preferred) ? preferred : "";

  if (preferredColor && contrastRatio(preferredColor, background) >= 4.5) {
    return preferredColor;
  }

  return contrastRatio("#111111", background) >= contrastRatio("#ffffff", background)
    ? "#111111"
    : "#ffffff";
}

export function separateColor(color, against, lightFallback = "#f8fafc", darkFallback = "#111827") {
  const safeAgainst = safeColor(against, "#ffffff");
  const safeCandidate = safeColor(color, "");

  if (safeCandidate && contrastRatio(safeCandidate, safeAgainst) >= 2.1) {
    return safeCandidate;
  }

  return luminance(safeAgainst) > 0.5 ? darkFallback : lightFallback;
}

export function sanitizeShoppingTheme(theme = {}) {
  const primaryColor = safeColor(theme.primaryColor, "#3868ff");
  const secondaryColor = separateColor(
    theme.secondaryColor,
    primaryColor,
    "#f8fafc",
    "#111827"
  );
  const backgroundColor = safeColor(theme.backgroundColor, "#111214");
  const surfaceColor = safeColor(theme.surfaceColor, "#f6f6f7");

  return {
    primaryColor,
    secondaryColor,
    accentColor: readableTextColor(primaryColor, theme.accentColor),
    backgroundColor,
    surfaceColor,
    textColor: readableTextColor(surfaceColor, theme.textColor),
    imageColor: separateColor(secondaryColor, surfaceColor, "#ffffff", "#111827"),
  };
}
