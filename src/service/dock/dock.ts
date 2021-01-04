import { UserSetting } from '@/type';
import { paintToCSS, textStyleToCSS, effectStyleToCSS } from './compiler';

const getTokenObjByType = (style: BaseStyle, opt?: UserSetting) => {
  if (style.type === 'PAINT') {
    return paintToCSS(style as PaintStyle, opt);
  }
  if (style.type === 'TEXT') {
    return textStyleToCSS(style as TextStyle, opt);
  }
  if (style.type === 'EFFECT') {
    return effectStyleToCSS(style as EffectStyle, opt);
  }
};

/**
 * 配置 token 生成的实例类
 */
export default class {
  private styles: BaseStyle[] = [];

  public addStyle(newStyle: BaseStyle | BaseStyle[]) {
    if (Array.isArray(newStyle)) {
      this.styles.splice(this.styles.length, 0, ...newStyle);
    } else {
      this.styles.push(newStyle);
    }
  }

  public getStyles() {
    return this.styles.slice();
  }

  public removeStyles(indexOrId?: number | string) {
    if (typeof indexOrId === 'number') {
      this.styles.splice(indexOrId, 1);
    } else if (typeof indexOrId === 'string') {
      const index = this.styles.findIndex(style => style.id === indexOrId);
      if (index) {
        this.styles.splice(index);
      } else {
        throw new Error(`Remove style failed: no style id ${indexOrId}`);
      }
    } else {
      this.styles = [];
    }
  }

  public getTokenObject(opt: UserSetting = { tokenNameSource: 'name', githubToken: '' }) {
    let tokenObj = {};

    this.styles.forEach(style => {
      tokenObj = {
        ...tokenObj,
        ...getTokenObjByType(style, opt),
      };
    });
    return tokenObj;
  }
}
