import React from 'react';
import { useUserForm } from './UserFormContext';

/**
 * Button to submit the form
 */
export const SubmitButton: React.FC = () => {
  const { submitForm } = useUserForm();
  return (
    <button type="button" onClick={submitForm}>
      Save Changes
    </button>
  );
};
