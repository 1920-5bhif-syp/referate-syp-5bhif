package at.htl.author.business;

import at.htl.author.model.Author;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AuthorPanacheRepo implements PanacheRepository<Author> {
}
