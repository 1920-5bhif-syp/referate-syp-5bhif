package at.htl.junit5.test.assertions;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class StringUtilsTest {

    @Test
    @DisplayName("Assert null!")
    void t01_assertNull() {
        //ARRANGE
        String age = null;

        //ACT
        Double actual = StringUtils.convertToDouble(age);

        //ASSERT
        assertNull(actual, "The actual is not null");
        // Java 8 Style
        assertNull(actual, () -> {
            return "The actual is not null";
        });
        //AssertJ - Version
        assertThat(actual).isEqualTo(null);
    }

    @Test
    void t02_testConvertToDoubleThrowException() {
        String age = "N/A";
        assertThrows(NumberFormatException.class, () -> {
            StringUtils.convertToDouble(age);
        });
    }

    @Test
    void t03_testIsNullOrBlank() {
        // Test the case that the input is NULL
        String input = null;

        assertTrue(StringUtils.isNullOrBlank(input));
        assertTrue(StringUtils.isNullOrBlank(input), () -> "The string is not null or blank");

        input = " ";
        assertTrue(StringUtils.isNullOrBlank(input));

        input = "abc";
        assertFalse(StringUtils.isNullOrBlank(input));
    }

    @Test
    void t04_testConcatWithRegularInput() {
        String str1 = "Hello";
        String str2 = "World";
        String str3 = "!";
        String expect = str1 + str2 + str3;
        String actual = StringUtils.concat(str1, str2, str3);
        assertEquals(expect, actual);
    }
}