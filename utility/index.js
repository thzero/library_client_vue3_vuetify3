import { unref } from 'vue';

class LibraryClientVuetifyUtility {
	static fullscreen(display) {
		return unref(unref(display).xs);
	}
}

export default LibraryClientVuetifyUtility;
