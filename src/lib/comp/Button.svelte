<script>
    const { href, text, newTab } = $props();
</script>

<a
    {href}
    class="Remove-Hyper Text-Animate Button"
    target={newTab ? "_blank" : undefined}
    rel={newTab ? "noopener noreferrer" : undefined}
>
    <span>{text}</span>
</a>
