package at.htl.selenium.simpleGoogleExample.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class BasePage {
    WebDriver webDriver;
    WebDriverWait wait;

    public BasePage(WebDriver webDriver, WebDriverWait wait) {
        this.webDriver = webDriver;
        this.wait = wait;
    }
}
