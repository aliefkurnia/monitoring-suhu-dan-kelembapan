import { ReactComponent as LogoDark } from "../assets/images/logos/logo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/starter">
      <LogoDark />
    </Link>
  );
};

export default Logo;
