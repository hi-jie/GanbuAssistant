function getTimeStr() {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function log(info) {
    const infoStr = `[INFO ${getTimeStr()}] ${info}`;

    var infoBox = document.getElementById("zzj-info");
    if (infoBox ) {
        infoBox.innerText = infoStr;
    } else {
        div = `
<div id="zzj" style="
    box-shadow: 0 0 15px 0 gray;
    background-color: #ffffff;
    padding: 10px;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    font-size: 14px;
    color: #333
">
    <div">
        干部网络学院高效学习助手：
        <span id="zzj-state" style="color: green; font-weight: bold; margin-right: 50px;">已启用</span>
        输出信息：
        <span id="zzj-info">${infoStr}</span>
    </div>
</div>
        `;

        var content = document.querySelector("body"); // 获取现有元素的引用
        if (content) {
            content.insertAdjacentHTML("afterbegin", div);
        } else {
            console.log("页面未加载完成，状态显示错误");
        }
    }

    console.log(infoStr);
}

window.utils = {
    log: log
}