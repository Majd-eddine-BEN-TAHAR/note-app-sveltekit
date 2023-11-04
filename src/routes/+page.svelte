<script lang="ts">
	import { NoteCard } from '$lib/components';
	import TagsModal from '$lib/components/TagsModal.svelte';
	import { storedData } from '$lib/useLocalStorage';
	import type { Tag } from '../app';
	import Select from 'svelte-select';

	let selectedTags: Tag[] | undefined = [];
	let notesWithTags = null;
	let title: string = '';
	let filtredNotes = [];
	let modalRef;

	function openModal() {
		modalRef.showModal();
	}

	$: filtredNotes = notesWithTags;
	$: title, handleFilter();
	$: selectedTags, handleFilter();

	$: {
		notesWithTags = $storedData.NOTES.map((note: any) => ({
			...note,
			tags: $storedData.TAGS.filter((tag: any) => note.tagIds?.includes(tag.value))
		}));
	}

	function onSubmit() {}
	function handleFilter() {
		filtredNotes = notesWithTags.filter((note) => {
			return (
				(title === '' || note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
				(selectedTags?.length === 0 ||
					selectedTags === undefined ||
					selectedTags?.every((tag) => note.tags.some((noteTag) => noteTag.value === tag.value)))
			);
		});
	}
</script>

<TagsModal bind:modalRef />
<nav class="flex items-center justify-between">
	<h1 class="text-6xl">Notes</h1>
	<div>
		<a href="/new" class="btn btn-primary">Create</a>
		<button class="btn btn-secondary" on:click={openModal}>Edit Tags</button>
	</div>
</nav>
<hr />

<form on:submit|preventDefault={onSubmit} class="flex flex-col items-center w-full">
	<div class="flex gap-4 w-full">
		<div class="form-control w-full">
			<label class="label" for="title">
				<span class="label-text">Title</span>
			</label>
			<input
				id="title"
				type="text"
				placeholder="Type here"
				class="input input-bordered input-primary w-full"
				required
				bind:value={title}
			/>
			<!-- h-full -->
		</div>
		<div class="form-control w-full">
			<label class="label" for="label-tags">
				<span class="label-text">Tags</span>
			</label>
			<div class="input input-bordered input-primary w-full h-full px-0">
				<Select
					id="label-tags"
					inputStyles="width:100%"
					showChevron
					multiple
					items={$storedData.TAGS}
					bind:value={selectedTags}
					on:change={handleFilter}
					on:clear={handleFilter}
				>
					<div slot="item" let:item>
						{item.label}
					</div>
				</Select>
			</div>
		</div>
	</div>
</form>

<div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
	{#each filtredNotes as note}
		<NoteCard {note} />
	{/each}
</div>
