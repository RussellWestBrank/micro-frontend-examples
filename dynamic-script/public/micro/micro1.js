//暴露mount、unmount方法,将子应用挂载到主应用内容区中

// 立即执行的匿名函数可以防止变量 root 产生冲突
(function () {
  let root;

  window.micro1_mount = function (el) {
    // 以下其实可以是 React 框架或者 Vue 框架生成的 Document 元素，这里只是做一个简单的示例
    root = document.createElement("h1");
    root.textContent = "微应用1";
    const $el = document.querySelector(el);
    $el?.appendChild(root);
  };

  window.micro1_unmount = function () {
    if (!root) return;
    root.parentNode?.removeChild(root);
  };
})();