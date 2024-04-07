const form = document.getElementById('resumeform');
const name = document.getElementById('name');

const nextButton = document.querySelector('.btn-next');
const prevButton = document.querySelector('.btn-prev');
const submitButton = document.querySelector('.btn-sub');
const steps = document.querySelectorAll('.step');
const form_steps = document.querySelectorAll('.form-step');
let active = 1;

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            this.style.backgroundColor = 'transparent'; // Redefine a cor de fundo para transparente ao desfocar
        });
    });
});

//Adicionar bloco academico dinamicamente
document.getElementById('adicionar-bloco').addEventListener('click', function() {
    var formacaoAcademica = document.getElementById('formacao-academica');
    var novoBloco = document.querySelector('.bloco-formacao').cloneNode(true);

    // Limpar os campos de entrada dentro do novo bloco
    novoBloco.querySelectorAll('input[type="text"]').forEach(function(input) {
        input.value = '';
    });
    novoBloco.querySelectorAll('input[type="month"]').forEach(function(input) {
        input.value = '';
    });

    formacaoAcademica.appendChild(novoBloco);
    
    // Adicionar botão de remover apenas nos blocos adicionados
    if (formacaoAcademica.children.length > 1) {
        var botaoRemover = document.createElement('button');
        botaoRemover.type = 'button';
        botaoRemover.className = 'remover-bloco';
        botaoRemover.textContent = 'Remover';
        novoBloco.appendChild(botaoRemover);

        botaoRemover.addEventListener('click', function() {
            novoBloco.remove();
        });
    }
});

/*
form.addEventListener('submit', function(event) {
    // Impedir o envio padrão do formulário para evitar recarregamento da página
    event.preventDefault();

    // Coletar os dados do formulário
    const formData = new FormData(form);

    // Criar um objeto para armazenar os dados do currículo
    const resumeData = {};

    // Iterar sobre os dados do formulário e armazená-los no objeto do currículo
    for (const [key, value] of formData.entries()) {
        resumeData[key] = value;
    }

    // Exibir os dados do currículo em algum lugar na página
    displayResume(resumeData);

    steps.forEach((step, i) => {
        
            step.classList.add('active');
            form_steps[i].classList.add('active');
            console.log('i =>' + i);
        
    });

});

// Função para exibir os dados do currículo
function displayResume(resumeData) {
    const resumeContainer = document.getElementById('resume-container');
    resumeContainer.innerHTML = ''; // Limpar o conteúdo anterior

    // Criar uma lista não ordenada para exibir os dados do currículo
    const resumeList = document.createElement('ul');

    // Iterar sobre os dados do currículo e criar elementos <li> para cada campo
    for (const key in resumeData) {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${resumeData[key]}`;
        resumeList.appendChild(listItem);
    }

    // Adicionar a lista de currículo ao contêiner de currículo na página
    resumeContainer.appendChild(resumeList);
}*/

form.addEventListener('submit', function(event) {
    // Impedir o envio padrão do formulário para evitar recarregamento da página
    event.preventDefault();

    // Coletar os dados do formulário
    const formData = new FormData(form);

    // Criar um objeto para armazenar os dados do currículo
    const resumeData = {};

    // Iterar sobre os dados do formulário e armazená-los no objeto do currículo
    for (const [key, value] of formData.entries()) {
        if (resumeData[key]) {
            // Se o campo já existir no objeto de dados, trata-se de um campo de formação acadêmica
            if (!Array.isArray(resumeData[key])) {
                // Se ainda não for um array, converta-o em um
                resumeData[key] = [resumeData[key]];
            }
            // Adicione o novo valor ao array existente
            resumeData[key].push(value);
        } else {
            // Se o campo ainda não existir no objeto de dados, simplesmente atribua o valor
            resumeData[key] = value;
        }
    }

    // Exibir os dados do currículo em algum lugar na página
    displayResume(resumeData);

    // Desabilitar os inputs e remover as bordas após o envio
    disableInputs();
    hiddenButtons();

    steps.forEach((step, i) => {
            step.classList.add('active');
            form_steps[i].classList.add('active');
            console.log('i =>' + i);
    });

});

function displayResume(resumeData) {
    const resumeContainer = document.getElementById('resume-container');
    resumeContainer.innerHTML = ''; // Limpar o conteúdo anterior

    // Criar uma lista não ordenada para exibir os dados do currículo
    const resumeList = document.createElement('ul');

    // Iterar sobre os dados do currículo e criar elementos <li> para cada campo
    for (const key in resumeData) {
        const listItem = document.createElement('li');

        if (Array.isArray(resumeData[key])) {
            // Se o valor for um array (caso dos campos de formação acadêmica), criar uma sub-lista
            const sublist = document.createElement('ul');

            resumeData[key].forEach(field => {
                const subItem = document.createElement('li');
                subItem.textContent = field;
                sublist.appendChild(subItem);
            });

            const subListItem = document.createElement('li');
            subListItem.textContent = key;
            subListItem.appendChild(sublist);

            listItem.appendChild(subListItem);
        } else {
            // Se não for um array, adicionar ao item principal da lista
            listItem.textContent = `${key}: ${resumeData[key]}`;
        }
        //const secondAcademicInput = document.querySelectorAll('input[name="academic"]')[1];
        //console.log(secondAcademicInput.value)

        resumeList.appendChild(listItem);
    }

    // Adicionar a lista de currículo ao contêiner de currículo na página
    resumeContainer.appendChild(resumeList);
}

//Desabilitar inputs para apresentar o curriculo como "documento"
function disableInputs() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.disabled = true;
        input.style.border = 'none';
        input.style.background = 'none';
        input.style.backgroundColor = 'transparent';
        
        input.style.setProperty('-webkit-box-shadow', 'inset 0 0 20px 20px #ffffff', 'important');
    });
}

//Esconder os botoes apresentar o curriculo como "documento"
function hiddenButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.display = 'none';
    });
}


//Passar para próxima página
nextButton.addEventListener('click', () => {
    if(name.value == "" || name.value == null){
        console.log("haha");
    }else{
        active++;
        if (active > steps.length) {
            active = steps.length;
        }
        updateProgress();
    }
});

prevButton.addEventListener('click', () => {
    active--;
    if (active < 1) {
        active = 1;
    }
    updateProgress();
});

const updateProgress = () => {
    console.log('steps.length =>' + steps.length);
    console.log('active =>' + active);

    steps.forEach((step, i) => {
        if (i == (active - 1)) {
            step.classList.add('active');
            form_steps[i].classList.add('active');
            console.log('i =>' + i);
        } else {
            step.classList.remove('active');
            form_steps[i].classList.remove('active');
        }
    });

    if (active == 1) {
        prevButton.disabled = true;
    } else if (active == steps.length) {
        //nextButton.disabled = false;
        submitButton.hidden = false;
        nextButton.hidden = true;
    } else {
        prevButton.disabled = false;
        nextButton.hidden = false;
        submitButton.hidden = true;
    }
}