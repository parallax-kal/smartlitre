import { waterLevelState } from "@/lib/atom";
import { useEffect, useRef, useState } from "react";
import { easings, useSpring } from "react-spring";
import { useRecoilState } from "recoil";

const Water = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);
  const [transitionSpeed] = useState(50);
  const [waterLevelStateValue] = useRecoilState(waterLevelState);
  const WATER_COLOR = "rgb(173, 216, 230)";

  const [{ waterLevel }, setWaterLevel] = useSpring(() => ({
    waterLevel: 0,
    config: {
      duration: 1000,
      easing: easings.easeOutCubic,
    },
  }));

  useEffect(() => {
    console.log(waterLevelStateValue)
    setWaterLevel({
      waterLevel: waterLevelStateValue,
      config: {
        duration: 1000 / (transitionSpeed / 50),
        easing: easings.easeOutCubic,
      },
    });
  }, [setWaterLevel, transitionSpeed, waterLevelStateValue]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      const drawWater = (level: number, offset: number) => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw container
          ctx.strokeRect(0, 0, canvas.width, canvas.height);

          // Calculate water height
          const waterHeight = (canvas.height * level) / 100;

          // Draw water surface with flowing wave
          ctx.beginPath();
          ctx.moveTo(0, canvas.height);
          for (let x = 0; x <= canvas.width; x++) {
            ctx.lineTo(
              x,
              canvas.height - waterHeight + Math.sin(x * 0.05 + offset) * 5
            );
          }
          ctx.lineTo(canvas.width, canvas.height);
          ctx.closePath();

          // Fill water
          ctx.fillStyle = WATER_COLOR;
          ctx.fill();
        }
      };
      const animate = () => {
        offsetRef.current += 0.05;
        drawWater(waterLevel.get(), offsetRef.current);
        animationRef.current = requestAnimationFrame(animate);
      };

      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [waterLevel]);

  return <canvas ref={canvasRef} width="600" height="185" />;
};

export default Water;
