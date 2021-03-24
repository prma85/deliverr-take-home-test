import React from "react";
import "./index.css";

interface HomeProps {
  toogleBtn: React.ReactChild;
  title: string;
}

const Home: React.FC<HomeProps> = ({ title, toogleBtn, children }) => {
  return (
    <div className="wrapper">
      <nav className="navbar" id="header">
        <div className="container-fluid">
          <a
            href="https://www.deliverr.ca/"
            title="deliverr home page"
            target="_blank"
            rel="noreferrer"
            className="navbar-brand"
          >
            <img
              width="170"
              alt="Deliverr"
              src="https://deliverr-images.s3.amazonaws.com/assets-prd-k8s/images/logo-pink.png"
            />
          </a>
          <div className="navbar-collapse">
            <div className="navbar-nav title">{title} view</div>
            <div className="navbar-nav ml-auto">{toogleBtn}</div>
          </div>
        </div>
      </nav>
      <div className="container-fluid">{children}</div>
    </div>
  );
};

export default Home;
