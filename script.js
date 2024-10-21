let currentPage = 0;
const formData = {
    personalInfo: {},
    familyMembers: [],
    preExistingConditions: [],
    hospitalizations: []
};

document.addEventListener("DOMContentLoaded", function () {
    showPage(currentPage); // Muestra la primera página

    // Agregar eventos para familiares, condiciones e internamientos
    document.getElementById("addFamilyMember").addEventListener("click", addFamilyMember);
    document.getElementById("addCondition").addEventListener("click", addCondition);
    document.getElementById("addHospitalization").addEventListener("click", addHospitalization);
});

function showPage(n) {
    const pages = document.getElementsByClassName("page");
    pages[n].classList.add("active");

    // Botones de navegación
    if (n === 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }

    if (n === pages.length - 1) {
        document.getElementById("nextBtn").innerHTML = "Finalizar";
        document.getElementById("nextBtn").onclick = submitForm;
    } else {
        document.getElementById("nextBtn").innerHTML = "Siguiente";
        document.getElementById("nextBtn").onclick = nextPage;
    }
}

function nextPage() {
    const pages = document.getElementsByClassName("page");
    pages[currentPage].classList.remove("active");
    currentPage++;
    showPage(currentPage);
}

function prevPage() {
    const pages = document.getElementsByClassName("page");
    pages[currentPage].classList.remove("active");
    currentPage--;
    showPage(currentPage);
}

function addFamilyMember() {
    const familyMembersDiv = document.getElementById("familyMembers");
    const index = formData.familyMembers.length;

    const familyMemberDiv = document.createElement("div");
    familyMemberDiv.innerHTML = `
        <label for="familyName${index}">Nombre:</label>
        <input type="text" id="familyName${index}" name="familyName${index}" required>
        <label for="relationship${index}">Parentesco:</label>
        <input type="text" id="relationship${index}" name="relationship${index}" required>
        <label for="familyAge${index}">Edad:</label>
        <input type="number" id="familyAge${index}" name="familyAge${index}" required>
    `;
    familyMembersDiv.appendChild(familyMemberDiv);
    formData.familyMembers.push({});
}

function addCondition() {
    const conditionsDiv = document.getElementById("preExistingConditions");
    const index = formData.preExistingConditions.length;

    const conditionDiv = document.createElement("div");
    conditionDiv.innerHTML = `
        <label for="condition${index}">Enfermedad:</label>
        <input type="text" id="condition${index}" name="condition${index}" required>
        <label for="years${index}">Años con la Enfermedad:</label>
        <input type="number" id="years${index}" name="years${index}" required>
    `;
    conditionsDiv.appendChild(conditionDiv);
    formData.preExistingConditions.push({});
}

function addHospitalization() {
    const hospitalizationsDiv = document.getElementById("hospitalizations");
    const index = formData.hospitalizations.length;

    const hospitalizationDiv = document.createElement("div");
    hospitalizationDiv.innerHTML = `
        <label for="hospitalDate${index}">Fecha:</label>
        <input type="date" id="hospitalDate${index}" name="hospitalDate${index}" required>
        <label for="center${index}">Centro Médico:</label>
        <input type="text" id="center${index}" name="center${index}" required>
        <label for="diagnosis${index}">Diagnóstico:</label>
        <input type="text" id="diagnosis${index}" name="diagnosis${index}" required>
    `;
    hospitalizationsDiv.appendChild(hospitalizationDiv);
    formData.hospitalizations.push({});
}

function submitForm() {
    // Recopilar datos de todas las páginas
    formData.personalInfo = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value
    };

    formData.familyMembers.forEach((_, index) => {
        formData.familyMembers[index] = {
            name: document.getElementById(`familyName${index}`).value,
            relationship: document.getElementById(`relationship${index}`).value,
            age: document.getElementById(`familyAge${index}`).value
        };
    });

    formData.preExistingConditions.forEach((_, index) => {
        formData.preExistingConditions[index] = {
            disease: document.getElementById(`condition${index}`).value,
            years: document.getElementById(`years${index}`).value
        };
    });

    formData.hospitalizations.forEach((_, index) => {
        formData.hospitalizations[index] = {
            date: document.getElementById(`hospitalDate${index}`).value,
            center: document.getElementById(`center${index}`).value,
            diagnosis: document.getElementById(`diagnosis${index}`).value
        };
    });

    // Mostrar los datos en la última página
    document.getElementById("reviewData").textContent = JSON.stringify(formData, null, 2);
    nextPage();
}
