package at.htl.author.rest;

import at.htl.author.business.AuthorPanacheRepo;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/authors")
public class AuthorResource {

    @Inject
    AuthorPanacheRepo authorPanacheRepo;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllAuthors() {
        return Response.ok()
                .entity(authorPanacheRepo.listAll())
                .build();
    }
}