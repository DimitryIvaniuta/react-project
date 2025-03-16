import React from 'react';

interface ChildComponentProps {
    onIncrement: () => void;
}

const CounterIncrementComponent: React.FC<ChildComponentProps> = React.memo(
    ({ onIncrement }: ChildComponentProps) => {
    console.log('ChildComponent rendered');
    return (
        <button onClick={onIncrement}>
            Increment Counter
        </button>
    );
});

export default CounterIncrementComponent;