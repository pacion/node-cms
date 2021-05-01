module.exports.generateColorful = (path, colorfulMenu) => {
    const wielkosc = Object.getOwnPropertyNames(colorfulMenu);
    const arrPath = path.split('/');
    let finalHTML = '';
    let css = '';
    let podmenuParsed = '';
    for(const podmenu of wielkosc) { 
        podmenuParsed = podmenu.replace('-', ' '); 
        css = "szkoly-rect";
        if(arrPath[1] == podmenuParsed || podmenuParsed == "strona główna" && path == '/') {
            css = "szkoly-rect szkoly-rect-active"; 
            if(colorfulMenu[podmenu].color == 'white' || colorfulMenu[podmenu].color == '#FFFFFF' || colorfulMenu[podmenu].color == '#FFF'){
                finalHTML += `<script>document.documentElement.style.setProperty('--now', '#022e5d');</script>`
                } else { 
                finalHTML += `<script>document.documentElement.style.setProperty('--now', ${colorfulMenu[podmenu].color} );</script>`
            }
        }   
        finalHTML += `<a rel="noopener" role="button" tabindex="0" href="${colorfulMenu[podmenu].target}" style="background: ${colorfulMenu[podmenu].color}" class="${css}">${podmenuParsed}</a>`;
    }
    return finalHTML;
}