//window.document
//    .querySelector("select[name=uf]") /*Aqui eu quero que voce procure um select com o nome = uf */
//    .addEventListener("change", () => { /* Isso aqui é uma formar de representar uma função generica, uma function arrow*/
//      console.log("mudei")
//   }) /*aqui eu adcionei um ouvidor de eventos, o que isso quer dizer, que ele vai ficar "ligado nos eventos " em especifico o change(mudança) */


function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() }) /* ou eu posso fazer assim: then ( res => res.json()) */
        .then( states => {

            for ( const state of states) { /*Aqui ele ta colocando, nao substituindo, no html todos os estados do link que eta la no fetch*/
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
    
        })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a cidade</opiton>" /* Aqui eu to limpando o cashin da cidade para ele nao acumular */
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</opition>`
            }

            citySelect.disabled = false
        })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



// Itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //console.log('ITEM ID: ', itemId)

    //Verificar se existem itens selecionados, se sim pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex((item) => {
        const itemFound = item == itemId // isso sera true ou false
        return itemFound
    })
    //se já estiver selecionado, tirar da seleção
    if ( alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDisfferent = item != itemId //false
            return itemIsDisfferent
        })

        selectedItems = filteredItems
    } else {
        //se não estiver selecionado, adiconar a seleção
        selectedItems.push(itemId)
    }

    //console.log('selectedItems: ', selectedItems)

    //atualizar o campo escondido com os itns selecionados
     collectedItems.value = selectedItems
    
}
