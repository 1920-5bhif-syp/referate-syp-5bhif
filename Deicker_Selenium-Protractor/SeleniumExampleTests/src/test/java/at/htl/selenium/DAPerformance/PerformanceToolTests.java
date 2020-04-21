package at.htl.selenium.DAPerformance;

import at.htl.selenium.DAPerformance.pages.HomePage;
import org.junit.*;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.concurrent.TimeUnit;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class PerformanceToolTests {
    WebDriver  webDriver;
    WebDriverWait wait ;
    @BeforeClass
    public static void setChromeDriverProperty() {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\rened\\Desktop\\Chromedrive\\chromedriver 77\\chromedriver.exe");

    }

    @Before
    public void initializeComponents() {
        webDriver = new ChromeDriver();
        webDriver.manage().window().maximize();
        wait = new WebDriverWait(webDriver, 20);
    }

    @Test
    public void t010StartPerformanceTool() {
        HomePage homePage = new HomePage(webDriver, wait);
        Assert.assertTrue(homePage.startPerformanceMeasurement());
    }

    @After
    public void closeWebdriver() throws InterruptedException {
        TimeUnit.SECONDS.sleep(5);
        webDriver.close();
    }
}
