import React from "react";
import Controls from "../common/Controls";
import Navbar from "../common/Navbar";
import WaterWrapper from "./WaterWrapper";

const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full">
      <WaterWrapper>
        <Navbar />
        {children}
        <Controls />
      </WaterWrapper>
    </div>
  );
};

export default GameLayout;
