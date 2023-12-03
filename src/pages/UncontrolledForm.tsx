import { useRef, useState } from 'react';
import styles from '../styles/form.module.css';
import { schema } from '../utils/yup';
import { FormFieldKeys, IUncontrolledForm } from '../types/types';
import { ValidationError } from 'yup';
import { convertImage } from '../utils/utils';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setData, setLastElement } from '../store/reducers/dataSlice';
import { useNavigate } from 'react-router-dom';
import PasswordStrength, {
  getPasswordStrength,
} from '../components/PasswordStrength';
import GenderRadioGroup from '../components/UncontrolledForm/GenderRadioGroup';
import CountriesAutoComplete from '../components/Countries';
import SubmitBtn from '../components/UncontrolledForm/SubmitBtn';

const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const actualData = useAppSelector((store) => store.data);

  const [errors, setErrors] = useState<IUncontrolledForm>({});
  const [ShowImage, setShowImage] = useState<string>('');
  const [imageObject, setImageObject] = useState<File>();
  const [passwordStrengthValue, setPasswordStrengthValue] = useState<number>(0);
  const dispatch = useAppDispatch();

  async function validateData(data: IUncontrolledForm) {
    try {
      await schema.validateSync(data, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (typeof err.path === 'string') {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
          return false;
        }
      }
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] instanceof File) {
      const file = event.target.files[0];
      setShowImage(URL.createObjectURL(file));
      setImageObject(file);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('password');
    const value = getPasswordStrength(event.target.value);
    setPasswordStrengthValue(value);
  };

  const handleInputChange = (fieldName: FormFieldKeys) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: IUncontrolledForm = {
      accept: acceptRef.current?.checked,
      age: Number(ageRef.current?.value),
      confirmPassword: confirmPasswordRef.current?.value,
      country: countryRef.current?.value,
      email: emailRef.current?.value,
      gender: maleRef.current?.checked
        ? 'male'
        : femaleRef.current?.checked
        ? 'female'
        : undefined,
      name: nameRef.current?.value,
      password: passwordRef.current?.value,
      picture: imageObject,
    };
    const isValidate = await validateData(data);
    if (isValidate && data.picture) {
      const base64Image = await convertImage(data.picture);
      const newData = { ...data, picture: base64Image };
      const newArrData = [newData, ...actualData];
      dispatch(setData(newArrData));
      dispatch(
        setLastElement({ boxShadow: '0 0 20px 10px rgba(34, 255, 0, 0.3)' })
      );
      navigate('/');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Uncontrolled Form</h1>
      <h2>Lets sign you in.</h2>

      <div className={styles.inputsBlock}>
        <div className={styles.inputBlock}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.textInput}
            id="name"
            ref={nameRef}
            onChange={() => handleInputChange('name')}
          />
          {errors.name && (
            <p className={`${styles.errorMessage} ${styles.show}`}>
              {errors['name']}
            </p>
          )}
        </div>
        <div className={styles.inputBlock}>
          <label className={styles.label} htmlFor="age">
            Age
          </label>
          <input
            className={styles.textInput}
            id="age"
            type="number"
            ref={ageRef}
            onChange={() => handleInputChange('age')}
          />
          {errors.age && (
            <p className={`${styles.errorMessage} ${styles.show}`}>
              {errors['age']}
            </p>
          )}
        </div>
        <GenderRadioGroup
          maleRef={maleRef}
          femaleRef={femaleRef}
          error={errors.gender}
          setErrors={setErrors}
        />
        <div className={styles.inputBlock}>
          <label className={styles.label} htmlFor="country">
            Country
          </label>
          <div>
            <input
              className={styles.textInput}
              list="countries"
              name="country"
              id="country"
              ref={countryRef}
              onChange={() => handleInputChange('country')}
            />
            <CountriesAutoComplete />
          </div>
          {errors.country && (
            <p className={`${styles.errorMessage} ${styles.show}`}>
              {errors['country']}
            </p>
          )}
        </div>
        <div className={styles.inputBlock}>
          <label className={styles.label} htmlFor="picture">
            Picture
          </label>
          <input
            id="picture"
            type="file"
            ref={imageRef}
            onChange={(e) => {
              handleFileChange(e);
              handleInputChange('picture');
            }}
          />
          {ShowImage && (
            <img className={styles.fileImage} src={ShowImage} alt="Preview" />
          )}
          {errors.picture && typeof errors.picture === 'string' && (
            <p className={`${styles.errorMessage}`}>{errors.picture}</p>
          )}
        </div>
        <div className={styles.inputBlock}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.textInput}
            id="email"
            ref={emailRef}
            onChange={() => handleInputChange('email')}
          />
          {errors.email && (
            <p className={`${styles.errorMessage} ${styles.show}`}>
              {errors['email']}
            </p>
          )}
        </div>
        <div className={`${styles.inputBlock} ${styles.passwordBlock}`}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.textInput}
            id="password"
            ref={passwordRef}
            onChange={(e) => handlePasswordChange(e)}
          />
          {errors.password && (
            <p className={`${styles.errorMessage} ${styles.show}`}>
              {errors['password']}
            </p>
          )}
          <PasswordStrength strength={passwordStrengthValue} />
        </div>
        <div className={styles.inputBlock}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            className={styles.textInput}
            id="confirmPassword"
            ref={confirmPasswordRef}
            onChange={() => handleInputChange('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className={`${styles.errorMessage} ${styles.show}`}>
              {errors['confirmPassword']}
            </p>
          )}
        </div>
      </div>
      <div className={styles.inputBlock}>
        <label className={styles.checkboxLabel} htmlFor="accept">
          I agree to the Terms of Service
        </label>
        <input
          id="accept"
          type="checkbox"
          ref={acceptRef}
          onChange={() => handleInputChange('accept')}
        />
        {errors.accept && (
          <p className={`${styles.errorMessage} ${styles.show}`}>
            {errors['accept']}
          </p>
        )}
      </div>
      <SubmitBtn />
    </form>
  );
};

export default UncontrolledForm;
