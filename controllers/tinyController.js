const _ = require('lodash');
const fileUpload = require('express-fileupload');
const cors = require('cors');

module.exports.upload = async (req, res) => {    
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'Nie wrzucono żadnego pliku'
            }); 
        } else {
            let photo = req.files.file

            const where = req.params.where;
            const url = '/uploads/' + (where ? where + '/' : '') + photo.name;

            photo.mv('./public' + url);

            await res.send({
                location: url
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}