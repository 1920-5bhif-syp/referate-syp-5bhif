package at.htl.jooq;

import io.quarkus.runtime.StartupEvent;
import org.jooq.ConnectionProvider;
import org.jooq.DSLContext;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.sql.DataSource;
import java.sql.Connection;

@ApplicationScoped
public class Main {

    public void onStartup(@Observes StartupEvent ev){
        System.out.println("Quarkus-----------------------started!");
    }
}
