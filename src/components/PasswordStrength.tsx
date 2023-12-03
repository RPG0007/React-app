import styles from '../styles/passwordStrength.module.css';

const PasswordStrength = ({ strength }: { strength: number }) => {
  const getColor = () => {
    switch (strength) {
      case 1:
        return 'red';
      case 2:
        return 'orange';
      case 3:
        return 'yellow';
      case 4:
        return 'green';
      default:
        return 'transparent';
    }
  };

  const getIndicatorText = () => {
    switch (strength) {
      case 1:
        return 'Weak';
      case 2:
        return 'Moderate';
      case 3:
        return 'Strong';
      case 4:
        return 'Very Strong';
      default:
        return '';
    }
  };

  return (
    <div className={styles.passwordStrengthMeter}>
      <div
        className={styles.strengthIndicator}
        style={{ width: `${(strength / 4) * 100}%`, background: getColor() }}
      ></div>
      <div className={styles.strengthText}>{getIndicatorText()}</div>
    </div>
  );
};

export default PasswordStrength;

export const getPasswordStrength = (password: string) => {
  let strength = 0;
  if (/[A-Z]/.test(password)) {
    strength += 1;
  }
  if (/[a-z]/.test(password)) {
    strength += 1;
  }
  if (/[0-9]/.test(password)) {
    strength += 1;
  }
  if (/[\W_]/.test(password)) {
    strength += 1;
  }

  return strength;
};
