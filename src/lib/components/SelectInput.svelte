<script lang="ts">
	import { storedData } from './../useLocalStorage';
	import type { Tag } from '../../app';
	import Select from 'svelte-select';

	export let selectedTags: Tag[] | null = null;
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
</script>

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
