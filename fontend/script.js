const form = document.getElementById('resumeform');
const name = document.getElementById('name');
const resume = document.getElementById('form-box');

const nextButton = document.querySelector('.btn-next');
const prevButton = document.querySelector('.btn-prev');
const submitButton = document.querySelector('.btn-sub');
const ckEmpresaAtual = document.getElementById('ck-company');

const progress = document.querySelectorAll('.progress-step');
const steps = document.querySelectorAll('.step');
const form_steps = document.querySelectorAll('.form-step');
let active = 1;
let atual = false;

ckEmpresaAtual.addEventListener('change', function(){
    dta_end = document.getElementById('end-contract');
    if(this.checked){
        dta_end.removeAttribute('required');
        dta_end.disabled = true;
        dta_end.value = '';
        atual = true;
    }else{
        dta_end.setAttribute('required', 'required');
        dta_end.disabled = false;
        dta_end.value = ''
    }
})

//Adicionar bloco experiencia dinamicamente
document.getElementById('btn-add-experiencia').addEventListener('click', function () {
    var experiencia = document.getElementById('esperiencia-profissional');
    var novoBloco = document.querySelector('.bloco-experiencia').cloneNode(true);

    // Limpar os campos de entrada dentro do novo bloco
    novoBloco.querySelectorAll('input[type="text"]').forEach(function (input) {
        input.value = '';
    });
    novoBloco.querySelectorAll('input[type="month"]').forEach(function (input) {
        input.value = '';
    });
    novoBloco.querySelectorAll('textarea').forEach(function (textarea) {
        textarea.value = '';
    });

    experiencia.appendChild(novoBloco);

    // Adicionar botão de remover apenas nos blocos adicionados
    if (experiencia.children.length > 1) {
        var botaoRemover = document.createElement('button');
        botaoRemover.type = 'button';
        botaoRemover.className = 'remover-bloco';
        botaoRemover.textContent = 'Remover';
        novoBloco.appendChild(botaoRemover);

        botaoRemover.addEventListener('click', function () {
            novoBloco.remove();
        });
    }
});

//Adicionar bloco academico dinamicamente
document.getElementById('btn-add-academic').addEventListener('click', function () {
    var formacaoAcademica = document.getElementById('formacao-academica');
    var novoBloco = document.querySelector('.bloco-formacao').cloneNode(true);

    // Limpar os campos de entrada dentro do novo bloco
    novoBloco.querySelectorAll('input[type="text"]').forEach(function (input) {
        input.value = '';
    });
    novoBloco.querySelectorAll('input[type="month"]').forEach(function (input) {
        input.value = '';
    });
    novoBloco.querySelectorAll('textarea').forEach(function (textarea) {
        textarea.value = '';
    });

    formacaoAcademica.appendChild(novoBloco);

    // Adicionar botão de remover apenas nos blocos adicionados
    if (formacaoAcademica.children.length > 1) {
        var botaoRemover = document.createElement('button');
        botaoRemover.type = 'button';
        botaoRemover.className = 'remover-bloco';
        botaoRemover.textContent = 'Remover';
        novoBloco.appendChild(botaoRemover);

        botaoRemover.addEventListener('click', function () {
            novoBloco.remove();
        });
    }
});

//Adicionar bloco aperfeicoamento dinamicamente
document.getElementById('btn-add-aperfeicoamento').addEventListener('click', function () {
    var aperfeicoamento = document.getElementById('aperfeicoamento');
    var novoBloco = document.querySelector('.bloco-aperfeicoamento').cloneNode(true);

    // Limpar os campos de entrada dentro do novo bloco
    novoBloco.querySelectorAll('input[type="text"]').forEach(function (input) {
        input.value = '';
    });
    novoBloco.querySelectorAll('input[type="month"]').forEach(function (input) {
        input.value = '';
    });

    aperfeicoamento.appendChild(novoBloco);

    // Adicionar botão de remover apenas nos blocos adicionados
    if (aperfeicoamento.children.length > 1) {
        var botaoRemover = document.createElement('button');
        botaoRemover.type = 'button';
        botaoRemover.className = 'remover-bloco';
        botaoRemover.textContent = 'Remover';
        novoBloco.appendChild(botaoRemover);

        botaoRemover.addEventListener('click', function () {
            novoBloco.remove();
        });
    }
});

/*
form.addEventListener('submit', function (event) {
    if(validateForm(active)){
        // Impedir o envio padrão do formulário para evitar recarregamento da página
        event.preventDefault();

        // Desabilitar os inputs e remover as bordas após o envio
        disableInputs();
        hiddenButtons();
        
        

        steps.forEach((step, i) => {
            step.classList.add('active');
            form_steps[i].classList.add('active');
            console.log('i =>' + i);
        });

        downloadButton.hidden = false;

    };
    
});*/

submitButton.addEventListener('click', function () {
    if(validateForm(active)){
        // Impedir o envio padrão do formulário para evitar recarregamento da página
        

        // Desabilitar os inputs e remover as bordas após o envio
        disableInputs();
        hiddenButtons();
        
        if(!atual){
            document.getElementById('checkbox-company').style.display = 'none';
        }
        

        steps.forEach((step, i) => {
            step.classList.add('active');
            form_steps[i].classList.add('active');
            console.log('i =>' + i);
        });

        downloadButton.hidden = false;

    };
    
});

//Desabilitar o progresso de página
function disableProgress() {
    const progress = document.querySelectorAll('.progress-step');
    progress.style.display = 'none';
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
    //downloadButton.style.display = 'initial';
}

function validateForm(pageIndex) {
    const requiredInputs = document.querySelectorAll(`.form-step:nth-child(${pageIndex}) [required]`);

    let isValid = true;

    requiredInputs.forEach(input => {
        const errorSpan = input.nextElementSibling;

        if (input.value.trim() === '' || (input.validity.patternMismatch && input.type !== 'checkbox')) {
            input.classList.add('error');
            
            if (input.type === 'email') {
                errorSpan.textContent = "Por favor insira um email valido.";
                
            } if (input.type === 'tel') {
                errorSpan.textContent = 'Por favor insira um telefone valido';
            } if (input.type === 'date') {
                errorSpan.textContent = 'Por favor insira uma data valida.';
            } else {
                errorSpan.textContent = 'O campo é obrigatório.';
            }
            
            isValid = false;
        } else {
            input.classList.remove('error');
            errorSpan.textContent = '';
        }
    });

    return isValid;
}

document.querySelectorAll('[required]').forEach(input => {
    input.addEventListener('input', function() {
        const errorSpan = input.nextElementSibling; 
        errorSpan.textContent = '';
    });
});

//Passar para próxima página
nextButton.addEventListener('click', () => {
    if(validateForm(active)){
        active++;
        if (active > steps.length) {
            active = steps.length;
        }
        updateProgress();
    }
    
});

//Voltar para página anterior
prevButton.addEventListener('click', () => {
    active--;
    if (active < 1) {
        active = 1;
    }
    updateProgress();
});


//Atualizar o número de página e botões visiveis e habilitados da página
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

/*
downloadButton.addEventListener('click', function () {
    
});

function generatePDF(data) {

}*/