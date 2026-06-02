document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".mobile-menu");
    const closeBtn = document.querySelector(".mobile-menu .close");
    const links = document.querySelectorAll("a[href^='#']"); // все якорные ссылки
    const contactForm = document.getElementById("contact-form");

    // Открыть меню
    if (burger && menu && closeBtn) {
        burger.addEventListener("click", () => {
            menu.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        // Закрыть меню по кнопке ✕
        closeBtn.addEventListener("click", () => {
            menu.classList.remove("active");
            document.body.style.overflow = "";
        });

        // Закрыть при клике на фон
        menu.addEventListener("click", (e) => {
            if (e.target === menu) {
                menu.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }

    // Плавная прокрутка с учётом высоты шапки
    links.forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");

            // Игнорируем внешние ссылки
            if (!href.startsWith("#")) return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (!target) return;

            const headerOffset = 80; // высота твоей шапки (измени, если нужно)
            const elementPosition = target.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Закрываем меню после перехода
            if (menu.classList.contains("active")) {
                menu.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    });

    // Обработка формы контакта
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            // Formspree обработает запрос автоматически
            // При необходимости можно добавить свою обработку
            const submitBtn = contactForm.querySelector("button[type='submit']");
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = "0.6";
                submitBtn.innerHTML = "<span>Відправлення...</span>";
            }
        });
    }
});
