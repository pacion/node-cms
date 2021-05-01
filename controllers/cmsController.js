module.exports.index_get = (req, res) => {
    res.redirect('/admin/user');
}

module.exports.renderPage_get = (req, res) => {
    const routing = req.originalUrl;
    const routingSend = routing.substring(0, routing.indexOf('?')) || routing;

    const fs = require('fs')

    if(res.locals?.user.privilege == 'moderator' && !routingSend.includes('managementNews'))
        return res.redirect('/admin/managementNews');
        
    try {
        if(fs.existsSync('views/partials' + routingSend  + '.ejs')) {
            res.render('users/admin/admin.ejs', {
                username: res.locals?.username,
                require: res.locals?.user.privilege == 'moderator' ? '/admin/managementNews.ejs' : routingSend
            })
        }
    }
    catch (err) {  
        console.log(err)
        return res.redirect('/404')
    }
}