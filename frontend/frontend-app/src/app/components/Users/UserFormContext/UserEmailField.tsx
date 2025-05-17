import React from 'react';
import { useUserForm } from './UserFormContext';

/**
 * Input field for the user's email
 */
export const UserEmailField: React.FC = () => {
    const { formData, errors, updateField } = useUserForm();
    return (
        <div>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => updateField('email', e.target.value)}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
    );
};