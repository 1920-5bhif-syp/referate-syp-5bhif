import { Component } from '@angular/core';

/*
  Description: This component is used to call all other components,
               and is used to navigate between the components.
  ------------------------------------------------------------------
  Creators:    René Deicker, Stefan Leithenmayr
  ------------------------------------------------------------------
*/

@Component({
  selector: 'app-performance',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  tabIndex = 0;

  constructor() {}

  changeTab(event: any) {
    this.tabIndex = event.index;
  }
}
