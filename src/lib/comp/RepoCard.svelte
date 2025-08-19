<script>
    import fork  from "$lib/icons/repoIcons/fork.svg";
    import star  from "$lib/icons/repoIcons/star.svg";

    import Button from "./Button.svelte";

    const { repo } = $props();
</script>

<div class="Reveal">
    <div class="Box Box-Animate">
        <div class="container">
            <h5>{repo.name}</h5>
            <div class="stats">
                <span>
                    <img src={star} alt="Star Icon" />
                    <div>{repo.stargazers_count}</div>
                </span>
                <span>
                    <img src={fork} alt="Fork Icon" />
                    <div>{repo.forks_count}</div>
                </span>
            </div>

            <Button href={repo.homepage ? repo.homepage : repo.html_url} text={repo.homepage ? 'Go to Site' : 'Go to Repo'} newTab={true}/>
        </div>
    </div>
</div>

<style lang="scss">
    .Box {
        width: 250px;
    }

    h5 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        margin-bottom: 0.5rem;
    }

    .stats {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 0.5rem;
        margin-bottom: 0.5rem;

        span {
            display: flex;
            align-items: center;
            gap: 0.3rem;
            background: var(--hl-col);
            border-radius: 0.75rem;
            padding: 0.25rem 0.7rem;
            font-size: 0.95rem;
            color: var(--text-col);
            min-width: 2.5rem;
            flex: 1 1 45%;
            box-sizing: border-box;
            justify-content: flex-start;
        }

        img {
            width: 1.2rem;
            height: 1.2rem;
            opacity: 0.85;
        }
    }
</style>
