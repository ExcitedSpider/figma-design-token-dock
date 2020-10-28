import * as React from 'react';
import styles from './index.module.css';

export const Main = (prop: {}) => {
  console.log(styles);
  return (
    <div>
      <div className={styles.title}>欢迎使用 token dock</div>
      <button className="button-primary">你好</button>
    </div>
  );
};
