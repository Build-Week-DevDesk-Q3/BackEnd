const router = require('express').Router();
const db = require("./authModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post('/register', (req, res) => {
  let user = req.body
  let hash = bcrypt.hashSync(user.password,13)
  user.password = hash 
db.register(user)
.then(i => {
res.status(201).json(i);
})
.catch(err => {
res.status(500).json({ message: 'Failed to get schemes' });
});
});



router.post('/login', (req, res) => {
  let body = req.body
  db.login(body)
  .first()
  .then(user => {
    const payload = {
      userid:user.id,
      username:user.username
    }
    const options = {
      expiresIn:"1d"
    }
    const token = jwt.sign(payload,"secret",options)
    if (user && bcrypt.compareSync(body.password,user.password))
    {res.status(200).json({message:`Welcome ${body.username}`,token:token,userid:user.id})}
   else {
     res.status(404).json({message:`invalid creditinials`})
   }
  })
  .catch(err => {
    res.status(500).json({ message: err })
    console.log(err)
  });
});

module.exports = router;
