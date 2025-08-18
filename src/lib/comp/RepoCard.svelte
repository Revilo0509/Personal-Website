<script>
    import fork from "$lib/icons/fork.svg";
    import packageIcon from "$lib/icons/package.svg";
    import star from "$lib/icons/star.svg";
    import users from "$lib/icons/users.svg";

    const { repo } = $props();
</script>

<a href={repo.html_url} class="Remove-Hyper" aria-label={repo.name}>
    <div class="Box">
        <h5>{repo.name}</h5>
        <div class="stats">
            <span><img src={fork} /></span>
        </div>
    </div>
</a>

<style>
    .Box {
        width: 16vw;
    }

    h5 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 130%;
        max-width: 100%;
    }

    .stats img {
        width: 32px;
        color: var(--text-col);
    }
</style>
