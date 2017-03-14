import { Component } from "@angular/core";

@Component({
    selector: "stopwatch",
    template: `
        <div class="stopwatch" (click)="toggle()">
            <span *ngIf="stopwatch.hours">
                <span class="stopwatch-digit">{{ stopwatch.hours }}</span>
                <span class="timer-stopwatch-sep">h</span>
            </span>
            <span *ngIf="stopwatch.minutes">
                <span class="stopwatch-digit">{{ stopwatch.minutes }}</span>
                <span class="timer-stopwatch-sep">m</span>
            </span>
            <span class="stopwatch-digit">{{ stopwatch.seconds }}</span>
            <span class="timer-stopwatch-sep">s</span>
            <span class="stopwatch-milliseconds">{{ stopwatch.milliseconds }}</span>
        </div>
        <div class="timer-stopwatch-controls">
            <button class="font-btn timer-stopwatch-control" (click)="start()" *ngIf="!isRunning">Start</button>
            <button class="font-btn timer-stopwatch-control" (click)="stop()" *ngIf="isRunning">Stop</button>
            <button class="font-btn timer-stopwatch-control" (click)="reset()">Reset</button>
        </div>
    `
})
export class Stopwatch {
    constructor() {
        this.isRunning = false;
        this.stopwatch = this.resetTime();
    }

    resetTime() {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: "000"
        };
    }

    padMilliseconds(num) {
        if (num < 10) {
            return `00${num}`;
        }
        if (num < 100) {
            return `0${num}`;
        }
        return num;
    }

    update(elapsed) {
        if (!this.isRunning) {
            return;
        }
        const start = performance.now();
        const hours = this.stopwatch.hours;
        let minutes = this.stopwatch.minutes;
        let seconds = parseInt(this.stopwatch.seconds, 10);
        let milliseconds = parseInt(this.stopwatch.milliseconds, 10) + elapsed;

        if (milliseconds >= 1000) {
            seconds += 1;
            milliseconds -= 1000;
        }

        if (seconds >= 60) {
            seconds -= 60;
            minutes += 1;
            this.stopwatch.minutes = minutes;
        }

        if (minutes >= 60) {
            minutes -= 60;
            this.stopwatch.minutes = minutes;
            this.stopwatch.hours = hours + 1;
        }

        if (minutes && seconds < 10) {
            seconds = `0${seconds}`;
        }

        if (hours && minutes < 10) {
            minutes = `0${minutes}`;
        }

        this.stopwatch.milliseconds = this.padMilliseconds(milliseconds);
        this.stopwatch.seconds = seconds;

        requestAnimationFrame(() => {
            const diff = Math.floor(performance.now() - start);

            this.update(diff);
        });
    }

    toggle() {
        if (this.isRunning) {
            this.stop();
        }
        else {
            this.start();
        }
    }

    start() {
        this.isRunning = true;
        this.update(0);
    }

    stop() {
        this.isRunning = false;
    }

    reset() {
        this.stop();
        this.stopwatch = this.resetTime();
    }
}
