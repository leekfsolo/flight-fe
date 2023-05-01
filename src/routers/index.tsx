import React from "react";
import { PageUrl } from "configuration/enum";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";

const Routers = () => {
  return (
    <Router>
      <ToastContainer theme="colored" />
      <Routes>
        <Route element={<PrivateRoute />}></Route>
        <Route
          path={PageUrl.ALL}
          element={<Navigate to={PageUrl.HOME} replace={true} />}
        />
      </Routes>
    </Router>
  );
};

export default Routers;
