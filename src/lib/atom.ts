import { CurrentData } from "@/interface/currentData";
import { atom } from "recoil";

export const tabsAtom = atom({
  key: "tabsATom",
  default: ["home"],
});

export const waterLevelState = atom({
  key: "waterLevelState",
  default: 10,
});

export const currentDataAtom = atom<CurrentData>({
  key: "currentSeaCreatureAtom",
  default: undefined,
});
