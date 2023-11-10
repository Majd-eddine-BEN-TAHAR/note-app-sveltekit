<script lang="ts">
	import { page } from '$app/stores';
	import { NoteForm } from '$lib/components';
	import { storedData } from '$lib/useLocalStorage';
	import type { Note } from './../../../app';

	let selectedNote: Note | undefined = $storedData.NOTES.find(
		(note) => note.value === $page.params.id
	);

	// $storedData.TAGS.filter((tag) => selectedNote?.tagIds?.includes(tag.value))
</script>

<NoteForm
	title={selectedNote?.title}
	markdown={selectedNote?.markdown}
	selectedTags={selectedNote?.tagIds}
	isEditing={true}
/>
