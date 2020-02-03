package at.htl.mockingdemo.rest;

import at.htl.mockingdemo.database.PersonFacade;
import at.htl.mockingdemo.model.Person;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/persons")
public class PersonEndpoint {

    @Inject
    PersonFacade personFacade;

    @GET
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        List<Person> persons = personFacade.getAll();
        return Response.ok().entity(persons).build();
    }

    @GET
    @Path("{id}")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") long id) {
        Person person = personFacade.getById(id);
        if (person == null) {
            return Response.status(404).build();
        }
        return Response.ok().entity(person).build();
    }

}