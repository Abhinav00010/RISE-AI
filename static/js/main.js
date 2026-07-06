/* ============================================================
   RISE AI — Main JavaScript
   IBM watsonx Orchestrate Powered Career Assistant
   ============================================================ */

(function () {
    "use strict";

    /* ── Navbar scroll effect ── */
    const navbar = document.querySelector(".navbar-rise");
    if (navbar) {
        const onScroll = () => {
            navbar.classList.toggle("scrolled", window.scrollY > 40);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ── Intersection observer for reveal animations ── */
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    /* ── Spawn floating hero particles ── */
    const container = document.querySelector(".hero-particles");
    if (container) {
        const count = 22;
        for (let i = 0; i < count; i++) {
            const p = document.createElement("div");
            p.className = "particle";
            const left = Math.random() * 100;
            const size = Math.random() * 2.5 + 1;
            const duration = Math.random() * 14 + 8;
            const delay = Math.random() * -14;
            const drift = (Math.random() - 0.5) * 80;
            p.style.cssText = `
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                --drift: ${drift}px;
                opacity: ${Math.random() * 0.4 + 0.1};
            `;
            container.appendChild(p);
        }
    }

    /* ── Active nav link highlighting ── */
    const currentPath = window.location.pathname;
    document.querySelectorAll(".nav-link-rise").forEach((link) => {
        const href = link.getAttribute("href");
        if (href && (currentPath === href || (href !== "/" && currentPath.startsWith(href)))) {
            link.classList.add("active");
        }
    });

    /* ── Smooth scroll for anchor buttons ── */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: "smooth" });
            }
        });
    });

    /* ── Contact form AJAX submission ── */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        const successMsg = document.getElementById("formSuccess");
        const errorMsg = document.getElementById("formError");
        const submitBtn = document.getElementById("submitBtn");

        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (!contactForm.checkValidity()) {
                contactForm.classList.add("was-validated");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending…';
            if (successMsg) successMsg.classList.add("d-none");
            if (errorMsg) errorMsg.classList.add("d-none");

            try {
                const formData = new FormData(contactForm);
                const res = await fetch("/contact", {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();

                if (data.status === "success") {
                    if (successMsg) {
                        successMsg.textContent = data.message;
                        successMsg.classList.remove("d-none");
                    }
                    contactForm.reset();
                    contactForm.classList.remove("was-validated");
                } else {
                    throw new Error("Unexpected response");
                }
            } catch {
                if (errorMsg) errorMsg.classList.remove("d-none");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
            }
        });
    }

    /* ── Staggered card reveal on scroll ── */
    const cardObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }, i * 80);
                    cardObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08 }
    );

    document.querySelectorAll(".feature-card, .tech-card, .why-card, .about-capability-card").forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.55s ease, transform 0.55s ease, border-color 0.3s, box-shadow 0.3s";
        cardObserver.observe(card);
    });

})();
