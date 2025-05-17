import React from 'react';
import { useUserForm } from './UserFormContext';

/**
 * Input field for the user's name
 */
export const UserNameField: React.FC = () => {
    const { formData, errors, updateField } = useUserForm();
    return (
        <div>
            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                value={formData.name}
                onChange={e => updateField('name', e.target.value)}
            />
            {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
    );
};