document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. GESTION DU FORMULAIRE (EMAIL) ---
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // 1. Récupération des données
            const nom = document.getElementById("nom").value;
            const emailClient = document.getElementById("email").value;
            const activite = document.getElementById("activite").value;
            const message = document.getElementById("message").value;
            
            const myEmail = "kays.benayadi@gmail.com";
            
            // 2. Préparation du sujet
            const subject = encodeURIComponent(`Demande Aperçu - ${nom}`);
            
            // 3. Préparation du corps du message
            const bodyContent = `Bonjour WebSérénité,

Je souhaiterais obtenir un aperçu pour mon site web.

Nom : ${nom}
Email : ${emailClient}
Activité : ${activite}

Besoin :
${message}

Merci d’avance pour votre retour.

Cordialement,
Envoyé depuis WebSérénité`;
            
            const body = encodeURIComponent(bodyContent);

            // 4. Détection Mobile vs Ordi
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            const btn = contactForm.querySelector(".btn-submit");
            const originalText = btn.innerHTML;

            if (isMobile) {
                // --- CAS MOBILE : APP NATIVE (Mailto) ---
                const appLink = `mailto:${myEmail}?subject=${subject}&body=${body}`;
                
                btn.innerHTML = "<i class='fa-solid fa-mobile-screen'></i> Ouverture App...";
                
                setTimeout(() => {
                    window.location.href = appLink;
                    resetBtn();
                }, 500);

            } else {
                // --- CAS ORDI : GMAIL WEB ---
                const webLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${body}`;
                
                btn.innerHTML = "<i class='fa-brands fa-google'></i> Ouverture Gmail...";
                
                setTimeout(() => {
                    window.open(webLink, '_blank');
                    resetBtn();
                }, 500);
            }

            // Fonction pour remettre le bouton normal après l'envoi
            function resetBtn() {
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    contactForm.reset();
                }, 2000);
            }
        });
    }

    // --- 2. ANIMATIONS AU SCROLL (FADE IN) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // --- 3. MODALE MENTIONS LÉGALES ---
    const modal = document.getElementById("legalModal");
    const btnOpen = document.getElementById("openModal");
    const btnClose = document.querySelector(".close-modal");

    if(btnOpen && modal) btnOpen.addEventListener("click", (e) => { e.preventDefault(); modal.style.display = "block"; });
    if(btnClose && modal) btnClose.addEventListener("click", () => { modal.style.display = "none"; });
    window.addEventListener("click", (event) => { if (event.target === modal) modal.style.display = "none"; });

    // --- 4. SCROLL SPY (MENU ACTIF) ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    function activeMenu() {
        let current = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") && link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", activeMenu);

    // --- 5. FAQ ACCORDÉON ---
    const detailsElements = document.querySelectorAll("details");

    detailsElements.forEach((detail) => {
        detail.addEventListener("click", () => {
            if (!detail.open) {
                detailsElements.forEach((otherDetail) => {
                    if (otherDetail !== detail) {
                        otherDetail.removeAttribute("open");
                    }
                });
            }
        });
    });

});