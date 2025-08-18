<script>
    import { onMount } from "svelte";
    import { fetchRepos } from "$lib/github.js";
    import RepoCard from "$lib/comp/RepoCard.svelte";

    let repos = [];
    let error = null;

    onMount(async () => {
        try {
            repos = await fetchRepos();
        } catch (e) {
            error = e;
        }
    });
</script>

<section id="projects">
    <h2>My Projects</h2>
    {#if error}
        <p>{error.message}</p>
    {:else if repos.length === 0}
        <p>Loading...</p>
    {:else}
        <ul class="Horizontal-Scroll">
            {#each repos as repo}
                <li><RepoCard repo={repo} /></li>
            {/each}
        </ul>
    {/if}
</section>

<style>
    h2 {
        text-align: center;
    }
</style>
