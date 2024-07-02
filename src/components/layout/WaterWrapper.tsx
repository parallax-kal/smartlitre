import { waterLevelState } from "@/lib/atom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import "./water.css";

const WaterWrapper = ({ children }: { children: React.ReactNode }) => {
  const [waterLevel] = useRecoilState(waterLevelState);
  useEffect(() => {
    const waterElement = document.getElementById("water");
    const waveElement = document.getElementById("wave");
    waterElement.style.height = `${waterLevel}%`;
    waveElement.style.bottom = `${waterLevel}%`;
  }, [waterLevel]);

  return (
    <div className="container">
      <div className="water-background">
        <div id="water"></div>
        <div id="wave">
          <svg viewBox="0 0 2880 320" preserveAspectRatio="none">
            <defs>
              <linearGradient
                id="waterGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(79, 195, 247, 0.8)" />
                <stop offset="100%" stopColor="rgba(79, 195, 247, 0.6)" />
              </linearGradient>
            </defs>
            <path
              d="M0,160 C320,240,420,80,640,160 C860,240,960,80,1180,160 C1400,240,1500,80,1720,160 C1940,240,2040,80,2260,160 C2480,240,2580,80,2880,160 V320 H0 Z"
              fill="url(#waterGradient)"
            >
              <animate
                attributeName="d"
                dur="5s"
                repeatCount="indefinite"
                values="
                      M0,160 C320,240,420,80,640,160 C860,240,960,80,1180,160 C1400,240,1500,80,1720,160 C1940,240,2040,80,2260,160 C2480,240,2580,80,2880,160 V320 H0 Z;
                      M0,160 C320,80,420,240,640,160 C860,80,960,240,1180,160 C1400,80,1500,240,1720,160 C1940,80,2040,240,2260,160 C2480,80,2580,240,2880,160 V320 H0 Z;
                      M0,160 C320,240,420,80,640,160 C860,240,960,80,1180,160 C1400,240,1500,80,1720,160 C1940,240,2040,80,2260,160 C2480,240,2580,80,2880,160 V320 H0 Z
                    "
              />
            </path>
          </svg>
        </div>
      </div>
      <div className="content-overlay">{children}</div>
    </div>
  );
};

export default WaterWrapper;
