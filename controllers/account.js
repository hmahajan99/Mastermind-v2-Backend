const removeToken = require('./signout').removeToken;

const changePassword = (newPassword,userEmail,db, bcrypt) => {

  const newHash = bcrypt.hashSync(newPassword);
  db('login').where({email:userEmail})
    .update({hash: newHash})
    .returning('email')
    .then(email => console.log(email[0]))
    .catch(err => 'error')

}



const handlePasswordChange = (req, res, db, bcrypt) => {
  
  const {currentPassword,newPassword,userEmail} = req.body;
  
  if(userEmail === 'guest@gmail.com'){
    return res.status(400).json({success: false})
  }


  db.select('hash').from('login').where({email:userEmail})
    .then(data => {
      const hash = data[0].hash;
      const isValid = bcrypt.compareSync(currentPassword, hash);
      if(isValid){
        changePassword(newPassword,userEmail,db, bcrypt);
        return res.json({success: true})
      }else{
        return res.status(400).json({success: false})
      }
    })
    .catch(err => res.status(400).json({success: false}))  

}

const deleteAccount = (req, res, db) => {

    const {userEmail} = req.body;

    if(userEmail === 'guest@gmail.com'){
      return res.status(400).json({success: false})
    }


    db.transaction(trx => {
      trx('login').where({email:userEmail})
      .del()
      .then( () => {
        return trx('users')
          .where({email:userEmail})
          .del()
      })
      .then( () => {
        trx.commit()
        res.json({success: true})
      })
      .catch(() => {
        trx.rollback()
        res.json({success: false})  
      })
    })

    // remove token from redis also
    removeToken(req.headers.authorization)
    
}


module.exports = {
  handlePasswordChange,
  deleteAccount
}