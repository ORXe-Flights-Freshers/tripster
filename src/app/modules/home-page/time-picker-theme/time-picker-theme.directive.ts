import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[appTimePickerTheme]'
})
export class TimePickerThemeDirective {
  @HostBinding('style.--button-color')
  buttonColor = '#0B1240 !important';

  @HostBinding('style.--dial-background-color')
  dialBackgroundColor = '#0B1240 !important';

  @HostBinding('style.--dial-editable-active-color')
  dialEditableActiveColor = '#0B1240 !important';

  @HostBinding('style.--clock-hand-color')
  clockHandColor = '#0B1240 !important';

  constructor() { }

}
