import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <header>
            <nav>
                <img src="#" alt="App logo" className="logo" />
                <ul>
                    <li>
                    <NavLink to="/">Strona główna</NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-account">Moje konto</NavLink>
                    </li>
                    <li>
                        <NavLink to="/add-list">Dodaj listę</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};