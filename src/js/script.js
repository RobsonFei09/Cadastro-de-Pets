// Inicia o evento de submissão do formulário
document.getElementById('pet-form').addEventListener('submit', handleFormSubmit);

/**
 * Manipula o envio do formulário
 * @param {Event} event 
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const formData = getFormData();
    if (!validateFormData(formData)) return;

    const imageInput = document.getElementById('image-pet');
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            savePetData({ ...formData, image: e.target.result });
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        const defaultImage = 'https://via.placeholder.com/60';
        savePetData({ ...formData, image: defaultImage });
    }
}

/**
 * Coleta os dados do formulário
 * @returns {Object} Dados do pet
 */
function getFormData() {
    return {
        owner: document.getElementById('name').value.trim(),
        petName: document.getElementById('pet-name').value.trim(),
        age: parseInt(document.getElementById('age').value),
        type: document.getElementById('animal-type').value,
        weight: parseFloat(document.getElementById('animal-weight').value),
        height: parseFloat(document.getElementById('animal-height').value),
        gender: document.querySelector('input[name="gender"]:checked')?.value || ''
    };
}

/**
 * Valida os dados do formulário
 * @param {Object} data 
 * @returns {boolean} true se válido
 */
function validateFormData(data) {
    if (!data.owner || !data.petName || !data.gender) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    if (isNaN(data.age) || data.age <= 0) {
        alert("A idade do pet deve ser um número positivo.");
        return false;
    }

    return true;
}

/**
 * Salva os dados do pet no localStorage e mostra as opções
 * @param {Object} pet 
 */
function savePetData(pet) {
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    pets.push(pet);
    localStorage.setItem('pets', JSON.stringify(pets));
    showSuccessMessage();
}

/**
 * Mostra mensagem de sucesso e opções após cadastro
 */
function showSuccessMessage() {
    const form = document.getElementById('pet-form');
    const resultDiv = document.getElementById('result');

    form.style.display = 'none';

    resultDiv.innerHTML = `
        <h2>Pet cadastrado com sucesso!</h2>
        <div style="margin-top: 10px;">
            <button style="margin-right: 10px;" onclick="location.reload()">Cadastrar outro pet</button>
            <button onclick="window.location.href='ranking.html'">Ir para o ranking</button>
        </div>
    `;
}
