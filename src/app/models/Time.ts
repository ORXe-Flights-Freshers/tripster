export class Time {
  hours: number;
  minutes: number;

  static parseTimeStringToTime(timeString): Time {
    let [hours, minutes] = timeString
      .substr(0, timeString.length - 3)
      .split(":")
      .map(Number);
    if (timeString.includes("PM") && hours !== 12) hours += 12;
    let time = new Time();
    time.hours = hours;
    time.minutes = minutes;
    return time;
  }
}
