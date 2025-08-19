<script>
    import { onMount } from "svelte";
    import { fetchRepos, filterRepos } from "$lib/github.js";
    import RepoCard from "$lib/comp/RepoCard.svelte";
    import Button from "$lib/comp/Button.svelte";

    let repos = [];
    let error = null;
    const LOAD_AMOUNT = 20;
    let visibleCount = LOAD_AMOUNT;

    onMount(async () => {
        try {
            const allRepos = await fetchRepos();
            repos = filterRepos(allRepos);
        } catch (e) {
            error = e;
        }
    });

    function loadMore() {
        visibleCount += LOAD_AMOUNT;
    }
</script>

<section id="repositories">
    <h2 class="Reveal">My Repositories</h2>
    {#if error}
        <p>{error.message}</p>
    {:else if repos.length === 0}
        <p>Loading...</p>
    {:else}
        <div class="repoGridWrapper">
            <ul class="repoGrid">
                {#each repos.slice(0, visibleCount) as repo}
                    <li><RepoCard {repo} /></li>
                {/each}
            </ul>
        </div>
        {#if visibleCount < repos.length}
            <div class="loadMoreWrapper">
                <Button text="Load More" func={loadMore} />
            </div>
        {/if}
    {/if}
</section>

<style lang="scss">
    h2 {
        text-align: center;
        padding-top: 2rem;
    }

    p {
        text-align: center;
        margin-top: 3rem;
    }

    .repoGridWrapper {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .repoGrid {
        box-sizing: border-box;
        padding: 2rem;
        margin: 3rem 0;
        list-style: none;
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(
            auto-fit,
            minmax(calc(250px + 2.5rem), 1fr)
        );
        max-width: 1200px;
        width: 100%;
        justify-items: center;
        align-items: center;
        min-width: 300px;
    }

    .loadMoreWrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
    }
</style>
