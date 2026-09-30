import { Link } from "react-router-dom";
import Header from "../Components/Header";
import "./Settings.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/init";
import { doc, getDoc } from "firebase/firestore";
import login from "../Assets/login.png";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setPlan("basic");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          setPlan(userData.plan || "basic");
        }
      } catch (error) {
        console.error("Error getting user information:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const SettingsSkeleton = () => {
  return (
    <div className="settings__skeleton">

      <div className="settings__skeleton--section">
        <div className="skeleton skeleton--subtitle"></div>
        <div className="skeleton skeleton--text"></div>
      </div>

      <div className="settings__skeleton--section">
        <div className="skeleton skeleton--subtitle"></div>
        <div className="skeleton skeleton--text"></div>
      </div>

    </div>
  );
};

  return (
    <>
      {loginOpen && (
        <Login
          onClose={() => setLoginOpen(false)}
          onSignUp={() => {
            setLoginOpen(false);
            setSignUpOpen(true);
          }}
        />
      )}

      {signUpOpen && (
        <SignUp
          onClose={() => setSignUpOpen(false)}
          onLogin={() => {
            setSignUpOpen(false);
            setLoginOpen(true);
          }}
        />
      )}
      <Header />

      <div className="container__settings">
        <div className="row__settings">
          <div className="page__title">Settings</div>

          {loading ? (
            <SettingsSkeleton />
          ) : !user ? (
            <div className="settings__login--wrapper">
              <img className="settings__login--wrapper-img" alt="login" src={login} />

              <div className="settings__login--text">
                Log in to your account to see your details.
              </div>

              <button
                className="btn settings__login--btn"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </button>
            </div>
          ) : (
            <>
              <div className="setting__content">
                <div className="settings__sub--title">
                  Your Subscription plan
                </div>

                <div className="settings__text">
                  {plan === "premium-plus"
                    ? "Premium-Plus"
                    : plan === "premium"
                    ? "Premium"
                    : "Basic"}
                </div>

                {plan === "basic" && (
                  <Link
                    to="/choose-plan"
                    className="settings__upgrade--btn"
                  >
                    Upgrade to Premium
                  </Link>
                )}
              </div>

              <div className="setting__content">
                <div className="settings__sub--title">
                  Email
                </div>

                <div className="settings__text">
                  {user?.email || "Guest"}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;