package at.htl.selenium.simpleGoogleExample.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class GoogleSearchPage extends BasePage{
    String selectorGoogleInputField = "//input[@class='gLFyf gsfi']";

    public GoogleSearchPage(WebDriver webDriver, WebDriverWait wait){
        super(webDriver, wait);
        webDriver.get("https://www.google.at/");
    }

    public GoogleResultPage google(String searchText){
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(selectorGoogleInputField)));
        WebElement inputField = webDriver.findElement(By.xpath(selectorGoogleInputField));
        inputField.sendKeys(searchText);
        inputField.sendKeys(Keys.ENTER);

        return new GoogleResultPage(webDriver, wait);
    }
}
