import styles from '../../styles/form.module.css';

const Password = ({
  handlePasswordChange,
}: {
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <input
        className={styles.textInput}
        id="password"
        onChange={(e) => {
          handlePasswordChange(e);
        }}
      />
    </>
  );
};
export default Password;
