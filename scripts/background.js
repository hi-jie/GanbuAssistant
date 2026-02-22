function main() {

    var div = document.getElementById("zzj");
    
    if (!div) {
        div = `
<div id="zzj" style="
    border-bottom: 1px solid gray;
    padding: 10px;
">
    <div>
        干部网络学院高效学习助手：
        <span id="zzj-state" style="color: green; font-weight: bold;">已启用</span>
    </div>
</div>
        `;

        var content = document.querySelector("#content .header"); // 获取现有元素的引用
        content.insertAdjacentHTML("afterbegin", div);
    }
}

setInterval(main, 2000);