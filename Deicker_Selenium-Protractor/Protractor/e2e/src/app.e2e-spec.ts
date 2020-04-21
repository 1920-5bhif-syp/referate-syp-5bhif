import { AppPage } from './app.po';
import { browser, logging, protractor } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.driver.manage().window().maximize();
  });

  it('should start Performance Tool', () => {
    const until = protractor.ExpectedConditions;
    page.navigateTo();
    browser.wait(until.elementToBeClickable(page.getStartPerformanceToolButton()), 10000);
    page.getStartPerformanceToolButton().click();

    browser.wait(until.presenceOf(page.getNotificationSnackbar()), 15000, 'Element taking too long to appear in the DOM');
    browser.wait(until.presenceOf(page.getNotificationSnackbar()), 15000, 'Element taking too long to appear in the DOM');
    expect(page.getNotificationSnackbar().getText()).toContain('Performance Tool is finished!');
  });

  it('should start Stress Testing Tool', () => {
    const until = protractor.ExpectedConditions;
    page.navigateTo();
    browser.wait(until.elementToBeClickable(page.getStartStressTestingToolButton()), 10000);
    page.getStartStressTestingToolButton().click();

    browser.wait(until.presenceOf(page.getNotificationSnackbar()), 15000, 'Element taking too long to appear in the DOM');
    browser.wait(until.presenceOf(page.getNotificationSnackbar()), 15000, 'Element taking too long to appear in the DOM');
    expect(page.getNotificationSnackbar().getText()).toContain('Stress testing tool is finished!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
