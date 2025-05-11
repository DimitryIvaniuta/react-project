import React, { useReducer } from 'react';

type CounterState = {
    count: number;
};

type CounterAction =
    | { type: 'increment', payload: CounterState }
    | { type: 'decrement', payload: CounterState }
    | { type: 'reset', payload: CounterState };

const reducer = (state: CounterState, action: CounterAction): CounterState => {
    switch (action.type) {
        case 'increment':
            return {
                count: state.count + 1,
            }
        case 'decrement':
            return {
                count: state.count - 1,
            }
        case 'reset':
            return {
                count: 0,
            }
        default:
            return state;

    }
}
type CounterProps = {
    counterType: string;
}
export const Counter: React.FC<CounterProps> = (props) => {
    const [counterState, dispatch] = useReducer(reducer, {count: 0})

    return (
        <div>
            <button onClick={()=>dispatch({type:'increment', payload: {count:0}})}>+</button>
            <span>{counterState.count}</span>
            <button onClick={()=>dispatch({type:'decrement', payload: {count:0}})}>-</button>
            <button onClick={()=>dispatch({type:'reset', payload: {count:0}})}>Reset</button>
        </div>
    );
}