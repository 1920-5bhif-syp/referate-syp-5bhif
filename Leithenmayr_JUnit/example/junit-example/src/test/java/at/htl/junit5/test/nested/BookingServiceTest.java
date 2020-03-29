package at.htl.junit5.test.nested;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class BookingServiceTest {
    @BeforeEach
    void init() {
    }

    @Test
    void booking_success() {
    }

    @Test
    void booking_insufficient() {
    }

    @Test
    void booking_soldout() {
    }

    @Test
    void history() {
    }

    @Test
    void history_nodata() {
    }

    // Nested class Book -------------------------------------------
    @Nested
    class Book{
        @Test
        @DisplayName("booking success")
        void booking_success() {
        }

        @Test
        @DisplayName("booking insufficient")
        void booking_insufficient() {
        }

        @Test
        @DisplayName("booking soldout")
        void booking_soldout() {
        }
    }

    // Nested class History -----------------------------------------
    @Nested
    class History{
        @Test
        @DisplayName("booking history")
        void history() {
        }

        @Test
        @DisplayName("booking history")
        void history_nodata() {
        }
    }
}