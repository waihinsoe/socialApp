import { Button, PaletteMode, styled } from "@mui/material";

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
            light: "#9f1802",
          },
          info: {
            main: "#4e5d78",
          },
          success: {
            main: "#377dff",
            light: "#00B4FF",
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

export const BlueButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: "#fff",
  margin: 5,
  "&:hover": {
    backgroundColor: theme.palette.success.light,
  },

  "&:disabled": {
    backgroundColor: "gray",
    color: "white",
  },
}));
