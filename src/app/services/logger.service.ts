import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logger: Console;

  constructor() {
    this.logger = console;
  }

  log(message: string) {
    this.logger.log(message);
  }

  debug(message) {
    this.logger.debug(message);
  }

  warn(message) {
    this.logger.warn(message);
  }

  error(error: HttpErrorResponse | any) {
    if (error instanceof HttpErrorResponse) {
      this.logger.log('%c**** Start Of Http-Error-Log ****', 'color: red');
      this.logger.log('Date-Time: ' + new Date().toString());
      this.logger.log('Name: ' + error.name);
      this.logger.log('Url: ' + error.url);
      this.logger.log('Error: ' + error.error);
      this.logger.log('Message' + error.message);
      this.logger.log('Status Text: ' + error.statusText);
      this.logger.log('Headers: ' + error.headers);
      this.logger.log('%c**** End Of Http-Error-Log ****', 'color: red');
      return;
    }
    this.logger.error(error);
  }
}
