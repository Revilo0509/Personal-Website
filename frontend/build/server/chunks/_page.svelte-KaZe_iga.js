import { a as attr, e as escape_html } from './attributes-DdgnkL0p.js';
import { u as push, y as ensure_array_like, w as pop } from './index-DSdJROFa.js';

function Button($$payload, $$props) {
  const { href, text, newTab, func } = $$props;
  $$payload.out.push(`<a${attr("href", href)} class="Remove-Hyper Text-Animate Button"${attr("target", newTab ? "_blank" : void 0)}${attr("rel", newTab ? "noopener noreferrer" : void 0)}><span>${escape_html(text)}</span></a>`);
}
function Bio($$payload) {
  $$payload.out.push(`<section id="bio" class="Reveal svelte-1jx2w98"><div class="wrapper svelte-1jx2w98"><div class="Box svelte-1jx2w98"><h4>Hi! I'm Revilo.</h4> I'm a electionics, homelab and software developer hobbist, I mostly use python
      and C++ but I also know LUA, Html, CSS and JS/TS. But I have dipped my toes
      into C# and Java. I also love to play games specially Minecraft. <div class="Buttons svelte-1jx2w98">`);
  Button($$payload, { href: "#repositories", text: "Check out my Repositories!" });
  $$payload.out.push(`<!----> `);
  Button($$payload, { href: "#socials", text: "Check out my Socials!" });
  $$payload.out.push(`<!----></div></div></div></section>`);
}
const fork = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20640%20640'%20fill='%23f1f1f1'%3e%3c!--!Font%20Awesome%20Free%20v7.0.0%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202025%20Fonticons,%20Inc.--%3e%3cpath%20d='M176%20168C189.3%20168%20200%20157.3%20200%20144C200%20130.7%20189.3%20120%20176%20120C162.7%20120%20152%20130.7%20152%20144C152%20157.3%20162.7%20168%20176%20168zM256%20144C256%20176.8%20236.3%20205%20208%20217.3L208%20240C208%20266.5%20229.5%20288%20256%20288L384%20288C410.5%20288%20432%20266.5%20432%20240L432%20217.3C403.7%20205%20384%20176.8%20384%20144C384%2099.8%20419.8%2064%20464%2064C508.2%2064%20544%2099.8%20544%20144C544%20176.8%20524.3%20205%20496%20217.3L496%20240C496%20301.9%20445.9%20352%20384%20352L352%20352L352%20422.7C380.3%20435%20400%20463.2%20400%20496C400%20540.2%20364.2%20576%20320%20576C275.8%20576%20240%20540.2%20240%20496C240%20463.2%20259.7%20435%20288%20422.7L288%20352L256%20352C194.1%20352%20144%20301.9%20144%20240L144%20217.3C115.7%20205%2096%20176.8%2096%20144C96%2099.8%20131.8%2064%20176%2064C220.2%2064%20256%2099.8%20256%20144zM464%20168C477.3%20168%20488%20157.3%20488%20144C488%20130.7%20477.3%20120%20464%20120C450.7%20120%20440%20130.7%20440%20144C440%20157.3%20450.7%20168%20464%20168zM344%20496C344%20482.7%20333.3%20472%20320%20472C306.7%20472%20296%20482.7%20296%20496C296%20509.3%20306.7%20520%20320%20520C333.3%20520%20344%20509.3%20344%20496z'/%3e%3c/svg%3e";
const star = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20640%20640'%20fill='%23f1f1f1'%3e%3c!--!Font%20Awesome%20Free%20v7.0.0%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202025%20Fonticons,%20Inc.--%3e%3cpath%20d='M341.5%2045.1C337.4%2037.1%20329.1%2032%20320.1%2032C311.1%2032%20302.8%2037.1%20298.7%2045.1L225.1%20189.3L65.2%20214.7C56.3%20216.1%2048.9%20222.4%2046.1%20231C43.3%20239.6%2045.6%20249%2051.9%20255.4L166.3%20369.9L141.1%20529.8C139.7%20538.7%20143.4%20547.7%20150.7%20553C158%20558.3%20167.6%20559.1%20175.7%20555L320.1%20481.6L464.4%20555C472.4%20559.1%20482.1%20558.3%20489.4%20553C496.7%20547.7%20500.4%20538.8%20499%20529.8L473.7%20369.9L588.1%20255.4C594.5%20249%20596.7%20239.6%20593.9%20231C591.1%20222.4%20583.8%20216.1%20574.8%20214.7L415%20189.3L341.5%2045.1z'/%3e%3c/svg%3e";
function RepoCard($$payload, $$props) {
  push();
  const { repo } = $$props;
  $$payload.out.push(`<div class="Reveal"><div class="Box Box-Animate svelte-4czlxv"><div class="container"><h5 class="svelte-4czlxv">${escape_html(repo.name)}</h5> <div class="stats svelte-4czlxv"><span class="svelte-4czlxv"><img${attr("src", star)} alt="Star Icon" class="svelte-4czlxv"/> <div>${escape_html(repo.stargazers_count)}</div></span> <span class="svelte-4czlxv"><img${attr("src", fork)} alt="Fork Icon" class="svelte-4czlxv"/> <div>${escape_html(repo.forks_count)}</div></span></div> `);
  Button($$payload, {
    href: repo.homepage ? repo.homepage : repo.html_url,
    text: repo.homepage ? "Go to Site" : "Go to Repo",
    newTab: true
  });
  $$payload.out.push(`<!----></div></div></div>`);
  pop();
}
function Repositories($$payload, $$props) {
  push();
  let repos = [];
  const LOAD_AMOUNT = 20;
  let visibleCount = LOAD_AMOUNT;
  function loadMore() {
    visibleCount += LOAD_AMOUNT;
  }
  $$payload.out.push(`<section id="repositories"><h2 class="Reveal svelte-1xscz9i">My Repositories</h2> `);
  {
    $$payload.out.push("<!--[!-->");
    if (repos.length === 0) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<p class="svelte-1xscz9i">Loading...</p>`);
    } else {
      $$payload.out.push("<!--[!-->");
      const each_array = ensure_array_like(repos.slice(0, visibleCount));
      $$payload.out.push(`<div class="repoGridWrapper svelte-1xscz9i"><ul class="repoGrid svelte-1xscz9i"><!--[-->`);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let repo = each_array[$$index];
        $$payload.out.push(`<li>`);
        RepoCard($$payload, { repo });
        $$payload.out.push(`<!----></li>`);
      }
      $$payload.out.push(`<!--]--></ul></div> `);
      if (visibleCount < repos.length) {
        $$payload.out.push("<!--[-->");
        $$payload.out.push(`<div class="loadMoreWrapper svelte-1xscz9i">`);
        Button($$payload, { text: "Load More", func: loadMore });
        $$payload.out.push(`<!----></div>`);
      } else {
        $$payload.out.push("<!--[!-->");
      }
      $$payload.out.push(`<!--]-->`);
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]--></section>`);
  pop();
}
const offline = "/_app/immutable/assets/offline.B54GJVb4.png";
const discord = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20fill='%23f1f1f1'%3e%3ctitle%3eFind%20me%20on%20Discord%3c/title%3e%3cpath%20d='M13.545%202.907a13.2%2013.2%200%200%200-3.257-1.011.05.05%200%200%200-.052.025c-.141.25-.297.577-.406.833a12.2%2012.2%200%200%200-3.658%200%208%208%200%200%200-.412-.833.05.05%200%200%200-.052-.025c-1.125.194-2.22.534-3.257%201.011a.04.04%200%200%200-.021.018C.356%206.024-.213%209.047.066%2012.032q.003.022.021.037a13.3%2013.3%200%200%200%203.995%202.02.05.05%200%200%200%20.056-.019q.463-.63.818-1.329a.05.05%200%200%200-.01-.059l-.018-.011a9%209%200%200%201-1.248-.595.05.05%200%200%201-.02-.066l.015-.019q.127-.095.248-.195a.05.05%200%200%201%20.051-.007c2.619%201.196%205.454%201.196%208.041%200a.05.05%200%200%201%20.053.007q.121.1.248.195a.05.05%200%200%201-.004.085%208%208%200%200%201-1.249.594.05.05%200%200%200-.03.03.05.05%200%200%200%20.003.041c.24.465.515.909.817%201.329a.05.05%200%200%200%20.056.019%2013.2%2013.2%200%200%200%204.001-2.02.05.05%200%200%200%20.021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03%200%200%200-.02-.019m-8.198%207.307c-.789%200-1.438-.724-1.438-1.612s.637-1.613%201.438-1.613c.807%200%201.45.73%201.438%201.613%200%20.888-.637%201.612-1.438%201.612m5.316%200c-.788%200-1.438-.724-1.438-1.612s.637-1.613%201.438-1.613c.807%200%201.451.73%201.438%201.613%200%20.888-.631%201.612-1.438%201.612'%3e%3c/path%3e%3c/svg%3e";
const github = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20fill='%23f1f1f1'%3e%3ctitle%3eCheck%20out%20my%20GitHub%3c/title%3e%3cpath%20d='M8%200C3.58%200%200%203.58%200%208c0%203.54%202.29%206.53%205.47%207.59.4.07.55-.17.55-.38%200-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01%201.08.58%201.23.82.72%201.21%201.87.87%202.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95%200-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12%200%200%20.67-.21%202.2.82.64-.18%201.32-.27%202-.27s1.36.09%202%20.27c1.53-1.04%202.2-.82%202.2-.82.44%201.1.16%201.92.08%202.12.51.56.82%201.27.82%202.15%200%203.07-1.87%203.75-3.65%203.95.29.25.54.73.54%201.48%200%201.07-.01%201.93-.01%202.2%200%20.21.15.46.55.38A8.01%208.01%200%200%200%2016%208c0-4.42-3.58-8-8-8'%3e%3c/path%3e%3c/svg%3e";
const reddit = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20fill='%23f1f1f1'%3e%3ctitle%3eFind%20me%20on%20Reddit%3c/title%3e%3cpath%20d='M6.167%208a.83.83%200%200%200-.83.83c0%20.459.372.84.83.831a.831.831%200%200%200%200-1.661m1.843%203.647c.315%200%201.403-.038%201.976-.611a.23.23%200%200%200%200-.306.213.213%200%200%200-.306%200c-.353.363-1.126.487-1.67.487-.545%200-1.308-.124-1.671-.487a.213.213%200%200%200-.306%200%20.213.213%200%200%200%200%20.306c.564.563%201.652.61%201.977.61zm.992-2.807c0%20.458.373.83.831.83s.83-.381.83-.83a.831.831%200%200%200-1.66%200z'%3e%3c/path%3e%3cpath%20d='M16%208A8%208%200%201%201%200%208a8%208%200%200%201%2016%200m-3.828-1.165c-.315%200-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501%201.738.372a.83.83%200%201%200%20.83-.869.83.83%200%200%200-.744.468l-1.938-.41a.2.2%200%200%200-.153.028.2.2%200%200%200-.086.134l-.592%202.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163%201.163%200%200%200-.478%202.224q-.03.17-.029.353c0%201.795%202.091%203.256%204.669%203.256s4.668-1.451%204.668-3.256c0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069%200-.65-.525-1.165-1.165-1.165'%3e%3c/path%3e%3c/svg%3e";
const steam = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='%23f1f1f1'%3e%3ctitle%3eCheck%20out%20my%20Steam%3c/title%3e%3cpath%20d='M11.979%200C5.678%200%200.511%204.86%200.022%2011.037l6.432%202.658c0.545%20-0.371%201.203%20-0.59%201.912%20-0.59%200.063%200%200.125%200.004%200.188%200.006l2.861%20-4.142V8.91c0%20-2.495%202.028%20-4.524%204.524%20-4.524%202.494%200%204.524%202.031%204.524%204.527s-2.03%204.525%20-4.524%204.525h-0.105l-4.076%202.911c0%200.052%200.004%200.105%200.004%200.159%200%201.875%20-1.515%203.396%20-3.39%203.396%20-1.635%200%20-3.016%20-1.173%20-3.331%20-2.727L0.436%2015.27C1.862%2020.307%206.486%2024%2011.979%2024c6.627%200%2011.999%20-5.373%2011.999%20-12S18.605%200%2011.979%200zM7.54%2018.21l-1.473%20-0.61c0.262%200.543%200.714%200.999%201.314%201.25%201.297%200.539%202.793%20-0.076%203.332%20-1.375%200.263%20-0.63%200.264%20-1.319%200.005%20-1.949s-0.75%20-1.121%20-1.377%20-1.383c-0.624%20-0.26%20-1.29%20-0.249%20-1.878%20-0.03l1.523%200.63c0.956%200.4%201.409%201.5%201.009%202.455%20-0.397%200.957%20-1.497%201.41%20-2.454%201.012H7.54zm11.415%20-9.303c0%20-1.662%20-1.353%20-3.015%20-3.015%20-3.015%20-1.665%200%20-3.015%201.353%20-3.015%203.015%200%201.665%201.35%203.015%203.015%203.015%201.663%200%203.015%20-1.35%203.015%20-3.015zm-5.273%20-0.005c0%20-1.252%201.013%20-2.266%202.265%20-2.266%201.249%200%202.266%201.014%202.266%202.266%200%201.251%20-1.017%202.265%20-2.266%202.265%20-1.253%200%20-2.265%20-1.014%20-2.265%20-2.265z'%3e%3c/path%3e%3c/svg%3e";
const tiktok = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='%23f1f1f1'%3e%3ctitle%3eCheck%20out%20my%20Tiktok%3c/title%3e%3cpath%20d='M19.589%206.686a4.793%204.793%200%200%201-3.77-4.245V2h-3.445v13.672a2.896%202.896%200%200%201-5.201%201.743l-.002-.001.002.001a2.895%202.895%200%200%201%203.183-4.51v-3.5a6.329%206.329%200%200%200-5.394%2010.692%206.33%206.33%200%200%200%2010.857-4.424V8.687a8.182%208.182%200%200%200%204.773%201.526V6.79a4.831%204.831%200%200%201-1.003-.104z'/%3e%3c/svg%3e";
const twitch = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%20fill='%23f1f1f1'%3e%3ctitle%3eCheck%20out%20my%20Twitch%3c/title%3e%3cpath%20d='M5.7%200L1.4%2010.985V55.88h15.284V64h8.597l8.12-8.12h12.418l16.716-16.716V0H5.7zm51.104%2036.3L47.25%2045.85H31.967l-8.12%208.12v-8.12H10.952V5.73h45.85V36.3zM47.25%2016.716v16.716h-5.73V16.716h5.73zm-15.284%200v16.716h-5.73V16.716h5.73z'%20fill-rule='evenodd'/%3e%3c/svg%3e";
function Socials($$payload, $$props) {
  push();
  const socials = [
    {
      name: "Discord",
      icon: discord,
      link: "https://discord.com/users/565162541748322334"
    },
    {
      name: "GitHub",
      icon: github,
      link: "https://github.com/Revilo0509"
    },
    {
      name: "Reddit",
      icon: reddit,
      link: "https://www.reddit.com/user/Revilo_EMC/"
    },
    {
      name: "Steam",
      icon: steam,
      link: "https://store.steampowered.com/"
    },
    {
      name: "TikTok",
      icon: tiktok,
      link: "https://www.tiktok.com/@revilo50"
    },
    {
      name: "Twitch",
      icon: twitch,
      link: "https://www.twitch.tv/revilo0509"
    }
  ];
  let statusIcon = offline;
  const each_array = ensure_array_like(socials);
  $$payload.out.push(`<section id="socials" class="svelte-19a9i9o"><h2 class="Reveal h2 svelte-19a9i9o">My Socials</h2> <div class="Box Reveal links svelte-19a9i9o"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let social = each_array[$$index];
    $$payload.out.push(`<a${attr("href", social.link)} target="_blank" rel="noopener noreferrer"><div class="icon svelte-19a9i9o"><img${attr("src", social.icon)}${attr("alt", social.name)} class="svelte-19a9i9o"/> `);
    if (social.name == "Discord") {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<img class="statusIcon svelte-19a9i9o"${attr("src", statusIcon)} alt="status icon"/>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div></a>`);
  }
  $$payload.out.push(`<!--]--></div></section>`);
  pop();
}
function Top($$payload) {
  $$payload.out.push(`<section id="top" class="svelte-vtagb4"><a href="#bio" class="card Remove-Hyper Reveal"><div class="Text-Animate"><div class="Box Box-Animate svelte-vtagb4"><img src="https://cdn.discordapp.com/avatars/565162541748322334/553b8be435af38621e2dc23fa179e76b.webp?size=128" alt="profile" class="svelte-vtagb4"/> <h3 class="svelte-vtagb4">Revilo0509</h3></div></div></a></section>`);
}
function _page($$payload) {
  $$payload.out.push(`<main>`);
  Top($$payload);
  $$payload.out.push(`<!----> `);
  Bio($$payload);
  $$payload.out.push(`<!----> `);
  Socials($$payload);
  $$payload.out.push(`<!----> `);
  Repositories($$payload);
  $$payload.out.push(`<!----></main>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-KaZe_iga.js.map
