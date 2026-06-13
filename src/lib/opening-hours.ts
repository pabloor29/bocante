import { supabase } from "./supabase";

export type DayHours = {
  midi: { debut: string; fin: string };
  soir: { debut: string; fin: string };
  closedDay: boolean;
  closedDiner: boolean;
  closedLunch: boolean;
};

export const DAYS_FR = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export async function getOpeningHours(): Promise<DayHours[] | null> {
  const { data, error } = await supabase
    .from("opening_hours")
    .select("hours")
    .eq("restaurant_id", process.env.REACT_APP_RESTAURANT_ID!)
    .single();

  if (error || !data) return null;
  return data.hours as DayHours[];
}
