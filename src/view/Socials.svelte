<script>
    import discord from "$lib/icons/socialIcons/discord.svg";
    import github from "$lib/icons/socialIcons/github.svg";
    import reddit from "$lib/icons/socialIcons/reddit.svg";
    import steam from "$lib/icons/socialIcons/steam.svg";
    import tiktok from "$lib/icons/socialIcons/tiktok.svg";
    import twitch from "$lib/icons/socialIcons/twitch.svg";

    const socials = [
        {
            name: "Discord",
            icon: discord,
            link: "https://discord.com/users/565162541748322334",
        },
        { name: "GitHub", icon: github, link: "https://github.com/Revilo0509" },
        {
            name: "Reddit",
            icon: reddit,
            link: "https://www.reddit.com/user/Revilo_EMC/",
        },
        { name: "Steam", icon: steam, link: "https://store.steampowered.com/" },
        {
            name: "TikTok",
            icon: tiktok,
            link: "https://www.tiktok.com/@revilo50",
        },
        {
            name: "Twitch",
            icon: twitch,
            link: "https://www.twitch.tv/revilo0509",
        },
    ];
</script>

<section id="socials">
    <div class="Box Reveal links">
        {#each socials as social}
            <a href={social.link} target="_blank" rel="noopener noreferrer">
                <div class="icon">
                    <img src={social.icon} alt={social.name} />
                </div>
            </a>
        {/each}
    </div>
</section>

<style lang="scss">
    section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 1rem 0;
    }

    .links {
        background-color: var(--bg-col);
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    .icon {
        width: 48px;
        height: 48px;

        background-color: var(--hl-col);
        padding: 1rem;
        border-radius: 50%;

        transition: transform 0.3s cubic-bezier(0.4, 2, 0.6, 1);

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        &:hover {
            transform: scale(1.1);
        }
    }
</style>
