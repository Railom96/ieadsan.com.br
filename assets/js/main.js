const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-nav");

window.addEventListener("scroll", () => {
  if (!header.classList.contains("solid")) {
    header.classList.toggle("scrolled", window.scrollY > 60);
  }
});

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menu.classList.toggle("open", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelectorAll("[data-year]").forEach((element) => (element.textContent = new Date().getFullYear()));

const instagramFeed = document.querySelector("[data-instagram-feed]");

if (instagramFeed) {
  fetch("assets/data/instagram.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Feed indisponível");
      return response.json();
    })
    .then(({ posts = [] }) => {
      if (!posts.length) return;

      instagramFeed.replaceChildren(
        ...posts.map((post) => {
          const link = document.createElement("a");
          link.className = "instagram-post";
          link.href = post.permalink;
          link.target = "_blank";
          link.rel = "noreferrer";
          link.setAttribute("aria-label", "Abrir publicação no Instagram");

          const image = document.createElement("img");
          image.src = post.imageUrl;
          image.alt = post.caption.slice(0, 120);
          image.loading = "lazy";
          image.referrerPolicy = "no-referrer";

          const overlay = document.createElement("span");
          overlay.textContent = post.mediaType === "VIDEO" ? "Assistir no Instagram ↗" : "Ver no Instagram ↗";
          link.append(image, overlay);
          return link;
        })
      );
    })
    .catch(() => {});
}
