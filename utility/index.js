import { unref } from 'vue';

class Utility {
	static fullscreen(vuetify) {
		return Utility.fullscreenDisplay(vuetify.display);
	}

	static fullscreenDisplay(display) {
		return unref(unref(display).xs);
	}

	static overlayImageWidth() {
		let width = (window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth);
		if (width > 512)
			return '512px';

		return width *.75 + 'px';
	}

	static overlayProgressSize() {
		return (window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth) * .25;
	}

	static randomKeyGen() {
		const high = 100000000000;
		const low = 0;
		return Math.floor(Math.random() * (high - low) + low);
	}
}

export default Utility;
