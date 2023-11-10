<script lang="ts">
	export let modalRef: HTMLDialogElement;

	function openModal(): void {
		modalRef.showModal();
	}
</script>

<nav class="flex items-center justify-between">
	<h1 class="text-6xl">Notes</h1>
	<div>
		<a href="/new" class="btn btn-primary">Create</a>
		<button class="btn btn-secondary" on:click={openModal}>Edit Tags</button>
	</div>
</nav>
