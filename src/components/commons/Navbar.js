import React, { useState, useEffect } from "react";
import classes from "./styles/Navbar.module.css";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav>
      {(toggleMenu || screenWidth > 500) && (
        <ul className={classes.list}>
          <li className={classes.items}>Home</li>
          <li className={classes.items}>Services</li>
          <li className={classes.items}>Contact</li>
        </ul>
      )}

      <button onClick={toggleNav} className={classes.btn}>
        BTN
      </button>
    </nav>
  );
}
