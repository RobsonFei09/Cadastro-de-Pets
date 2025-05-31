document.addEventListener('DOMContentLoaded', () => {
    // Elementos da interface
    const animalList = document.getElementById('animal-list');
    const rankingList = document.getElementById('ranking-list');
    const filterSelect = document.getElementById('animal-type-filter');
    const sortSelect = document.getElementById('sort-criteria');

    // Lista fixa de animais pré-cadastrados
    const registeredPets = [
        { petName: "Rex", owner: "João", type: "Cachorro", age: 5, weight: 17, height: 25, image: "./src/assets/image/rex_pet.png" },
        { petName: "Bichano", owner: "Ana", type: "Gato", age: 3, weight: 4, height: 25, image: "/src/assets/image/bichano_pet.png" },
        { petName: "Piupiu", owner: "Carlos", type: "Pássaro", age: 2, weight: 0.4, height: 15, image: "/src/assets/image/piupiu_pet.png" },
        { petName: "Miau", owner: "Jorge", type: "Gato", age: 7, weight: 5, height: 35, image: "/src/assets/image/miau_pet.png" },
        { petName: "Pingo", owner: "Cristina", type: "Pássaro", age: 3, weight: 0.2, height: 13, image: "/src/assets/image/pingo_pet.png" },
        { petName: "Luna", owner: "Wilson", type: "Cachorro", age: 15, weight: 39, height: 60, image: "/src/assets/image/luna_pet.png" }
    ];

    // Recupera animais salvos no localStorage
    const localPets = JSON.parse(localStorage.getItem('pets')) || [];

    // Une os dois conjuntos de dados
    const allPets = [...registeredPets, ...localPets];

    /**
     * Filtra os pets com base no tipo selecionado
     */
    function getFilteredPets(filter) {
        return filter === "Todos" ? allPets : allPets.filter(pet => pet.type === filter);
    }

    /**
     * Ordena os pets com base no critério selecionado
     */
    function sortPets(pets, sortBy) {
        return [...pets].sort((a, b) => b[sortBy] - a[sortBy]);
    }

    /**
     * Cria elemento <li> com dados do pet
     */
    function createPetListItem(pet) {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${pet.petName}</strong> (${pet.type}) - ${pet.age} anos<br>
            <em>Dono:</em> ${pet.owner}<br>
            ${pet.image ? `<img src="${pet.image}" alt="${pet.petName}" width="100">` : ''}
        `;
        return li;
    }

    /**
     * Cria elemento <li> para o ranking com medalhas
     */
    function createRankingItem(pet, index) {
        const li = document.createElement('li');
        const medals = ["🥇", "🥈", "🥉"];
        const medal = medals[index] || "";

        li.innerHTML = `
            <strong>${medal} #${index + 1} - ${pet.petName}</strong><br>
            Idade: ${pet.age} anos, Peso: ${pet.weight}kg, Altura: ${pet.height}cm<br>
            ${pet.image ? `<img src="${pet.image}" alt="${pet.petName}" width="100">` : ''}
        `;
        return li;
    }

    /**
     * Atualiza as duas listas da interface: todos os pets e o ranking
     */
    function renderLists(filter = "Todos", sortBy = "weight") {
        const filteredPets = getFilteredPets(filter);
        const sortedPets = sortPets(filteredPets, sortBy);

        // Limpa listas
        animalList.innerHTML = '';
        rankingList.innerHTML = '';

        // Renderiza lista geral
        filteredPets.forEach(pet => animalList.appendChild(createPetListItem(pet)));

        // Renderiza ranking
        sortedPets.forEach((pet, index) => rankingList.appendChild(createRankingItem(pet, index)));
    }

    /**
     * Inicializa os listeners dos filtros
     */
    function setupEventListeners() {
        filterSelect.addEventListener('change', () => {
            renderLists(filterSelect.value, sortSelect.value);
        });

        sortSelect.addEventListener('change', () => {
            renderLists(filterSelect.value, sortSelect.value);
        });
    }

    // Inicializa app
    setupEventListeners();
    renderLists();
});
