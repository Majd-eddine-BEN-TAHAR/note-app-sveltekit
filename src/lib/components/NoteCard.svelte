<script>
	export let note;
</script>

<div
	class="border-2 rounded hover:opacity-40 hover:-translate-y-1 hover:shadow-lg ease-in duration-100"
>
	<a class="block h-full px-2 py-4" href={`/${note.value}`}>
		<h1 class="text-4xl">{note.title}</h1>
		<p>
			<em>{note.markdown.length <= 30 ? note.markdown : note.markdown.slice(0, 30) + '...'}</em>
		</p>
		{#each note.tags as tag}
			<div class="badge badge-primary badge-outline mr-2">#{tag.label}</div>
		{/each}
	</a>
</div>
