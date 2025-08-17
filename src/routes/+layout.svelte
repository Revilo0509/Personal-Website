<script>
	import favicon from "$lib/assets/favicon.svg";
	import "$lib/global.css";
	import Background from "$lib/Background.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Background />
<main>
	{@render children?.()}
</main>
