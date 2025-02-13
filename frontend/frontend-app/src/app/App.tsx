import React from "react";
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import { Login } from "./components/Login";
import { MainPage } from './components/MainPage'; // Main page with menu
import { Contacts } from './components/Contacts'; // Contacts page
import { Reservations } from './components/Reservations'; // Reservations page
import { Orders } from './components/Orders'; // Orders page
import { Profile } from './components/Profile'; // Profile page
import { Settings } from './components/Settings'; // Settings page

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/main" element={<MainPage/>}/>
            <Route path="/contacts" element={<Contacts/>}/>
            <Route path="/reservations" element={<Reservations/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/settings" element={<Settings/>}/>
        </Routes>
    );
};

export default App;