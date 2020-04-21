package at.htl.selenium.simpleGoogleExample;

import at.htl.selenium.simpleGoogleExample.pages.GoogleResultPage;
import at.htl.selenium.simpleGoogleExample.pages.GoogleSearchPage;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.concurrent.TimeUnit;

public class simpleExample {
    @Test
    public void testGoogle() throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\rened\\Desktop\\Chromedrive\\chromedriver 77\\chromedriver.exe");

        WebDriver webDriver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(webDriver, 20);

        GoogleSearchPage googleSearchPage = new GoogleSearchPage(webDriver, wait);
        GoogleResultPage googleResultPage = googleSearchPage.google("Selenium");
        googleResultPage.enterSearchResult(1);

        TimeUnit.SECONDS.sleep(5);
        webDriver.close();
    }
}
