<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/');
	});
</script>

<h1>404</h1>
<p>Redirecting to home...</p>
