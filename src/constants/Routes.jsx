import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicLinks, privateLinks } from "./links";
import RequireAuth from "../components/RequireAuth";
import PersistLogin from "../components/PersistLogin";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Registration = React.lazy(() => import("../pages/Registration"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));

function BaseRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path={publicLinks.Home} element={<Home />} />
          <Route
            path={publicLinks.Login}
            element={<Login />}
          />
          <Route path={publicLinks.Registration} element={<Registration />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path={privateLinks.Dashboard} element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default BaseRouter;
