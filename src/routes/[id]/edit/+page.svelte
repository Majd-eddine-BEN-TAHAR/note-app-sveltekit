<script>
	import { page } from '$app/stores';
	import { NoteForm } from '$lib/components';
	import { storedData } from '$lib/useLocalStorage';

	let singleNote = $storedData.NOTES.find((note) => note.value === $page.params.id);
</script>

<NoteForm
	title={singleNote?.title}
	markdown={singleNote?.markdown}
	selectedTags={singleNote?.tagIds}
	isEditing={true}
/>
