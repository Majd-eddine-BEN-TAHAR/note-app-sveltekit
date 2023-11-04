<script lang="ts">
	import { page } from '$app/stores';
	import { Error, SingleNote } from '$lib/components';
	import { storedData } from '$lib/useLocalStorage';

	let singleNote = $storedData.NOTES.find((note) => note.value === $page.params.id);

	$: {
		if (singleNote) {
			singleNote = {
				...singleNote,
				tags: $storedData.TAGS.filter((tag) => singleNote.tagIds?.includes(tag.value))
			};
		}
	}
</script>

{#if singleNote}
	<SingleNote {singleNote} />
{:else}
	<Error />
{/if}
