import React, { useState } from "react";
import ChatGPT from "./Chatgpt2";
import "./homepage.css";
import logo from "./PNG.jpg";
import logo1 from "./openai.png";
function Header() {
  return (
    <div className="header-container">
      <div className="header-logo">
        <img className="logo-image" src={logo} alt="any" />
        <img className="logo-image" src={logo1} alt="any" />
      </div>
    </div>
  );
}

function Sidebar({ items, isOpen }) {
  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span>Mohit</span>
        </div>
        <div className="sidebar-close">&#10006;</div>
      </div>
      <ul className="sidebar-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarItems = ["Home", "About", "Contact"];

  function handleBurgerClick() {
    setIsOpen(!isOpen);
  }

  function handleSidebarClose() {
    setIsOpen(false);
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="content-container">
        <div className="chat-container">
          <ChatGPT />
        </div>
      </div>
      <Sidebar items={sidebarItems} isOpen={isOpen} />
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={handleSidebarClose}
      ></div>
      <div
        className={`burger-container ${isOpen ? "open" : ""}`}
        onClick={handleBurgerClick}
      >
        <div className="burger-logo">
          <span>M</span>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
