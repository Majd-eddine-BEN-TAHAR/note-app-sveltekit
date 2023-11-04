<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { storedData } from '$lib/useLocalStorage';
	import Select from 'svelte-select';
	import type { NoteData, Tag } from '../../app';
	import SelectInput from './SelectInput.svelte';

	export let title: string = '';
	export let markdown: string = '';
	export let selectedTags: Tag[] | [] | null = [];
	export let isEditing = false;
	let filterText = '';

	function handleFilter(e: any) {
		if (selectedTags?.find((tag: Tag) => tag.label === filterText)) return;
		if (e.detail.length === 0 && filterText.length > 0) {
			const prev = $storedData.TAGS.filter((tag: any) => !tag.created);
			$storedData.TAGS = [
				...prev,
				{ value: crypto.randomUUID(), label: filterText, created: true }
			];
		}
	}

	function handleChange(e: any) {
		const [createdUsingFilter] = $storedData.TAGS.filter((tag) => tag.hasOwnProperty('created'));
		if (createdUsingFilter) {
			const isExistInSelected = e.detail.filter((tag) => tag.value === createdUsingFilter.value);
			if (isExistInSelected.length === 0) {
				$storedData.TAGS = $storedData.TAGS.filter((tag) => {
					delete tag.created;
					return tag.value !== createdUsingFilter.value;
				});
			}
		}
		$storedData.TAGS = $storedData.TAGS.map((tag) => {
			delete tag.created;
			return tag;
		});
	}

	function onSubmit({ isEditing, tags, title, markdown }: NoteData) {
		if (isEditing) {
			let noteToEdit = $storedData.NOTES.find((note) => note.value === $page.params.id);

			noteToEdit = {
				...noteToEdit,
				title,
				markdown,
				tagIds: tags?.map((tag) => tag.value)
			};

			storedData.update((currentData) => ({
				...currentData,
				NOTES: $storedData.NOTES.map((note) => (note.value === $page.params.id ? noteToEdit : note))
			}));
		} else {
			storedData.update((currentData) => ({
				TAGS: [...currentData.TAGS],
				NOTES: [
					...currentData.NOTES,
					{
						title,
						markdown,
						value: crypto.randomUUID(),
						tagIds: tags.map((tag) => tag.value)
					}
				]
			}));
		}

		if (isEditing) {
			goto(`/${$page.params.id}`);
		} else {
			goto('/');
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
					on:change={handleChange}
					on:filter={handleFilter}
					bind:value={selectedTags}
					bind:filterText
				>
					<div slot="item" let:item>
						{item.created ? 'Add new: ' : ''}
						{item.label}
					</div>
				</Select>
				<!-- <SelectInput bind:selectedTags /> -->
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
