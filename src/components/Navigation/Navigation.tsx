import * as React from "react";
import { Link } from "react-router-dom";
import { NAV_ROOT, NAV_ABOUT } from "../../constants";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={NAV_ROOT}>Home</Link>
        </li>
        <li>
          <Link to={NAV_ABOUT}>About</Link>
        </li>
      </ul>
    </nav>
  );
};
