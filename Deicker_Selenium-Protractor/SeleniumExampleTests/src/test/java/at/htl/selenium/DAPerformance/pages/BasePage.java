package at.htl.selenium.DAPerformance.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class BasePage {
    WebDriver webDriver;
    WebDriverWait wait;

    String matRaisedButtonSelector = "//button[@class='mat-raised-button mat-primary']";

    public BasePage(WebDriver webDriver, WebDriverWait wait) {
        this.webDriver = webDriver;
        this.wait = wait;
    }
}
