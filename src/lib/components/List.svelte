<script lang="ts">
    const {
        list,
        name,
        class: className,
    } = $props<{
        list: string[];
        name?: string;
        className?: string;
    }>();
</script>

<div class="List">
    <ul>
        {#if name != undefined}
            <li><h3>{name}</h3></li>
        {/if}
        {#each list as item, index}
            <li class={index % 2 == 0 ? "dark" : "light"}><span>{item}</span></li>
        {/each}
    </ul>
</div>

<style>
    .List {
        padding: 1rem;
        border-color: black;
    }

    ul {
        columns: auto;
        border: 4px solid var(--bg-color);
        border-radius: var(--radius);
        overflow: hidden;
    }

    li {
        list-style: none;
        font-size: larger;
        padding: 0.5rem;
    }

    span, h3 {
        margin-left: 1rem;
    }

    .dark {
        background-color: var(--bg-color);
    }
</style>
