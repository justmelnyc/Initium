import { Component, Input } from "@angular/core";

@Component({
    selector: "calendar-reminders",
    template: `
        <ul class="reminders" *ngIf="!disabled && reminders.length">
            <li class="reminder" *ngFor="let reminder of reminders">{{ reminder.text }}</li>
        </ul>`
})
export class CalendarReminders {
    @Input() setting;
    @Input() newReminders;

    constructor() {
        this.disabled = false;
        this.reminders = [];
    }

    ngOnChanges(changes) {
        if (changes.newReminders && !changes.newReminders.isFirstChange()) {
            this.reminders = changes.newReminders.currentValue;
        }
        if (changes.setting && !changes.setting.isFirstChange()) {
            this.disabled = changes.setting.currentValue.calendarRemindersDisabled;
        }
    }
}
