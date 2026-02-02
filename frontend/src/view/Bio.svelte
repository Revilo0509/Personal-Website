<script>
  import Button from "$lib/comp/Button.svelte";
</script>

<section id="bio" class="Reveal">
  <div class="wrapper">
    <div class="Box">
      <h4>Hi! I'm Revilo.</h4>
      I'm a electionics, homelab and software developer hobbist, I mostly use python
      and C++ but I also know LUA, Html, CSS and JS/TS. But I have dipped my toes
      into C# and Java. I also love to play games specially Minecraft.

      <div class="Buttons">
        <Button href="#repositories" text="Check out my Repositories!" />
        <Button href="#socials" text="Check out my Socials!" />
      </div>
    </div>
  </div>
</section>

<style>
  section {
    display: flex;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .Box {
    margin: 6rem;
    min-width: 280px;
    max-width: 400px;
    padding: 2rem;
  }

  .Buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1rem;
    gap: 2rem;
  }
</style>
