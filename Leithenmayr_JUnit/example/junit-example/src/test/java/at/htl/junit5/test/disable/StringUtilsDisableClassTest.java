package at.htl.junit5.test.disable;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@Disabled
class StringUtilsDisableClassTest {
    @Test
    void testConvertToDoubleOK() {
        // Test case with the age is a numeric string
        String age = "1990";
        Double expAge = Double.valueOf(age);
        Double actual = StringUtils.convertToDouble(age);

        assertAll("Do many assertions.", () -> {
            assertNotNull(actual);
            assertEquals(expAge, actual);
        });

        // Or Java 8 Lambdas style
        assertAll("Do many assertions.Java 8 Lambdas style", () -> {
            assertNotNull(actual, () -> "The actual is NULL");
            assertEquals(expAge, actual,
                    () -> "The expected is: " + expAge + " while the actual is:" + actual);
        });
    }

    @Test
    void testAddress(){
        Address address = new Address("Leonding", "Limesstraße", "0664123456789");

        assertEquals("Leonding", address.getCity());
        assertEquals("Limesstraße", address.getStreet());
        assertEquals("0664123456789", address.getNumber());

        /*assertAll("Address is correct",
                ()->assertEquals("Leonding", address.getCity()),
                ()->assertEquals("Limesstraße", address.getStreet()),
                ()->assertEquals("0664123456789", address.getNumber()));*/
    }

    @Test
    void testConvertToDoubleWithNullArgument() {
        // Test case with the age is null
        String age = null;
        Double actual = StringUtils.convertToDouble(age);
        assertNull(actual, "The actual is not null");
        // Java 8 Style
        assertNull(actual, () -> "The actual is not null");
    }

    @Test
    void testConvertToDoubleThrowException() {
        // Test with the age is a non numeric string
        String age = "N/A";
        assertThrows(NumberFormatException.class, () -> {
            StringUtils.convertToDouble(age);
        });

        assertThrows(NumberFormatException.class, () -> {
            StringUtils.convertToDouble(age);
        });
    }

    @Test
    void testIsNullOrBlankOK() {
        // Test the case that the input is NULL
        String input = null;

        assertTrue(StringUtils.isNullOrBlank(input));
        // Java 8 Lambdas Style
        assertTrue(StringUtils.isNullOrBlank(input), () -> "The string is not null or blank");

        // Test case with the input is empty
        input = " ";
        assertTrue(StringUtils.isNullOrBlank(input));

        // Test case with the input is not empty
        input = "abc";
        assertFalse(StringUtils.isNullOrBlank(input));
    }

    @Test
    void testGetDefaultIfNull() {
        // Test case with input string is null
        String str = null;
        String defaultSt = "abc";

        String actual = StringUtils.getDefaultIfNull(str, defaultSt);
        assertSame(defaultSt, actual);
        // Java 8 Lambdas Style
        assertSame(defaultSt, actual, () -> "Expected ouput is not same with actual");

        // Test case with input string is not null
        str = "def";

        actual = StringUtils.getDefaultIfNull(str, defaultSt);
        assertNotSame(defaultSt, actual);
        // Java 8 Lambdas Style
        assertNotSame(defaultSt, actual, () -> "Expected ouput is same with actual");

        // Test case with input string is empty
        str = "";
        actual = StringUtils.getDefaultIfNull(str, defaultSt);
        if (actual.equals(defaultSt)) {
            fail("The actual should be empty");

            // Java 8 Lambdas Style
            fail(() -> "The actual should be empty");
        }
    }

    @Test
    void testConcatWithRegularInput() {
        String str1 = "Hello";
        String str2 = "World";
        String str3 = "!";
        String expect = str1 + str2 + str3;
        String actual = StringUtils.concat(str1, str2, str3);
        assertEquals(expect, actual);
    }

    @Test
    void testConcatWithNullInput() {
        String str1 = "Hello";
        String str2 = "World";
        String str3 = null;
        String expect = str1 + str2;
        String actual = StringUtils.concat(str1, str2, str3);
        assertEquals(expect, actual);
    }

    @Test
    void testConcatWithAllNullInput() {
        String actual = StringUtils.concat();
        assertNull(actual);
    }
}