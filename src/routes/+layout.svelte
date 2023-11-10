<script>
	import '../app.css';
	import '@fontsource/rubik';
	import '@fontsource/rubik/500.css';
	import { loadDummyDataToStart } from '$lib/utils.js';

	loadDummyDataToStart();
</script>

<div class="max-w-4xl px-4 mx-auto my-4">
	<slot />
</div>

<style>
	:global(body) {
		font-family: 'Rubik', sans-serif;
	}
</style>
