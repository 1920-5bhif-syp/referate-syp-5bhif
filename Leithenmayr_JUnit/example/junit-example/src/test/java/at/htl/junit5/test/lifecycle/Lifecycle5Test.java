package at.htl.junit5.test.lifecycle;

import org.junit.jupiter.api.*;

class Lifecycle5Test {

    @BeforeAll //BeforeClass
    static void beforeAllMethod() {
        System.out.println("@BeforeAll static method invoked.");
    }

    Lifecycle5Test() {
        System.out.println("Constructor called!");
    }

    @Test
    void test1() {
        System.out.printf("@Test method 1  invoked. Instance: %s%n", this);
    }

    @Test
    void test2() {
        System.out.printf("@Test method 2  invoked. Instance: %s%n", this);
    }

    @BeforeEach //Before
    void beforeEachMethod() {
        System.out.printf("@BeforeEach method invoked. Instance: %s%n", this);
    }

    @AfterEach //After
    void afterEacjMethod() {
        System.out.printf("@AfterEach method invoked. Instance: %s%n", this);
    }

    @AfterAll //AfterClass
    static void afterAllMethod() {
        System.out.printf("@AfterAll static method invoked.%n");
    }
}
