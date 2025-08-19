<script>
  import favicon from "$lib/assets/favicon.svg";
  import "$lib/global.scss";
  import Background from "$lib/comp/Background.svelte";
  import { onMount } from "svelte";
  import { initReveal } from "$lib/Reveal.js";

  let { children } = $props();

  onMount(() => {
    initReveal();
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
</svelte:head>

<Background />

{@render children?.()}
