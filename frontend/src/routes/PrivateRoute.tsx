import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/Layout";

const PrivateRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PrivateRoute;
