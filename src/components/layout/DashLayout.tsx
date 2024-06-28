import React from "react";
import MediaQuery from "react-responsive";
import "./stars.css";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MediaQuery maxWidth={600}>
        <div id="stars"></div>
        {children}
      </MediaQuery>
      <MediaQuery minWidth={601}>
        <div className="w-full h-screen flex items-center justify-center bg-gray-800 text-white text-xl">
          Sorry, you are not allowed to use PC or big screens.
        </div>
      </MediaQuery>
    </>
  );
};

export default DashLayout;
