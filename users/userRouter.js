const router = require('express').Router();
const db = require("../auth/authModel")
const auth = require("../auth/authenticate-middleware")
router.put('/:id', auth,(req, res) => {
   
  db.editUser(req.params.id,req.body)
  .then(i => {
  res.status(201).json(i);
  })
  .catch(err => {
  res.status(500).json({ message: 'Failed to get schemes' });
  });
  });
  router.get('/:id', auth,(req, res) => {
    
   db.getUser(req.params.id)
   .then(i => {
   res.status(200).json(i)
   })
   .catch(err => {
   res.status(500).json({ message: 'Failed to get schemes' });
   });
   });
   router.get('/all', auth,(req, res) => {
    
    db.getUsers()
    .then(i => {
    res.status(200).json(i)
    })
    .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
    });
    });
   router.get('/helpertickets', auth,(req, res) => {
    
    db.helperTickets(req.body.helper_id)
    .then(i => {
    res.status(200).json(i);
    })
    .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
    });
    });
    router.get('/studenttickets', auth,(req, res) => {
    
      db.studentTickets(req.body.student_id)
      .then(i => {
      res.status(200).json(i);
      })
      .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
      });
      });
      router.delete('/:id', auth,(req, res) => {
    
        db.deleteUser(req.params.id)
        .then(i => {
        res.status(200).json(i);
        })
        .catch(err => {
        res.status(500).json({ message: 'Failed to get schemes' });
        });
        });
        


  module.exports = router;