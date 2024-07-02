import { atom } from "recoil";

export const fishState = atom({
  key: "fishState",
  default: 0,
});

export const waterLevelState = atom({
  key: "waterLevelState",
  default: 30,
});
