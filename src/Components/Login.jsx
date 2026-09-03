import login from "../Assets/login.png";


const Login = () => {

  return (
    <>
    <div className="container">
        <h1>How to Win Friends and Influence People in the Digital Age</h1>
        <div className="img__wrapper">
            <img src={login} alt="login" />
        </div>
        <h2 className="">Log in to your account to read and listen to the book</h2>
        <button className="login__btn">Login</button>
    </div>
    </>
  );
};

export default Login;