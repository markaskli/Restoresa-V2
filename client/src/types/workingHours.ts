import { TimeSlot } from "./timeSlot";

export interface WorkingHours
{
    id: number,
    weekDay: string,
    startTime: string,
    finishTime: string
    timeSlots: TimeSlot[]
}