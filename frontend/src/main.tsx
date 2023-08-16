import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ColorModeProvider } from "./contexts/ColorModeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ColorModeProvider>
    <App />
  </ColorModeProvider>
);
