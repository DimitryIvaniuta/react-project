import React, {
    useEffect,
    useState,
    useCallback, ErrorInfo,

} from 'react'

interface ComponentRecord {
    id: number;
    name: string;
}

interface FetchComponentProps {
    userName: string;
}

const FetchComponent: React.FC<FetchComponentProps> = ({userName}) => {

    const [data, setData] = useState<ComponentRecord[]>([]);

    const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);

    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(
        async () => {
            try {
                const response = await fetch('/api/users')
                if (!response.ok) {
                    setError(new Error(`Fetch error: ${userName}`));
                    return;
                }
                const responseData = await response.json()
                setData(responseData);
            } catch (e) {
                setError(e as Error);
            }
        }, [userName]
    );

    useEffect(() => {
        setError(null);
        fetchData();
    }, [fetchData, shouldRefetch]);

    const doRefetch = useCallback(() => {
        setShouldRefetch((prev) => !prev)
    }, []);

    if (error) {
        throw error;
    }

    return (
        <div>
            {data && data.length > 0 ? (
                    data.map(item => (
                        <div key={item.id}>
                            <div>#{item.id}</div>
                            <div>{item.name}</div>
                        </div>
                    ))
                )
                :
                (
                    <p>Loading...</p>
                )}
            <button onClick={doRefetch} >Re-fetch</button>
        </div>
    );
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class FetchErrorBoundary extends React.Component<
    ErrorBoundaryProps, ErrorBoundaryState
> {
    state: ErrorBoundaryState = {
        hasError: false
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {hasError: true};
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error);
    }

    render() {
        if(this.state.hasError) {
            return <div>Error!</div>
        } else {
            return this.props.children;
        }
    }
}

const WrapperFetchComponent:React.FC<FetchComponentProps> = (props) => (
    <FetchErrorBoundary>
        <FetchComponent {...props} />
    </FetchErrorBoundary>
)

export default WrapperFetchComponent;