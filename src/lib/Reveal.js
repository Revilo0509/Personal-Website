export function initReveal({ threshold = 0.6, className = "visible" } = {}) {
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

    // Observe all existing .Reveal elements
    document.querySelectorAll(".Reveal").forEach((el) => observer.observe(el));

    // Watch for new nodes being added
    const mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach((node) => {
                if (!(node instanceof HTMLElement)) return;

                // If the node itself has .Reveal
                if (node.classList.contains("Reveal")) {
                    observer.observe(node);
                }

                // If it contains children with .Reveal
                node.querySelectorAll?.(".Reveal").forEach((child) => {
                    observer.observe(child);
                });
            });
        }
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
}
