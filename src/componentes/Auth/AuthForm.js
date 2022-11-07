import { useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const history = useHistory();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);

    const nameInputRef = useRef();
    const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
   
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = "/api/token/";

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: enteredName,
          password: enteredPassword,
        // returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
            //   if (data && data.error && data.error.message) {
            //     errorMessage = data.error.message;
            //   }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const expirationTime = new Date(
            new Date().getTime() + (1000 * 60 * 60)
          ); console.log(expirationTime, data.idToken)
          authCtx.login(data.access, expirationTime.toISOString());
          history.replace('/welcome');
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Logout"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="text">Nome</label>
          <input type="text" id="text" required ref={nameInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>Login</button>
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          ></button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
