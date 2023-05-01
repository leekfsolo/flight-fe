import React from "react";
import HeaderMainView from "./HeaderMainView";
import { useAppSelector } from "app/hooks";
import { authSelector } from "app/selectors";

const Header = () => {
  const auth = useAppSelector(authSelector);
  const { isUserExisted } = auth;

  return <HeaderMainView />;
};

export default Header;
