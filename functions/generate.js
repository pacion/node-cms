module.exports.generate = (param, menu) => {
    
    let finalHTML = "";
    let wielkosc = Object.getOwnPropertyNames(menu);
    
    for (const podmenu of wielkosc) { // petla po lvl1 w menu
        let wielkosc2 = Object.getOwnPropertyNames(menu[podmenu])
        let podmenuParsed = podmenu.replace('-', ' ');
          
        if(wielkosc2.length > 2) { //Sprawdzanie, czy obiekt ma dzieci 
            if(param == "menu") {
                if(menu[podmenu].target == ''){
                    finalHTML += `<div class="dropdown">
                    <span class="menu-item" role="button" tabindex="0"> ${podmenuParsed} </span>
                    <div class="nested">`;
                }
                else{
                    finalHTML += `<div class="dropdown">
                    <a rel="noopener" href="${menu[podmenu].target}" class="menu-item" role="button" tabindex="0"><h2> ${podmenuParsed} </h2></a>
                    <div class="nested">`;
                }
            }
            for (const podmenu2 of wielkosc2) { //pętla po lvl2 w menu
                if(podmenu2 !== 'target' && podmenu2 !== 'order'){
                finalHTML += `<a rel="noopener" role="button" tabindex="0" href="${menu[podmenu][podmenu2].target}">
                    ${podmenu2}
                    </a>`;
                }       
            }
            finalHTML += `</div>
            </div>`;                
        }
        else { // wypisanie menu z jednym elementem (glowny) && nie ma dzieci
            finalHTML += `<a target="_blank" role="button" tabindex="0" href="${menu[podmenu].target}" class="menu-item dropdown">
                <h2>${podmenuParsed}</h2>
                </a>`;   
        } 
    }
    
    return finalHTML;
}