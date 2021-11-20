import * as React from "react";
import { Link } from "react-router-dom";
import { NAV_ROOT, NAV_ABOUT } from "../../constants";

import "./styles.scss";

export const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__menu">
                <li className="navigation__item navigation__item_home">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32">
                        <path
                            d="M 32 0 A 32 32 0 0 1 59.71281292110204 48 L 32 32 Z"
                            stroke-width="2"
                            fill="#C70039"
                        ></path>
                        <path
                            d="M 59.71281292110204 48 A 32 32 0 0 1 4.287187078897961 48 L 32 32 Z"
                            stroke-width="2"
                            fill="#FF5733"
                        ></path>
                        <path
                            d="M 4.287187078897961 48 A 32 32 0 0 1 31.999999999999993 0 L 32 32 Z"
                            stroke-width="2"
                            fill="#FF8D1A"
                        ></path>
                    </svg>
                    <Link to={NAV_ROOT} className="navigation__home-link">
                        <h1 className="dashboard__title">roundMap</h1>
                    </Link>
                </li>
                {/* <li className="navigation__item">
                    <Link to={NAV_ABOUT}>About</Link>
                </li> */}
            </ul>
        </nav>
    );
};
