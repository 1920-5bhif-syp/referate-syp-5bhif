package at.htl.mockingdemo;

import at.htl.mockingdemo.database.PersonFacade;
import at.htl.mockingdemo.model.Address;
import at.htl.mockingdemo.model.Person;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.*;

@QuarkusTest
public class PersonFacadeTest {

    @Mock
    TypedQuery<Person> typedQuery;
    @Mock
    EntityManager em;
    @Mock
    Address dummyAddress;
    @InjectMocks
    PersonFacade personFacade;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetAll() {
        // Arrange
        List<Person> expected = new ArrayList<>();
        expected.add(new Person("Mockey", "Mouse", dummyAddress));

        when(typedQuery.getResultList()).thenReturn(expected);
        when(em.createNamedQuery("Person.getAll", Person.class)).thenReturn(typedQuery);

        // Act
        List<Person> actual = personFacade.getAll();

        // Assert
        verify(em, times(1)).createNamedQuery("Person.getAll", Person.class);
        verify(typedQuery, times(1)).getResultList();
        assertThat(actual, is(expected));
    }

    @Test
    public void testGetByIdSuccessful() {
        // Arrange
        Person expected = new Person("Mockey", "Mouse", dummyAddress);

        when(em.find(Person.class, 1L)).thenReturn(expected);

        // Act
        Person actual = personFacade.getById(1);

        // Assert
        verify(em, times(1)).find(Person.class, 1L);
        assertThat(actual, is(expected));
    }

    @Test
    public void testGetByIdUnsuccessful() {
        // Arrange
        Person unexpected = new Person("Mockey", "Mouse", dummyAddress);

        when(em.find(Person.class, 1L)).thenReturn(unexpected);

        // Act
        Person actual = personFacade.getById(2);

        // Assert
        verify(em, times(1)).find(Person.class, 2L);
        assertThat(actual, is(nullValue()));
    }

}