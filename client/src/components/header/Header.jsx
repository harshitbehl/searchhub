import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

import { BsGithub } from "react-icons/bs";
import { motion } from "framer-motion";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // JS Window Scroll Method, whenever we scroll it runs the function
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
  };

  // Link Creator Function
  const createLink = (link, text) => {
    return (
      <li>
        <Link to={link}>{text}</Link>
      </li>
    );
  };

  return (
    <header
      className={isScrolled ? "header--scrolled" : "header"}
      data-testid="header"
    >
      <div className="header__container main-container">
        <div className="header__logo">
          <img
            src="https://s3-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/397/400/original/Build-With-Assembly-Logo-black.png?1619213119"
            alt="Header Logo"
          />
        </div>
        <nav className="header__nav">
          <ul>
            {createLink("/", "Home")}
            {createLink("#", "About Us")}
            {createLink("#", "Services")}
            {createLink("#", "Resources")}
            {createLink("#", "Contact Us")}
          </ul>
        </nav>
        <div className="header__github">
          <motion.a
            whileHover={{ rotate: "1turn", scale: 1.1 }}
            transition={{ duration: 0.4 }}
            href="https://github.com/harshitbehl/buildwithassembly-harshitbehl"
          >
            <BsGithub className="header__github-icon" />
          </motion.a>
        </div>
      </div>
    </header>
  );
}

export default Header;
