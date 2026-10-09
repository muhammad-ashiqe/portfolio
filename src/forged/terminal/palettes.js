import { readPreference, savePreference } from "../storage";
export const palettes = [
  { id: "orange", label: "Orange", color: "#ff965c" },
  { id: "green", label: "Green", color: "#b7f68b" },
  { id: "amber", label: "Amber", color: "#ffd08a" },
  { id: "bone", label: "Bone", color: "#eee8dd" },
];
export const paletteIds = palettes.map(({ id }) => id);
export const appearanceKey = "forged-terminal-theme-v2";
export const readAppearance = () =>
  readPreference(appearanceKey, paletteIds, "orange");
export const saveAppearance = (id) => {
  if (paletteIds.includes(id)) savePreference(appearanceKey, id);
};
