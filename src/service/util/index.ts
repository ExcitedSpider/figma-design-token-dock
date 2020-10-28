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
