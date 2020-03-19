package at.htl.author.business;

import at.htl.author.model.*;
import io.quarkus.runtime.StartupEvent;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@ApplicationScoped
public class InitBean {

    @Inject
    EntityManager em;

    @Transactional
    void init(@Observes StartupEvent ev){
        System.err.println("------init------");

        Author michael = new Author("Michael", "Frech", 19);
        Author leon = new Author("Leon", "Kuchinka", 18);

        em.persist(michael);
        em.persist(leon);
    }
}
