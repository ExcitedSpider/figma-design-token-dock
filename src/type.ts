export type LintResult = {
  type: 'pass' | 'suggest' | 'warn' | 'error';
  name: string;
  message?: string;
};

export type Rule = (node: SceneNode, option?: any) => LintResult;

export type RuleGenerator<T> = (name: string, option?: T) => Rule;

export interface RuleMap {
  [index: string]: Rule;
}

export type NodeLintResult = {
  node: SceneNode;
  results: LintResult[];
};

export type PageName = 'main' | 'result' | 'detail';

export type RuleNameResultMap = {
  [ruleName: string]: {
    node: {
      id: string;
      content: string;
      name: string;
    };
    type: LintResult['type'];
    message: string;
  }[];
};

export type UserSetting = {
  ruleConfigFormData: {
    name: string;
    active: boolean;
    [index: string]: any;
  }[];
};

export type RuleConfigObject = {
  name: string;
  desc: string;
  configForm: {
    label?: string;
    name: string;
    type: string;
    default?: any;
    placeholder?: any;
  }[];
};
