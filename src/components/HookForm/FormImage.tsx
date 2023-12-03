import styles from '../../styles/form.module.css';
interface FormImageProps {
  imagePreview: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormImage = ({ imagePreview, handleFileChange }: FormImageProps) => {
  return (
    <>
      <label className={styles.label} htmlFor="picture">
        Picture
      </label>
      <input
        id="picture"
        type="file"
        onChange={(e) => {
          handleFileChange(e);
        }}
      />
      {imagePreview && (
        <img className={styles.fileImage} src={imagePreview} alt="Preview" />
      )}
    </>
  );
};

export default FormImage;
