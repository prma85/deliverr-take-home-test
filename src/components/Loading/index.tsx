import * as React from "react";
import "./index.css";

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading, children }) => {
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="loading-container">
          <div className="loading loading--full-height"></div>
          Loading data...
        </div>
      ) : (
        children
      )}
    </React.Fragment>
  );
};

export default Loading;
