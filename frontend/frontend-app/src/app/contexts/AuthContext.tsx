import React, {
    createContext,
    useContext,
    useCallback,
    useState,
    ReactNode,
} from 'react';

export interface User {
    id: number;
    username: string;
    role: 'admin' | 'editor' | 'viewer';
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}
 type AuthProviderProps = {
     /** Prehydrated user profile from SSR (optional). */
    initialUser?: User | null;
    children: React.ReactNode;
 }
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider:
 *  Exchanges incoming JWT for minimal profile via POST /api/auth/validate.
 *  Backend validates signature & expiration, sets a http‑only cookie.
 *  Secure logout clears cookie via /api/auth/logout.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({initialUser = null, children}) => {
    const [user, setUser] = useState<User | null>(null);

    const login = useCallback(
        async (jwt: string) => {
            const response = await fetch('/api/auth/validate',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    credentials: 'include',
                    body: JSON.stringify(jwt),
                },
            );
            if (!response.ok) {
                throw new Error('Authenrication failed.');
            }
            const profile: User = await response.json();
            setUser(profile);
        }, []);

    const logout = useCallback(
        async () => {
            await fetch('/api/auth/logout',
                {
                    method: 'POST',
                    credentials: 'include',
                });
            setUser(null);
        }, []);

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if(!ctx) {
        throw new Error("useAuth must be used within the AuthProvider");
    }
    return ctx;
}