import React, { useState, useCallback } from 'react';
import CounterIncrementComponent from "./CounterIncrementComponent";

const CallbackComponent = () => {
    const [count, setCount] = useState(0);

    // Memoize the increment callback to prevent unnecessary re-renders of ChildComponent.
    const handleIncrement = useCallback(() => {
        setCount(prevCount => prevCount + 1);
    }, []); // Dependencies are empty because setCount is stable.

    return (
        <div>
            <h1>Count: {count}</h1>
            <CounterIncrementComponent onIncrement={handleIncrement} />
        </div>
    );
};

export default CallbackComponent;
