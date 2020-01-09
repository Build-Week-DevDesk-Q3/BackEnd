const db = require('../data/dbConfig')

    function getUsers(){
    return db("users").select("*")
    }
    function register(user){
    return db("users").insert(user)
    }
    function login(user)
   { 
       return db("users").where({"username":user.username})
   }
   function getUser(user){
       return db("users").select("id","username","role").where({"id":user})
   }
   function assignTicket(id,helper){
       return db("tickets").where({"id":id}).update({"helper_id":helper})
   }
   function openTickets(){
       return db("tickets").select("tickets.id","answer","description","username","completed","open","category","notes","name","student_id","helper_id","role").join("users",{"student_id":"users.id"})
       .then(tickets => {
        return tickets.map(ticket => {
            ticket.completed = ticket.completed ? true :false
            ticket.open = ticket.open ? true :false
            return ticket
        })
    })
   }
   

   function getTicket(id){
       return db("tickets").where({"id":id}).then(tickets => {
        return tickets.map(ticket => {
            ticket.completed = ticket.completed ? true :false
            ticket.open = ticket.open ? true :false
            return ticket
        })
    })
   }
   function helperTickets(id){
       return db("tickets").select("tickets.id","username","completed","open","category","notes","name","student_id","helper_id","role").join("users",{"student_id":"users.id"}).where({"helper_id":id})
       .then(tickets => {
        return tickets.map(ticket => {
            ticket.completed = ticket.completed ? true :false
            ticket.open = ticket.open ? true :false
            return ticket
        })
    })
   }
   function studentTickets(id){
    return db("tickets").select("*").where({"student_id":id})
    .then(tickets => {
        return tickets.map(ticket => {
            ticket.completed = ticket.completed ? true :false
            ticket.open = ticket.open ? true :false
            return ticket
        })
    })
  }
  function editTicket(id,body){
      return db("tickets").where({"id":id}).update(body)
  }
  function createTicket(ticket){
    return db("tickets").insert(ticket)
  }
  function deleteTicket(ticket){
    return db("tickets").where({"id":ticket}).del()
  }
  function deleteUser(id){
    return db("users").where({"id":id}).del()
  }
  function editUser(id,user){
      return db("users").where({"id":id}).update(user)
  }


module.exports = {
    getUsers,
    getUser,
    register,
    login,
    assignTicket,
    openTickets,
    helperTickets,
    studentTickets,
    createTicket,
    editTicket,
    deleteTicket,
    editUser,
    deleteUser,
    getTicket
}