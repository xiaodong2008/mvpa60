// Connect db
const {createClient} = require("@supabase/supabase-js");
const db = createClient('https://hjrldicfbqcdgihyodee.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqcmxkaWNmYnFjZGdpaHlvZGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2MDgxMjQsImV4cCI6MjAyNjE4NDEyNH0.yt_SazInGxkxqR7powgu8s8uOh6tc148aHRLv4ErScg');

async function login(uid) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const session = Array.from({length: 64}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    const {data, error} = await db.from('userlogin').insert([{
        userid: uid,
        session
    }])
    return session
}

module.exports = {
    db,
    login
}