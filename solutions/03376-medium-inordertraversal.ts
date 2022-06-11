interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

/**
 * Since T is a union type, we should use [T] to avoid distributive behavior.
 */

type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode]
  ? [...InorderTraversal<T["left"]>, T["val"], ...InorderTraversal<T["right"]>]
  : []
