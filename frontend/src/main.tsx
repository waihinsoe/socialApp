import ReactDOM from "react-dom/client";
import "./index.css";
import { ColorModeProvider } from "./contexts/ColorModeContext.tsx";
import Router from "./routes/Router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ColorModeProvider>
    <Router />
  </ColorModeProvider>
);
