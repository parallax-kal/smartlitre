import HomePage from "@/pages/Home";
import Navbar from "../components/common/Navbar";
import { Toaster } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { confettiAtom, tabsAtom } from "@/lib/atom";
import JoinTank from "@/pages/JoinTank";
import Leaderboard from "@/pages/Leaderboard";
import Earn from "@/pages/Earn";
import Boost from "@/pages/Boost";
import Friends from "@/pages/Friends";
import Confetti from "react-confetti";
import { currentTankAtom } from "../lib/atom";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../firebase/firebase";
import { User } from "@/interface/User";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";

export const saveUser = async (user: User | null): Promise<void> => {
  if (user) {
    const userRef = doc(firestoreDB, "users", user.id.toString());

    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      await updateDoc(userRef, {
        ...user,
      });
    } else {
      await setDoc(userRef, {
        ...user,
      });
    }
  }
};

const tabs = [
  {
    name: "home",
    Component: HomePage,
  },
  {
    name: "jointank",
    Component: JoinTank,
  },
  {
    name: "leaderboard",
    Component: Leaderboard,
  },
  {
    name: "friends",
    Component: Friends,
  },
  {
    name: "earn",
    Component: Earn,
  },
  {
    name: "boost",
    Component: Boost,
  },
];

const GameLayout = () => {
  const tabsState = useRecoilValue(tabsAtom);
  const showConfetti = useRecoilValue(confettiAtom);
  const [currentTank] = useRecoilState(currentTankAtom);

  const { user } = useUser();

  useEffect(() => {
    const handleAppClose = async () => {
      const currentUser = {
        ...user,
        balance: Number(localStorage.getItem("balance")),
        level: Number(localStorage.getItem("level")),
        tank: currentTank.name,
      } as User;
      if (currentUser) {
        await saveUser(currentUser);
      }
    };
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;

      webApp.onEvent("web_app_close", handleAppClose);
    } else {
      console.error("Telegram WebApp is not available");
    }

    window.addEventListener("beforeunload", handleAppClose);

    return () => {
      localStorage.setItem("handleclose", JSON.stringify(3000));
      if (window.Telegram && window.Telegram.WebApp) {
        const webApp = window.Telegram.WebApp;
        // Clean up the event listener on component unmount
        webApp.offEvent("web_app_close", handleAppClose);
      }
      window.removeEventListener("beforeunload", handleAppClose);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative z-20">
      {showConfetti && (
        <Confetti numberOfPieces={1500} recycle={false} gravity={0.09} />
      )}
      <Navbar />
      {tabs.map((tab) => {
        const { name, Component } = tab;
        return (
          <div
            key={name}
            className={`${
              name !== tabsState[tabsState.length - 1] ? "hidden" : ""
            } grow shrink basis-auto flex flex-col justify-between pb-4`}
          >
            <Component />
          </div>
        );
      })}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default GameLayout;
