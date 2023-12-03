import React from 'react';
import styles from '../../styles/form.module.css';
import { FormFieldKeys, IUncontrolledForm } from '../../types/types';

interface IGender {
  maleRef: React.RefObject<HTMLInputElement>;
  femaleRef: React.RefObject<HTMLInputElement>;
  error: 'male' | 'female' | undefined;
  setErrors: React.Dispatch<React.SetStateAction<IUncontrolledForm>>;
}

const GenderRadioGroup = ({
  maleRef,
  femaleRef,
  error,
  setErrors,
}: IGender) => {
  const handleInputChange = (fieldName: FormFieldKeys) => {
    setErrors((errors) => {
      const updatedErrors = { ...errors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  return (
    <div className={styles.inputBlock}>
      <p className={styles.label}>Gender:</p>
      <div className={styles.radioBlock}>
        <div className={styles.maleBlock}>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            ref={maleRef}
            onChange={() => handleInputChange('gender')}
          />
          <label className={styles.labelRadio} htmlFor="male">
            Male
          </label>
        </div>

        <div className={styles.maleBlock}>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            ref={femaleRef}
            onChange={() => handleInputChange('gender')}
          />
          <label className={styles.labelRadio} htmlFor="female">
            Female
          </label>
        </div>
      </div>
      {error && (
        <p className={`${styles.errorMessage} ${styles.show}`}>{error}</p>
      )}
    </div>
  );
};

export default GenderRadioGroup;
