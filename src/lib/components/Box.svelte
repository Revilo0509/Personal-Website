<script lang="ts">

    const { children, class: customClass = '', color = 'var(--bg-highlight-color)', id: customId = '', hoverEffect = false, ...restProps } = $props<{
        children: any,
        class?: string,
        id?: string,
        color?: string,
        hoverEffect?: boolean
    }>();

    const combinedClass = $state(`Box ${customClass} ${hoverEffect ? 'HoveredBox' : ''}`.trim());
</script>

<div class={combinedClass} id={customId} style='background-color: {color};' {...restProps}>
    {@render children()}
</div>

<style>
    .Box {
        border-radius: var(--radius);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
        padding: 1.5rem;
        margin: 1.5rem;
    }


    .HoveredBox {
        transition: transform 0.2s ease-out;
    }

    .HoveredBox:hover {
        transform: translateY(-0.5rem);
    }
</style>
