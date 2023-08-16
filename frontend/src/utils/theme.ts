import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#FFFFFF",
          },
          secondary: {
            main: "#f9fafb",
          },
          info: {
            main: "#4e5d78",
          },
          success: {
            main: "#377dff",
          },
        }
      : {
          primary: {
            main: "#191c21",
          },
          secondary: {
            main: "#FFE194",
          },
          info: {
            main: "#E8F6EF",
          },
          success: {
            main: "#1B9C85",
          },
        }),
  },
});
