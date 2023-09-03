import ReactDOM from "react-dom/client";
import "./index.css";
import { ColorModeProvider } from "./contexts/ColorModeContext.tsx";
import Router from "./routes/Router.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ColorModeProvider>
      <Router />
    </ColorModeProvider>
  </Provider>
);
