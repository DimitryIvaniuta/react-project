import React, { useState, useEffect } from 'react';

/**
 * Primitive alias for semantic clarity
 */
type UserID = string;

/**
 * Shared timestamps trait for models
 */
interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Core domain model for a user profile
 */
export interface UserProfile extends Timestamps {
    id: UserID;
    name: string;
    email: string;
    bio?: string;
}

/**
 * Readonly version of UserProfile, useful for display-only contexts
 */
type ReadonlyUserProfile = Readonly<UserProfile>;

/**
 * Editable partial version for forms (e.g., update profile)
 */
type EditableUserProfile = Partial<UserProfile>;

/**
 * Lightweight preview of UserProfile for listing
 */
type UserProfilePreview = Pick<UserProfile, 'id' | 'name' | 'email'>;

/**
 * Extend profile with UI-specific metadata
 */
type UserWithMetadata = UserProfile & { isActive: boolean };

/**
 * API success vs. error response discriminated union
 */
type SuccessResponse = { status: 'success'; data: UserProfile[] };
type ErrorResponse   = { status: 'error'; message: string };
type ApiResponse     = SuccessResponse | ErrorResponse;

/**
 * Generic fetcher function signature
 */
type Fetcher<T> = (url: string) => Promise<T>;

/**
 * Built-in utility: Record mapping UserID to profile
 */
type UserDictionary = Record<UserID, ReadonlyUserProfile>;

const getUserDectionary
    = (usersArray: ReadonlyUserProfile[]) => {
    const usersArrayMap = usersArray.reduce<UserDictionary>(
        (acc, u) => {
            acc[u.id] = u;
            return acc;
        }, {});

}

/**
 * Component: fetches and displays user profiles
 */
const UserProfiles: React.FC = () => {
    /**
     * Type guard: narrows ApiResponse to SuccessResponse
     */
    const isSuccessResponse = (resp: ApiResponse): resp is SuccessResponse =>
        resp.status === 'success';

    /**
     * State: holds API response union type
     */
    const [response, setResponse] = useState<ApiResponse | null>(null);

    /**
     * State: dictionary for quick lookup by ID
     */
    const [profilesById, setProfilesById] = useState<UserDictionary>({});

    /**
     * Concrete fetcher matching our Fetcher<T> signature
     */
    const fetchJson: Fetcher<ApiResponse> = async (url) => {
        const res = await fetch(url);
        return (await res.json()) as ApiResponse;
    };

    /**
     * On mount, fetch profiles
     */
    useEffect(() => {
        const loadProfiles = async () => {
            try {
                const result = await fetchJson('/api/users');
                setResponse(result);

                if (isSuccessResponse(result)) {
                    // Build dictionary using built-in Record type
                    const map: UserDictionary = result.data.reduce((acc, user) => {
                            acc[user.id] = user;
                            return acc;
                        }, {} as UserDictionary
                    );
                    setProfilesById(map);
                }
            } catch {
                setResponse({ status: 'error', message: 'Network error' });
            }
        };
        loadProfiles();
    }, []);

    // Render loading state
    if (!response) {
        return <p>Loading...</p>;
    }

    // Render error state, narrowing via type guard
    if (!isSuccessResponse(response)) {
        return <p>Error: {response.message}</p>;
    }

    // Now `response` is narrowed to SuccessResponse
    const { data } = response;

    // Create preview list from fetched data
    const previews: UserProfilePreview[] = data.map(({ id, name, email }) => ({ id, name, email }));

    return (
        <div>
            <h2>User Profiles</h2>
            <ul>
                {previews.map((user) => (
                    <li key={user.id}>
                        <strong>{user.name}</strong> ({user.email})
                    </li>
                ))}
            </ul>

            <h3>Profile Dictionary</h3>
            {Object.values(profilesById).map((user) => (
                <div key={user.id}>
                    <p>
                        ID: {user.id} — Name: {user.name} — Created:{' '}
                        {user.createdAt.toLocaleDateString()}
                    </p>
                </div>
            ))

            }
        </div>
    );
};

export default UserProfiles;
