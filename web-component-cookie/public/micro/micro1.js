// MDN: https://developer.mozilla.org/zh-CN/docs/Web/Web_Components
// MDN: https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements
class MicroApp1Element extends HTMLElement {
  constructor() {
    super();
  }

  // [生命周期回调函数] 当 custom element 自定义标签首次被插入文档 DOM 时，被调用
  // 类似于 React 中的  componentDidMount 周期函数
  // 类似于 Vue 中的 mounted 周期函数
  connectedCallback() {
    console.log(`[micro-app-1]：执行 connectedCallback 生命周期回调函数`);
    // 挂载应用
    // 相对动态 Script，组件内部可以自动进行 mount 操作，不需要对外提供手动调用的 mount 函数，从而防止不必要的全局属性冲突
    this.mount();
  }

  // [生命周期回调函数] 当 custom element 从文档 DOM 中删除时，被调用
  // 类似于 React 中的  componentWillUnmount 周期函数
  // 类似于 Vue 中的 destroyed 周期函数
  disconnectedCallback() {
    console.log(
      `[micro-app-1]：执行 disconnectedCallback 生命周期回调函数`
    );
    // 卸载处理
    this.unmount();
  }

  // 如果需要在元素属性变化后，触发 attributeChangedCallback 函数
  // 必须定义 observedAttributes 函数返回需要监听的属性名称列表来实现
  // observedAttributes + attributeChangedCallback 两者一起
  // 类似于 Vue 中的 watch 侦听器
  // 类似于 React 中的 getDerivedStateFromProps
  // static get observedAttributes() {
  //   return ["mico-slot"];
  // }
  // // [生命周期回调函数] 当 custom element 增加、删除、修改自身属性时，被调用
  // attributeChangedCallback(attr, oldVal, newVal) {
  //   console.log(
  //     `[app:${this.name}]：执行 attributeChangedCallback 生命周期回调函数`
  //   );
  //   if (this[attr] !== newVal) {
  //     this[attr] = newVal;
  //     // 用户从之前的菜单切换到当前应用菜单
  //     // 执行流程：attributeChangedCallback（当前应用）=> disconnectedCallback（上一个应用） => unmount (上一个应用) => connectedCallback（当前应用） => mount (当前应用)
  //     // 这里的 disconnectedCallback 是执行切换之前的 app 的 disconnectedCallback
  //     // this.isConnected 用于确保执行当前的 mount 应用之前，先执行上一个应用的 unmount
  //     this.isConnected && this.mount();
  //   }
  // }

  // // 当元素被移动到新文档时的操作
  // adoptedCallback() {
  // }

  mount() {
    const $micro = document.createElement("h1");
    $micro.textContent = "微应用1";
    // 将微应用的内容挂载到当前自定义元素下
    this.appendChild($micro);

    // 新增 Ajax 请求，用于请求子应用服务
    // 需要注意 micro1.js 动态加载在主应用 russ.com:4000 下，因此是跨站请求
    
    // 如果先发起 micro1.js 的 Ajax 请求，希望可以响应子应用服务端的 Cookie
    // 再次发起 micro2.js 的同地址的 Ajax 请求，此时希望请求头中可以携带 Cookie
    // 这种情况可用于登录态的免登 Cookie 设计
    window
      .fetch("https://10.23.100.168:3001/cors", {
        method: "post",
        // 允许在请求时携带 Cookie
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Request/credentials
        credentials: "include"
      })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
  }

  unmount() {

  }
}

// MDN：https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define
// 创建自定义元素，可以在浏览器中使用 <micro-app-1> 自定义标签
window.customElements.define("micro-app-1", MicroApp1Element);
