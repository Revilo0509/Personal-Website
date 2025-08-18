const denyList = ['archived', 'disabled']

export function initReveal({ threshold = 0.6, className = "visible"} = {}) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const shouldDeny = denyList.some(attr => {
                    const val = entry.target.getAttribute(`data-${attr}`);
                    return val === "true" || val === true;
                });
                if (shouldDeny) {
                    entry.target.classList.remove(className);
                    return;
                }
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