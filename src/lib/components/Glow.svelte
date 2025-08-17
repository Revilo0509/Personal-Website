<script lang="ts">
    let { children, color = "#fff" } = $props();
</script>

<div class="Glowing" style="--glow-color: {color};">
    {@render children()}
</div>

<style>
    .Glowing {
        filter: drop-shadow(var(--glow-color) 0px 0px 10px);
    }
</style>
