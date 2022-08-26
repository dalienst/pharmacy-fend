import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { publicLinks } from "./links";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Registration = React.lazy(() => import("../pages/Registration"));

function BaseRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path={publicLinks.Home} element={<Home />} />
          <Route path={publicLinks.Login} element={<Login />} />
          <Route path={publicLinks.Registration} element={<Registration />} />
          <Route path={publicLinks.Dashboard} element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default BaseRouter;
