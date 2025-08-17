<script>
    import "$lib/global.css";
    import "$lib/components/MyBtn.svelte";
    import MyBtn from "$lib/components/MyBtn.svelte";
    import Background from "$lib/components/Background.svelte";

    let { children } = $props()
</script>

<Background />
<header>
    <div class="headerLinksContainer">
        <ul class="headerLinks">
            <MyBtn href="/">Home</MyBtn>
            <MyBtn href="/about">About</MyBtn>
            <MyBtn href="/socials">Socials</MyBtn>
            <MyBtn href="/projects">Projects</MyBtn>
        </ul>
    </div>
</header>

<main>
    {@render children()}
</main>
