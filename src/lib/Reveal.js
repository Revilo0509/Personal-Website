export function initReveal({ threshold = 0.5, className = "visible" } = {}) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const el = entry.target;

            if (entry.isIntersecting) {
                // Show element
                el.classList.remove("hiding");
                el.classList.add(className);
            } else if (el.classList.contains(className) && !el.classList.contains("hiding")) {
                // Start hiding
                el.classList.add("hiding");

                // Remove classes after transition ends
                const onTransitionEnd = (e) => {
                    if (e.target === el) {
                        el.classList.remove(className, "hiding");
                        el.removeEventListener("transitionend", onTransitionEnd);
                    }
                };
                el.addEventListener("transitionend", onTransitionEnd);
            }
        });
    }, { threshold });

    document.querySelectorAll(".Reveal").forEach((el) => observer.observe(el));

    const mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach((node) => {
                if (!(node instanceof HTMLElement)) return;
                if (node.classList.contains("Reveal")) observer.observe(node);
                node.querySelectorAll?.(".Reveal").forEach((child) => observer.observe(child));
            });
        }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
}
