package at.htl.selenium.simpleGoogleExample.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public class GoogleResultPage extends BasePage{
    String resultsSelector = "//div[@class='r']//a";

    public GoogleResultPage(WebDriver webDriver, WebDriverWait wait) {
        super(webDriver, wait);
    }

    public void enterSearchResult(int index){
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(resultsSelector)));
        List<WebElement> resultListElements = webDriver.findElements(By.xpath(resultsSelector));
        resultListElements.get(index-1).sendKeys(Keys.ENTER);
    }
}
