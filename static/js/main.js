let currentTime = 0, duration = 132;

document.querySelector(".progress-bar").max = duration;

function rewriteTime(cur, dur) {
	document.querySelector(".music-duration > p").innerText = `${getTime(parseInt(cur / 60), parseInt(cur % 60))} / ${getTime(parseInt(dur / 60), parseInt(dur % 60))}`;
}

rewriteTime(currentTime, duration);

function getTime(m, s) {
	return ((m < 10) ? "0" + m.toString() : m) + ":" + ((s < 10) ? "0" + s.toString() : s);
}

document.querySelector(".progress-bar").onmousedown = function(event) {
	if(event.button != 0) return;
	let isMusicPlaying = (document.querySelector(".stop-btn").style.display == "inline-block");
	if(isMusicPlaying) document.querySelector(".stop-btn").click();
	this.addEventListener("mousemove", f);
	function f(e, elm = this) {
		x = e.offsetX;
		elm.value = x / elm.offsetWidth * elm.max;
		rewriteTime(elm.value, elm.max);
		currentTime = elm.value;
	}
	f(event, this);
	document.onmouseup = () => {
		this.removeEventListener("mousemove", f);
		if(isMusicPlaying) document.querySelector(".play-btn").click();
	}
}

let interval;
document.querySelector(".play-btn").onclick = function() {
	if(interval !== undefined) clearInterval(interval);
	this.style.display = "none";
	document.querySelector(".stop-btn").style.display = "inline-block";
	interval = setInterval(() => {
		if(currentTime >= duration) {
			document.querySelector(".stop-btn").click();
		}
		currentTime++;
		rewriteTime(currentTime, duration);
		document.querySelector(".progress-bar").value = currentTime;
	}, 1000);
}

document.querySelector(".stop-btn").onclick = function() {
	clearInterval(interval);
	interval = undefined;
	this.style.display = "none";
	document.querySelector(".play-btn").style.display = "inline-block";
}