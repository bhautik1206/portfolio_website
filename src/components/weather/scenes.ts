export const SCENES = [
  { id: "sunny", label: "Sunny Day" },
  { id: "sunset", label: "Sunset / Golden" },
  { id: "night", label: "Starry Night & Moon" },
  { id: "rain", label: "Rain Showers" },
  { id: "thunder", label: "Thunderstorm & Lightning" },
  { id: "overcast", label: "Overcast" },
  { id: "snow", label: "Snowfall" },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

export function sceneLabel(id: SceneId) {
  return SCENES.find((s) => s.id === id)?.label ?? "Sunny Day";
}

export type WeatherReading = {
  city: string | null;
  countryCode: string | null;
  temp: number | null;
  code: number | null;
  isDay: boolean | null;
  sunrise: string | null;
  sunset: string | null;
};

const GOLDEN_HOUR_MS = 45 * 60 * 1000;

function nearTwilight(now: Date, sunrise: string | null, sunset: string | null) {
  return [sunrise, sunset].some((t) => t && Math.abs(new Date(t).getTime() - now.getTime()) < GOLDEN_HOUR_MS);
}

// Open-Meteo WMO weather codes: https://open-meteo.com/en/docs
export function pickScene(w: WeatherReading | null, now: Date = new Date()): SceneId {
  if (w && w.code != null) {
    const c = w.code;
    if (c >= 95) return "thunder";
    if ((c >= 71 && c <= 77) || c === 85 || c === 86) return "snow";
    if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82)) return "rain";
    if (c === 3 || c === 45 || c === 48) return "overcast";
    if (nearTwilight(now, w.sunrise, w.sunset)) return "sunset";
    if (w.isDay === false) return "night";
    return "sunny";
  }
  const h = now.getHours();
  if (h >= 17 && h < 19) return "sunset";
  if (h >= 19 || h < 6) return "night";
  return "sunny";
}
