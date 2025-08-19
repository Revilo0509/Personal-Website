<script>
    import { onMount } from "svelte";

    import dnd from "$lib/icons/statusIcons/dnd.png";
    import idle from "$lib/icons/statusIcons/idle.png";
    import offline from "$lib/icons/statusIcons/offline.png";
    import online from "$lib/icons/statusIcons/online.png";

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

    let statusIcon = $state(offline);

    onMount(() => {
        const socket = new WebSocket("/b/presence");

        socket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            switch (data.status) {
                case "dnd":
                    statusIcon = dnd;
                    break;
                case "idle":
                    statusIcon = idle;
                    break;
                case "online":
                    statusIcon = online;
                    break;
                default:
                    statusIcon = offline;
                    break;
            }
        });

        return () => socket.close();
    });
</script>

<section id="socials">
    <h2 class="Reveal h2">My Socials</h2>
    <div class="Box Reveal links">
        {#each socials as social}
            <a href={social.link} target="_blank" rel="noopener noreferrer">
                <div class="icon">
                    <img src={social.icon} alt={social.name} />
                    {#if social.name == "Discord"}
                        <img
                            class="statusIcon"
                            src={statusIcon}
                            alt="status icon"
                        />
                    {/if}
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

    .h2 {
        position: absolute;
        transform: translateY(-7rem);
    }

    .links {
        background-color: var(--bg-col);
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    .icon {
        position: relative;

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

    .statusIcon {
        position: absolute;

        max-width: 24px;
        max-height: 24px;
        background-color: var(--bg-col);
        padding: 6px;
        border-radius: 50%;

        right: 0;
        left: auto;

        bottom: 0;
        top: auto;
    }

    @media (max-width: 768px) {
        .links {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }

        .h2 {
            transform: translateY(-16rem);
        }
    }
</style>
