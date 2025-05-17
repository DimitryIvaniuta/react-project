import React, { useCallback } from 'react';
import { usePolling, PollingOptions } from './usePolling';
import styles from './PollingComponent.module.scss';

interface CountResponse {
    count: number;
}

export const PollingComponent: React.FC = () => {
    // strictly-typed service
    const service = useCallback(async (): Promise<number> => {
        const res = await fetch('/api/user/count');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json: CountResponse = await res.json();
        return json.count;
    }, []);

    const {
        data: userCount,
        loading,
        error,
        isPolling,
        start,
        stop,
        refetch,
    } = usePolling<number>(service, {
        interval: 10000,
        immediate: true,
        onError: (err) => console.error('Polling error:', err),
    });

    return (
        <div className={styles.container}>
            <h3 className={styles.header}>User Count (polled every 10s)</h3>

            {loading && <p className={styles.loading}>Loading...</p>}
            {error && <p className={styles.error}>Error: {error.message}</p>}
            {userCount !== null && <p>Total users: {userCount}</p>}

            <div className={styles.buttons}>
                <button onClick={start} disabled={isPolling}>
                    Start Polling
                </button>
                <button onClick={stop} disabled={!isPolling}>
                    Stop Polling
                </button>
                <button onClick={refetch} disabled={loading}>
                    Refetch Now
                </button>
            </div>

            <div className={styles.status}>
                <div>Polling active: {isPolling ? 'Yes' : 'No'}</div>
            </div>
        </div>
    );
};
