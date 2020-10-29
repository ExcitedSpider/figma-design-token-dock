import * as React from 'react';
import { StyleDisplay } from '@/type';
import tinyColor from 'tinycolor2';
import effectIcon from 'ui/assets/effect-icon.svg';
import fontIcon from 'ui/assets/font-icon.svg';

import styles from './style-item.module.css';

const typeDescMapping = {
  PAINT: '颜色样式',
  TEXT: '文字样式',
  EFFECT: '效果样式',
};

export const StyleItem: React.FC<StyleDisplay> = prop => {
  const { icon, name, type } = prop;

  const Icon = () => {
    if (typeof icon === 'string') {
      const src = icon === 'effect_icon' ? effectIcon : fontIcon;
      return <img width={16} height={16} className={styles['style-item__icon']} src={src}></img>;
    }
    return (
      <div
        className={styles['style-item__icon']}
        style={{ backgroundColor: tinyColor.fromRatio(icon).toRgbString() }}
      ></div>
    );
  };

  return (
    <div className={styles['style-item']}>
      <Icon></Icon>
      <div>{name}</div>
      <div>{typeDescMapping[type]}</div>
    </div>
  );
};
