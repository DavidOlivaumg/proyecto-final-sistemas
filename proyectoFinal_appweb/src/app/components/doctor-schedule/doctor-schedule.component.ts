import { Component, OnInit } from '@angular/core';
import { DoctorScheduleService } from '../../services/doctor-schedule.service';
import { AuthService } from '../../auth/auth.service';
import { DayOfWeek, DoctorSchedule } from '../../models/doctor-schedule.model';

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.css'],
   standalone: false
})
export class DoctorScheduleComponent implements OnInit {
  schedules: DoctorSchedule[] = [];
  daysOfWeek: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  newSchedule: Omit<DoctorSchedule, 'scheduleId' | 'doctor'> & { doctorId?: number } = {
    dayOfWeek: 'MONDAY',
    startTime: '09:00',
    endTime: '17:00'
  };

  constructor(
    private scheduleService: DoctorScheduleService,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.userId) {
      this.scheduleService.getSchedulesByDoctor(currentUser.userId).subscribe({
        next: (data) => {
          this.schedules = data;
        },
        error: (err) => console.error('Error loading schedules:', err)
      });
    }
  }

  addSchedule(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !currentUser.userId) return;

    const scheduleData = {
      dayOfWeek: this.newSchedule.dayOfWeek,
      startTime: this.newSchedule.startTime,
      endTime: this.newSchedule.endTime,
      doctorId: currentUser.userId
    };

    this.scheduleService.createSchedule(scheduleData).subscribe({
      next: () => {
        this.loadSchedules();
        this.resetForm();
      },
      error: (err) => console.error('Error creating schedule:', err)
    });
  }

  private resetForm(): void {
    this.newSchedule = {
      dayOfWeek: 'MONDAY',
      startTime: '09:00',
      endTime: '17:00'
    };
  }

  deleteSchedule(scheduleId: number): void {
    this.scheduleService.deleteSchedule(scheduleId).subscribe({
      next: () => {
        this.loadSchedules();
      },
      error: (err) => console.error('Error deleting schedule:', err)
    });
  }
}