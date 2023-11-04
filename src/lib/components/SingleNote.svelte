<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { storedData } from '$lib/useLocalStorage';
	import { marked } from 'marked';
	import { DeleteModal } from '$lib/components';

	export let singleNote;
	let modalRef;

	function handleDelete() {
		storedData.update((currentData) => ({
			...currentData,
			NOTES: [...currentData.NOTES.filter((note) => note.value !== $page.params.id)]
		}));
		goto('/');
	}

	function openModal() {
		modalRef.showModal();
	}
</script>

<DeleteModal bind:modalRef handleClick={handleDelete} />

<div class="mt-4">
	<div class="flex flex-wrap justify-between">
		<div class="flex-1">
			<h1 class="text-6xl mr-4">
				{singleNote.title}
			</h1>
		</div>

		<nav>
			<a href={`/${singleNote.value}/edit`} class="btn btn-primary">Edit</a>
			<button on:click={openModal} class="btn btn-outline btn-error">Delete</button>
			<a href="/" class="btn btn-outline">Back</a>
		</nav>
	</div>

	<div class="my-10">
		{#each singleNote.tags as tag}
			<div class="mr-4 badge badge-warning text-xl">
				<span class="text-white">#</span>{tag.label}
			</div>
		{/each}
	</div>
</div>

<div class="prose lg:prose-xl mx-auto">
	{@html marked.parse(singleNote.markdown)}
</div>
