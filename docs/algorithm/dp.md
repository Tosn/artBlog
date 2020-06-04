## 递归

[leetcode递归训练](https://leetcode-cn.com/explore/orignial/card/recursion-i/)

1.[687最长同值路径](https://leetcode-cn.com/problems/longest-univalue-path/)

```js
var longestUnivaluePath = function(root) {
  if (!root) return 0
  let max = 0
  function dp (node) {
    if (!node) return 0
    const l = dp(node.left)
    const r = dp(node.right)
    let pl = 0
    let pr = 0
    if (node.left && node.left.val === node.val) {
      pl = l + 1
    }
    if (node.right && node.right.val === node.val) {
      pr = r + 1
    }
    // 获取最大值
    max = Math.max(max, pl + pr)
    // 返回左右值跟根植相等的最大路径
    return Math.max(pl, pr)
  }
  dp(root)
  return max
};
```

