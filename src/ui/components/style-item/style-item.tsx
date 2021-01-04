import * as React from 'react';
import { StyleDisplay } from '@/type';
import tinyColor from 'tinycolor2';
import effectIcon from 'ui/assets/effect-icon.svg';
import fontIcon from 'ui/assets/font-icon.svg';
import gradientIcon from 'ui/assets/gradient-icon.svg';

import styles from './style-item.module.css';

const typeDescMapping = {
  PAINT: 'Color Style',
  TEXT: 'Text Style',
  EFFECT: 'Effect Style',
};

const iconMapping = {
  effect_icon: effectIcon,
  text_icon: fontIcon,
  gradient_icon: gradientIcon,
};

export const StyleItem: React.FC<StyleDisplay> = (prop) => {
  const { icon, name, type } = prop;

  const Icon = () => {
    if (typeof icon === 'string') {
      const src = iconMapping[icon];

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
