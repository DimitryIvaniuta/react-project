import React from 'react';
import { UserFormProvider, useUserForm, UserFormData } from './UserFormContext';
import {UserNameField} from "./UserNameField";
import {UserEmailField} from "./UserEmailField";
import {UserRoleField} from "./UserRoleField";

function SubmitButton() {
    return null;
}

/**
 * Page component for editing a user
 */
export const EditUserPage: React.FC<{
    user: UserFormData;
    onSave: (data: UserFormData) => Promise<void>;
}> = ({ user, onSave }) => {
    return (
        <UserFormProvider initialData={user} onSubmit={onSave}>
            <h1>Edit User</h1>
            <UserNameField />
            <UserEmailField />
            <UserRoleField />
            <SubmitButton />
        </UserFormProvider>
    );
};

