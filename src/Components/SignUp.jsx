import "./SignUp.css";
import Google from "../Assets/google.png";
import { auth, db } from "../firebase/init";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onClose, onLogin }) => { 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    async function register(event) {
    event.preventDefault();
    setError("");

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        console.log("User created in Authentication:", user);

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            plan: "basic",
        });

        console.log("User created in Firestore!");

        onClose();
        navigate("/for-you");

    } catch (error) {
        console.log("Firebase error:", error);
        console.log("Error code:", error.code);
        console.log("Error message:", error.message);

        if (error.code === "auth/invalid-email") {
            setError("Please enter a valid email address.");
        } else if (error.code === "auth/email-already-in-use") {
            setError("The email already has an account");
        } else if (error.code === "permission-denied") {
            setError("Firestore permission denied.");
        } else {
            setError("Something went wrong. Please try again.");
        }
    }
}
            
    return ( 
    <div className="auth__wrapper"> 
        <div className="auth"> 
            <div className="auth__content"> 
                <div className="auth__title"> Sign up to Summarist </div> 
                <button type="button" className="btn google__btn--wrapper" > 
                    <figure className="google__icon--mask"> 
                        <img src={Google} alt="google" /> 
                    </figure> 
                    <div>Sign up with Google</div> 
                </button> 
                <div className="auth__separator"> 
                    <span className="auth__separator--text"> or </span> 
                </div> 
                <form className="auth__main--form" onSubmit={register} > 
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
                    <button className="btn" type="submit" > 
                        <span>Sign up</span> 
                    </button>
                </form> 
            </div> 
            <button className="auth__switch--btn" onClick={onLogin} > Already have an account? </button> 
            <div className="auth__close--btn" onClick={onClose}>
                <span className="auth__close">×</span>
            </div>
        </div> 
    </div> ); 
    }; 
    
    export default SignUp;
