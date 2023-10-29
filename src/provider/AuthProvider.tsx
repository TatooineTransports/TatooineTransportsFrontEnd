import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from "firebase/compat/app";
import { auth } from "../auth/firebaseSetup";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);

    });
    if (user && window.location.pathname ==='/'){
      window.open('/home', '_self');
    }

    return unsubscribe;
  }, [user]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};