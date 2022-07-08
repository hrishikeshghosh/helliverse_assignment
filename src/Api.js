import axios from "axios";

const api = axios.create({
  baseURL: "https://helliserver.herokuapp.com/api/v1",
});

export const call_profile = async (id) => await api.get(`/profile/${id}`);
export const call_deleteprofile = async (id) =>
  await api.delete(`/deleteProfile/${id}`);
export const call_signup = async (data) => await api.post("/signup", data);
export const call_signin = async (data) => await api.post("/signin", data);
