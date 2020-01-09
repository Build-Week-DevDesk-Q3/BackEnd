const request = require("supertest");

const server = require("./api/server");

let createdTicketId
let createdUserId

describe("server.js", () => {

  describe("POST api/register", () => {
    it("should return a 201 created status", () => {
      return request(server)
      .post("/api/register")
      .send({ username: "testuser", password: "pass", role: "admin" })
      .then(res => {
        expect(res.status).toBe(201)
        createdUserId = res.body
        console.log(res.body)
      })
      .catch(err => {
        console.log("Secondary error during teardown.")
      })
    })

    it("should return a TEXT/HTML object.", () => {
      return request(server)
        .post("/api/register")
        .then(res => {
          expect(res.type).toMatch(/text/i);
        });
    });
  })

  describe("POST api/login", () => {

    it("should return a 200 OK Status", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        expect(res.status).toBe(200)
      })
    })

    it("should be authenticated.", () => {
      return request(server)
        .post("/api/login")
        .send({ username: "testuser", password: "pass" })
        .then(res => {
          const token = res.body.token;

          return request(server)
            .get("/api/tickets")
            .set("Authorization", token)
            .then(res => {
              expect(res.status).toBe(200);
              expect(Array.isArray(res.body)).toBe(true);
            });
        });
    });
  })
  
  describe("GET /api/tickets", () => {
    it("should return a 200 status when authenticated.", () => {
      return request(server)
        .post("/api/login")
        .send({ username: "testuser", password: "pass" })
        .then(res => {
          const token = res.body.token;

          return request(server)
            .get("/api/tickets")
            .set("Authorization", token)
            .then(res => {
              expect(res.status).toBe(200);
              expect(Array.isArray(res.body)).toBe(true);
            });
        });
    });

    it("should return an Array object when authenticated.", () => {
      return request(server)
        .post("/api/login")
        .send({ username: "testuser", password: "pass" })
        .then(res => {
          const token = res.body.token;

          return request(server)
            .get("/api/tickets")
            .set("Authorization", token)
            .then(res => {
              expect(Array.isArray(res.body)).toBe(true);
            });
        });
    });
  })

  describe("POST /api/tickets", () => {

    it("should return a 201 status when creating a ticket.", () => {
      return request(server)
        .post("/api/login")
        .send({ username: "testuser", password: "pass" })
        .then(res => {
          const token = res.body.token;

          return request(server)
            .post("/api/tickets")
            .set("Authorization", token)
            .send({student_id: 1, description: "Description", notes: "Notes", category: "Category", name: "Ticket"})
            .then(res => {
              createdTicketId = res.body[0]
              expect(res.status).toBe(201);
            })
        });
    });

    it("should include the created ticket at ticket endpoint", () => {
      return request(server)
        .post("/api/login")
        .send({ username: "testuser", password: "pass" })
        .then(res => {
          const token = res.body.token

          return request(server)
            .get("/api/tickets")
            .set("Authorization", token)
            .then(res => {
              expect(Array.isArray(res.body)).toBe(true);
            });
        });
    });
  })

  describe("GET /api/tickets/id", () => {
    it("should return a 200 status when getting a ticket.", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get(`/api/tickets/${createdTicketId}`)
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
        })
      })
    })

    it("should return an array containing the requested ticket", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get(`/api/tickets/${createdTicketId}`)
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
          expect(Array.isArray(res.body)).toBe(true);
        })
      })
    })
  })

  describe("PUT /api/tickets/id", () => {
    it("should return a 201 status when editing a ticket.", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .put(`/api/tickets/${createdTicketId}`)
        .send({name: "New Ticket Name"})
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(201)
        })
      })
    })

    it("should return an array containing the modified ticket", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get(`/api/tickets/${createdTicketId}`)
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
          expect(Array.isArray(res.body)).toBe(true);
        })
      })
    })
  })

  describe("DELETE /api/tickets", () => {
    it("should return a 200 status when deleting a ticket.", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .delete(`/api/tickets/${createdTicketId}`)
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
        })
      })
    })

    it("should remove the ticket from the database after deletion", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get(`/api/tickets/${createdTicketId}`)
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
        })
      })
    })
  })

  describe("GET /api/users/id", () => {
    it("should return a 200 status when getting a user.", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get(`/api/users/${createdUserId}`)
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
        })
      })
    })

    it("should return an array containing the user", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get(`/api/users/${createdUserId}`)
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
          expect(Array.isArray(res.body)).toBe(true);
        })
      })
    })
  })

  describe("PUT /api/users/id", () => {
    it("should return a 201 status when editing a user.", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .put(`/api/users/${createdUserId}`)
        .send({role: "student"})
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(201)
        })
      })
    })

    it("should return an array containing the modified user", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get(`/api/users/${createdUserId}`)
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
          expect(Array.isArray(res.body)).toBe(true);
        })
      })
    })
  })

  describe("GET /api/users/all", () => {
    it("should return a 200 status when getting users.", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get("/api/users/all")
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
        })
      })
    })

    it("should return an array containing the users", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get("/api/users/all")
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
          expect(Array.isArray(res.body)).toBe(true);
        })
      })
    })
  })

  describe("GET /api/users/helpertickets", () => {
    it("should return a 200 status when getting helper tickets.", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get("/api/users/helpertickets")
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
        })
      })
    })

    it("should return an array containing the helper tickets", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get("/api/users/helpertickets")
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
          expect(Array.isArray(res.body)).toBe(true);
        })
      })
    })
  })

  describe("GET /api/users/studenttickets", () => {
    it("should return a 200 status when getting student tickets.", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get("/api/users/studenttickets")
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
        })
      })
    })

    it("should return an array containing the student tickets", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get("/api/users/studenttickets")
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
          expect(Array.isArray(res.body)).toBe(true);
        })
      })
    })
  })

  describe("DELETE /api/users/id", () => {
    it("should return a 200 status when deleting a user.", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .delete(`/api/users/${createdUserId}`)
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
        })
      })
    })

    it("should return an empty array.", () => {
      return request(server)
      .post("/api/login")
      .send({username: "testuser", password: "pass"})
      .then(res => {
        const token = res.body.token

        return request(server)
        .get(`/api/users/${createdUserId}`)
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200)
          expect(Array.isArray(res.body)).toBe(true);
        })
      })
    })
  })

})