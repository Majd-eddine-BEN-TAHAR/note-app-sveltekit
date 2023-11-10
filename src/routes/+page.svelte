<script>
	import { NoteCard, TagsModal, NoteFilterForm, Nav } from '$lib/components';
	import { storedData } from '$lib/useLocalStorage.js';

	let title = '';
	let selectedTags = [];
	let notesWithTags = [];
	let filtredNotes = [];
	let modalRef;

	$: filtredNotes = notesWithTags;
	$: title, handleFilter();
	$: selectedTags, handleFilter();

	$: notesWithTags = $storedData.NOTES.map((note) => ({
		...note,
		tags: $storedData.TAGS.filter((tag) => note.tagIds?.includes(tag.value))
	}));

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

<svelte:head>
	<title>Notes App</title>
</svelte:head>

<TagsModal bind:modalRef />
<Nav {modalRef} />
<hr />

<NoteFilterForm bind:title bind:selectedTags {handleFilter} />

<div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
	{#each filtredNotes as note}
		<NoteCard {note} />
	{/each}
</div>
