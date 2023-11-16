import styles from './Button.module.css';
import FONT from '../../constants/fonts';

interface ITextButton {
  children: string;
  onClick?: () => void;
}

const TextButton = ({ children, onClick }: ITextButton) => {
  return (
    <div className={styles.buttonContainer} style={FONT.BODY1} onClick={onClick}>
      {children}
    </div>
  );
};

export default TextButton;
