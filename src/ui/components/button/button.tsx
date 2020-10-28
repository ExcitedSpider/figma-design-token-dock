import * as React from 'react';
import styles from './button.module.css';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  theme?: 'primary' | 'normal' | 'warn';
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const className = `${props.className} ${styles['f-button']} ${
    props.theme ? styles[props.theme] : ''
  }`;

  return <button {...props} className={className}></button>;
};
