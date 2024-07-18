import { User } from "@/interface/User";
import LoadingPage from "@/pages/Loading";
import { ReactNode, createContext, useEffect, useState } from "react";
import { firestoreDB } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// function to get the current user from the firestore

export const getUserByTelegramId = async (
  id: number
): Promise<User | null> => {
  try {
    const userRef = collection(firestoreDB, "users");
    const q = query(userRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data() as User;
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

const UserContextDefaultValues: UserContextType = {
  user: null,
  setUser: () => {},
  logout: () => {},
};

export const UserContext = createContext<UserContextType>(
  UserContextDefaultValues
);

export type ContextProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: ContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const initializeTelegramWebApp = async () => {
      setLoading(true);
      if (window.Telegram && window.Telegram.WebApp) {
        const webApp = window.Telegram.WebApp;
        webApp.expand();
        webApp.disableVerticalSwipes();

        const telegramId = webApp.initDataUnsafe?.user.id;
        if (telegramId) {
          const fetchedUser = await getUserByTelegramId(telegramId);
          console.log("fetched user: ", fetchedUser);

          if (fetchedUser) setUser(fetchedUser);
          else {
            setUser(webApp.initDataUnsafe.user);
          }
          setLoading(false);
        }
      } else {
        console.error("Telegram WebApp is not available");
        setLoading(false);
      }
    };

    initializeTelegramWebApp();
  }, []);
  const logout = async () => {
    setLoading(true);
    setUser(null);
  };

  const value: UserContextType = { user, setUser, logout };

  return (
    <UserContext.Provider value={value}>
      {loading ? <LoadingPage /> : children}
    </UserContext.Provider>
  );
}
