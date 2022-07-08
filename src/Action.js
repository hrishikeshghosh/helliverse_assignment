import * as api from "./Api";
import {
  AUTHENTICATE,
  ENDLOADING,
  ERROR,
  GETPROFILE,
  STARTLOADING,
} from "./constants";

export const signup = (value, navigate) => async (dispatch) => {
  try {
    dispatch({ type: STARTLOADING });
    const { data } = await api.call_signup(value);
    if (data.success) {
      dispatch({ type: AUTHENTICATE, payload: data.token });
      navigate("/");
    }
    dispatch({ type: ENDLOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const signin = (value, navigate) => async (dispatch) => {
  try {
    dispatch({ type: STARTLOADING });
    const { data } = await api.call_signin(value);
    if (data.success) {
      dispatch({ type: AUTHENTICATE, payload: data.token });
      navigate("/");
    }
    dispatch({ type: ENDLOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const getProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: STARTLOADING });
    const { data } = await api.call_profile(id);
    if (data.success) dispatch({ type: GETPROFILE, payload: data.user });
    dispatch({ type: ENDLOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProfile = (id, navigate) => async (dispatch) => {
  try {
    await api.call_deleteprofile(id);
    navigate("/auth");
  } catch (error) {
    console.log(error);
  }
};
