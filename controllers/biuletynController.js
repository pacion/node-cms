module.exports.showMap = (req, res) => {
    const title = 'Biuletyn';
    res.render('biuletyn', {
        colorfulMenu: res.locals?.colorfulMenu,
        path: '',
        footer: res.locals?.footerSlide,
        menu:  res.locals?.menu,
        title: 'CKZiU | '+ title
    }); 
}