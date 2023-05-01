import React from "react";
import { Logo } from "assets";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CButton from "components/CButton";
import WrapperContainer from "components/WrapperContainer";

interface Props {
  user?: string;
}

const HeaderMainView = (props: Props) => {
  const { user } = props;

  return (
    <header>
      <WrapperContainer>
        <div className="header">
          <div className="header-logo">
            <img src={Logo} alt="flight booking logo" />
          </div>

          <div className="header-account">
            {user ? (
              <>
                <div className="header-account__cart">
                  <ShoppingCartIcon />
                  <span className="cart-total">0</span>
                </div>
              </>
            ) : (
              <>
                <CButton variant="text">Login</CButton>
                <CButton variant="outlined">Sign up</CButton>
              </>
            )}
          </div>
        </div>
      </WrapperContainer>
    </header>
  );
};

export default HeaderMainView;
