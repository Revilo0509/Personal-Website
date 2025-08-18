<script>
    import { onMount } from "svelte";
    import { fetchRepos, filterRepos } from "$lib/github.js";
    import RepoCard from "$lib/comp/RepoCard.svelte";

    let repos = [];
    let error = null;

    onMount(async () => {
        try {
            const allRepos = await fetchRepos();
            repos = filterRepos(allRepos);
        } catch (e) {
            error = e;
        }
    });
</script>

<section id="repositories">
    <h2 class="Reveal">My Repositories</h2>
    {#if error}
        <p>{error.message}</p>
    {:else if repos.length === 0}
        <p>Loading...</p>
    {:else}
        <ul class="horizontalScrollSpecial">
            {#each repos as repo}
                <li><RepoCard {repo} /></li>
            {/each}
        </ul>
    {/if}
</section>

<style>
    h2 {
        text-align: center;
    }

    .horizontalScrollSpecial {
        margin: 1rem;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: max-content;
        grid-template-rows: repeat(2, auto);
        gap: 2rem;

        width: 100%;
        max-width: 100vw;
        overflow-x: auto;
        padding: 1rem 0;
        list-style: none;
    }
</style>
