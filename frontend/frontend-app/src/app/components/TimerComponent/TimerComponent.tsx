import React, { useState, useEffect } from 'react';

const TimerComponent = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        // Set up an interval to update the seconds state every 1 second.
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts.
        return () => {
            clearInterval(intervalId);
            console.log('TimerComponent unmounted, interval cleared.');
        };
    }, []); // The empty dependency array ensures the effect runs only once after mounting.

    return (
        <div>
            <h2>Timer: {seconds} seconds</h2>
        </div>
    );
};

export default TimerComponent;
