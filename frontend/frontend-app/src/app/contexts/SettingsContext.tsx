import React, {
    createContext,
    useEffect,
    useState,
    useCallback,
    ReactNode, useContext,
} from 'react';

type Theme = 'dark' | 'light';

interface SettingsContextType {
    theme: Theme;
    pageSize: number;
    toggleTheme: () => void;
    changePageSize: (size: number) => void;
}

type SettingsProviderType = {
    children: React.ReactNode;
    initialTheme?: Theme;
    initialPageSize?: number;
}
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<SettingsProviderType> = ({
    children,
    initialTheme = 'light',
    initialPageSize = 20,
}) => {
    const [theme, setTheme] = useState<Theme>(initialTheme);
    const [pageSize, setPageSizeState] = useState<number>(initialPageSize);
    const toggleTheme = useCallback(() =>
            setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
        , []);
    const changePageSize = useCallback((size: number) =>
        setPageSizeState(size), []);
    return (
        <SettingsContext.Provider value={{theme, pageSize, toggleTheme, changePageSize}}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => {
    const ctx = useContext(SettingsContext);
    if(!ctx){
        throw new Error('useSettings() must be used within the context!');
    }
    return ctx;
}