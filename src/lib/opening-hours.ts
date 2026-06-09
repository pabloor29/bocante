import { createClient } from "@supabase/supabase-js";

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

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

export async function getOpeningHours(): Promise<DayHours[] | null> {
  console.log("[opening-hours] URL:", process.env.REACT_APP_SUPABASE_URL);
  console.log("[opening-hours] RESTAURANT_ID:", process.env.REACT_APP_RESTAURANT_ID);

  const { data, error } = await supabase
    .from("opening_hours")
    .select("hours")
    .eq("restaurant_id", process.env.REACT_APP_RESTAURANT_ID!)
    .single();

  console.log("[opening-hours] data:", data);
  console.log("[opening-hours] error:", error);

  if (error || !data) return null;
  return data.hours as DayHours[];
}
