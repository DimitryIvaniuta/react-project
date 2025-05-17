import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Options for usePolling hook
 */
export interface PollingOptions {
    /** Polling interval in milliseconds */
    interval?: number;
    /** Execute fetch immediately on mount */
    immediate?: boolean;
    /** Callback for handling errors */
    onError?: (error: Error) => void;
}

/**
 * Result of usePolling hook
 */
export interface PollingResult<T> {
    /** Last fetched data or null */
    data: T | null;
    /** Loading state */
    loading: boolean;
    /** Last error or null */
    error: Error | null;
    /** Whether polling is currently active */
    isPolling: boolean;
    /** Manually start polling */
    start: () => void;
    /** Manually stop polling */
    stop: () => void;
    /** Manual one-off refetch */
    refetch: () => void;
}

/**
 * Custom hook to poll an async service at a given interval.
 * Automatically handles start/stop on mount/unmount and provides controls.
 *
 * @param service     Async function returning data of type T
 * @param options     Polling configuration options
 * @returns PollingResult<T>
 */
export const usePolling = <T>(
    service: () => Promise<T>,
    options: PollingOptions = {}
): PollingResult<T> => {
    const { interval = 5000, immediate = true, onError } = options;

    // State for data, loading, error, and polling status
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [isPolling, setIsPolling] = useState<boolean>(false);

    // Refs for cleanup
    const timerRef = useRef<number | null>(null);
    const mountedRef = useRef<boolean>(false);

    // Fetch logic wrapped in useCallback for stable reference
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await service();
            if (mountedRef.current) {
                setData(result);
                setError(null);
            }
        } catch (err) {
            if (mountedRef.current) {
                const errorObj = err as Error;
                setError(errorObj);
                onError?.(errorObj);
            }
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    }, [service, onError]);

    // Start polling: initial fetch and set interval
    const start = useCallback(() => {
        if (timerRef.current !== null) return;
        if (immediate) fetchData();
        setIsPolling(true);
        timerRef.current = window.setInterval(fetchData, interval);
    }, [fetchData, interval, immediate]);

    // Stop polling: clear interval
    const stop = useCallback(() => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setIsPolling(false);
        }
    }, []);

    // Manual one-off fetch
    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    // Auto-start on mount, cleanup on unmount
    useEffect(() => {
        mountedRef.current = true;
        start();
        return () => {
            mountedRef.current = false;
            stop();
        };
    }, [start, stop]);

    return { data, loading, error, isPolling, start, stop, refetch };
};
