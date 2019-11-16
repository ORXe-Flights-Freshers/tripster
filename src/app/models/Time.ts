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
}
