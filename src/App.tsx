import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Plus,
  Trash2,
  MapPin,
  Play,
  Pause
} from 'lucide-react';
import {
  LanguageMode,
  ZARMA_DAYS_OF_WEEK,
  ZARMA_GREGORIAN_MONTHS,
  ZARMA_LUNAR_MONTHS,
  ZARMA_SEASONS,
  ZARMA_TIME_PERIODS,
  ZARMA_RELATIVE_TIME_EXPRESSIONS,
  ZARMA_NUMBERS_DAYS,
  CalendarCustomEvent
} from './data/zarmaCalendarData';
import {
  getFullZarmaDateDetails,
  getZarmaTimePeriodForHour,
  formatIsoDate
} from './utils/zarmaCalendarEngine';

const DEFAULT_EVENTS: CalendarCustomEvent[] = [
  {
    id: 'evt-1',
    dateStr: '2026-10-08',
    titleZarma: 'Birni N’Gaouré Habo (Tohantaji / Alaamisi)',
    titleFr: 'Grand marché hebdomadaire du Boboye à Birni',
    category: 'market',
    location: 'Birni N’Gaouré, Dosso',
    notes: 'Tohantaji (Alaamisi) no Birni habo — échange de céréales nouvelles et dattes.'
  },
  {
    id: 'evt-2',
    dateStr: '2026-10-09',
    titleZarma: 'Zinbuza (Alzuma / Han beeri) — Boŋ jisi do',
    titleFr: 'Grande prière collective du vendredi & marché de Kirtachi',
    category: 'ceremony',
    location: 'Niamey / Kirtachi',
    notes: 'Zinbuza / Alzuma : jour de rassemblement communautaire et de bénédictions (adduwa).'
  },
  {
    id: 'evt-3',
    dateStr: '2026-10-10',
    titleZarma: 'Duhantaji (Asipti) — Boŋcabay & Kollo Habo',
    titleFr: 'Baptême traditionnel du 7e jour & Marché de Kollo',
    category: 'ceremony',
    location: 'Kollo, Tillabéri',
    notes: 'Attribution du nom au nouveau-né (atakirya) au matin (subbaahi).'
  },
  {
    id: 'evt-4',
    dateStr: '2026-10-11',
    titleZarma: 'Fahantaji (Alhadi) — Hayoru Habo & Hayni Boko',
    titleFr: 'Marché fluvial d’Ayorou & Stockage des bottes de mil (Hemar)',
    category: 'agriculture',
    location: 'Ayorou, Fleuve Niger',
    notes: 'Mise en grenier (barma) des récoltes d’octobre.'
  },
  {
    id: 'evt-5',
    dateStr: '2026-10-14',
    titleZarma: 'Wayhantaji (Alarba) — Boubon Habo',
    titleFr: 'Marché artisanal et poteries riveraines de Boubon',
    category: 'market',
    location: 'Boubon, Tillabéri',
    notes: 'Wayhantaji (Alarba) kaŋ bisa, iri koy Boubon.'
  }
];

// Monday-first ordering for the concordance table (Mahantaji -> Fahantaji)
const MONDAY_FIRST_INDICES = [1, 2, 3, 4, 5, 6, 0];

function getZarmaSpokenClockString(hours24: number, minutes: number): string {
  const period = getZarmaTimePeriodForHour(hours24 + minutes / 60);
  const hour12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const hourEntry = ZARMA_NUMBERS_DAYS.find((n) => n.num === hour12);
  const hourWord = hourEntry ? hourEntry.zarma.split(' ')[0].toLowerCase() : String(hour12);

  if (minutes === 0) {
    return `Guuru ${hourWord} (${period.zarmaName.split(' ')[0]})`;
  }
  const minEntry = ZARMA_NUMBERS_DAYS.find((n) => n.num === minutes);
  const minWord = minEntry ? minEntry.zarma.toLowerCase() : `${minutes}`;
  return `Guuru ${hourWord} nda miniti ${minWord} (${period.zarmaName.split(' ')[0]})`;
}

export default function App() {
  const today = useMemo(() => new Date(), []);

  // Primary states
  const [lang, setLang] = useState<LanguageMode>('fr');
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date>(() => today);
  const [workspaceTab, setWorkspaceTab] = useState<'solar' | 'lunar' | 'Converter'>('solar');

  // Live Montre (Watch) real-time state
  const [liveNow, setLiveNow] = useState<Date>(() => new Date());
  const [watchMode, setWatchMode] = useState<'live' | 'manual'>('live');
  const [simulatedHour, setSimulatedHour] = useState<number>(() => {
    const now = new Date();
    return Number((now.getHours() + now.getMinutes() / 60).toFixed(2));
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const current = new Date();
      setLiveNow(current);
      if (watchMode === 'live') {
        setSimulatedHour(
          Number((current.getHours() + current.getMinutes() / 60).toFixed(2))
        );
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [watchMode]);

  // Interactive Season Explorer state
  const [activeSeasonId, setActiveSeasonId] = useState<'hayni' | 'kaydiya' | 'hemar' | 'jaw'>('hemar');

  // Selected Lunar Month in the 12-month lunar wheel
  const [selectedLunarOrder, setSelectedLunarOrder] = useState<number>(() => {
    const details = getFullZarmaDateDetails(today);
    return details.lunar.lunarMonth.order;
  });

  // Custom Community Events state
  const [customEvents, setCustomEvents] = useState<CalendarCustomEvent[]>(DEFAULT_EVENTS);
  const [showAddEventForm, setShowAddEventForm] = useState<boolean>(false);
  const [newEventTitleZarma, setNewEventTitleZarma] = useState<string>('');
  const [newEventTitleFr, setNewEventTitleFr] = useState<string>('');
  const [newEventLocation, setNewEventLocation] = useState<string>('Niamey');
  const [newEventCategory, setNewEventCategory] = useState<CalendarCustomEvent['category']>('market');

  // Converter state
  const [converterInputDate, setConverterInputDate] = useState<string>(() => formatIsoDate(today));

  // Image resilience state
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [secondaryImgFailed, setSecondaryImgFailed] = useState(false);

  // Computed details for selectedDate
  const selectedDetails = useMemo(
    () => getFullZarmaDateDetails(selectedDate),
    [selectedDate]
  );

  // Computed details for converter date
  const converterDetails = useMemo(() => {
    const parts = converterInputDate.split('-').map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      return getFullZarmaDateDetails(new Date(parts[0], parts[1] - 1, parts[2]));
    }
    return selectedDetails;
  }, [converterInputDate, selectedDetails]);

  // Calendar grid generation for currentMonthDate (Week starts on Sunday = Fahantaji / Alhadi = index 0)
  const calendarDays = useMemo(() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startWeekday = firstDayOfMonth.getDay(); // 0 (Fahantaji / Alhadi) .. 6 (Duhantaji / Asipti)
    const totalDays = lastDayOfMonth.getDate();

    const cells: {
      date: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      iso: string;
      lunarDay: number;
      lunarMonthName: string;
      events: CalendarCustomEvent[];
    }[] = [];

    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = startWeekday - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthLastDate - i);
      const iso = formatIsoDate(d);
      const det = getFullZarmaDateDetails(d);
      cells.push({
        date: d,
        isCurrentMonth: false,
        isToday: iso === formatIsoDate(today),
        isSelected: iso === formatIsoDate(selectedDate),
        iso,
        lunarDay: det.lunar.hijriDay,
        lunarMonthName: det.lunar.lunarMonth.zarmaName,
        events: customEvents.filter((e) => e.dateStr === iso)
      });
    }

    for (let day = 1; day <= totalDays; day++) {
      const d = new Date(year, month, day);
      const iso = formatIsoDate(d);
      const det = getFullZarmaDateDetails(d);
      cells.push({
        date: d,
        isCurrentMonth: true,
        isToday: iso === formatIsoDate(today),
        isSelected: iso === formatIsoDate(selectedDate),
        iso,
        lunarDay: det.lunar.hijriDay,
        lunarMonthName: det.lunar.lunarMonth.zarmaName,
        events: customEvents.filter((e) => e.dateStr === iso)
      });
    }

    const targetCells = cells.length > 35 ? 42 : 35;
    const remaining = targetCells - cells.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      const iso = formatIsoDate(d);
      const det = getFullZarmaDateDetails(d);
      cells.push({
        date: d,
        isCurrentMonth: false,
        isToday: iso === formatIsoDate(today),
        isSelected: iso === formatIsoDate(selectedDate),
        iso,
        lunarDay: det.lunar.hijriDay,
        lunarMonthName: det.lunar.lunarMonth.zarmaName,
        events: customEvents.filter((e) => e.dateStr === iso)
      });
    }

    return cells;
  }, [currentMonthDate, today, selectedDate, customEvents]);

  const currentGregorianMonthMeta = useMemo(
    () => ZARMA_GREGORIAN_MONTHS[currentMonthDate.getMonth()],
    [currentMonthDate]
  );

  const activeTimePeriod = useMemo(
    () => getZarmaTimePeriodForHour(simulatedHour),
    [simulatedHour]
  );

  const activeSeason = useMemo(
    () => ZARMA_SEASONS.find((s) => s.id === activeSeasonId) || ZARMA_SEASONS[2],
    [activeSeasonId]
  );

  const activeLunarMonth = useMemo(
    () => ZARMA_LUNAR_MONTHS.find((m) => m.order === selectedLunarOrder) || ZARMA_LUNAR_MONTHS[8],
    [selectedLunarOrder]
  );

  const selectedDateEvents = useMemo(() => {
    const iso = formatIsoDate(selectedDate);
    return customEvents.filter((e) => e.dateStr === iso);
  }, [selectedDate, customEvents]);

  // Montre (Watch) hand calculations
  const watchTimeParts = useMemo(() => {
    if (watchMode === 'live') {
      const h = liveNow.getHours();
      const m = liveNow.getMinutes();
      const s = liveNow.getSeconds();
      const hourAngle = ((h % 12) + m / 60 + s / 3600) * 30;
      const minuteAngle = (m + s / 60) * 6;
      const secondAngle = s * 6;
      const digitalStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(
        s
      ).padStart(2, '0')}`;
      const zarmaSpoken = getZarmaSpokenClockString(h, m);
      return { h, m, s, hourAngle, minuteAngle, secondAngle, digitalStr, zarmaSpoken };
    } else {
      const h = Math.floor(simulatedHour);
      const m = Math.round((simulatedHour - h) * 60) % 60;
      const s = 0;
      const hourAngle = ((h % 12) + m / 60) * 30;
      const minuteAngle = m * 6;
      const secondAngle = 0;
      const digitalStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;
      const zarmaSpoken = getZarmaSpokenClockString(h, m);
      return { h, m, s, hourAngle, minuteAngle, secondAngle, digitalStr, zarmaSpoken };
    }
  }, [watchMode, liveNow, simulatedHour]);

  const handlePrevMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleJumpToToday = () => {
    const now = new Date();
    setSelectedDate(now);
    setCurrentMonthDate(new Date(now.getFullYear(), now.getMonth(), 1));
    const det = getFullZarmaDateDetails(now);
    setActiveSeasonId(det.season.id);
    setSelectedLunarOrder(det.lunar.lunarMonth.order);
    setWatchMode('live');
  };

  const handleSelectDayCell = (d: Date) => {
    setSelectedDate(d);
    if (d.getMonth() !== currentMonthDate.getMonth() || d.getFullYear() !== currentMonthDate.getFullYear()) {
      setCurrentMonthDate(new Date(d.getFullYear(), d.getMonth(), 1));
    }
    const det = getFullZarmaDateDetails(d);
    setActiveSeasonId(det.season.id);
    setSelectedLunarOrder(det.lunar.lunarMonth.order);
    setConverterInputDate(formatIsoDate(d));
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitleZarma.trim()) return;
    const newEvt: CalendarCustomEvent = {
      id: `evt-${Date.now()}`,
      dateStr: formatIsoDate(selectedDate),
      titleZarma: newEventTitleZarma.trim(),
      titleFr: newEventTitleFr.trim() || newEventTitleZarma.trim(),
      category: newEventCategory,
      location: newEventLocation.trim() || 'Niger'
    };
    setCustomEvents((prev) => [...prev, newEvt]);
    setNewEventTitleZarma('');
    setNewEventTitleFr('');
    setShowAddEventForm(false);
  };

  const handleDeleteEvent = (id: string) => {
    setCustomEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-[#F8FAFC] tracking-[0.01em]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            Kalandirye Zarma
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <a
              href="#almanac"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'fr' ? 'Almanach' : 'Almanac'}
            </a>
            <a
              href="#zarma-arab"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Zarma-Arab
            </a>
            <a
              href="#montre"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'fr' ? 'Montre' : 'Watch'}
            </a>
            <a
              href="#seasons"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'fr' ? 'Saisons Waati' : 'Waati Seasons'}
            </a>
            <a
              href="#markets"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'fr' ? 'Marchés Habu' : 'Habu Markets'}
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleJumpToToday}
              className="px-4 py-2 text-xs font-semibold text-[#0F172A] bg-[#F59E0B] rounded-lg hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'fr' ? 'Hunkuna (Aujourd’hui)' : 'Hunkuna (Today)'}
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 py-8 space-y-14">
        {/* HERO SECTION: 2-Column Split with Niger River Photography + Live Montre Widget */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column (7 cols): Niger River (Isa Beeri) Photography Showcase with Measured Contrast Scrim */}
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-slate-800 bg-[#1E293B] min-h-[390px] flex flex-col justify-end">
              {!heroImgFailed ? (
                <img
                  src="/src/assets/images/niger_river_sunset_1791507859791.jpg"
                  alt="Le fleuve Niger (Isa Beeri) au crépuscule avec une pirogue traditionnelle (abaara)"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgFailed(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-950 to-amber-950" />
              )}

              {/* Measured Scrim for guaranteed WCAG AA contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />

              <div className="relative z-10 p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-300">
                  <span>Isa Beeri · Zarma Originel & Zarma-Arab</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedDetails.dayOfWeek.zarmaAjami}</span>
                </div>

                <h1
                  className="font-display text-3xl sm:text-4xl lg:text-[2.45rem] font-bold tracking-tight text-white leading-[1.15]"
                  style={{ textWrap: 'balance' }}
                >
                  {selectedDetails.dayOfWeek.zarmaAncestralName} ({selectedDetails.dayOfWeek.zarmaName}),{' '}
                  {selectedDetails.lunar.lunarMonth.zarmaName} · {selectedDetails.gregorianMonth.zarmaName}{' '}
                  {selectedDetails.date.getDate()}
                </h1>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                  {lang === 'fr'
                    ? `${selectedDetails.fullFrenchSentence} · Lune Zarma : ${selectedDetails.lunar.lunarMonth.zarmaName} (Jirbi ${selectedDetails.lunar.hijriDay}, ${selectedDetails.lunar.moonPhaseZarma}).`
                    : `${selectedDetails.fullEnglishSentence} · Zarma Lunar Month: ${selectedDetails.lunar.lunarMonth.zarmaName} (Day ${selectedDetails.lunar.hijriDay}, ${selectedDetails.lunar.moonPhaseZarma}).`}
                </p>

                {/* Workspace Toolbar inside Hero */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {/* Language Switcher */}
                  <div
                    className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-700 rounded-lg"
                    role="group"
                    aria-label="Language selection"
                  >
                    <button
                      type="button"
                      onClick={() => setLang('fr')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        lang === 'fr'
                          ? 'bg-[#F59E0B] text-[#0F172A]'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Zarma · Français
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang('en')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        lang === 'en'
                          ? 'bg-[#F59E0B] text-[#0F172A]'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Zarma · English
                    </button>
                  </div>

                  {/* Workspace View Switcher */}
                  <div
                    className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-700 rounded-lg"
                    role="group"
                    aria-label="Calendar mode"
                  >
                    <button
                      type="button"
                      onClick={() => setWorkspaceTab('solar')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        workspaceTab === 'solar'
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {lang === 'fr' ? 'Grille Mensuelle' : 'Monthly Grid'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setWorkspaceTab('lunar')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        workspaceTab === 'lunar'
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {lang === 'fr' ? '12 Mois (Dadabu Beeri → Cimsi)' : '12 Zarma Months'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setWorkspaceTab('Converter')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        workspaceTab === 'Converter'
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {lang === 'fr' ? 'Convertisseur' : 'Date Converter'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Interactive Zarma Montre (Guuru / Watch) */}
            <div
              id="montre"
              className="lg:col-span-5 bg-[#1E293B] border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-5"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="text-xs font-semibold text-slate-400">
                    {lang === 'fr'
                      ? 'MONTRE ZARMA EN DIRECT (GUURU & WAATI)'
                      : 'LIVE ZARMA WATCH (GUURU & WAATI)'}
                  </div>
                  <h2 className="font-display text-lg font-bold text-white mt-0.5">
                    {activeTimePeriod.zarmaName}{' '}
                    <span className="text-sm font-normal text-amber-400">
                      ({activeTimePeriod.zarmaAjami})
                    </span>
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setWatchMode((m) => (m === 'live' ? 'manual' : 'live'))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    watchMode === 'live'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white'
                  }`}
                >
                  {watchMode === 'live' ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>{lang === 'fr' ? 'Direct (Actif)' : 'Live Ticking'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>{lang === 'fr' ? 'Reprendre Direct' : 'Resume Live'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* SVG Analog Montre Dial + Digital Telemetry */}
              <div className="flex flex-col sm:flex-row items-center gap-6 my-auto">
                {/* Analog Watch Dial */}
                <div className="relative w-44 h-44 shrink-0">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full"
                    aria-label="Cadran de la montre Zarma"
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="94"
                      fill="#0F172A"
                      stroke="#334155"
                      strokeWidth="4"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="86"
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="1.5"
                    />

                    {/* 12 Hour Tick Marks */}
                    {Array.from({ length: 12 }).map((_, idx) => {
                      const hourNum = idx === 0 ? 12 : idx;
                      const angleDeg = idx * 30;
                      const angleRad = ((angleDeg - 90) * Math.PI) / 180;
                      const x1 = 100 + 76 * Math.cos(angleRad);
                      const y1 = 100 + 76 * Math.sin(angleRad);
                      const x2 = 100 + 84 * Math.cos(angleRad);
                      const y2 = 100 + 84 * Math.sin(angleRad);
                      const tx = 100 + 63 * Math.cos(angleRad);
                      const ty = 100 + 63 * Math.sin(angleRad);

                      return (
                        <g key={hourNum}>
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={idx % 3 === 0 ? '#F59E0B' : '#64748B'}
                            strokeWidth={idx % 3 === 0 ? '2.5' : '1.5'}
                            strokeLinecap="round"
                          />
                          <text
                            x={tx}
                            y={ty}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill={idx % 3 === 0 ? '#F8FAFC' : '#94A3B8'}
                            fontSize={idx % 3 === 0 ? '12' : '10'}
                            fontFamily="IBM Plex Mono, monospace"
                            fontWeight={idx % 3 === 0 ? '700' : '400'}
                          >
                            {hourNum}
                          </text>
                        </g>
                      );
                    })}

                    <text
                      x="100"
                      y="68"
                      textAnchor="middle"
                      fill="#38BDF8"
                      fontSize="8"
                      fontFamily="IBM Plex Mono, monospace"
                      letterSpacing="1"
                    >
                      GUURU ZARMA
                    </text>
                    <text
                      x="100"
                      y="134"
                      textAnchor="middle"
                      fill="#F59E0B"
                      fontSize="8.5"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fontWeight="600"
                    >
                      {activeTimePeriod.zarmaName.split(' ')[0].toUpperCase()}
                    </text>

                    {/* Hour Hand */}
                    <line
                      x1="100"
                      y1="100"
                      x2="100"
                      y2="52"
                      stroke="#F8FAFC"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      transform={`rotate(${watchTimeParts.hourAngle} 100 100)`}
                    />

                    {/* Minute Hand */}
                    <line
                      x1="100"
                      y1="100"
                      x2="100"
                      y2="34"
                      stroke="#38BDF8"
                      strokeWidth="3"
                      strokeLinecap="round"
                      transform={`rotate(${watchTimeParts.minuteAngle} 100 100)`}
                    />

                    {/* Second Hand */}
                    <line
                      x1="100"
                      y1="112"
                      x2="100"
                      y2="28"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      transform={`rotate(${watchTimeParts.secondAngle} 100 100)`}
                    />

                    {/* Center Pin */}
                    <circle cx="100" cy="100" r="5" fill="#F59E0B" />
                    <circle cx="100" cy="100" r="2" fill="#0F172A" />
                  </svg>
                </div>

                {/* Digital Readout & Zarma Time Expression */}
                <div className="space-y-2.5 text-center sm:text-left flex-1">
                  <div className="font-mono text-3xl font-bold text-white tabular-nums tracking-tight">
                    {watchTimeParts.digitalStr}
                  </div>
                  <div className="text-xs font-semibold text-[#F59E0B]">
                    {watchTimeParts.zarmaSpoken}
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'fr'
                      ? `${activeTimePeriod.frenchName} (${activeTimePeriod.timeRangeLabel}) · ${activeTimePeriod.solarStateFr}`
                      : `${activeTimePeriod.englishName} (${activeTimePeriod.timeRangeLabel}) · ${activeTimePeriod.solarStateEn}`}
                  </div>
                  <div className="pt-1 text-xs text-slate-400">
                    <span className="text-slate-200 font-semibold">Salutation :</span> «{' '}
                    {activeTimePeriod.greetingZarma} »
                  </div>
                </div>
              </div>

              {/* Manual Time Scrubber inside the Watch Card */}
              <div className="pt-3 border-t border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="hero-watch-slider" className="text-slate-300 font-medium">
                    {lang === 'fr'
                      ? 'Tourner les aiguilles de la montre :'
                      : 'Adjust watch hands (24h):'}
                  </label>
                  <span className="font-mono text-sky-400 tabular-nums">
                    {activeTimePeriod.timeRangeLabel}
                  </span>
                </div>
                <input
                  id="hero-watch-slider"
                  type="range"
                  min={0}
                  max={23.75}
                  step={0.25}
                  value={simulatedHour}
                  onChange={(e) => {
                    setWatchMode('manual');
                    setSimulatedHour(parseFloat(e.target.value));
                  }}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
                />
              </div>
            </div>
          </div>

          {/* 4-Column Chronological Summary Strip (Full-Width Row Below Hero Split) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{lang === 'fr' ? 'JOUR ZARMA & ZARMA-ARAB' : 'ZARMA & ZARMA-ARAB DAY'}</span>
                <span className="font-mono text-amber-400">{selectedDetails.dayOfWeek.zarmaAjami}</span>
              </div>
              <div className="mt-2">
                <div className="font-display text-2xl font-bold text-white">
                  {selectedDetails.dayOfWeek.zarmaAncestralName}{' '}
                  <span className="text-lg font-normal text-amber-400">
                    ({selectedDetails.dayOfWeek.zarmaName})
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {selectedDetails.dayOfWeek.frenchName} · {selectedDetails.dayOfWeek.englishName}
                </div>
              </div>
            </div>

            <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{lang === 'fr' ? 'MOIS SOLAIRE (HANDU)' : 'SOLAR MONTH (HANDU)'}</span>
                <span className="font-mono text-sky-400">
                  {selectedDetails.gregorianMonth.traditionalLunarCorrespondent}
                </span>
              </div>
              <div className="mt-2">
                <div className="font-display text-2xl font-bold text-white tabular-nums">
                  {selectedDetails.gregorianMonth.zarmaName} {selectedDetails.date.getFullYear()}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {selectedDetails.gregorianMonth.frenchName} ·{' '}
                  {selectedDetails.gregorianMonth.englishName}
                </div>
              </div>
            </div>

            <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{lang === 'fr' ? 'MOIS ZARMA-ARAB (HANDU)' : 'ZARMA-ARAB LUNAR MONTH'}</span>
                <span className="font-mono tabular-nums text-amber-400">
                  Jirbi {selectedDetails.lunar.hijriDay}/30
                </span>
              </div>
              <div className="mt-2">
                <div className="font-display text-2xl font-bold text-white">
                  {selectedDetails.lunar.lunarMonth.zarmaName}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {selectedDetails.lunar.lunarMonth.hijriName} ·{' '}
                  {lang === 'fr'
                    ? selectedDetails.lunar.lunarMonth.literalFr
                    : selectedDetails.lunar.lunarMonth.literalEn}
                </div>
              </div>
            </div>

            <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{lang === 'fr' ? 'SAISON ÉCOLOGIQUE (WAATI)' : 'ECOLOGICAL SEASON (WAATI)'}</span>
                <span className="font-mono">{selectedDetails.season.zarmaAjami}</span>
              </div>
              <div className="mt-2">
                <div className="font-display text-2xl font-bold text-white">
                  {selectedDetails.season.zarmaName}
                </div>
                <div className="text-xs font-semibold text-sky-400 mt-1">
                  {selectedDetails.season.climateStateCode}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 01: Interactive Two-Zone Calendar Sandbox */}
        <section id="almanac" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                {lang === 'fr'
                  ? '01. Almanach Interactif Zarma (Jours Originels, Zarma-Arab & Lunes)'
                  : '01. Interactive Zarma Almanac (Ancestral Days, Zarma-Arab & Lunar Cycle)'}
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                {lang === 'fr'
                  ? 'Chaque colonne affiche le nom Zarma originel (Fahantaji, Mahantaji, Bohantaji, Wayhantaji, Tohantaji, Zinbuza, Duhantaji) et le nom Zarma-Arab (Alhadi à Asipti).'
                  : 'Each column displays both the ancestral Zarma weekday (Fahantaji to Duhantaji) and the Zarma-Arab weekday (Alhadi to Asipti).'}
              </p>
            </div>

            {/* Month Navigation Controls */}
            {workspaceTab === 'solar' && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  aria-label="Mois précédent"
                  className="p-2.5 bg-[#1E293B] border border-slate-700 rounded-lg hover:bg-slate-800 text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="px-4 py-2 bg-[#1E293B] border border-slate-700 rounded-lg min-w-[240px] text-center">
                  <span className="font-display font-bold text-base text-white tabular-nums">
                    {currentGregorianMonthMeta.traditionalLunarCorrespondent} ·{' '}
                    {currentGregorianMonthMeta.zarmaName} ({currentGregorianMonthMeta.frenchName}){' '}
                    {currentMonthDate.getFullYear()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  aria-label="Mois suivant"
                  className="p-2.5 bg-[#1E293B] border border-slate-700 rounded-lg hover:bg-slate-800 text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleJumpToToday}
                  className="px-3.5 py-2 bg-[#1E293B] border border-slate-700 rounded-lg hover:bg-slate-800 text-xs font-semibold text-amber-400 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Hunkuna</span>
                </button>
              </div>
            )}
          </div>

          {/* Two-Zone Sandbox Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT ZONE (8 cols on lg): Interactive Calendar Grid OR 12 Lunar Months OR Converter */}
            <div className="lg:col-span-8 bg-[#1E293B] border border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
              {workspaceTab === 'solar' && (
                <div className="space-y-4">
                  {/* Month seasonal banner */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs text-slate-300">
                    <div>
                      <span className="font-semibold text-amber-400">
                        {currentGregorianMonthMeta.traditionalLunarCorrespondent} /{' '}
                        {currentGregorianMonthMeta.zarmaName}
                      </span>
                      <span className="mx-2" aria-hidden="true">
                        ·
                      </span>
                      <span>
                        {lang === 'fr'
                          ? currentGregorianMonthMeta.agroActivityFr
                          : currentGregorianMonthMeta.agroActivityEn}
                      </span>
                    </div>
                  </div>

                  {/* 7-Day Zarma Dual Header Row (Ancestral + Zarma-Arab + FR/EN) */}
                  <div className="grid grid-cols-7 gap-1.5 text-center">
                    {ZARMA_DAYS_OF_WEEK.map((d) => (
                      <div
                        key={d.zarmaName}
                        className={`py-2 px-1 rounded-md bg-[#0F172A]/60 border border-slate-800/80 text-xs ${
                          d.index === 5
                            ? 'text-emerald-400'
                            : 'text-slate-100'
                        }`}
                      >
                        <div className="font-bold text-amber-400 truncate">
                          {d.zarmaAncestralName}
                        </div>
                        <div className="font-semibold truncate">{d.zarmaName}</div>
                        <div className="text-[10px] font-normal text-slate-400 truncate">
                          {d.frenchName} / {d.englishName}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Days Matrix */}
                  <div className="grid grid-cols-7 gap-1.5">
                    {calendarDays.map((cell) => {
                      const isHanBeeri = cell.date.getDay() === 5; // Friday (Zinbuza / Alzuma)
                      return (
                        <button
                          key={cell.iso}
                          type="button"
                          onClick={() => handleSelectDayCell(cell.date)}
                          className={`group relative min-h-[78px] sm:min-h-[88px] p-2 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                            cell.isSelected
                              ? 'bg-[#F59E0B] text-[#0F172A] border-[#F59E0B] font-semibold'
                              : cell.isToday
                              ? 'bg-sky-500/15 border-sky-400 text-white'
                              : cell.isCurrentMonth
                              ? 'bg-[#0F172A]/80 border-slate-800 hover:border-slate-600 text-slate-100'
                              : 'bg-[#0F172A]/30 border-slate-800/50 text-slate-600 hover:text-slate-400'
                          }`}
                        >
                          <div className="flex items-baseline justify-between gap-1 w-full">
                            <span
                              className={`font-mono text-sm sm:text-base font-bold tabular-nums ${
                                cell.isSelected
                                  ? 'text-[#0F172A]'
                                  : cell.isToday
                                  ? 'text-sky-400'
                                  : isHanBeeri && cell.isCurrentMonth
                                  ? 'text-emerald-400'
                                  : ''
                              }`}
                            >
                              {cell.date.getDate()}
                            </span>
                            <span
                              className={`font-mono text-[10px] tabular-nums ${
                                cell.isSelected ? 'text-slate-900' : 'text-slate-400'
                              }`}
                              title="Jour lunaire (Handu jirbi)"
                            >
                              ☾ {cell.lunarDay}
                            </span>
                          </div>

                          {/* Middle indicator for Zinbuza/Han Beeri or New/Full Moon */}
                          <div className="my-auto pt-1">
                            {cell.lunarDay === 1 && (
                              <div
                                className={`text-[10px] font-semibold truncate ${
                                  cell.isSelected ? 'text-slate-950' : 'text-amber-400'
                                }`}
                              >
                                ★ {cell.lunarMonthName}
                              </div>
                            )}
                            {cell.lunarDay === 15 && (
                              <div
                                className={`text-[10px] font-semibold truncate ${
                                  cell.isSelected ? 'text-slate-950' : 'text-sky-300'
                                }`}
                              >
                                ○ Handu kwaaray
                              </div>
                            )}
                            {isHanBeeri && cell.lunarDay !== 1 && cell.lunarDay !== 15 && (
                              <div
                                className={`text-[10px] truncate ${
                                  cell.isSelected ? 'text-slate-900' : 'text-emerald-400'
                                }`}
                              >
                                Zinbuza · Alzuma
                              </div>
                            )}
                          </div>

                          {/* Event indicator */}
                          {cell.events.length > 0 && (
                            <div
                              className={`text-[10px] font-semibold truncate pt-0.5 ${
                                cell.isSelected ? 'text-slate-950' : 'text-sky-400'
                              }`}
                            >
                              • {cell.events[0].titleZarma}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend & Relative Days Bar */}
                  <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                    <div className="flex flex-wrap items-center gap-3">
                      <span>☾ Chiffre lunaire (Handu jirbi)</span>
                      <span aria-hidden="true">·</span>
                      <span>★ Handu taji (Nouvelle lune)</span>
                      <span aria-hidden="true">·</span>
                      <span>○ Handu kwaaray (Pleine lune, 15e jour)</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectDayCell(
                            new Date(
                              selectedDate.getFullYear(),
                              selectedDate.getMonth(),
                              selectedDate.getDate() - 1
                            )
                          )
                        }
                        className="underline hover:text-white cursor-pointer"
                      >
                        ← Bi (Hier)
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={handleJumpToToday}
                        className="font-semibold text-amber-400 underline cursor-pointer"
                      >
                        Hunkuna
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectDayCell(
                            new Date(
                              selectedDate.getFullYear(),
                              selectedDate.getMonth(),
                              selectedDate.getDate() + 1
                            )
                          )
                        }
                        className="underline hover:text-white cursor-pointer"
                      >
                        Suba (Demain) →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {workspaceTab === 'lunar' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="font-display text-xl font-bold text-white">
                      {lang === 'fr'
                        ? 'Les 12 Mois Zarma & Zarma-Arab (Dadabu Beeri → Cimsi)'
                        : 'The 12 Traditional Zarma & Zarma-Arab Months (Dadabu Beeri → Cimsi)'}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      {lang === 'fr'
                        ? 'Cycle complet des 12 mois : Dadabu Beeri, Dadabu Kayna, Gaani, Gaanibanda, Bine Kuna, Banbana, Way-Zeeno, Ce Konna, Mehau, Me-Feeri, Fulanzam et Cimsi.'
                        : 'Complete cycle of the 12 months: Dadabu Beeri, Dadabu Kayna, Gaani, Gaanibanda, Bine Kuna, Banbana, Way-Zeeno, Ce Konna, Mehau, Me-Feeri, Fulanzam, and Cimsi.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ZARMA_LUNAR_MONTHS.map((m) => {
                      const isSelected = m.order === selectedLunarOrder;
                      const isCurrentLunar =
                        m.order === selectedDetails.lunar.lunarMonth.order;
                      return (
                        <button
                          key={m.order}
                          type="button"
                          onClick={() => setSelectedLunarOrder(m.order)}
                          className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#F59E0B] text-[#0F172A] border-[#F59E0B]'
                              : 'bg-[#0F172A] border-slate-800 hover:border-slate-600 text-slate-100'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-xs">
                              <span
                                className={`font-mono font-semibold tabular-nums ${
                                  isSelected ? 'text-slate-900' : 'text-slate-400'
                                }`}
                              >
                                Handu {String(m.order).padStart(2, '0')}
                              </span>
                              {isCurrentLunar && (
                                <span
                                  className={`text-[11px] font-semibold ${
                                    isSelected ? 'text-slate-950' : 'text-sky-400'
                                  }`}
                                >
                                  ● Lune actuelle
                                </span>
                              )}
                            </div>
                            <div className="font-display font-bold text-base mt-1">
                              {m.zarmaName}
                            </div>
                            <div
                              className={`text-xs mt-0.5 flex items-center justify-between ${
                                isSelected ? 'text-slate-800' : 'text-slate-400'
                              }`}
                            >
                              <span>{m.hijriName}</span>
                              <span>{m.zarmaAjami.split('/')[0]}</span>
                            </div>
                          </div>
                          <div
                            className={`text-xs mt-3 pt-2 border-t ${
                              isSelected
                                ? 'border-amber-600/40 text-slate-900 font-medium'
                                : 'border-slate-800 text-slate-300'
                            }`}
                          >
                            {lang === 'fr' ? m.literalFr : m.literalEn}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Detailed Inspector for the selected Lunar Month */}
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-display text-lg font-bold text-white">
                        {activeLunarMonth.order}. {activeLunarMonth.zarmaName}{' '}
                        <span className="font-mono text-sm font-normal text-amber-400">
                          ({activeLunarMonth.zarmaAjami})
                        </span>
                      </h4>
                      <span className="text-xs text-slate-400">
                        {activeLunarMonth.hijriName} · {activeLunarMonth.phonetic}
                      </span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {lang === 'fr' ? activeLunarMonth.meaningFr : activeLunarMonth.meaningEn}
                    </p>
                    {activeLunarMonth.keyCelebrationFr && (
                      <div className="text-xs font-semibold text-emerald-400">
                        ★{' '}
                        {lang === 'fr'
                          ? activeLunarMonth.keyCelebrationFr
                          : activeLunarMonth.keyCelebrationEn}
                      </div>
                    )}
                    <div className="pt-2 text-xs text-slate-300">
                      <span className="font-semibold text-amber-400">
                        Exemple / Sagesse Zarma :
                      </span>{' '}
                      « {activeLunarMonth.proverbZarma} » —{' '}
                      <span className="italic">
                        {lang === 'fr'
                          ? activeLunarMonth.proverbFr
                          : activeLunarMonth.proverbEn}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {workspaceTab === 'Converter' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        {lang === 'fr'
                          ? 'Convertisseur de Date & Numération des Jours (Jirbi)'
                          : 'Zarma Date Converter & Day Numerals (Jirbi)'}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        {lang === 'fr'
                          ? 'Traduisez n’importe quelle date en formulation orale et écrite Zarma & Zarma-Arab.'
                          : 'Convert any date into authentic spoken and written Zarma & Zarma-Arab.'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <label htmlFor="zarma-date-input" className="text-xs font-semibold text-slate-300">
                        Date :
                      </label>
                      <input
                        id="zarma-date-input"
                        type="date"
                        value={converterInputDate}
                        onChange={(e) => {
                          setConverterInputDate(e.target.value);
                          const parts = e.target.value.split('-').map(Number);
                          if (parts.length === 3 && !isNaN(parts[0])) {
                            handleSelectDayCell(new Date(parts[0], parts[1] - 1, parts[2]));
                          }
                        }}
                        className="px-3 py-1.5 text-sm font-mono bg-[#0F172A] border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  {/* Converted Output Showcase */}
                  <div className="p-4 bg-[#0F172A] rounded-lg border border-slate-800 space-y-2">
                    <div className="text-xs text-slate-400">
                      {lang === 'fr'
                        ? 'PHRASE COMPLÈTE DE LA DATE EN ZARMA & ZARMA-ARAB'
                        : 'COMPLETE ZARMA & ZARMA-ARAB DATE EXPRESSION'}
                    </div>
                    <div className="font-display text-xl font-bold text-amber-400">
                      « {converterDetails.fullZarmaSentence} »
                    </div>
                    <div className="text-xs text-slate-300">
                      {lang === 'fr'
                        ? converterDetails.fullFrenchSentence
                        : converterDetails.fullEnglishSentence}
                    </div>
                  </div>

                  {/* Relative Time Expressions Table */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-white">
                      {lang === 'fr'
                        ? 'Repères Temporels du Quotidien (Bi, Hunkuna, Suba)'
                        : 'Everyday Temporal Markers (Bi, Hunkuna, Suba)'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {ZARMA_RELATIVE_TIME_EXPRESSIONS.map((item) => (
                        <div
                          key={item.zarma}
                          className="p-3 rounded-lg border border-slate-800 bg-[#0F172A] space-y-1"
                        >
                          <div className="flex items-baseline justify-between">
                            <span className="font-display font-bold text-sm text-white">
                              {item.zarma}
                            </span>
                            <span className="font-mono text-[11px] text-slate-400">
                              {item.phonetic}
                            </span>
                          </div>
                          <div className="text-xs font-medium text-sky-400">
                            {lang === 'fr' ? item.fr : item.en}
                          </div>
                          <div className="text-[11px] text-slate-300 pt-1">
                            « {item.exampleZarma} »
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT ZONE (4 cols on lg): Day Inspector, Market Day & Custom Events */}
            <div className="lg:col-span-4 bg-[#1E293B] border border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Selected Date Header */}
                <div className="border-b border-slate-800 pb-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{lang === 'fr' ? 'FICHE DU JOUR SÉLECTIONNÉ' : 'SELECTED DAY INSPECTOR'}</span>
                    <span className="font-mono tabular-nums">{formatIsoDate(selectedDate)}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    {selectedDetails.dayOfWeek.zarmaAncestralName}{' '}
                    <span className="text-lg font-normal text-amber-400">
                      ({selectedDetails.dayOfWeek.zarmaName})
                    </span>{' '}
                    <span className="font-mono text-lg text-sky-400">
                      {selectedDetails.date.getDate()}
                    </span>
                  </h3>
                  <div className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-1.5">
                    <span>
                      {selectedDetails.dayOfWeek.frenchName} / {selectedDetails.dayOfWeek.englishName}
                    </span>
                    <span>·</span>
                    <span>
                      Mois :{' '}
                      <strong className="text-amber-400">
                        {selectedDetails.lunar.lunarMonth.zarmaName}
                      </strong>{' '}
                      ({selectedDetails.gregorianMonth.zarmaName})
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {lang === 'fr' ? 'Numéral du jour :' : 'Day numeral:'}{' '}
                    <span className="font-semibold text-white">
                      Jirbi {selectedDetails.dayNumberZarma}
                    </span>{' '}
                    <span className="font-mono">
                      ({selectedDetails.dayNumberPhonetic})
                    </span>
                  </div>
                </div>

                {/* Cultural & Linguistic Note for this Day of Week */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-white">
                    {selectedDetails.dayOfWeek.zarmaAncestralName} · {selectedDetails.dayOfWeek.zarmaName}{' '}
                    <span className="text-amber-400">({selectedDetails.dayOfWeek.zarmaAjami})</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'fr'
                      ? selectedDetails.dayOfWeek.culturalNoteFr
                      : selectedDetails.dayOfWeek.culturalNoteEn}
                  </p>
                  <div className="p-3 bg-[#0F172A] rounded-lg border border-slate-800 text-xs space-y-1">
                    <div className="font-semibold text-amber-400">
                      « {selectedDetails.dayOfWeek.exampleZarma} »
                    </div>
                    <div className="text-slate-300 italic">
                      {lang === 'fr'
                        ? selectedDetails.dayOfWeek.exampleFr
                        : selectedDetails.dayOfWeek.exampleEn}
                    </div>
                  </div>
                </div>

                {/* Markets happening on this weekday */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>
                      {lang === 'fr'
                        ? `Grands Marchés (Habu) du ${selectedDetails.dayOfWeek.zarmaAncestralName} (${selectedDetails.dayOfWeek.zarmaName})`
                        : `Major Markets (Habu) on ${selectedDetails.dayOfWeek.zarmaAncestralName} (${selectedDetails.dayOfWeek.zarmaName})`}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {selectedDetails.dayOfWeek.majorMarkets.map((mkt) => (
                      <div
                        key={mkt.town}
                        className="p-3 rounded-lg border border-slate-800 bg-[#0F172A] text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between font-semibold text-white">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                            {mkt.town}
                          </span>
                          <span className="text-[11px] font-normal text-slate-400">
                            {mkt.region}
                          </span>
                        </div>
                        <p className="text-slate-300">
                          {lang === 'fr' ? mkt.specialtyFr : mkt.specialtyEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Events & Personal Calendar Notes for Selected Date */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">
                      {lang === 'fr'
                        ? `Événements inscrits (${selectedDateEvents.length})`
                        : `Scheduled Events (${selectedDateEvents.length})`}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowAddEventForm((prev) => !prev)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:underline cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'fr' ? 'Ajouter un repère' : 'Add event'}</span>
                    </button>
                  </div>

                  {showAddEventForm && (
                    <form
                      onSubmit={handleAddEvent}
                      className="p-3 bg-[#0F172A] rounded-lg border border-slate-800 space-y-2.5 text-xs"
                    >
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">
                          Titre en Zarma (ex: Boŋcabay, Boogu, Habu)
                        </label>
                        <input
                          type="text"
                          required
                          value={newEventTitleZarma}
                          onChange={(e) => setNewEventTitleZarma(e.target.value)}
                          placeholder="Ex: Kwaara batu / Boogu suba"
                          className="w-full px-2.5 py-1.5 bg-[#1E293B] border border-slate-700 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">
                          Description ({lang === 'fr' ? 'Français' : 'English'})
                        </label>
                        <input
                          type="text"
                          value={newEventTitleFr}
                          onChange={(e) => setNewEventTitleFr(e.target.value)}
                          placeholder="Ex: Réunion communautaire du village"
                          className="w-full px-2.5 py-1.5 bg-[#1E293B] border border-slate-700 rounded-md text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">
                            Lieu (Kwaara)
                          </label>
                          <input
                            type="text"
                            value={newEventLocation}
                            onChange={(e) => setNewEventLocation(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-[#1E293B] border border-slate-700 rounded-md text-white"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">
                            Catégorie
                          </label>
                          <select
                            value={newEventCategory}
                            onChange={(e) =>
                              setNewEventCategory(e.target.value as CalendarCustomEvent['category'])
                            }
                            className="w-full px-2.5 py-1.5 bg-[#1E293B] border border-slate-700 rounded-md text-white"
                          >
                            <option value="market">Habu (Marché)</option>
                            <option value="ceremony">Boŋcabay / Cérémonie</option>
                            <option value="agriculture">Fari / Agriculture</option>
                            <option value="community">Batu / Communauté</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowAddEventForm(false)}
                          className="px-3 py-1.5 text-slate-400 hover:text-white cursor-pointer"
                        >
                          {lang === 'fr' ? 'Annuler' : 'Cancel'}
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#F59E0B] text-[#0F172A] font-semibold rounded-md hover:bg-amber-400 cursor-pointer"
                        >
                          {lang === 'fr' ? 'Enregistrer' : 'Save'}
                        </button>
                      </div>
                    </form>
                  )}

                  {selectedDateEvents.length === 0 ? (
                    <p className="text-xs text-slate-400 py-2">
                      {lang === 'fr'
                        ? 'Aucun événement particulier inscrit à cette date. Cliquez sur « Ajouter un repère » pour planifier un marché (habu), baptême (boŋcabay) ou travail collectif (boogu).'
                        : 'No custom events recorded for this date. Click "Add event" to schedule a market, naming ceremony, or farming party.'}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {selectedDateEvents.map((evt) => (
                        <div
                          key={evt.id}
                          className="p-2.5 rounded-lg bg-[#0F172A] border border-slate-800 flex items-start justify-between gap-2 text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="font-semibold text-amber-400">{evt.titleZarma}</div>
                            <div className="text-slate-200">{evt.titleFr}</div>
                            <div className="text-[11px] text-slate-400">{evt.location}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteEvent(evt.id)}
                            aria-label="Supprimer l'événement"
                            className="p-1 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Proverb of the Day */}
              <div className="pt-4 border-t border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-amber-400">
                  {lang === 'fr' ? 'Sagesse temporelle Zarma :' : 'Zarma Temporal Proverb:'}
                </div>
                <p className="mt-1">
                  « Hay kaŋ ni duma hunkuna, suba a ga hatta. » —{' '}
                  <span className="italic">
                    {lang === 'fr'
                      ? 'Ce que tu sèmes aujourd’hui mûrira demain.'
                      : 'What you plant today will grow tomorrow.'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: Concordance Officielle Zarma Originel, Zarma-Arab, Français & English */}
        <section id="zarma-arab" className="space-y-6 pt-4 border-t border-slate-800">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              {lang === 'fr'
                ? '02. Concordance Complète : Jours & 12 Mois (Zarma Originel · Zarma-Arab · Français · English)'
                : '02. Complete Concordance: 7 Days & 12 Months (Original Zarma · Zarma-Arab · French · English)'}
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              {lang === 'fr'
                ? 'Référence authentique alignant les 7 jours de la semaine (de Mahantaji/Atinni à Fahantaji/Alhadi) et les 12 mois traditionnels (de Dadabu Beeri à Cimsi).'
                : 'Authentic reference aligning the 7 days of the week (from Mahantaji/Atinni to Fahantaji/Alhadi) and the 12 traditional months (from Dadabu Beeri to Cimsi).'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Table (6 cols): The 7 Days of the Week (Mahantaji -> Fahantaji) */}
            <div className="lg:col-span-6 bg-[#1E293B] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-white">
                  {lang === 'fr'
                    ? 'Les 7 Jours de la Semaine (Jirbi Iyye)'
                    : 'The 7 Days of the Week (Jirbi Iyye)'}
                </h3>
                <span className="text-xs font-mono text-amber-400">
                  Mahantaji → Fahantaji
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#0F172A] text-xs font-semibold text-slate-300">
                      <th className="py-3 px-3.5">Zarma Originel</th>
                      <th className="py-3 px-3.5">Zarma-Arab</th>
                      <th className="py-3 px-3.5">Ajami / Arabe</th>
                      <th className="py-3 px-3.5">Français</th>
                      <th className="py-3 px-3.5">English</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-xs">
                    {MONDAY_FIRST_INDICES.map((dayIndex) => {
                      const d = ZARMA_DAYS_OF_WEEK[dayIndex];
                      const isCurrentDay = selectedDetails.dayOfWeek.index === d.index;
                      return (
                        <tr
                          key={d.zarmaAncestralName}
                          className={
                            isCurrentDay
                              ? 'bg-amber-500/15 font-semibold'
                              : 'hover:bg-slate-800/50 transition-colors'
                          }
                        >
                          <td className="py-3 px-3.5 font-display font-bold text-sm text-amber-400">
                            {d.zarmaAncestralName}
                          </td>
                          <td className="py-3 px-3.5 font-display font-bold text-sm text-white">
                            {d.zarmaName}
                          </td>
                          <td className="py-3 px-3.5 font-mono text-slate-300">
                            {d.zarmaAjami}
                          </td>
                          <td className="py-3 px-3.5 text-slate-200">{d.frenchName}</td>
                          <td className="py-3 px-3.5 text-slate-300">{d.englishName}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-3.5 bg-[#0F172A]/60 border-t border-slate-800 text-xs text-slate-400">
                Mahantaji (Atinni · Lundi · Monday) · Bohantaji (Atalaata · Mardi · Tuesday) ·
                Wayhantaji (Alarba · Mercredi · Wednesday) · Tohantaji (Alaamisi · Jeudi · Thursday) ·
                Zinbuza (Alzuma · Vendredi · Friday) · Duhantaji (Asipti · Samedi · Saturday) ·
                Fahantaji (Alhadi · Dimanche · Sunday)
              </div>
            </div>

            {/* Right Table (6 cols): The 12 Traditional Months (Dadabu Beeri -> Cimsi) */}
            <div className="lg:col-span-6 bg-[#1E293B] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-white">
                  {lang === 'fr'
                    ? 'Les 12 Mois Zarma (Handu Way Cindi Hinka)'
                    : 'The 12 Zarma Months (Handu Way Cindi Hinka)'}
                </h3>
                <span className="text-xs font-mono text-sky-400">
                  Dadabu Beeri → Cimsi
                </span>
              </div>
              <div className="overflow-x-auto max-h-[420px]">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-[#0F172A]">
                    <tr className="border-b border-slate-800 text-xs font-semibold text-slate-300">
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Mois Zarma</th>
                      <th className="py-2.5 px-3">Zarma-Arab / Hijri</th>
                      <th className="py-2.5 px-3">Sens Littéral</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-xs">
                    {ZARMA_LUNAR_MONTHS.map((m) => (
                      <tr
                        key={m.order}
                        onClick={() => {
                          setSelectedLunarOrder(m.order);
                          setWorkspaceTab('lunar');
                        }}
                        className={`cursor-pointer transition-colors ${
                          m.order === selectedLunarOrder
                            ? 'bg-sky-500/15'
                            : 'hover:bg-slate-800/50'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-mono text-slate-400 tabular-nums">
                          {String(m.order).padStart(2, '0')}
                        </td>
                        <td className="py-2.5 px-3 font-display font-bold text-sm text-amber-400 whitespace-nowrap">
                          {m.zarmaName}
                        </td>
                        <td className="py-2.5 px-3 text-slate-200 whitespace-nowrap">
                          {m.hijriName}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300">
                          {lang === 'fr' ? m.literalFr : m.literalEn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3.5 bg-[#0F172A]/60 border-t border-slate-800 text-xs text-slate-400">
                01. Dadabu Beeri · 02. Dadabu Kayna · 03. Gaani · 04. Gaanibanda · 05. Bine Kuna ·
                06. Banbana · 07. Way-Zeeno · 08. Ce Konna · 09. Mehau · 10. Me-Feeri · 11. Fulanzam ·
                12. Cimsi
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: Interactive Ecological Cycle of the 4 Zarma Seasons (Waati Taaci) + River Valley Photo */}
        <section id="seasons" className="space-y-6 pt-4 border-t border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                {lang === 'fr'
                  ? '03. Cycle Agro-Écologique des Quatre Saisons (Waati Taaci) & Fleuve Niger'
                  : '03. Agro-Ecological Cycle of the Four Zarma Seasons (Waati Taaci) & Niger River'}
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                {lang === 'fr'
                  ? 'L’année écologique Zarma (jiiri) dans la vallée du fleuve Niger (Isa Beeri) est rythmée par quatre saisons définies par la pluie (beena-hari), les crues fluviales et le cycle du mil (hayni).'
                  : 'The Zarma ecological year (jiiri) along the Niger River valley (Isa Beeri) is structured into four seasons defined by rainfall (beena-hari), river floods, and millet farming.'}
              </p>
            </div>

            {/* Interactive Season Selector Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#1E293B] border border-slate-800 rounded-lg shrink-0">
              {ZARMA_SEASONS.map((season) => (
                <button
                  key={season.id}
                  type="button"
                  onClick={() => setActiveSeasonId(season.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeSeasonId === season.id
                      ? 'bg-[#F59E0B] text-[#0F172A]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {season.zarmaName.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* 12-Month Visual Ecological Timeline Bar */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-5 space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                {lang === 'fr'
                  ? 'FRISE ANNUELLE DES 12 MOIS (DADABU BEERI / JANERU → CIMSI / DISAMBA)'
                  : '12-MONTH ANNUAL ECOLOGICAL STRIP'}
              </span>
              <span className="font-mono text-amber-400">{activeSeason.climateStateCode}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-1.5">
              {ZARMA_GREGORIAN_MONTHS.map((m) => {
                const isPartOfActiveSeason = m.seasonId === activeSeasonId;
                return (
                  <button
                    key={m.zarmaName}
                    type="button"
                    onClick={() => {
                      setActiveSeasonId(m.seasonId);
                      setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), m.index, 1));
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isPartOfActiveSeason
                        ? 'bg-[#F59E0B] text-[#0F172A] border-[#F59E0B] font-semibold'
                        : 'bg-[#0F172A] border-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-mono text-[10px] opacity-80 tabular-nums">
                      {String(m.index + 1).padStart(2, '0')} · {m.zarmaName}
                    </div>
                    <div className="font-display font-bold text-xs mt-0.5 truncate">
                      {m.traditionalLunarCorrespondent}
                    </div>
                    <div className="text-[10px] opacity-85 truncate">
                      {lang === 'fr' ? m.frenchName : m.englishName}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Season Deep-Dive Split with River Village Documentary Photo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-800 items-stretch">
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-xs font-mono font-semibold text-sky-400">
                    {activeSeason.climateStateCode} ·{' '}
                    {lang === 'fr' ? activeSeason.monthsSpanFr : activeSeason.monthsSpanEn}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {activeSeason.zarmaName} —{' '}
                    {lang === 'fr' ? activeSeason.frenchTitle : activeSeason.englishTitle}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === 'fr' ? activeSeason.descriptionFr : activeSeason.descriptionEn}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#0F172A] rounded-lg border border-slate-800">
                    <div className="text-[11px] text-slate-400">
                      {lang === 'fr' ? 'TEMPÉRATURES MOYENNES' : 'AVERAGE TEMPERATURES'}
                    </div>
                    <div className="font-mono text-base font-bold text-white mt-0.5 tabular-nums">
                      {activeSeason.tempRangeC}
                    </div>
                  </div>
                  <div className="p-3 bg-[#0F172A] rounded-lg border border-slate-800">
                    <div className="text-[11px] text-slate-400">
                      {lang === 'fr' ? 'HUMIDITÉ RELATIVE' : 'RELATIVE HUMIDITY'}
                    </div>
                    <div className="font-mono text-base font-bold text-white mt-0.5 tabular-nums">
                      {activeSeason.humidityRange}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white">
                    {lang === 'fr'
                      ? 'Travaux Champêtres & Pratiques Saisonnières :'
                      : 'Seasonal Agricultural & Community Practices:'}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {(lang === 'fr'
                      ? activeSeason.agriculturalCycleFr
                      : activeSeason.agriculturalCycleEn
                    ).map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono font-bold text-amber-400">0{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Middle Column (3 cols): Key Seasonal Terms */}
              <div className="lg:col-span-3 space-y-3 flex flex-col justify-between">
                <h4 className="text-xs font-bold text-white">
                  {lang === 'fr'
                    ? `Vocabulaire Clé (${activeSeason.zarmaName.split(' ')[0]})`
                    : `Key Terms (${activeSeason.zarmaName.split(' ')[0]})`}
                </h4>
                <div className="grid grid-cols-1 gap-2.5 my-auto">
                  {activeSeason.keyTerms.map((term) => (
                    <div
                      key={term.zarma}
                      className="p-3 rounded-lg border border-slate-800 bg-[#0F172A] space-y-1"
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="font-display font-bold text-sm text-white">
                          {term.zarma}
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">
                          {term.phonetic}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-amber-400">
                        {lang === 'fr' ? term.fr : term.en}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        « {term.exampleZarma} »
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (4 cols): Niger River & Granaries Photo Card */}
              <div className="lg:col-span-4 relative rounded-xl overflow-hidden border border-slate-800 min-h-[260px] flex flex-col justify-end">
                {!secondaryImgFailed ? (
                  <img
                    src="/src/assets/images/niger_river_pirogue_1791507870612.jpg"
                    alt="Village riverain du fleuve Niger avec greniers traditionnels en terre (barma) et pirogues (abaara)"
                    referrerPolicy="no-referrer"
                    onError={() => setSecondaryImgFailed(true)}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-sky-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                <div className="relative z-10 p-4 space-y-1.5">
                  <div className="text-[11px] font-mono text-amber-300">
                    ISA BEERI · BARMA & ABAARA
                  </div>
                  <div className="font-display text-base font-bold text-white">
                    {lang === 'fr'
                      ? 'Rives du Fleuve Niger & Greniers à Mil (Barma)'
                      : 'Niger River Shores & Traditional Granaries (Barma)'}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {lang === 'fr'
                      ? '« Ay na hayni nda dunguri dan ay barma ra » — Les récoltes de mil et de niébé sont conservées dans les greniers au bord du fleuve.'
                      : '"Ay na hayni nda dunguri dan ay barma ra" — Millet and cowpea harvests are stored in riverside earthen granaries.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: The 8 Periods of the Zarma Day & Night (Zaari & Ciini) */}
        <section id="solar-clock" className="space-y-6 pt-4 border-t border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                {lang === 'fr'
                  ? '04. Cycle des 8 Heures Traditionnelles du Jour et de la Nuit (Zaari & Ciini)'
                  : '04. Cycle of the 8 Traditional Periods of Day and Night (Zaari & Ciini)'}
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                {lang === 'fr'
                  ? 'Sélectionnez une période ci-dessous pour synchroniser la Montre Zarma et découvrir les salutations rituelles (Fooyaŋ) associées.'
                  : 'Select any period below to synchronize the Zarma Watch and inspect its traditional greetings (Fooyaŋ).'}
              </p>
            </div>
          </div>

          <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
            {/* 8 Time Period Selector Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {ZARMA_TIME_PERIODS.map((tp) => {
                const isActive = tp.id === activeTimePeriod.id;
                return (
                  <button
                    key={tp.id}
                    type="button"
                    onClick={() => {
                      setWatchMode('manual');
                      setSimulatedHour(tp.startHour + 0.5);
                    }}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#F59E0B] text-[#0F172A] border-[#F59E0B] font-semibold'
                        : 'bg-[#0F172A] border-slate-800 text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    <div
                      className={`font-mono text-[10px] tabular-nums ${
                        isActive ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {tp.timeRangeLabel}
                    </div>
                    <div className="font-display font-bold text-xs mt-1">
                      {tp.zarmaName.split(' ')[0]}
                    </div>
                    <div
                      className={`text-[10px] mt-0.5 truncate ${
                        isActive ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {lang === 'fr' ? tp.frenchName : tp.englishName}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Time Period Details Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-800">
              <div className="lg:col-span-7 space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {activeTimePeriod.zarmaName}{' '}
                    <span className="font-mono text-sm font-normal text-amber-400">
                      ({activeTimePeriod.zarmaAjami})
                    </span>
                  </h3>
                  <span className="font-mono text-xs font-semibold text-amber-400 tabular-nums">
                    {activeTimePeriod.timeRangeLabel}
                  </span>
                </div>
                <div className="text-xs font-semibold text-sky-400">
                  {lang === 'fr' ? activeTimePeriod.solarStateFr : activeTimePeriod.solarStateEn} ·{' '}
                  {lang === 'fr' ? activeTimePeriod.prayerLinkFr : activeTimePeriod.prayerLinkEn}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {lang === 'fr'
                    ? activeTimePeriod.dailyActivityFr
                    : activeTimePeriod.dailyActivityEn}
                </p>
                <div className="p-3.5 bg-[#0F172A] rounded-lg border border-slate-800 text-xs space-y-1">
                  <div className="font-semibold text-amber-400">
                    « {activeTimePeriod.exampleZarma} »
                  </div>
                  <div className="text-slate-300 italic">
                    {lang === 'fr' ? activeTimePeriod.exampleFr : activeTimePeriod.exampleEn}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#0F172A] border border-slate-800 rounded-lg p-4 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-slate-400">
                    {lang === 'fr'
                      ? 'SALUTATION TRADITIONNELLE À CETTE HEURE (FOOYAŊ)'
                      : 'TRADITIONAL GREETING AT THIS HOUR (FOOYAŊ)'}
                  </div>
                  <div className="font-display text-lg font-bold text-white">
                    « {activeTimePeriod.greetingZarma} »
                  </div>
                  <div className="text-xs font-semibold text-emerald-400">
                    Réponse : « {activeTimePeriod.greetingResponseZarma} »
                  </div>
                </div>
                <p className="text-xs text-slate-300 border-t border-slate-800 pt-2">
                  {lang === 'fr' ? activeTimePeriod.greetingFr : activeTimePeriod.greetingEn}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05: The 7-Day Weekly Market Cycle (Habu Jirbi Iyye) */}
        <section id="markets" className="space-y-6 pt-4 border-t border-slate-800">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              {lang === 'fr'
                ? '05. Semaine Zarma & Cycle des Marchés Hebdomadaires (Habu Jirbi Iyye)'
                : '05. The Zarma Week & Weekly Market Cycle (Habu Jirbi Iyye)'}
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              {lang === 'fr'
                ? 'En Zarma, le mot « Habu » désigne à la fois le marché et la semaine de sept jours (jirbi iyye), car chaque cité du Zarmaganda, du Boboye et de la vallée du fleuve anime son grand marché à jour fixe.'
                : 'In Zarma, the word "Habu" means both "market" and "seven-day week" (jirbi iyye), as every town across western Niger hosts its main market on a fixed weekday.'}
            </p>
          </div>

          <div className="bg-[#1E293B] border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#0F172A] text-xs font-semibold text-slate-300">
                    <th className="py-3.5 px-4">Zarma Originel</th>
                    <th className="py-3.5 px-4">Zarma-Arab</th>
                    <th className="py-3.5 px-4">Français / English</th>
                    <th className="py-3.5 px-4">
                      {lang === 'fr' ? 'Marchés Historiques (Habu)' : 'Historic Weekly Markets (Habu)'}
                    </th>
                    <th className="py-3.5 px-4">
                      {lang === 'fr' ? 'Exemple Authentique' : 'Authentic Example'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs">
                  {MONDAY_FIRST_INDICES.map((dayIdx) => {
                    const day = ZARMA_DAYS_OF_WEEK[dayIdx];
                    return (
                      <tr
                        key={day.zarmaName}
                        className="hover:bg-slate-800/60 transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-display font-bold text-sm text-amber-400">
                            {day.zarmaAncestralName}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">
                            {day.zarmaAjami.split('/')[0]}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-display font-bold text-sm text-white">
                            {day.zarmaName}
                          </div>
                          {day.altName && (
                            <div className="text-[11px] font-semibold text-emerald-400">
                              {day.altName}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-100">
                            {day.frenchName} · {day.englishName}
                          </div>
                          <div className="text-[11px] text-slate-400">{day.arabicOrigin}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-sky-400">
                            {day.majorMarkets.map((m) => m.town).join(' · ')}
                          </div>
                          <div className="text-[11px] text-slate-300">
                            {lang === 'fr'
                              ? day.majorMarkets[0].specialtyFr
                              : day.majorMarkets[0].specialtyEn}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-medium text-white">« {day.exampleZarma} »</div>
                          <div className="text-[11px] text-slate-400 italic">
                            {lang === 'fr' ? day.exampleFr : day.exampleEn}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Quiet Footer */}
      <footer className="mt-16 border-t border-slate-800 bg-[#0F172A] py-8 px-6">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span className="font-display font-bold text-white">Kalandirye Zarma</span> ·
            Zarma Originel (Mahantaji → Fahantaji) · Zarma-Arab (Atinni → Alhadi) · 12 Mois (Dadabu Beeri → Cimsi)
          </div>
          <div className="flex items-center gap-4">
            <a href="#almanac" className="hover:text-white transition-colors">
              Almanach
            </a>
            <span>·</span>
            <a href="#zarma-arab" className="hover:text-white transition-colors">
              Zarma-Arab
            </a>
            <span>·</span>
            <a href="#montre" className="hover:text-white transition-colors">
              Montre Guuru
            </a>
            <span>·</span>
            <a href="#seasons" className="hover:text-white transition-colors">
              Waati Taaci
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
