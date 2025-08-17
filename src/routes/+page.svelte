<script lang="ts">
    import Box from "$lib/components/Box.svelte";
</script>

<div class="homePage">
    <Box class="profile-wapper" hoverEffect={true}>
        <a href="/about" class="profile">
            <img
                src="https://cdn.discordapp.com/avatars/565162541748322334/553b8be435af38621e2dc23fa179e76b.webp?size=128"
                alt="Revilo"
            />
            <h1 class="username">Revilo</h1>
        </a>
    </Box>
</div>

<style>
    .homePage {
        position: relative;
        display: grid;
        width: 100%;
        height: 100%;

        align-content: center;
        justify-items: center;
    }

    .profile {
        text-decoration: none;

        padding: 2rem;
        border-radius: var(--radius);

        display: inline-flex;
        flex-direction: column;

        align-items: center;
        justify-content: center;
    }

    .profile img {
        border-radius: 50%;
        width: 10rem;
    }

    .username {
        line-height: 1;
        margin-top: 1.5rem;

        text-align: center;
        font-size: 4rem;

        color: var(--text-color);
    }
</style>
