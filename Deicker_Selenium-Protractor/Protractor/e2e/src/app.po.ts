import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getPerformanceToolText() {
    return element.all(by.xpath('//mat-card-title[@class=\'mat-card-title\']')).get(0).getText();
  }
  getStartPerformanceToolButton() {
    return element.all(by.xpath('//button[@class=\'mat-raised-button mat-primary\']')).get(0);
  }
  getStartStressTestingToolButton() {
    return element.all(by.xpath('//button[@class=\'mat-raised-button mat-primary\']')).get(1);
  }
  getNotificationSnackbar() {
    return element(by.xpath('//simple-snack-bar'));
  }
}
