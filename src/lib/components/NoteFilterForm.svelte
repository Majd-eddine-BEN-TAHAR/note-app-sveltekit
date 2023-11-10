<script lang="ts">
	import { storedData } from '$lib/useLocalStorage';
	import Select from 'svelte-select/Select.svelte';
	import type { Tag } from '../../app';

	export let title: string = '';
	export let selectedTags: Tag[] | null = [];
	export let handleFilter: (e: Event) => void;
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
				placeholder="Type here"
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
				>
					<div slot="item" let:item>
						{item.label}
					</div>
				</Select>
			</div>
		</div>
	</div>
</form>
