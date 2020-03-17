import React from "react";

const Footer = () => {
  return (
    <footer className="footer text-center">
      <span className="text-muted">
        &copy;
        {`${new Date().getFullYear()} - ${process.env.REACT_APP_NAME} نسخه ${
          process.env.REACT_APP_VERSION
        }`}
      </span>
    </footer>
  );
};

export default Footer;
