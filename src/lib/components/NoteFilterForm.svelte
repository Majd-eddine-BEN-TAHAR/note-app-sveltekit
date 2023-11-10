<script>
	import { storedData } from '$lib/useLocalStorage.js';
	import Select from 'svelte-select/Select.svelte';

	export let title = '';
	export let selectedTags = [];
	export let handleFilter;
</script>

<form on:submit|preventDefault class="flex flex-col items-center w-full">
	<div class="flex gap-4 w-full">
		<div class="form-control w-full">
			<label class="label" for="title">
				<span class="label-text">Title</span>
			</label>
			<input
				id="title"
				type="text"
				placeholder="Type to filter"
				class="input input-bordered input-primary w-full"
				required
				bind:value={title}
			/>
			<!-- h-full -->
		</div>
		<div class="form-control w-full">
			<label class="label" for="label-tags">
				<span class="label-text">Tags</span>
			</label>
			<div class="input input-bordered input-primary w-full h-full px-0">
				<Select
					id="label-tags"
					inputStyles="width:100%"
					showChevron
					multiple
					items={$storedData.TAGS}
					bind:value={selectedTags}
					on:change={handleFilter}
					on:clear={handleFilter}
					placeholder="Filter by tags"
				>
					<div slot="item" let:item>
						{item.label}
					</div>
				</Select>
			</div>
		</div>
	</div>
</form>
