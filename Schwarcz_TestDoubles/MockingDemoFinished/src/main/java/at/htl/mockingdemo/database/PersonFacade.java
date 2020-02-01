package at.htl.mockingdemo.database;

import at.htl.mockingdemo.model.Person;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

@ApplicationScoped
public class PersonFacade {

    @Inject
    EntityManager em;

    public List<Person> getAll() {
        return em.createNamedQuery("Person.getAll", Person.class).getResultList();
    }

    public Person getById(long id) {
        return em.find(Person.class, id);
    }

}
