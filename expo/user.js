import {getStorage, setStorage} from "./storage";
import db from './database';
import {router} from "expo-router";

async function isLogin() {
    const session = db.auth.getUser();
}

async function register(email, password) {
    console.log("register")
    const {data, error} = await db.auth.signUp({email, password})
    if (error) throw error;
}

async function login(email, password) {
    const {data, error} = await db.auth.signInWithPassword({email, password})
    if (error) throw error;
    if (!error && !data) throw new Error("Please confirm registration via email");
    return data;
}

async function logout() {
    await db.auth.signOut();
    router.navigate("/");
}

export default {isLogin, register, login, logout};