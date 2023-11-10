<script>
	export let modalRef;
	export let handleClick;
</script>

<dialog bind:this={modalRef} class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Delete Note</h3>
		<p class="py-4">Are you sure you want to delete this note?</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
				<button class="btn btn-error btn-outline" on:click={handleClick}>Delete</button>
			</form>
		</div>
	</div>
</dialog>
