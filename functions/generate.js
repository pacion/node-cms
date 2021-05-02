module.exports.generate = (param, menu) => {
    
    let finalHTML = "";
    let size = Object.getOwnPropertyNames(menu);
    
    for (const submenu of size) { // petla po lvl1 w menu
        let size2 = Object.getOwnPropertyNames(menu[submenu])
        let submenuParsed = submenu.replace('-', ' ');
          
        if(size2.length > 2) { //Sprawdzanie, czy obiekt ma dzieci 
            if(param == "menu") {
                if(menu[submenu].target == ''){
                    finalHTML += `<div class="dropdown">
                    <span class="menu-item" role="button" tabindex="0"> ${submenuParsed} </span>
                    <div class="nested">`;
                }
                else{
                    finalHTML += `<div class="dropdown">
                    <a rel="noopener" href="${menu[submenu].target}" class="menu-item" role="button" tabindex="0"><h2> ${submenuParsed} </h2></a>
                    <div class="nested">`;
                }
            }
            for (const submenu2 of size2) { //pętla po lvl2 w menu
                if(submenu2 !== 'target' && submenu2 !== 'order'){
                finalHTML += `<a rel="noopener" role="button" tabindex="0" href="${menu[submenu][submenu2].target}">
                    ${submenu2}
                    </a>`;
                }       
            }
            finalHTML += `</div>
            </div>`;                
        }
        else { // wypisanie menu z jednym elementem (glowny) && nie ma dzieci
            finalHTML += `<a target="_blank" role="button" tabindex="0" href="${menu[submenu].target}" class="menu-item dropdown">
                <h2>${submenuParsed}</h2>
                </a>`;   
        } 
    }
    
    return finalHTML;
}