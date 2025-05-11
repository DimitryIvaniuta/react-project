import React, { useState, useEffect, useCallback } from 'react';

/**
 * Shape of a single component record returned by the API.
 */
interface ComponentRecord {
    id: number;
    name: string;
}

/**
 * Props for FetchComponent. Currently none, but kept for future extensibility.
 */
interface FetchComponentProps {}

/**
 * A React functional component that fetches and displays a list of components.
 * Utilizes strict TypeScript typing, React hooks, and professional patterns for
 * data fetching and state management.
 */
const FetchComponent: React.FC<FetchComponentProps> = () => {
    /**
     * State: holds the array of fetched ComponentRecords.
     */
    const [data, setData] = useState<ComponentRecord[]>([]);

    /**
     * State: toggles to trigger refetch when updated.
     */
    const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);

    /**
     * fetchData: An async function to retrieve data from the API.
     * Wrapped in useCallback to avoid redefining on every render.
     */
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('/api/fetchComponents');
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            // Expecting the API to return an array of ComponentRecord
            const result: ComponentRecord[] = await response.json();
            setData(result); // Replace state with the latest data
        } catch (error) {
            // TODO: Integrate with a proper logging or error boundary
            console.error('Failed to fetch data:', error);
        }
    }, []);

    /**
     * Effect: runs on mount and whenever `fetchData` or `shouldRefetch` changes.
     * This pattern allows explicit control over when to re-run the fetch logic.
     */
    useEffect(() => {
        fetchData();
    }, [fetchData, shouldRefetch]);

    /**
     * Toggles the `shouldRefetch` state to trigger the effect above.
     */
    const handleRefetch = useCallback(() => {
        setShouldRefetch((prev) => !prev);
    }, []);

    return (
        <div>
            {/* Render a message if no data is available */}
            {data.length > 0 ? (
                data.map((item) => (
                    <div key={item.id.toString()}>
                        <div>#{item.id}</div>
                        <div>{item.name}</div>
                    </div>
                ))
            ) : (
                <p>No data available.</p>
            )}

            {/* Button to manually trigger a data refetch */}
            <button type="button" onClick={handleRefetch}>
                Re-Fetch Data
            </button>
        </div>
    );
};

export default FetchComponent;
