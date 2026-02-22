
window.utils.log("扩展已启用");

function main() {

	// 自动下一个
	var currentChapter = document.querySelector(".desc-item-sel .el-progress__text");
	var chapters = document.querySelectorAll(".tab-content-desc");
	if (currentChapter) {
		if (parseInt(currentChapter.innerText) == 100) {
			for (var index = 0; index < chapters.length; index += 1) {
				var chapter = chapters[index].querySelector(".el-progress__text");
				if (chapter && chapter.innerText < 100) {
					chapters[index].click();
					window.utils.log("当前视频完成，自动播放下一个视频");
					return;
				}
			}
			window.utils.log("已完成当前课程全部章节");
			setTimeout(() => window.close(), 1000); // 全看完了就关闭窗口
		}
	} else {
		window.utils.log("找不到章节列表");
		return;
	}

	// 标签页后台
	if (document.hidden) {
		window.utils.log('页面在后台');
		return;
	}
	
	// 自动播放
	var video = document.querySelector("video");
	if (video && video.paused) {
		video.muted = true;
		video.play();
		window.utils.log("播放停止，自动开始播放");
	}

	// 自动点击确定	
	var div = document.querySelector(".alert-wrapper");
	var btn = document.querySelector(".alert-wrapper .btn-ok.btn");
	if (div && div.style["display"] != "none" && btn) {
		btn.click();
		window.utils.log("已确定");
	}
}

setInterval(main, 2000);