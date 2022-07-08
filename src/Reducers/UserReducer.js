import {
  AUTHENTICATE,
  CLEARERROR,
  ENDLOADING,
  ERROR,
  GETPROFILE,
  LOGGEDOUT,
  STARTLOADING,
} from "../constants";

export default (
  state = {
    data: null,
    authStat: false,
    errorStat: false,
    error: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case AUTHENTICATE:
      localStorage.setItem("token", JSON.stringify(action?.payload));
      return { ...state, authStat: true };
    case ERROR:
      return { ...state, errorStat: true, error: action?.payload };
    case CLEARERROR:
      return { ...state, errorStat: false, error: null };
    case STARTLOADING:
      return { ...state, loading: true };
    case ENDLOADING:
      return { ...state, loading: false };
    case GETPROFILE:
      return { ...state, authStat: true, data: action?.payload };
    case LOGGEDOUT:
      return { ...state, authStat: false };
    default:
      return state;
  }
};
