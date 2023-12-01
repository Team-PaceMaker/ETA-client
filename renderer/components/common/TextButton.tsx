import { ForwardedRef, forwardRef } from 'react';
import styles from './Button.module.css';
import FONT from 'constants/fonts';

interface ITextButton {
  children: string;
  onClick?: () => void;
}

const TextButton = forwardRef((props: ITextButton, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={styles.buttonContainer} style={FONT.BODY1} onClick={props.onClick}>
      {props.children}
    </div>
  );
});

export default TextButton;
