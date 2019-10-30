import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';

export class TimePickerThemeService {
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: 'white',
      buttonColor: '#0B1240'
    },
    dial: {
      dialBackgroundColor: '#0B1240',
    },
    clockFace: {
      clockFaceBackgroundColor: '#eeeeee',
      clockHandColor: '#0B1240',
      clockFaceTimeInactiveColor: '#0B1240'
    }
  };
}
