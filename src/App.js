import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Meeting from "./pages/Meeting";

import ProtectedRoutes from "./services/ProtectedRoutes";
import { CircularIndeterminate } from "./loadingAnimation";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Auth, db } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, async (user) => {
      // console.log("2");
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userData = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
        };
        await setDoc(userRef, userData, { merge: true });
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <div>
        {loading ? (
          <div className="flex justify-center items-center">
            <CircularIndeterminate />
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login user={user} />} />
            <Route element={<ProtectedRoutes user={user} />}>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/meeting/:id" element={<Meeting user={user} />} />
            </Route>
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
