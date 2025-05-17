import React from 'react';
import { useUserForm } from './UserFormContext';

/**
 * Input field for the user's role
 */
export const UserRoleField: React.FC = () => {
    const { formData, errors, updateField } = useUserForm();
    return (
        <div>
            <label htmlFor="role">Role</label>
            <select
                id="role"
                value={formData.role}
                onChange={e => updateField('role', e.target.value)}
            >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
            </select>
            {errors.role && <span style={{ color: 'red' }}>{errors.role}</span>}
        </div>
    );
};
