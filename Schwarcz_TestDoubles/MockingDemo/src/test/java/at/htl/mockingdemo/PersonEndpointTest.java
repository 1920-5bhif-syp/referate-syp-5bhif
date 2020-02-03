package at.htl.mockingdemo;

import at.htl.mockingdemo.model.Person;
import io.quarkus.test.junit.QuarkusTest;
import io.vertx.core.json.Json;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class PersonEndpointTest {

    @Test
    public void testGetAll() {
        given()
                .when().get("/persons")
                .then()
                .statusCode(200)
                .body(is("[{\"firstName\":\"Mockey\",\"lastName\":\"Mouse\"}]"));
    }

    @Test
    public void testGetByIdSuccessful() {
        given()
                .when().get("/persons/1")
                .then()
                .statusCode(200)
                .body(is("{\"firstName\":\"Mockey\",\"lastName\":\"Mouse\"}"));
    }

    @Test
    public void testGetByIdUnsuccessful() {
        given()
                .when().get("/persons/2")
                .then()
                .statusCode(404);
    }

}