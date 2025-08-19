<script>
    const { href, text, newTab, func } = $props();
</script>

<a
    {href}
    class="Remove-Hyper Text-Animate Button"
    target={newTab ? "_blank" : undefined}
    rel={newTab ? "noopener noreferrer" : undefined}
    onclick={func ? func : undefined}
>
    <span>{text}</span>
</a>
