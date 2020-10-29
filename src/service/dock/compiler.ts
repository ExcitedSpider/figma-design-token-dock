import tinycolor from 'tinycolor2';
import { camelCase } from 'lodash';

/** 从 2d 变换矩阵提取角度 */
const getAngleFromMatrix = (matrix: [[number, number, number], [number, number, number]]) => {
  const scaleAlpha = 1 / Math.sqrt(matrix[0][1] ** 2 + matrix[1][1] ** 2);
  const sin = matrix[0][1] / scaleAlpha;
  const radians = Math.asin(sin);
  const deg = (radians * 180) / Math.PI;

  /** 屏幕坐标系到 css y axis */
  return Math.round(deg + 90);
};

const calcColorString = (paint: Paint) => {
  console.log(paint);
  if (paint.type === 'SOLID') {
    return tinycolor.fromRatio({ ...paint.color, a: paint.opacity }).toRgbString();
  }
  if (paint.type === 'GRADIENT_LINEAR') {
    const { gradientTransform, gradientStops } = paint;
    const angle = getAngleFromMatrix(gradientTransform);
    return `linear-gradient(${angle}deg, ${tinycolor
      .fromRatio({ ...gradientStops[0].color, a: (gradientStops[0] as any)?.opacity })
      .toRgbString()} 0%, ${tinycolor
      .fromRatio({ ...gradientStops[1].color, a: (gradientStops[1] as any)?.opacity })
      .toRgbString()} 100%)`;
  }
  /** TODO: 其他类型 */
  return null;
};

export const paintToCSS = (style: PaintStyle) => {
  const paintStyle = style as PaintStyle;
  if (paintStyle.paints.length > 1) {
    // TODO 目前仅支持导出第一个样式
    console.warn(
      `Paint Style ${paintStyle.name} has more than one paint. Plugin only export the first one.`,
    );
  }
  const [paint] = paintStyle.paints;

  const cssString = calcColorString(paint);
  if (paint) {
    return {
      [camelCase(style.name)]: cssString,
    };
  }

  return {};
};

/** https://docs.microsoft.com/en-us/typography/opentype/spec/os2#usweightclass */
const fontWeightMapping = {
  Thin: 100,
  Hairline: 100,
  Ultralight: 200,
  Extralight: 200,
  Light: 300,
  Normal: 400,
  Regular: 400,
  Medium: 500,
  Semibold: 600,
  Demibold: 600,
  Bold: 700,
  Extrabold: 800,
  Ultrabold: 800,
  Black: 900,
  Heavy: 900,
  Extrablack: 950,
  Ultrablack: 950,
};

export const textStyleToCSS = (style: TextStyle) => {
  const { fontName, fontSize, lineHeight, name } = style;

  /** 不取 font-family，在 designToken 中没有意义 */
  // const fontFamily = fontName.family;

  const fontWeight = fontWeightMapping[fontName.style];

  let cssLintHeight;

  if (lineHeight.unit === 'AUTO') {
    cssLintHeight = 'auto';
  } else if (lineHeight.unit === 'PERCENT') {
    cssLintHeight = lineHeight.value;
  } else if (lineHeight.unit === 'PIXELS') {
    cssLintHeight = `${lineHeight.value}px`;
  }

  return {
    // [`${name}FontFamily`]: fontName.family,
    [camelCase(`${name}Weight`)]: fontWeight,
    [camelCase(`${name}Size`)]: `${fontSize}px`,
    [camelCase(`${name}LineHeight`)]: cssLintHeight,
  };
};

const calcEffectString = (effect: Effect) => {
  if (effect.type === 'DROP_SHADOW') {
    const { offset, radius, spread, color } = effect as any;
    return `drop-shadow(${offset.x}px,${offset.y}px,${radius}px,${spread}px,${tinycolor
      .fromRatio(color)
      .toRgbString()})`;
  }
  if (effect.type === 'INNER_SHADOW') {
    const { offset, radius, spread, color } = effect as any;
    return `inset ${offset.x}px ${offset.y}px ${radius}px ${spread}px ${tinycolor
      .fromRatio(color)
      .toRgbString()}`;
  }
};

export const effectStyleToCSS = (style: EffectStyle) => {
  if (style.effects.length > 1) {
    // TODO 目前仅支持导出第一个
    console.warn(
      `Paint Style ${style.name} has more than one effect. Plugin only export the first one.`,
    );
  }

  const [effect] = style.effects;

  const effectString = calcEffectString(effect);
  if (effectString) {
    return {
      [camelCase(style.name)]: effectString,
    };
  }
};
