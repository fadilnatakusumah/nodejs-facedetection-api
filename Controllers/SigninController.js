const handleSignin = (db, bcrypt, req, res) => {
    const {email, password} = req.body;
    
    if(!email|| !password){
        return res.status(400).json("Email and Password must inserted");
    }
    
    db.select('email','hash').from('login')
    .where('email', '=', email)
    .then(response => {
        const isValid = bcrypt.compareSync(password, response[0].hash);
        if(isValid){
            console.log("User is valid");
            return db.select('*').from('users')
            .where('email','=',response[0].email)
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                console.log('error:', err);
                res.status(400).json(err);
            })
        }else{
            console.log("User's password is wrong");
            res.status(400).json("User's password is wrong");
        }
    })
    .catch(err => {
        console.log("There's problem fetching from database", err);
        res.status(400).json(err);
    })


    // ======THIS IS THE STATIC WAY
    // let found = false;
    // database.users.forEach(user => {
    //     const { password, email } = req.body;
    //     if (user.email === email && user.password === password) {
    //         found = true;
    //         console.log('User founded');
    //         return res.status(200).json(user);
    //     }
    // });
    // if (!found) {
    //     res.status(400).json('User not found');
    // }
}

module.exports = {
    handleSignin: handleSignin
}