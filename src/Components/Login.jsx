import Google from "../Assets/google.png"
import Icon from "../Assets/google.icon.png"
import { useState } from "react"
import "./Login.css";
import SignUp from "../Components/SignUp";
import { auth, db } from '../firebase/init'
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore";

const Login = ({ onClose, onSignUp, onSuccess }) => {
    const [signUpOpen] = useState(false);
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    function login(event) {
  event.preventDefault();

  setError("");

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);

      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
        navigate("/for-you");
      }
    })
    .catch((error) => {
      console.error("Firebase login error:", error.code, error.message);
      console.log("LOGIN ERROR:", error);
    console.log("ERROR CODE:", error.code);


      if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/invalid-credential") {
        setError("The email or password is incorrect.");
      } else if (error.code === "auth/user-not-found") {
        setError("No account was found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("The email or password is incorrect.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    });
}

const guestLogin = async () => {
  setError("");

  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;

    console.log("Guest logged in:", user);

    // Create a Firestore document for the guest
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: null,
      plan: "basic",
      guest: true,
    });

    console.log("Guest user saved to Firestore");

    onClose();
    navigate("/for-you");
  } catch (error) {
    console.error("Guest login error:", error);

    setError("Unable to log in as a guest. Please try again.");
  }
};

  return (
    <>
    {!signUpOpen && (
    <div className="auth__wrapper">
      <div className="auth">
        <div className="auth__content">
          <div className="auth__title">Log in to Summarist</div>
          <button className="btn guest__btn--wrapper" onClick={guestLogin}>
            <figure className="guest__icon--mask">
              <img src={Icon} alt="" />
            </figure>
            <div>Login as a Guest</div>
          </button>
          <div className="auth__separator">
            <span className="auth__separator--text">or</span>
          </div>
          <button className="btn google__btn--wrapper">
            <figure className="google__icon--mask">
              <img src={Google} alt="google" />
            </figure>
            <div>Login with Google</div>
          </button>
          <div className="auth__separator">
            <span className="auth__separator--text">or</span>
          </div>
          <form className="auth__main--form" onSubmit={login}>
            <input
              className="auth__main--input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              className="auth__main--input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {error && (
              <div className="auth__error">
                {error}
              </div>
            )}
            <button className="btn" >
              <span>Login</span>
            </button>
          </form>
        </div>
        <div className="auth__forgot--password">Forgot your password?</div>
        <button className="auth__switch--btn" onClick={onSignUp}>Don't have an account?</button>
        <div className="auth__close--btn" onClick={onClose}>
          <span className="auth__close">×</span>
        </div>
      </div>
    </div>
    )}
    {signUpOpen && (
    <SignUp onClose={onClose} />
    )}
    </>
  );
};

export default Login;