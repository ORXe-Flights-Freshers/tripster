export class Time {
  hours: number;
  minutes: number;

  static parseTimeStringToTime(timeString): Time {
    const [hours, minutes] = timeString
      .substr(0, timeString.length - 3)
      .split(':')
      .map(Number);
    const time = new Time();

    time.hours = hours;
    if (timeString.includes('PM') && hours !== 12) {
      time.hours += 12;
    }

    time.minutes = minutes;
    return time;
  }
    static convertMiliSecondsToDays(milliSeconds): string {
    const hours = Math.floor(milliSeconds / (3600 * 1000));
    const minutes = Math.floor(
      (milliSeconds - 3600 * 1000 * hours) / (60 * 1000)
    );
    if (hours === 0) {
      return minutes + ' m ';
    } else {
      return hours + ' h ' + minutes + ' m ';
    }
  }
}
