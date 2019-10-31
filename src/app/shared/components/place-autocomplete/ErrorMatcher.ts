import { ErrorStateMatcher } from '@angular/material';

export class InputErrorStateMatcher implements ErrorStateMatcher {
        constructor(private errorstate: boolean) {}
        isErrorState(): boolean {
        return this.errorstate;
      }
    }
