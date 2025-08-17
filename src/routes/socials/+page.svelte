<script lang="ts">
    import { browser } from "$app/environment";
    import Box from "$lib/components/Box.svelte";
    import { onMount, onDestroy } from "svelte";

    interface Vector2 {
        x: number;
        y: number;
    }

    interface Icon {
        platform: string;
        path: string;
        link: string;
    }

    const icons: Icon[] = [
        {
            platform: "discord",
            path: "/icons/discord.svg",
            link: "https://discord.com/users/565162541748322334",
        },
        {
            platform: "github",
            path: "/icons/github.svg",
            link: "https://github.com/Revilo0509",
        },
        {
            platform: "reddit",
            path: "/icons/reddit.svg",
            link: "https://www.reddit.com/user/Revilo_EMC",
        },
        {
            platform: "tiktok",
            path: "/icons/tiktok.svg",
            link: "https://www.tiktok.com/@revilo50",
        },
        {
            platform: "twitch",
            path: "/icons/twitch.svg",
            link: "https://www.twitch.tv/revilo0509",
        },
        {
            platform: "steam",
            path: "/icons/steam.svg",
            link: "https://steamcommunity.com/profiles/76561198868489194/",
        },
    ];

    const numOfVertices = icons.length;
    const radius = 300;
    const angleIncrement = (Math.PI * 2) / numOfVertices;
    const speed = -0.0005;

    let centerElement: HTMLDivElement;
    let center: Vector2 = { x: 0, y: 0 };
    let points: Vector2[] = [];

    let baseAngle = 0;
    let frame: number;

    function calcPoint(angle: number): Vector2 {
        return {
            x: radius * Math.cos(angle) + center.y,
            y: radius * Math.sin(angle) + center.x,
        };
    }

    function recalculatePoints() {
        points = [];
        for (let i = 0; i < numOfVertices; i++) {
            const angle = baseAngle + i * angleIncrement;
            points.push(calcPoint(angle));
        }
    }

    function updateLayout() {
        const rect = centerElement.getBoundingClientRect();
        center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };
    }

    function animate() {
        baseAngle += speed;
        updateLayout();
        recalculatePoints();
        frame = requestAnimationFrame(animate);
    }

    onMount(() => {
        animate();
    });

    onDestroy(() => {
        if (browser) {
            cancelAnimationFrame(frame);
        }
    });
</script>

<div class="Content">
    <div class="Center" bind:this={centerElement}></div>
    <div class="TextBox"><Box>My Socials</Box></div>
    <div>
        {#each points as point, index}
            <div class="point" style="top: {point.x}px; left: {point.y}px;">
                <a href={icons[index].link}>
                    <img
                        src={icons[index].path}
                        alt="link to {icons[index].platform}"
                    />
                </a>
            </div>
        {/each}
    </div>
</div>

<style>
    .Content {
        width: 100%;
        height: 100%;
    }

    .Center {
        position: absolute;
        top: 50%;
        right: 50%;
    }

    .point {
        position: absolute;
        width: 100px;
        height: 100px;
        transform: translateY(-50%) translateX(-50%);
    }

    .point:hover {
        filter: brightness(1.2) drop-shadow(var(--text-color) 0px 0px 10px);
    }

    .TextBox {
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        font-size: x-large;
    }
</style>
