import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { deleteProfile, getProfile } from "../Action";
import "./style.css";
import { LOGGEDOUT } from "../constants";

const DecodeToken = (token) => {
  if (localStorage.getItem("token")) return jwtDecode(token);
};

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const { data, authStat, loading } = useSelector((state) => state.user);
  const id = DecodeToken(JSON.parse(localStorage.getItem("token")));
  useEffect(() => {
    if (loading) setLoading(true);
    else setLoading(false);
    if (id === undefined || null) navigate("/auth");
    else dispatch(getProfile(id?._id));
  }, [dispatch, loading]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch({ type: LOGGEDOUT });
    navigate("/auth");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(deleteProfile(id?._id, navigate));
    dispatch({ type: LOGGEDOUT });
  };

  return (
    <div className="profile-root">
      <div className="profile-box">
        <h2>My Account</h2>
        <div>
          <h3>My Name:</h3>
          <p>{data !== null && data.name}</p>
        </div>
        <div>
          <h3>My Email:</h3>
          <p>{data !== null && data.email}</p>
        </div>
        <div>
          <h3>My Token:</h3>
          <p>{JSON.parse(localStorage.getItem("token"))}</p>
        </div>
        <div className="profile-btn-zone">
          <button onClick={(e) => handleLogout(e)}>Sign Out</button>
          <button onClick={(e) => handleDelete(e)}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
