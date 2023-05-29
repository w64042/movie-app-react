import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header>
            <nav>
                <img src="#" alt="App logo" className="logo" />
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">My account</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};