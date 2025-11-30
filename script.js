document.addEventListener('DOMContentLoaded', () => {
    createStars();
    loadData();
});

// Função para criar efeito de estrelas no fundo
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const starCount = 100; // Quantidade de estrelas

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Posição aleatória
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Tamanho aleatório
        const size = Math.random() * 2 + 1; // entre 1px e 3px
        
        // Duração da animação aleatória
        const duration = Math.random() * 3 + 2; // entre 2s e 5s

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;

        starsContainer.appendChild(star);
    }
}

// Função para carregar os dados do JSON
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        // Preencher Perfil
        document.getElementById('profile-name').textContent = data.profile.name;
        document.getElementById('profile-desc').textContent = data.profile.description;

        // Preencher Redes Sociais
        const socialContainer = document.getElementById('social-links');
        data.profile.socials.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.textContent = social.name;
            link.classList.add('social-btn');
            link.target = "_blank"; // Abrir em nova aba
            socialContainer.appendChild(link);
        });

        // Preencher Cards de Projetos
        const projectsContainer = document.getElementById('projects-container');
        
        data.projects.forEach(project => {
            // Criar o elemento card como um link <a>
            const card = document.createElement('a');
            card.href = project.url;
            card.classList.add('card');
            
            // Se for link externo, abrir em nova aba (opcional)
            // card.target = "_blank"; 

            card.innerHTML = `
                <div>
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                </div>
                <span class="status-tag">${project.status}</span>
            `;

            projectsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar o JSON:", error);
        document.getElementById('profile-desc').textContent = "Erro ao carregar dados.";
    }
}