

window.utils.log("扩展已启用");

const re = /[^\d]*(?<hour>\d+小?时)?(?<minute>\d+分钟)?(?<second>\d+秒)?/;

function parseTime(str) {
	var match = str.match(re).groups;

	for (key in match) {
		if (match[key]) match[key] = parseInt(match[key]);
		else match[key] = 0;
	}
	
	return (
		match.hour * 60 * 60 + 
		match.minute * 60 + 
		match.second
	);
}

function isSuccess(chapterBox) {

	var finished = chapterBox.querySelector(".section-item span");
	if (finished != null && finished.innerText == "已完成") return true;
	if (chapterBox.querySelectorAll(".section-item")[0].querySelector(".sub-text").innerText != "视频") return true;

	// 时长和进度都达标
	var rateBoxes = chapterBox.querySelectorAll(".section-item")[1].querySelectorAll("p");

	var currentRate = parseInt(rateBoxes[0].querySelectorAll("b")[1].innerText);
	var targetRate = parseInt(rateBoxes[0].querySelectorAll("span")[0].innerText.match(/\d+/g)[0]);

	var currentTime = parseTime(rateBoxes[1].querySelectorAll("b")[1].innerText);
	var targetTime = parseTime(rateBoxes[1].querySelectorAll("span")[0].innerText);

	return (
		currentRate >= targetRate &&
		currentTime >= targetTime
	);
}

function main() {

	// 标签页后台
	if (document.hidden) {
		window.utils.log('页面在后台');
		return;
	}

	// 您已打开新的课程详情页，点击按钮，可继续学习。
	var errBtn = document.querySelector(".study-errors-page .btn");
	if (errBtn != null) {
		window.utils.log("回到当前标签页，继续学习");
		errBtn.click();
		return;
	}

	// 开始播放
	var video = document.querySelector(".vjs-paused video");
	if (video) {
		video.muted = true;
		if (video.paused) {
			video.play();
			window.utils.log("播放停止，自动开始播放");
		}
	}
	var mask = document.querySelector(".register-mask-layer img");
	if (mask) {
		mask.click();
	}

	// 自动点击确定	
	var div = document.querySelector(".alert-wrapper");
	var btn = document.querySelector(".alert-wrapper .btn-ok.btn");
	if (div && div.style["display"] != "none") {
		btn.click();
		window.utils.log("已确定");
	}

	// 自动下一个
	var currentChapter = document.querySelector(".chapter-list-box.focus");
	var chapters = document.querySelectorAll(".chapter-list-box:not(.focus)");
	if (currentChapter) {
		if (isSuccess(currentChapter)) {
			for (var index = 0; index < chapters.length; index += 1) {
				if (!isSuccess(chapters[index])) {
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
	}
}

setInterval(main, 2000);