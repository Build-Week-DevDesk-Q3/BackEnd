
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tickets').del()
    .then(function () {
      // Inserts seed entries
      return knex('tickets').insert([
        {id: 1,notes:"I tried to get a name change last week",open:true,answer:null,helper_id:null,completed:false,student_id:1,description:"Hello, My mother named me username. It's like she knew I was going to grow up to be in someone's lambda build week project or something can anyone help.",category:"Account",name:"Name problems"},
        {id: 2,notes:null,open:false,answer:null,helper_id:1,completed:false,student_id:1,description:"Hello, My name is password. I'm not sure if this is a very safe password...A total of everyone in the world has been able to get into my account. I'm not even sure if this is even my account anymore.",category:"Account",name:"password = password"},
      ]);
    });
};
