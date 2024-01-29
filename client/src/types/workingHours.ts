import { TimeSlot } from "./timeSlot";

export interface WorkingHours
{
    id: number,
    weekDay: string,
    timeSlots: TimeSlot[]
}