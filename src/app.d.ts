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
	value: string;
} & NoteData;

export type Tag = {
	value: string;
	label: string;
	created?: boolean;
	id?: string;
};

export type RawNote = {};
