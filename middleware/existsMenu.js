const { renderMenu } = require('./renderMenu');

const existsMenu = /*async*/ (req, res, next) => {
    let menu = res.locals?.menu;
    let colorfulMenu = res.locals?.colorfulMenu;

    if(colorfulMenu == undefined || colorfulMenu == null || menu == null || menu == undefined)  {
        /*await*/ renderMenu(req, res, next);
    }
    else {
        console.log('existMenu.js rendermenu failed <------------------------')
    }
}

module.exports = { existsMenu };