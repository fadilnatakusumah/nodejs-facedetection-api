const Clarifai = require('clarifai');

const appClarifai = new Clarifai.App({
    apiKey: 'a6e2cc29a1ab4727a891b7d0c6b96269'
});

const handleApiCall = (req, res) => {
    // console.log(req.body);
    appClarifai.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
        // console.log(data);
    })
    .catch(err => res.status(400).json('Failed call API'));
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    // let found = false;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('*')
    .then(response => {
        if(response.length){
            console.log("Entries updated");
            res.status(200).json(response);
        }else{
            console.log("Unable to update entries");
            res.status(200).json(response);
        }
    })
    .catch(err => {
        console.log("Error updating database");
        res.status(400).json(err);
    });
    
    
    
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         user.entries += 1;
    //         console.log("Image Entries Added");
    //         return res.status(200).json(user);
    //     }
    // });
    // if (!found) {
    //     res.status(400).json("User not found");
    // }
}

module.exports = {
    handleImage, 
    handleApiCall
}