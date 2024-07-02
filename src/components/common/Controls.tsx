import BoostIcon from "@/assets/svg/boost.svg?react";
import EarnIcon from "@/assets/svg/earn.svg?react";
import FriendsIcon from "@/assets/svg/friends.svg?react";
import PumpIcon from "@/assets/svg/pump.svg?react";
import { waterLevelState } from "@/lib/atom";
import { useRecoilState } from "recoil";
import { Button } from "../ui/button";

const Controls = () => {
  const [, setWaterLevel] = useRecoilState(waterLevelState);
  const bottomControls = [
    {
      label: "Pump",
      icon: PumpIcon,
      onClick: () => setWaterLevel((prev) => (prev + 10) % 90),
    },
    {
      label: "Friends",
      icon: FriendsIcon,
    },
    {
      label: "Earn",
      icon: EarnIcon,
    },
    {
      label: "Boost",
      icon: BoostIcon,
    },
  ];
  return (
    <div className="flex gap-3 justify-center bottom-10 absolute w-full">
      {bottomControls.map((control, index) => (
        <Button
          key={index}
          className="flex flex-col items-center h-auto gap-1 bg-[#C3C3C340]"
          onClick={control.onClick}
        >
          <control.icon height={24} />
          <div>{control.label}</div>
        </Button>
      ))}
    </div>
  );
};

export default Controls;
