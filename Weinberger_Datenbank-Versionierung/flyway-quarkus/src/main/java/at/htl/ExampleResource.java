package at.htl;

import io.quarkus.runtime.StartupEvent;
import org.flywaydb.core.Flyway;

import javax.enterprise.event.Observes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import static org.jboss.resteasy.resteasy_jaxrs.i18n.LogMessages.LOGGER;

@Path("/testing")
public class ExampleResource {

    Flyway flyway = null;

    void onStart(@Observes StartupEvent ev) {
        LOGGER.info("The application is starting...");
        flyway = Flyway.configure()
                .dataSource("jdbc:mysql://localhost:3306/flywayTesting?" +
                        "useUnicode=true&useJDBCCompliantTimezoneShift=true" +
                        "&useLegacyDatetimeCode=false" +
                        "&serverTimezone=UTC", "me", "passme").load();
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String status() {
        try {
            return "Database-Version: " + flyway.info().current().getVersion();
        } catch (NullPointerException ex) {
            return "No Migration done";
        }
    }

    @GET
    @Path("/migrate")
    @Produces(MediaType.TEXT_PLAIN)
    public String migrateMigrate() {
        flyway.migrate();
        return "Migration done";
    }

    @GET
    @Path("/reset")
    @Produces(MediaType.TEXT_PLAIN)
    public String resetMigrate() {
        flyway.clean();
        return "Migration Reseted";
    }

    @GET
    @Path("/undo")
    @Produces(MediaType.TEXT_PLAIN)
    public String undoMigrate() {
        flyway.undo();
        return "Migration Undone";
    }
}
