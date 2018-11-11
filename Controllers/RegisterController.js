const handleRegister = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    if(!email|| !password || !name){
        return res.status(400).json("Name, Email and Password must inserted");
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then(response=>{
                console.log("User registered");
                res.status(200).json(response[0]);
            })
            .catch(err => {
                console.log('Cannot register cause of error');        
                res.status(400).json(err);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch(err=>{
        console.log("There's an error when doing transactions trx", err);        
        res.status(400).json(err);
    });
    
    
    
    // THIS IS FROM STATIC WAY
    // let newUser = {
    //     name: name,
    //     email: email,
    //     joined: new Date()
    // }
    // const newID = database.users[database.users.length - 1].id + 1;
}

module.exports = {
    handleRegister: handleRegister
}