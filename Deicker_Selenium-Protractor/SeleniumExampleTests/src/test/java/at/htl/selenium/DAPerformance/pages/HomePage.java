package at.htl.selenium.DAPerformance.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public class HomePage extends BasePage {
    String snackBarContainerToolStartedSelector = "//snack-bar-container[@class='mat-snack-bar-container ng-tns-c21-37 ng-trigger ng-trigger-state mat-snack-bar-top ng-star-inserted']";
    String snackBarContainerToolFinishedSelector = "//snack-bar-container[@class='mat-snack-bar-container ng-tns-c21-39 ng-trigger ng-trigger-state mat-snack-bar-top ng-star-inserted']";


    public HomePage(WebDriver webDriver, WebDriverWait wait) {
        super(webDriver, wait);
        webDriver.get("http://localhost:4200/");
    }

    public boolean startPerformanceMeasurement(){
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(matRaisedButtonSelector)));
        List<WebElement> resultListElements = webDriver.findElements(By.xpath(matRaisedButtonSelector));
        resultListElements.get(0).sendKeys(Keys.ENTER);

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(snackBarContainerToolStartedSelector)));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(snackBarContainerToolFinishedSelector)));
        if (webDriver.findElement(By.xpath(snackBarContainerToolFinishedSelector)).getText().startsWith("Performance Tool is finished!")){
            return true;
        }
        return false;
    }

    public boolean startStressTestingMeasurement(){
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(matRaisedButtonSelector)));
        List<WebElement> resultListElements = webDriver.findElements(By.xpath(matRaisedButtonSelector));
        resultListElements.get(1).sendKeys(Keys.ENTER);

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(snackBarContainerToolStartedSelector)));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(snackBarContainerToolFinishedSelector)));
        if (webDriver.findElement(By.xpath(snackBarContainerToolFinishedSelector)).getText().startsWith("Stress testing tool is finished!")){
            return true;
        }
        return false;
    }
}
