import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
    FormEvent,
} from 'react';

/**
 * Shape of the user data in the form
 */
export interface UserFormData {
    id: number;
    name: string;
    email: string;
    role: string;
}

/**
 * Validation errors keyed by form field
 */
export type UserFormErrors = Partial<Pick<UserFormData, 'name' | 'email' | 'role'>>;

/**
 * Context value interface
 */
interface UserFormContextType {
    formData: UserFormData;
    errors: UserFormErrors;
    updateField: <K extends keyof Omit<UserFormData, 'id'>>(field: K, value: UserFormData[K]) => void;
    submitForm: () => Promise<void>;
}

/**
 * Create context with undefined default to enforce usage within Provider
 */
const UserFormContext = createContext<UserFormContextType | undefined>(undefined);

/**
 * Custom hook for consuming the UserFormContext
 */
export const useUserForm = (): UserFormContextType => {
    const context = useContext(UserFormContext);
    if (!context) {
        throw new Error('useUserForm must be used within a UserFormProvider');
    }
    return context;
};

/**
 * Props for the Provider: initial data and submit handler
 */
interface UserFormProviderProps {
    initialData: UserFormData;
    onSubmit: (data: UserFormData) => Promise<void>;
    children: ReactNode;
}

/**
 * Provider component that encapsulates form state & logic
 */
export const UserFormProvider: React.FC<UserFormProviderProps> = ({
                                                                      initialData,
                                                                      onSubmit,
                                                                      children,
                                                                  }) => {
    const [formData, setFormData] = useState<UserFormData>(initialData);
    const [errors, setErrors] = useState<UserFormErrors>({});

    /**
     * Update a single field and clear its error
     */
    const
        updateField = useCallback(
            <K extends keyof Omit<UserFormData, 'id'>>(field: K, value: UserFormData[K]) => {
                setFormData(prev => ({ ...prev, [field]: value }));
                setErrors(prev => ({ ...prev, [field]: undefined }));
            },
            []
        );

    /**
     * Validate all fields, set errors, and return validity
     */
    const validate = useCallback((): boolean => {
        const newErrors: UserFormErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.role.trim()) newErrors.role = 'Role is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    /**
     * Submit handler: validate then call onSubmit
     */
    const submitForm = useCallback(async () => {
        if (!validate()) return;
        await onSubmit(formData);
    }, [formData, onSubmit, validate]);

    const value: UserFormContextType = {
        formData,
        errors,
        updateField,
        submitForm,
    };

    return <UserFormContext.Provider value={value}>{children}</UserFormContext.Provider>;
};