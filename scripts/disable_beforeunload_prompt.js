/*

在文档开始时注入脚本，替换默认的绑定事件监听的函数，从而拦截关闭网页的事件监听

*/

const injectCode = `

window.onbeforeunload = null;

const winProto = Window.prototype;
const originalAdd = winProto.addEventListener;

winProto.addEventListener = function(type, handler) {
    if (type === 'beforeunload') {
        console.log('拦截beforeunload绑定：', handler);
        return;
    } else {
        originalAdd.call(this, type, handler);
    }
}

originalAdd.call(
    window, 'beforeunload', 
    function(e) {
        delete e.returnValue;
        return undefined;
    }, 
    { capture: true, once: false }
);

`;

const script = document.createElement('script');
script.textContent = injectCode;

if (document.head) {
    document.head.appendChild(script);
} else {
    document.documentElement.appendChild(script);
}

script.remove();