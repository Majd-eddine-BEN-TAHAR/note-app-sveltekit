<script>
	import { storedData } from '$lib/useLocalStorage.js';
	import Select from 'svelte-select/Select.svelte';

	export let id;
	export let selectedTags = [];
	let filterText;

	function handleFilter(e) {
		if (selectedTags?.find((tag) => tag.label === filterText)) return;
		if (e.detail.length === 0 && filterText.length > 0) {
			const prev = $storedData.TAGS.filter((tag) => !tag.created);
			$storedData.TAGS = [
				...prev,
				{ value: crypto.randomUUID(), label: filterText, created: true }
			];
		}
	}

	function handleChange(e) {
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
	{id}
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
