import 'react-native-url-polyfill/auto'
import {createClient} from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default createClient("https://hjrldicfbqcdgihyodee.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqcmxkaWNmYnFjZGdpaHlvZGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2MDgxMjQsImV4cCI6MjAyNjE4NDEyNH0.yt_SazInGxkxqR7powgu8s8uOh6tc148aHRLv4ErScg", {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    },
});