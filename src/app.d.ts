// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

// export {};

export type NoteData = {
	isEditing?: boolean;
	title: string;
	markdown: string;
	tags: Tag[];
};

export type Note = {
	isEditing?: boolean;
	title?: string;
	markdown?: string;
	tags?: Tag[];
	value?: string;
	tagIds?: string[] | undefined;
};

export type Tag = {
	value?: string;
	label?: string;
	created?: boolean;
	id?: string;
};

/**
 * Represents a raw note object.
 * @typedef {Object} RawNote
 * @property {string} title - The title of the note.
 * @property {string} markdown - The markdown content of the note.
 * @property {string[]} tags - The tags associated with the note.
 */
export type RawNote = {
	title: string;
	markdown: string;
	tags: string[];
};
