import { persisted } from 'svelte-persisted-store';

export const storedData = persisted('storedData', {
	NOTES: [],
	TAGS: []
});
