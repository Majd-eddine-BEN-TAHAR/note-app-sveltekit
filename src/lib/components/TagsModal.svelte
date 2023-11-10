<script>
	import { storedData } from '$lib/useLocalStorage.js';
	import { DeleteIcon } from '$lib/components';

	export let modalRef;

	function handleChange(e, tagValue) {
		storedData.update((currentData) => ({
			...currentData,
			TAGS: currentData.TAGS.map((tag) =>
				tag.value === tagValue ? { ...tag, label: e.target.value } : tag
			)
		}));
	}

	function handleDelete(tagValue) {
		storedData.update((currentData) => ({
			NOTES: currentData.NOTES.map((note) => ({
				...note,
				tagIds: note.tagIds.filter((tag) => tag !== tagValue)
			})),
			TAGS: currentData.TAGS.filter((tag) => tag.value !== tagValue)
		}));
	}
</script>

<dialog bind:this={modalRef} class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg mb-4">Edit or delete a tag</h3>
		{#if $storedData.TAGS.length === 0}
			<p>There's no tags</p>
		{/if}

		{#each $storedData.TAGS as tag}
			<div class="flex justify-between mb-4">
				<input
					type="text"
					value={tag.label}
					class="input input-bordered input-primary flex-1"
					on:input={(e) => handleChange(e, tag.value)}
				/>
				<button
					class="bg-red-500 hover:bg-red-600 text-white font-semibold ml-4 py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
					on:click={() => handleDelete(tag.value)}
				>
					<DeleteIcon />
				</button>
			</div>
		{/each}

		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
