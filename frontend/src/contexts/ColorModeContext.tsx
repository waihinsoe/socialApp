import { PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode, createContext, useState } from "react";
import { getDesignTokens } from "../utils/theme";

interface ColorModeContextType {
  mode: PaletteMode;
  updateData: (value: any) => void;
}

const defaultContext: ColorModeContextType = {
  mode: "light",
  updateData: () => {},
};

export const ColorModeContext =
  createContext<ColorModeContextType>(defaultContext);

interface Props {
  children: ReactNode;
}

export const ColorModeProvider = ({ children }: Props) => {
  const [data, updateData] = useState(defaultContext);

  const theme = () => createTheme(getDesignTokens(data.mode));

  return (
    <ColorModeContext.Provider value={{ ...data, updateData }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
