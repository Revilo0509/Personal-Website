export function initReveal({ threshold = 0.4, className = "visible" } = {}) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                } else {
                    entry.target.classList.remove(className);
                }
            });
        },
        { threshold }
    );

    document.querySelectorAll(".Reveal").forEach((el) => observer.observe(el));
}
