import { getStorage, setStorage } from "./storage";

import db from "./database";
import { router } from "expo-router";

async function register(email, password) {
  console.log("register");
  const { data, error } = await db.auth.signUp({ email, password });
  if (error) throw error;
}

async function login(email, password) {
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (!error && !data) throw new Error("Please confirm registration via email");
  return data;
}

async function logout() {
  await db.auth.signOut();
  router.navigate("/");
}

async function getAvatar() {
  const base64 = await getStorage("avatar");
  if (base64) {
    return `data:image/jpeg;base64,${base64}`;
  }
  return null;
}

async function setAvatar(base64) {
  await setStorage("avatar", base64);
  return true;
}

export default {
  register,
  login,
  logout,
  getAvatar,
  setAvatar,
};
