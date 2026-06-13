import { supabase } from "./supabase";
import { DayHours } from "./opening-hours";

export type ReservationConfig = {
  closedWeekdays: number[];
  closedDates: string[];
  holidayPeriods: { debut: string; fin: string }[];
  timeSlots: string[];
};

// DAYS_FR index (0=Lundi…6=Dimanche) → JS Date.getDay() (0=Sun, 1=Mon…6=Sat)
const DAYS_FR_TO_JS: Record<number, number> = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 0,
};

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60).toString().padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

function generateSlots(debut: string, fin: string, step = 30): string[] {
  const slots: string[] = [];
  const start = timeToMinutes(debut);
  const end = timeToMinutes(fin);
  for (let t = start; t <= end; t += step) {
    slots.push(minutesToTime(t));
  }
  return slots;
}

export async function getReservationConfig(): Promise<ReservationConfig> {
  const restaurantId = process.env.REACT_APP_RESTAURANT_ID!;

  const [hoursResult, closedDaysResult, holidaysResult] = await Promise.all([
    supabase.from("opening_hours").select("hours").eq("restaurant_id", restaurantId).single(),
    supabase.from("closed_days").select("days").eq("restaurant_id", restaurantId).single(),
    supabase.from("holidays").select("periods").eq("restaurant_id", restaurantId).single(),
  ]);

  const hours: DayHours[] | null = hoursResult.data?.hours ?? null;
  const closedDates: string[] = closedDaysResult.data?.days ?? [];
  const holidayPeriods: { debut: string; fin: string }[] = holidaysResult.data?.periods ?? [];

  const closedWeekdays: number[] = [];
  const slotSet = new Set<string>();

  if (hours) {
    hours.forEach((day, index) => {
      if (day.closedDay) {
        closedWeekdays.push(DAYS_FR_TO_JS[index]);
      } else {
        if (!day.closedLunch && day.midi?.debut && day.midi?.fin) {
          generateSlots(day.midi.debut, day.midi.fin).forEach((s) => slotSet.add(s));
        }
        if (!day.closedDiner && day.soir?.debut && day.soir?.fin) {
          generateSlots(day.soir.debut, day.soir.fin).forEach((s) => slotSet.add(s));
        }
      }
    });
  }

  // Fallback si aucun créneau chargé
  if (slotSet.size === 0) {
    ["11:30", "12:00", "12:30", "13:00", "13:30", "14:00"].forEach((s) => slotSet.add(s));
  }

  const timeSlots = Array.from(slotSet).sort();

  return { closedWeekdays, closedDates, holidayPeriods, timeSlots };
}
