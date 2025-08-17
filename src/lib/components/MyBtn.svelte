<script>
  import '$lib/global.css'
  let { children, href } = $props();
</script>

<div class="MyBtn">
  <a {href} class="link">
    {@render children()}
  </a>
</div>

<style>
  a {
    text-decoration: none;
    font-size: x-large;
  }

  a:hover {
    color: var(--text-highligt-color);
  }
  .link {
    position: relative;
    text-decoration: none;
    color: inherit;
  }

  .link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 4px;
    border-radius: 2px;
    width: 100%;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .link:hover::after {
    transform: scaleX(1);
  }
</style>
