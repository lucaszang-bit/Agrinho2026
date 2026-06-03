document.addEventListener("DOMContentLoaded", () => {
    
    // 1. CONTROLE DA NAVBAR (Fica sólida ao rolar a página)
    const navbar = document.querySelector(".navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. ANIMAÇÃO AO ROLAR A PÁGINA (Efeito Reveal)
    // Seleciona os elementos que vão surgir na tela
    const cards = document.querySelectorAll(".card");
    const techText = document.querySelector(".tech-text");
    const techImg = document.querySelector(".tech-img");
    
    // Agrupa e adiciona a classe base de animação
    const elementsToAnimate = [...cards];
    if (techText) elementsToAnimate.push(techText);
    if (techImg) elementsToAnimate.push(techImg);
    
    elementsToAnimate.forEach(el => el.classList.add("reveal"));

    // Função que verifica a posição do scroll para ativar a animação
    const checkReveal = () => {
        const triggerPoint = window.innerHeight * 0.85;

        elementsToAnimate.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerPoint) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", checkReveal);
    checkReveal(); // Executa uma vez logo ao carregar a página

    // 3. CONTADOR ANIMADO PARA AS ESTATÍSTICAS
    const stats = document.querySelectorAll(".stat-number");
    const statsSection = document.querySelector(".stats-section");
    let animated = false;

    const animateCounters = () => {
        if (!statsSection) return;

        const sectionTop = statsSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight;

        // Dispara a contagem quando a seção aparece na tela
        if (sectionTop < triggerPoint && !animated) {
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute("data-target"));
                let count = 0;
                const speed = target / 50; // Define a velocidade do incremento

                const updateCount = () => {
                    if (count < target) {
                        count += Math.ceil(speed);
                        if (count > target) count = target;
                        
                        // Adiciona o símbolo de porcentagem se necessário
                        if (stat.getAttribute("data-target") === "45" || stat.getAttribute("data-target") === "85") {
                            stat.innerText = count + "%";
                        } else {
                            stat.innerText = count;
                        }
                        
                        setTimeout(updateCount, 25);
                    }
                };
                updateCount();
            });
            animated = true; // Impede que a animação rode repetidamente
        }
    };

    window.addEventListener("scroll", animateCounters);
    animateCounters(); // Executa caso a seção já esteja visível inicialmente
});
