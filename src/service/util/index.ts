import { StyleCollection } from '@/type';

export const traverseNode = (
  fn: (node: SceneNode) => void,
  rootNode: SceneNode & ChildrenMixin,
) => {
  if (!rootNode || !rootNode.children || rootNode.children.length === 0) {
    return;
  }
  return rootNode.children.forEach(node => {
    fn(node);
    traverseNode(fn, node as SceneNode & ChildrenMixin);
  });
};

export const tranverseSelectNodes = (
  fn: (node: SceneNode) => void,
  nodes: readonly SceneNode[],
) => {
  nodes.forEach(node => {
    fn(node);
    traverseNode(fn, node as SceneNode & ChildrenMixin);
  });
};

export const findNodeIndex = (node: SceneNode, parent?: SceneNode & ChildrenMixin) => {
  const parentNode = parent || node.parent;
  return parentNode.children.findIndex(child => child.id === node.id);
};

export function captureUniqueStyle(existStyles: StyleCollection, node: SceneNode) {
  Object.keys(existStyles).forEach(styleName => {
    const nodeStyleIdField = `${styleName}Id`;
    const nodeStyleId = node[nodeStyleIdField];
    if (
      nodeStyleId &&
      existStyles[styleName].findIndex(style => style?.id === nodeStyleId) === -1
    ) {
      existStyles[styleName].push(figma.getStyleById(nodeStyleId));
    }
  });
}
