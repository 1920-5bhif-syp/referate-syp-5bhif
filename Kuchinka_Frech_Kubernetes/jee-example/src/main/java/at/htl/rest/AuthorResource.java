package at.htl.rest;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("authors")
public class AuthorResource {

    private String message = "[{\"firstName\":\"Michael\",\"lastName\":\"Frech\",\"class\":\"5BHIF\",\"age\":19},{\"firstName\":\"Leon\",\"lastName\":\"Kuchinka\",\"class\":\"5BHIF\",\"age\":18}]";

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAuthors() {
        return Response.ok(message).build();
    }
}
