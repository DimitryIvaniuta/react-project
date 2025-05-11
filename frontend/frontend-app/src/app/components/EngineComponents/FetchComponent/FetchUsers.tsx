import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  ErrorInfo,
} from 'react';

/**
 * Shape of a single component record returned by the API.
 */
interface ComponentRecord {
  id: number;
  name: string;
}

/**
 * Props for FetchUsers: expects a userName to filter fetch results by name.
 */
interface FetchUsersProps {
  /** User name to query components for */
  userName: string;
}

/**
 * Core fetch and render component. Fetches data filtered by `userName`.
 * Throws errors to be caught by an ErrorBoundary.
 */
const FetchUsers: React.FC<FetchUsersProps> = ({ userName }) => {
  /**
   * State: holds the fetched list of ComponentRecord items.
   */
  const [data, setData] = useState<ComponentRecord[]>([]);

  /**
   * State: toggles to trigger refetch when updated.
   */
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);

  /**
   * State: stores any fetch-related error to forward to ErrorBoundary.
   */
  const [error, setError] = useState<Error | null>(null);

  /**
   * Async fetch function, memoized via `useCallback`. Depends on `userName`.
   * Updates `data` state or `error` state based on response.
   */
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/fetch-users?userName=${encodeURIComponent(userName)}`
      );

      if (!response.ok) {
        // Record error and abort; do not throw to avoid catch/rethrow warning
        setError(new Error(`API error: ${response.status}`));
        return;
      }

      const result: ComponentRecord[] = await response.json();
      setData(result);
    } catch (err) {
      // Capture network or parsing errors
      setError(err as Error);
    }
  }, [userName]);

  /**
   * Effect: runs on mount and when `fetchData` or `shouldRefetch` toggles.
   * Clears previous errors before fetching.
   */
  useEffect(() => {
    setError(null);
    fetchData();
  }, [fetchData, shouldRefetch]);

  /**
   * Toggles `shouldRefetch` to manually re-run the effect above.
   */
  const handleRefetch = useCallback(() => {
    setShouldRefetch((prev) => !prev);
  }, []);

  // If an error occurred during fetch, throw it to be caught by ErrorBoundary
  if (error) {
    throw error;
  }

  return (
    <div>
      {data.length > 0 ? (
        data.map((item, i) => (
          <div key={item.id}>
            <div>#{item.id}</div>
            <div>{item.name}</div>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}

      <button type="button" onClick={handleRefetch}>
        Re-Fetch Data
      </button>
    </div>
  );
};

/**
 * Error boundary to catch errors thrown by FetchUsers.
 * Renders a fallback UI when an error is encountered.
 */
interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class FetchErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log error details for monitoring / debugging
    console.error('Error caught by FetchErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong while fetching data.</div>;
    }
    return this.props.children;
  }
}

/**
 * Wrapped component exports the FetchUsers inside the error boundary.
 * Ensures any errors are caught and handled gracefully.
 */
const WrappedFetchUsers: React.FC<FetchUsersProps> = (props) => (
  <FetchErrorBoundary>
    <FetchUsers {...props} />
  </FetchErrorBoundary>
);

export default WrappedFetchUsers;
