const getProfile = ({db}) => (req, res) => {
    const { id } = req.params;
    db('users').where({id})
      .then(response => {
          if(response.length){
              console.log("User's found");
              res.status(200).json(response);
          }else{
            console.log("User's not found");
            res.status(400).json(response);
          }
      })
      .catch(err => {
        console.log("Error getting data from database");
        res.status(400).json(res);
      });
    
    
    // =========THIS IS FROM STATIC WAY
    // let found = false;
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         console.log("User Found");
    //         return res.status(200).json(user);
    //     }
    // });
    // if (!found) {
    //     res.status(400).json("User not found");
    // }
}

module.exports = {
    getProfile: getProfile
}