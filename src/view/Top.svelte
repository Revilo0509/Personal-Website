<section id="top">
  <a href="#bio" class="card Remove-Hyper Reveal Text-Animate">
    <div class="Box Box-Animate">
      <img
        src="https://cdn.discordapp.com/avatars/565162541748322334/553b8be435af38621e2dc23fa179e76b.webp?size=128"
        alt="profile"
      />
      <h3>Revilo0509</h3>
    </div>
  </a>
  <a class="bar Reveal" href="#bio" aria-label="bio button"><div></div></a>
</section>

<style lang="scss">
  section {
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card {
    margin-top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Box-Animate {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    border-radius: 50%;
    width: 10rem;
  }

  h3 {
    margin-top: 1rem;
  }

  .bar {
    padding: 0.5rem;
    margin-top: auto;
    margin-bottom: 20px;

    transition: 200ms ease-in-out;
    &:hover {
      transform: scale(1.03);
    }

    div {
      background-color: var(--hl-col);
      width: 30vw;
      height: 8px;
      border-radius: 4px;
    }
  }
</style>
