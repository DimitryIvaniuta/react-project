import React from "react";
import { Link } from 'react-router-dom';

export const MainPage = () => {
    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <nav>
                <ul>
                    <li><Link to="/contacts">Contacts</Link></li>
                    <li><Link to="/reservations">Reservations</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </nav>
        </div>
    );
}