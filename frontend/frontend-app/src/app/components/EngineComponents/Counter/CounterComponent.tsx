import React, { memo, useCallback, useReducer } from 'react';

// Discrete action identifiers (safer than raw strings)
enum CounterActionType {
    Increment = 'increment',
    Decrement = 'decrement',
    Reset     = 'reset',
}

// Union describing every possible action object
type CounterAction =
    | { type: CounterActionType.Increment }
    | { type: CounterActionType.Decrement }
    | { type: CounterActionType.Reset; payload?: number };

type CounterState = { count: number };

const initialState: CounterState = { count: 0 };

const counterReducer = (
    state: CounterState,
    action: CounterAction,
): CounterState => {
    switch (action.type) {
        case CounterActionType.Increment:
            return { count: state.count + 1 };

        case CounterActionType.Decrement:
            return { count: state.count - 1 };

        case CounterActionType.Reset:
            // Optional payload lets the caller set a custom reset value
            return { count: action.payload ?? initialState.count };

        /* eslint-disable @typescript-eslint/no-fallthrough */
        default: {
            /* Exhaustiveness check */
            const never: never = action;
            return state;
        }
    }
};

const Counter: React.FC = memo(() => {
    const [state, dispatch] = useReducer(counterReducer, initialState);

    /* Optional wrappers: memoised so they’re stable when passed down */
    const inc   = useCallback(
        () => dispatch({ type: CounterActionType.Increment }),
        [],
    );
    const dec   = useCallback(
        () => dispatch({ type: CounterActionType.Decrement }),
        [],
    );
    const reset = useCallback(
        () => dispatch({ type: CounterActionType.Reset }),
        [],
    );

    return (
        <div>
            <button onClick={dec}>–</button>
            <span style={{ margin: '0 0.5rem' }}>{state.count}</span>
            <button onClick={inc}>+</button>
            <button onClick={reset} style={{ marginLeft: '1rem' }}>
                Reset
            </button>
        </div>
    );
});

export default Counter;
