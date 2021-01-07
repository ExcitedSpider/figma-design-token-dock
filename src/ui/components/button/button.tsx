import * as React from 'react';
import styles from './button.module.scss';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  theme?: 'primary' | 'normal' | 'warn';
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { theme, loading, disabled, ...restProps } = props;
  const className = `${props.className} ${styles['f-button']} ${theme ? styles[theme] : ''} ${
    loading ? styles['f-button--loading'] : ''
  } ${disabled || loading ? styles['f-button--disabled'] : ''}`;

  return <button {...restProps} disabled={disabled} className={className}></button>;
};
