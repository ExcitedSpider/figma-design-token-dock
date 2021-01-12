export type StyleCollection = {
  effectStyle: EffectStyle[];
  fillStyle: PaintStyle[];
  strokeStyle: PaintStyle[];
  textStyle: TextStyle[];
};

export type StyleDisplay = {
  icon: string | { r: number; g: number; b: number };
  name: string;
  type: string;
  id: string;
};

export interface UserSetting {
  tokenNameSource: 'name' | 'description';
  githubToken: string;
  prRepo: string;
  prOwner: string;
}

export type PluginSetting = Pick<UserSetting, 'tokenNameSource' | 'githubToken'>;
