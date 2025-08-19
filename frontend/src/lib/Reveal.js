export function initReveal({ threshold = 0.1, className = "visible", buffer = 100 } = {}) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const el = entry.target;

            if (entry.isIntersecting) {
                // Fade in
                el.classList.remove("hiding");
                el.classList.add(className);

                if (el._hideTimeout) {
                    clearTimeout(el._hideTimeout);
                    el._hideTimeout = null;
                }
            } else {
                // Delay fade out to avoid instant disappearance
                if (el.classList.contains(className) && !el.classList.contains("hiding")) {
                    el.classList.add("hiding");

                    const duration = parseFloat(getComputedStyle(el).transitionDuration) * 1000;
                    el._hideTimeout = setTimeout(() => {
                        el.classList.remove(className, "hiding");
                        el._hideTimeout = null;
                    }, duration + buffer);
                }
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
