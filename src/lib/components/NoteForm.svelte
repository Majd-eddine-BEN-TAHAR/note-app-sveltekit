<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { storedData } from '$lib/useLocalStorage.js';
	import SelectInput from './SelectInput.svelte';

	export let title = '';
	export let markdown = '';
	export let selectedTags = [];
	export let isEditing = false;

	function onSubmit(noteData) {
		const { isEditing, tags, title, markdown } = noteData;
		if (isEditing) {
			const noteId = $page.params.id;
			updateNote(noteId, tags, title, markdown);
		} else {
			addNewNote(title, markdown, tags);
		}

		const route = isEditing ? `/${$page.params.id}` : '/';
		goto(route);
	}

	function addNewNote(title, markdown, tags) {
		$storedData.NOTES = [
			...$storedData.NOTES,
			{
				title,
				markdown,
				value: crypto.randomUUID(),
				tagIds: tags.map((tag) => tag.value)
			}
		];
	}

	function updateNote(id, tags, title, markdown) {
		const noteToEditIndex = $storedData.NOTES.findIndex((note) => note.value === id);

		if (noteToEditIndex !== -1) {
			$storedData.NOTES[noteToEditIndex] = {
				...$storedData.NOTES[noteToEditIndex],
				title,
				markdown,
				tagIds: tags?.map((tag) => tag.value) || []
			};
		}
	}
</script>

<form
	on:submit|preventDefault={() => onSubmit({ isEditing, tags: selectedTags, title, markdown })}
	class="flex flex-col items-center w-full"
>
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
		</div>
		<div class="form-control w-full">
			<label class="label" for="label-tags">
				<span class="label-text">Tags</span>
			</label>
			<div class="input input-bordered input-primary w-full h-full px-0">
				<SelectInput id={'label-tags'} bind:selectedTags />
			</div>
		</div>
	</div>

	<div class="form-control w-full mt-4">
		<label class="label" for="markdown">
			<span class="label-text">Body</span>
		</label>
		<textarea
			bind:value={markdown}
			itemref="markdown"
			class="textarea textarea-primary"
			rows="15"
			placeholder="Write the todo text"
			required
		/>
	</div>

	<div class="flex justify-end w-full mt-4 gap-4">
		<button class="btn btn-primary">{isEditing ? 'edit' : 'Save'}</button>
		<a href={`/${$page.params.id ?? ''}`} class="btn btn-outline">Cancel</a>
	</div>
</form>
