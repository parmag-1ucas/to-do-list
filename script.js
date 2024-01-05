function atualizarDataHora() {
    const dataHoraAtual = new Date();
    const dia = String(dataHoraAtual.getDate()).padStart(2, '0');
    const mes = String(dataHoraAtual.getMonth() + 1).padStart(2, '0');
    const ano = String(dataHoraAtual.getFullYear());
    const hora = String(dataHoraAtual.getHours()).padStart(2, '0');
    const minutos = String(dataHoraAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataHoraAtual.getSeconds()).padStart(2, '0');
    const dataHoraFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;

    const header = document.getElementById('headerData');

    header.innerHTML = '';

    const paragrafoDataHora = document.createElement('p');
    paragrafoDataHora.textContent = `${dataHoraFormatada}`;

    header.appendChild(paragrafoDataHora);
}

atualizarDataHora();
setInterval(atualizarDataHora, 1000);
//
const localStorageName = 'to-do-list-gn'

function validateNewTask(){
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask()
{
    let input = document.getElementById('input-new-task')
    input.style.border = ''

    if(!input.value)
    {
        input.style.border = '2px solid red'
        alert('Por favor insira um elemento!')
    }
    else if(validateNewTask())
    {
        alert('Já existe uma tarefa com a mesma descrição!')
    }
    else
    {
        let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
        values.push({
            name:input.value
        })
        localStorage.setItem(localStorageName,JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let list = document.getElementById('tdl')
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++)
    {
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
      </svg></button></li>`
    }
}

function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageName,JSON.stringify(values))
    showValues()
}

showValues()