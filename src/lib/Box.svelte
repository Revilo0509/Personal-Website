<script>
    const { children } = $props()
</script>

<div class="Box">
    {@render children?.()}
</div>

<style>
    .Box {
        display: inline-block;
        background-color: var(--bg-col);
        border-radius: var(--corner-radius);
        padding: calc(var(--corner-radius) * 0.75);
    }
</style>