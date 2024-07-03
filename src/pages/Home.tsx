import Diamod from "@/assets/images/diamond.png";
import AnimatedNumber from "@/components/common/AnimatedNumber";
import Controls from "@/components/common/Controls";
import Water from "@/components/common/Water";
import { Button } from "@/components/ui/button";
import { currentDataAtom, tabsAtom } from "@/lib/atom";
import { seaCreatures } from "@/lib/seacreatures";
import { cn, displayNumbers } from "@/lib/utils";
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { BsLightningFill } from "react-icons/bs";
import { useRecoilState, useSetRecoilState } from "recoil";

import { currentDataAtom, tabsAtom, currentTankAtom } from "@/lib/atom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import toast from "react-hot-toast";

const HomePage = () => {
  const { Medal, drops, title, Fish } = seaCreatures[2];
  const [showConfetti, setShowConfetti] = useState(false);
  const [waterLevel, setWaterLevel] = useState(0);
  const [tabs, setTabs] = useRecoilState(tabsAtom);
  const setCurrentSeaCreature = useSetRecoilState(currentDataAtom);
  const [currentTank, setCurrentTank] = useRecoilState(currentTankAtom);

  const [numbers, setNumbers] = useState<number[]>([]);

  const STEP = 1;

  const handleClick = () => {
    if (waterLevel < 100) setNumbers([...numbers, STEP]);
    setWaterLevel((prev) => Math.min(prev + STEP, 100));
    if (waterLevel + STEP >= 100) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 30000);
    }
  };

  useEffect(() => {
    if (waterLevel === 100) {
      setNumbers([]);
    }
  }, [waterLevel]);

  useEffect(() => {
    if (waterLevel === 100) {
      setWaterLevel(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <>
      <div className="flex px-3 flex-col items-center">
        {currentTank.name === "" && currentTank.image === "" ? (
          <Button
            onClick={() => {
              setTabs([...tabs, "jointank"]);
            }}
            className="w-[198px] bg-[#AD12F5C2] h-[44px] font-bold text-[16px] leading-5 rounded-[30px]"
            style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
          >
            Join Tank
          </Button>
        ) : (
          <Drawer>
            <DrawerTrigger className="flex items-center gap-2 p-2 px-5 justify-between w-full bg-[#8d2aec] rounded-full">
              <div className="flex items-center gap-2">
                <img
                  src={currentTank.image}
                  alt={currentTank.name}
                  className="h-10"
                />
                <div className="font-bold text-[15px]">{currentTank.name}</div>
              </div>
              <FaChevronRight fontSize={24} className="text-white" />
            </DrawerTrigger>
            <DrawerContent className="flex pt-7 pb-8 flex-col items-center">
              <DrawerTitle className="ml-auto mr-5">
                <DrawerClose>
                  <IoCloseCircleSharp color="#FFFFFF80" size={25} />
                </DrawerClose>
              </DrawerTitle>
              <img
                src={currentTank.image}
                alt={currentTank.name}
                className="w-[100px]"
              />
              <div className="font-bold text-[24px] leading-[18px] my-6">
                {currentTank.name}
              </div>
              <DrawerClose
                onClick={() => {
                  setCurrentTank({ name: "", image: "" });
                  toast.error(`You Left the ${currentTank.name} Tank`,{
                    className:'!w-full !rounded-full !bg-[#6a1fc9] !text-white !font-bold !flex !items-center !justify-start ',
                    iconTheme:{
                      primary:"white",
                      secondary:"#6a1fc9"
                    }
                  }) 
                }}
                className="w-[250px] bg-[#9712F4] h-[48px] font-bold text-[16px] leading-5 rounded-[30px]"
                style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
              >
                Leave Tank
              </DrawerClose>
            </DrawerContent>
          </Drawer>
        )}
        <div className="flex mt-1 justify-center items-center gap-2 font-extrabold text-[36px]">
          <img src={Diamod} alt="diamond" className="mt-1 h-9" />
          <div>{displayNumbers(drops)}</div>
        </div>
        <Button
          onClick={() => {
            setCurrentSeaCreature({
              image: Fish,
              medal: title,
              waterLevel,
            });
            setTabs([...tabs, "leaderboard"]);
          }}
          className="bg-[#C3C3C340] gap-2 font-bold text-[15px] w-auto px-6 py-1 justify-center h-auto flex rounded-[11px] items-center"
        >
          <div>{title}</div>
          {Medal && <Medal className="h-5 w-5" />}
        </Button>
        <div className="w-full px-4 mt-3">
          <div className="flex justify-between font-bold">
            <div className="text-[11px]">Hydration Goal</div>
            <div className="text-[10px]">
              Level {waterLevel === 0 ? 0 : Math.floor((waterLevel / 100) * 6)}
              /6
            </div>
          </div>
          <ProgressBar
            completed={waterLevel}
            bgColor="#65E4F0"
            height="5px"
            transitionDuration="0.5s"
            className="mt-1 mb-2"
            isLabelVisible={false}
            borderRadius="10px"
            baseBgColor="#C3C3C340"
          />
          <div className="items-center mt-2 flex gap-1">
            <BsLightningFill color="#ffcc20" />
            <div className="font-extrabold text-[10px]">500/500</div>
          </div>
        </div>
        <div className="absolute top-[50%] w-24 h-24 mt-5">
          {numbers.map((number, index) => (
            <AnimatedNumber key={index} number={number} />
          ))}
        </div>
        <div
          onClick={handleClick}
          className={cn(
            "h-[15rem] w-full bg-contain bg-center bg-no-repeat bg-[#5417b0] relative overflow-hidden mt-2",
            waterLevel < 100 ? "cursor-pointer" : "animate-bounce"
          )}
          style={
            waterLevel === 100
              ? {
                  backgroundImage: `url(${Fish})`,
                  backgroundColor: "transparent",
                }
              : {
                  maskImage: `url(${Fish})`,
                  maskSize: "100% 100%",
                  maskPosition: "center",
                }
          }
        >
          {waterLevel < 100 && waterLevel > 0 && (
            <Water incomingWaterLevel={waterLevel} />
          )}
        </div>
        {showConfetti && (
          <Confetti className="w-full h-screen absolute top-0 z-50 " />
        )}
      </div>
      <Controls />
    </>
  );
};

export default HomePage;
