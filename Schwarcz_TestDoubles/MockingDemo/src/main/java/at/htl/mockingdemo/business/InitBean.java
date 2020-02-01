package at.htl.mockingdemo.business;

import at.htl.mockingdemo.model.Address;
import at.htl.mockingdemo.model.Person;
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
    public void init(@Observes StartupEvent ev) {
        Address address = new Address(4061, "Pasching");
        Person person = new Person("Florian", "Schwarcz", address);

        em.persist(person);
    }

}
