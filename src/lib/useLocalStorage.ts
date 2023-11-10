import { persisted } from 'svelte-persisted-store';
import type { Note, Tag } from '../app';

interface StoredData {
	NOTES: Note[];
	TAGS: Tag[];
}

export const storedData = persisted<StoredData>('storedData', {
	NOTES: [],
	TAGS: []
});
