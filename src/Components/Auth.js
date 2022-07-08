import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, signin } from "../Action";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { CLEARERROR } from "../constants";
const initValues = { name: "", email: "", password: "", confirmPassword: "" };
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initValues);
  const [passVisible, setPassVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { loading, error, errorStat, authStat } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (loading) setLoading(true);
    else setLoading(false);
    if (authStat) {
      setValues(initValues);
    }
    if (errorStat) setIsError(true);
  }, [loading, authStat, errorStat]);

  const handlePageChange = (e) => {
    e.preventDefault();
    setIsSignUp((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isSignUp
      ? dispatch(signup(values, navigate))
      : dispatch(signin(values, navigate));
  };

  const closeError = (e) => {
    e.preventDefault();
    setIsError(false);
    dispatch({ type: CLEARERROR });
  };

  return (
    <div className="auth-root">
      <div className="auth-box">
        <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
        <p className="ab-p1">
          {isSignUp ? "Create an account" : "log into your existing account"}{" "}
        </p>
        {isSignUp && (
          <input
            type={"text"}
            placeholder={"name"}
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        )}

        <input
          type={"email"}
          placeholder={"email"}
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <div className="pass-box">
          <input
            type={passVisible ? "text" : "password"}
            placeholder="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <button onClick={(e) => setPassVisible((prevState) => !prevState)}>
            {passVisible ? (
              <i class="fas fa-eye-slash"></i>
            ) : (
              <i class="fas fa-eye"></i>
            )}
          </button>
        </div>
        {isSignUp && (
          <input
            type={passVisible ? "text" : "password"}
            placeholder={"confirm password"}
            value={values.confirmPassword}
            onChange={(e) =>
              setValues({ ...values, confirmPassword: e.target.value })
            }
          />
        )}

        <div className="auth-btn-zone">
          <button onClick={(e) => handleSubmit(e)} disabled={Loading && true}>
            {Loading ? "loading..." : isSignUp ? "Signup" : "Signin"}
          </button>
          <p onClick={(e) => handlePageChange(e)}>
            {isSignUp ? "Already have an Account?" : "Don't have an account?"}
          </p>
        </div>
        {isError && (
          <div className="auth-error-box">
            <i class="fas fa-exclamation-triangle"></i>
            <p>{isError && error}</p>
            <button onClick={(e) => closeError(e)}>
              <i class="fas fa-times"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
