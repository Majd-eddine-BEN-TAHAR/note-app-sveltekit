<script lang="ts">
	import { storedData } from '$lib/useLocalStorage';

	export let modalRef;

	function handleChange(e, tagValue) {
		storedData.update((currentData) => ({
			...currentData,
			TAGS: $storedData.TAGS.map((tag) =>
				tag.value === tagValue ? { ...tag, label: e.srcElement.value } : tag
			)
		}));
	}

	function handleDelete(tagValue) {
		storedData.update((currentData) => ({
			...currentData,
			TAGS: $storedData.TAGS.filter((tag) => tag.value !== tagValue)
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
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
