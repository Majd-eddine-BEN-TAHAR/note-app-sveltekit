<script>
	import { page } from '$app/stores';
	import { NoteForm } from '$lib/components';
	import { storedData } from '$lib/useLocalStorage.js';

	let selectedNote = $storedData.NOTES.find((note) => note.value === $page.params.id);
</script>

<NoteForm
	title={selectedNote?.title}
	markdown={selectedNote?.markdown}
	selectedTags={selectedNote?.tagIds}
	isEditing={true}
/>
