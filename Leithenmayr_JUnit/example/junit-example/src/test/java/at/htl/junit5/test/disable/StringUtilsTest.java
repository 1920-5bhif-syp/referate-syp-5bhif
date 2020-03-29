package at.htl.junit5.test.disable;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class StringUtilsTest {

    @Test
    public void testConcatWithRegularInput() {
        String str1 = "Hello";
        String str2 = "World";
        String str3 = "!";
        String expect = str1 + str2 + str3;
        String actual = StringUtils.concat(str1, str2, str3);
        assertEquals(expect, actual);
    }

    @Disabled
    @Test
    public void testConcatWithNullInput() {
        String str1 = "Hello";
        String str2 = "World";
        String str3 = null;
        String expect = str1 + str2;
        String actual = StringUtils.concat(str1, str2, str3);
        assertEquals(expect, actual);
    }

    @Test
    public void testConcatWithAllNullInput() {
        String actual = StringUtils.concat();
        assertNull(actual);
    }
}