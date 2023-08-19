import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Community from "../components/community";
import Messages from "../components/messages";
import Notification from "../components/notification";
import Explore from "../components/explore";
import Profile from "../components/profile";
import Settings from "../components/settings";
import Logout from "../components/auth/Logout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/community" element={<Community />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
