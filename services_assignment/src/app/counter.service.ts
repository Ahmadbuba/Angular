import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class CounterService {
    activeToInactiveCounter = 0;
    inActiveToActiveCounter = 0;
    
    incrementActiveToInactive() {
        this.activeToInactiveCounter++;
        console.log('Active to Inactive: ' + this.activeToInactiveCounter);
    }

    incrementInactiveToActive() {
        this.inActiveToActiveCounter++;
        console.log('Inactive to Active: ' + this.inActiveToActiveCounter);
    }

    
}