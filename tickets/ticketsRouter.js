const router = require('express').Router();
const db = require("../auth/authModel")
const auth = require("../auth/authenticate-middleware")
  router.get('/', auth,(req, res) => {
   db.openTickets()
   .then(i => {
   res.status(200).json(i);
   })
   .catch(err => {
   res.status(500).json({ message: 'Failed to get schemes' });
   });
   });
   router.get('/:id', auth,(req, res) => {
    db.getTicket(req.params.id)
    .then(i => {
    res.status(200).json(i.filter(i => i.id == req.params.id)[0]);
    })
    .catch(err => {
    res.status(500).json({ message: err });
    });
    });
   router.post('/', auth,(req, res) => {
       req.body.helper_id = null
       req.body.completed = false
       req.body.open = true
       req.body.answer = null

    db.createTicket(req.body)
    .then(i => {
    res.status(201).json(i);
    })
    .catch(err => {
    res.status(500).json({ message: err });
    });
    });
    router.put('/:id', auth,(req, res) => {
        db.editTicket(req.params.id,req.body)
        .then(i => {
        res.status(200).json(i);
        })
        .catch(err => {
        res.status(500).json({ message: 'Failed to get schemes' });
        });
        });
        router.delete('/:id', auth,(req, res) => {
            db.deleteTicket(req.params.id)
            .then(i => {
            res.status(200).json(i);
            })
            .catch(err => {
            res.status(500).json({ message: 'Failed to get schemes' });
            });
            });
  module.exports = router;