const track = document.querySelector('.img-track'); // get the slides wrapper

window.onmousedown = e => {
	track.dataset.mouseDownAt = e.clientX; // get the "mousedown" at X axis and put it to data attr of wrapper
}

window.onmouseup = () => {
	track.dataset.mouseDownAt = "0";
	track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
	if (track.dataset.mouseDownAt === "0") return;

	const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
		maxDelta = window.innerWidth / 1.7;

	const percentage = (mouseDelta / maxDelta) * -100,
		nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
		nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

	track.dataset.percentage = nextPercentage;

	track.animate({
		transform: `translate(${nextPercentage}%, -50%)`
	}, { duration: 1200, fill: "forwards" });

	for (const img of track.getElementsByClassName('image')) {
		img.animate({
			objectPosition: `${100 + nextPercentage}% 50%`
		}, { duration: 1200, fill: "forwards" });
	}
}