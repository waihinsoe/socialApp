import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Community from "../components/community";
import Messages from "../components/messages";
import Notification from "../components/notification";
import Explore from "../components/explore";
import Profile from "../components/profile";
import Settings from "../components/settings";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import PrivateRoute from "./PrivateRoute";
import Feed from "../components/feed";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Feed />} />
          <Route path="/community" element={<Community />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
