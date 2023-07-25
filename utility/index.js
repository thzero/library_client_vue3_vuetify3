import { unref } from 'vue';

class LibraryClientVuetifyUtility {
	static fullscreen(display) {
		return unref(unref(display).sm);
	}
}

export default LibraryClientVuetifyUtility;
