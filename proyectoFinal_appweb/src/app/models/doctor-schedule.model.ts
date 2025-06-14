
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface Doctor {
  doctorId: number;
  firstName: string;
  lastName: string;
  // other doctor properties
}

export interface DoctorSchedule {
  scheduleId: number;
  doctor: Doctor;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

export interface DoctorScheduleCreateDto {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  doctorId: number;
}