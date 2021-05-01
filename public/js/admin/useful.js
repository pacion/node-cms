const popup = (window, choice) =>{
    if(choice == undefined){
        window.classList.toggle("floatFormVisible");
        window.classList.toggle("floatFormInvisible");
    }
    else{
        if(choice == 1){
            window.classList.remove("floatFormInvisible");
            window.classList.add("floatFormVisible");
        }
        else if(choice == 0){
            window.classList.remove("floatFormVisible");
            window.classList.add("floatFormInvisible");
        }
    }
}


const readOnlyEnabled = (input) => {
    input.addEventListener('dblclick', () => {
        input.readOnly = false;
        let td = input.parentElement;
        let finish = td.querySelector("button");
        finish.setAttribute("class", "visible confirm");
        tmp = input.value;
    })
}
const selectPrevValue = (select) => {
    select.addEventListener('focus', () => {
        tmp2 = select.selectedIndex;
        let td = select.parentElement;
        let finish = td.querySelector("button");
        finish.setAttribute("class", "visible confirm");
    })
    select.addEventListener('focusout', () => {
        setTimeout(() => {
            let td = select.parentElement;
            let finish = td.querySelector("button");
            finish.setAttribute("class", "invisible confirm");
        }, 100);
        setTimeout(() => {
            select.selectedIndex = tmp2;
        }, 300);
    })
}
const readOnlyDisabled = (input) => {
    input.readOnly = true;
    let td = input.parentElement;
    let finish = td.querySelector("button");
    finish.setAttribute("class", "invisible confirm");
}
const readOnlyChangeToEnabled = (input) => {
    if(input.readOnly == false){
        input.readOnly = true;
        let td = input.parentElement;
        let finish = td.querySelector("button");
        finish.setAttribute("class", "invisible confirm");
        input.value = tmp;
    }
}

const deleteSelects = (from, to) => {
    for(let i = from; i <= to; i++) {
        if(document.querySelector("#position-lvl" + i)){
            document.querySelector("#position-lvl" + i).remove();
        } 
    }
}

const createSelect = (lvl) => {
    let placeLvl = document.createElement("select");
    placeLvl.setAttribute("id", "position-lvl"+lvl);
    placeLvl.setAttribute("name", "lvl"+lvl);
    document.querySelector("#pos-cont").appendChild(placeLvl);

    if(lvl != 1){
        let option = document.createElement("option");
        option.value = '';
        option.innerHTML = '<--';
        placeLvl.appendChild(option);
    }

    return placeLvl;
}

const generateColorfulPositionSelect = (data, type) => {
    const container = document.querySelector('#type-container');
    const div = document.querySelector('#pos-cont');
    if(type != "poziom 1") {
        div.innerHTML = '';
        let placeLvl1 = document.createElement('select');
        placeLvl1.setAttribute("id", "position");
        placeLvl1.setAttribute("name", "lvl1");
        div.appendChild(placeLvl1);
        placeLvl1 = document.querySelector('#position');
        placeLvl1.innerHTML = '';

        let lvls1 = Object.getOwnPropertyNames(data.colorfulMenu);
        for(const lvl1 of lvls1) {
            let option = document.createElement("option");
            option.value = lvl1;
            option.innerHTML = lvl1;
            placeLvl1.appendChild(option);

            placeLvl1.addEventListener('change', () => {
                deleteSelects(2, 3);
                
                let placeLvl2 = document.createElement("select");
                placeLvl2.setAttribute("id", "position-lvl2");
                placeLvl2.setAttribute("name", "lvl2");
                document.querySelector("#pos-cont").appendChild(placeLvl2);

                let lvls2 = Object.getOwnPropertyNames(data.colorfulMenu[placeLvl1.value]);

                let pierwszyObrot = true;
                for(const lvl2 of lvls2) {
                    if(lvl2 !== 'description' && lvl2 !== 'order' && lvl2 !== 'target' && lvl2 !== '_id') {
                        let option2 = document.createElement("option");
                        
                        if( type.includes('bąbel') && lvl2 === 'test' ) {
                            option2.value = 'test';
                            option2.innerHTML = '<--';
                            placeLvl2.appendChild(option2);  
                        }
                        else if( type.includes('poziom 2') && pierwszyObrot ) {
                            option2.value = '';
                            option2.innerHTML = '<--';
                            pierwszyObrot = false;
                            placeLvl2.appendChild(option2); 
                        }
                        else if(type.includes('bąbel') && lvl2 !== 'test'){
                            option2.value = lvl2;
                            option2.innerHTML = lvl2;
                            placeLvl2.appendChild(option2);  
                        } 
                    }
                }  
            })
        }
        container.innerHTML = '';
        if(type === 'poziom 2') {
            container.innerHTML = `
            <label for="description">Opis</label>
            <input type="text" name="description" id="description">
            `
        }
        
    }
    else{
        container.innerHTML = '';
        div.innerHTML = '';
    }
}

const generateInputs = (data, type) => {
    generateColorfulPositionSelect(data, type);
}

const generatePositionSelect = (data, type) => {
    if(type != "poziom 1"){
        const div = document.querySelector('#pos-cont');
        div.innerHTML = '';
        let placeLvl1 = document.createElement('select');
        placeLvl1.setAttribute("id", "position");
        placeLvl1.setAttribute("name", "lvl1");
        div.appendChild(placeLvl1);
        placeLvl1 = document.querySelector('#position');
        placeLvl1.innerHTML = '';
        
        deleteSelects(2, 3);
    
        let lvls1 = Object.getOwnPropertyNames(data.menu);
        for(const lvl1 of lvls1) {
            let option = document.createElement("option");
            option.value = lvl1;
            option.innerHTML = lvl1;
            placeLvl1.appendChild(option);
        }
        
        placeLvl1.addEventListener('change', () => {
            deleteSelects(2, 3);
                
            let placeLvl2 = document.createElement("select");
            placeLvl2.setAttribute("id", "position-lvl2");
            placeLvl2.setAttribute("name", "lvl2");
            document.querySelector("#pos-cont").appendChild(placeLvl2);
            let option2n = document.createElement("option");
            option2n.value = '';
            option2n.innerHTML = '<--';
            placeLvl2.appendChild(option2n);
    
            let lvls2 = Object.getOwnPropertyNames(data.menu[placeLvl1.value]);
            for(const lvl2 of lvls2) {
                let kategoria = 0;
                for(const doc of data.documents) {
                    let nameArr = doc.path.split('.');
                    let name = nameArr[nameArr.length - 1];

                    if(name == lvl2 && doc.type.toLowerCase() == "kategoria") {
                        kategoria = 1;
                        break;
                    }
                }

                const xd = data.menu[placeLvl1.value][lvl2];
                if(lvl2 !== 'order' && lvl2 !== 'target' && lvl2 !== '_id' && lvl2 !== 'type' && kategoria == 1) {
                    let option2 = document.createElement("option");
                    option2.value = lvl2;
                    option2.innerHTML = lvl2;
                    placeLvl2.appendChild(option2);
                }
            }
    
            placeLvl2.addEventListener('change', () => {
                deleteSelects(3, 3);
                if(placeLvl2.options[document.querySelector("#position-lvl2").selectedIndex].value != ''){
                    let placeLvl3 = document.createElement("select");
                    placeLvl3.setAttribute("id", "position-lvl3");
                    placeLvl3.setAttribute("name", "lvl3");
                    document.querySelector("#pos-cont").appendChild(placeLvl3);
                    let option3n = document.createElement("option");
                    option3n.value = '';
                    option3n.innerHTML = '<--';
                    placeLvl3.appendChild(option3n);
        
                    if(type != "kategoria") {
                        let lvls3 = Object.getOwnPropertyNames(data.menu[placeLvl1.value][placeLvl2.value]);
                        for(const lvl3 of lvls3) {
                            let kategoria = 0;
                            for(const doc of data.documents) {
                                let nameArr = doc.path.split('.');
                                let name = nameArr[nameArr.length - 1];
    
                                if(name == lvl3 && doc.type.toLowerCase() == "kategoria") {
                                    kategoria = 1;
                                    break;
                                }
                            }
    
                            if(lvl3 !== 'order' && lvl3 !== 'target' && lvl3 !== '_id' && lvl3 !== 'type' && kategoria == 1) {
                                let option3 = document.createElement("option");
                                option3.value = lvl3;
                                option3.innerHTML = lvl3;
                                placeLvl3.appendChild(option3);
                            }
                        } 
                    }
                }else{
                    deleteSelects(3,3)
                }
                
            })
        })
    }
    else{
        document.querySelector("#pos-cont *").remove();
    }
}



const deleteFromDatabase = (endpoint, func) => {
    const checkboxes = document.querySelectorAll('.userCheckbox');

    if(endpoint.toLowerCase().includes('menu')) {
        endpointContent = '/admin/contentAPI?';
        checkboxes.forEach((el) => { el.checked ? endpointContent += el.dataset.target + '&' : '' })
        endpointContent = endpointContent.substring(0, endpointContent.length - 1);
        fetch(endpointContent, {
            method: 'DELETE'
        }).then(async (response) => {
            const data = await response.json();
        }).catch((err) => {
            console.log(err)
        });
    }

    checkboxes.forEach((el) => { el.checked ? endpoint += el.dataset.doc + '&' : '' })
    endpoint = endpoint.substring(0, endpoint.length - 1);
    fetch(endpoint, {
        method: 'DELETE'
    }).then(async (response) => {
        const data = await response.json();
        func();
    }).catch((err) => {
        console.log(err)
    });
}

const initializeEditable = () => {
    const inputs = document.querySelectorAll('table input[type="text"]');
    if(inputs) {
        for(const input of inputs) {
            readOnlyEnabled(input);
            readOnlyDisabled(input);
        }
        document.addEventListener('click', () => {
            for(const input of inputs)
                readOnlyChangeToEnabled(input);
        })
    }
    
    const selects = document.querySelectorAll('table select');
    if(selects){
        for(const select of selects) {
            selectPrevValue(select);
        }   
    }
}

const loadFile = (event) => {
    let image = document.querySelector("input[name='"+event.target.name+"'] + .preview")
    image.src = URL.createObjectURL(event.target.files[0]);
}

const generateBuildingCheckboxes = (data) => {
    const div = document.querySelector('#pos-cont');
    div.innerHTML = '';
    let checkbox;
    for(const building of data.buildings) {
        if(building != 'strona główna') {
            checkbox = `
            <div class="checkbox-one">
                <label for="${building}">${decodeURI(building)}</label>
                <input class="building" id="${building}" value="${building}" type="checkbox">
            </div>
            `
            div.innerHTML += checkbox
        }
    }
}

const inputsClear = () => {
    const form = document.querySelector('.form');
    const inputs = form.querySelectorAll('input');
    for(const input of inputs) {
        if(input.type == 'checkbox')
            input.checked = false;
        else 
            input.value = '';
    }
}