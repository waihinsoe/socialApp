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
          textColor: {
            primary: "#4e5d78",
            secondary: "#FFF",
          },
        }
      : {
          primary: {
            main: "#191c21",
          },
          secondary: {
            main: "#212833",
          },
          info: {
            main: "#4e5d78",
          },
          success: {
            main: "#377dff",
          },

          textColor: {
            primary: "#eeeff2",
            secondary: "#FFF",
          },
        }),
  },
});
