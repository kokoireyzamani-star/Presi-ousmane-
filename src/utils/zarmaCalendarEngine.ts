import {
  ZARMA_DAYS_OF_WEEK,
  ZARMA_GREGORIAN_MONTHS,
  ZARMA_LUNAR_MONTHS,
  ZARMA_NUMBERS_DAYS,
  ZARMA_SEASONS,
  ZARMA_TIME_PERIODS,
  ZarmaDayOfWeek,
  ZarmaGregorianMonth,
  ZarmaLunarMonth,
  ZarmaSeason,
  ZarmaTimePeriod
} from '../data/zarmaCalendarData';

export interface HijriApproximation {
  hijriYear: number;
  hijriMonthIndex: number; // 0..11
  hijriDay: number;        // 1..30
  lunarMonth: ZarmaLunarMonth;
  moonPhaseFraction: number; // 0..1 (0 = new moon, 0.5 = full moon)
  moonPhaseZarma: string;
  moonPhaseFr: string;
  moonPhaseEn: string;
}

/**
 * Astronomical / Kuwaity algorithm approximation for converting a Gregorian date
 * into the Islamic Lunar (Hijri) date and Zarma lunar month (Handu).
 */
export function getZarmaLunarDate(date: Date): HijriApproximation {
  // Use Intl.DateTimeFormat with islamic-umalqura or islamic-civil when supported, with deterministic fallback
  let hijriDay = 1;
  let hijriMonthIndex = 0; // 0-indexed (0 = Muharram .. 11 = Dhu al-Hijjah)
  let hijriYear = 1448;

  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    const parts = formatter.formatToParts(date);
    const dayPart = parts.find((p) => p.type === 'day')?.value;
    const monthPart = parts.find((p) => p.type === 'month')?.value;
    const yearPart = parts.find((p) => p.type === 'year')?.value;

    if (dayPart && monthPart && yearPart) {
      hijriDay = Math.max(1, Math.min(30, parseInt(dayPart, 10)));
      hijriMonthIndex = Math.max(0, Math.min(11, parseInt(monthPart, 10) - 1));
      hijriYear = parseInt(yearPart.replace(/\D/g, ''), 10) || 1448;
    }
  } catch {
    // Deterministic astronomical fallback based on Julian Day
    const jd = Math.floor(date.getTime() / 86400000) + 2440588;
    const l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l2 = l - 10631 * n + 354;
    const j =
      Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
      Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
    const l3 =
      l2 -
      Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
      Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
      29;
    const m = Math.floor((24 * l3) / 709);
    const d = l3 - Math.floor((709 * m) / 24);
    const y = 30 * n + j - 30;

    hijriDay = Math.max(1, Math.min(30, d));
    hijriMonthIndex = Math.max(0, Math.min(11, m - 1));
    hijriYear = y;
  }

  const lunarMonth = ZARMA_LUNAR_MONTHS[hijriMonthIndex] || ZARMA_LUNAR_MONTHS[0];
  const moonPhaseFraction = Math.min(1, Math.max(0, (hijriDay - 1) / 29.53));

  let moonPhaseZarma = 'Handu taji (Nouvelle lune)';
  let moonPhaseFr = 'Nouvelle lune visible (Handu kayray)';
  let moonPhaseEn = 'New crescent moon (Handu taji)';

  if (hijriDay <= 3) {
    moonPhaseZarma = 'Handu taji';
    moonPhaseFr = 'Premier croissant lunaire';
    moonPhaseEn = 'New crescent moon';
  } else if (hijriDay <= 11) {
    moonPhaseZarma = 'Handu ga beeri';
    moonPhaseFr = 'Lune croissante';
    moonPhaseEn = 'Waxing moon';
  } else if (hijriDay >= 12 && hijriDay <= 16) {
    moonPhaseZarma = 'Handu kwaaray';
    moonPhaseFr = 'Pleine lune blanche (nuits claires)';
    moonPhaseEn = 'Full white moon (bright nights)';
  } else if (hijriDay >= 17 && hijriDay <= 25) {
    moonPhaseZarma = 'Handu ga kayna';
    moonPhaseFr = 'Lune décroissante';
    moonPhaseEn = 'Waning moon';
  } else {
    moonPhaseZarma = 'Handu kubay';
    moonPhaseFr = 'Fin de lune (nuits sombres)';
    moonPhaseEn = 'Dark waning crescent';
  }

  return {
    hijriYear,
    hijriMonthIndex,
    hijriDay,
    lunarMonth,
    moonPhaseFraction,
    moonPhaseZarma,
    moonPhaseFr,
    moonPhaseEn
  };
}

export interface FullZarmaDateDetails {
  date: Date;
  dayOfWeek: ZarmaDayOfWeek;
  gregorianMonth: ZarmaGregorianMonth;
  season: ZarmaSeason;
  lunar: HijriApproximation;
  dayNumberZarma: string;
  dayNumberPhonetic: string;
  fullZarmaSentence: string;
  fullFrenchSentence: string;
  fullEnglishSentence: string;
}

export function getFullZarmaDateDetails(date: Date): FullZarmaDateDetails {
  const dayOfWeek = ZARMA_DAYS_OF_WEEK[date.getDay()];
  const gregorianMonth = ZARMA_GREGORIAN_MONTHS[date.getMonth()];
  const season =
    ZARMA_SEASONS.find((s) => s.id === gregorianMonth.seasonId) || ZARMA_SEASONS[0];
  const lunar = getZarmaLunarDate(date);

  const dayOfMonth = date.getDate();
  const numEntry =
    ZARMA_NUMBERS_DAYS.find((n) => n.num === dayOfMonth) || ZARMA_NUMBERS_DAYS[0];

  const year = date.getFullYear();

  const fullZarmaSentence = `${dayOfWeek.zarmaAncestralName} (${dayOfWeek.zarmaName}), ${gregorianMonth.traditionalLunarCorrespondent} / ${gregorianMonth.zarmaName} handu jirbi ${numEntry.zarma.toLowerCase()}, jiiri ${year} — (${lunar.lunarMonth.zarmaName} jirbi ${lunar.hijriDay})`;
  const fullFrenchSentence = `${dayOfWeek.frenchName} (${dayOfWeek.zarmaAncestralName} · ${dayOfWeek.zarmaName}) ${dayOfMonth} ${gregorianMonth.frenchName} ${year} · Saison ${season.zarmaName}`;
  const fullEnglishSentence = `${dayOfWeek.englishName} (${dayOfWeek.zarmaAncestralName} · ${dayOfWeek.zarmaName}), ${gregorianMonth.englishName} ${dayOfMonth}, ${year} · ${season.zarmaName} Season`;

  return {
    date,
    dayOfWeek,
    gregorianMonth,
    season,
    lunar,
    dayNumberZarma: numEntry.zarma,
    dayNumberPhonetic: numEntry.phonetic,
    fullZarmaSentence,
    fullFrenchSentence,
    fullEnglishSentence
  };
}

export function getZarmaTimePeriodForHour(hourDecimal: number): ZarmaTimePeriod {
  const normalized = ((hourDecimal % 24) + 24) % 24;
  if (normalized >= 5 && normalized < 8.5) return ZARMA_TIME_PERIODS[0]; // Alfazar
  if (normalized >= 8.5 && normalized < 10.5) return ZARMA_TIME_PERIODS[1]; // Adduha
  if (normalized >= 10.5 && normalized < 12) return ZARMA_TIME_PERIODS[2]; // Weete
  if (normalized >= 12 && normalized < 14) return ZARMA_TIME_PERIODS[3]; // Zaari
  if (normalized >= 14 && normalized < 16) return ZARMA_TIME_PERIODS[4]; // Aluula
  if (normalized >= 16 && normalized < 18.25) return ZARMA_TIME_PERIODS[5]; // Alaasar
  if (normalized >= 18.25 && normalized < 20) return ZARMA_TIME_PERIODS[6]; // Fitiri / Hiire
  return ZARMA_TIME_PERIODS[7]; // Almaari / Ciini
}

export function formatIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
