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
import Header from "components/Header";
import Footer from "components/Footer";
import Home from "pages/home";

const Routers = () => {
  return (
    <Router>
      <ToastContainer theme="colored" />
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}></Route>
        <Route path={PageUrl.HOME} element={<Home />} />
        <Route
          path={PageUrl.ALL}
          element={<Navigate to={PageUrl.HOME} replace={true} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Routers;
