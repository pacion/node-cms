module.exports.generateColorful = (path, colorfulMenu) => {
    const size = Object.getOwnPropertyNames(colorfulMenu);
    const arrPath = path.split('/');
    let finalHTML = '';
    let css = '';
    let submenuParsed = '';
    for(const submenu of size) { 
        submenuParsed = submenu.replace('-', ' '); 
        css = "szkoly-rect";
        if(arrPath[1] == submenuParsed || submenuParsed == "strona główna" && path == '/') {
            css = "szkoly-rect szkoly-rect-active"; 
            if(colorfulMenu[submenu].color == 'white' || colorfulMenu[submenu].color == '#FFFFFF' || colorfulMenu[submenu].color == '#FFF'){
                finalHTML += `<script>document.documentElement.style.setProperty('--now', '#022e5d');</script>`
                } else { 
                finalHTML += `<script>document.documentElement.style.setProperty('--now', ${colorfulMenu[submenu].color} );</script>`
            }
        }   
        finalHTML += `<a rel="noopener" role="button" tabindex="0" href="${colorfulMenu[submenu].target}" style="background: ${colorfulMenu[submenu].color}" class="${css}">${submenuParsed}</a>`;
    }
    return finalHTML;
}