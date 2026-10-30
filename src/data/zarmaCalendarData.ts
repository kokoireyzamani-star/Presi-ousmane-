export type LanguageMode = 'fr' | 'en';

export interface ZarmaDayOfWeek {
  index: number; // 0 = Sunday (Alhadi) .. 6 = Saturday (Asipti)
  zarmaAncestralName: string; // Mahantaji, Bohantaji, Wayhantaji, Tohantaji, Zinbuza, Duhantaji, Fahantaji
  zarmaName: string; // Zarma-Arab: Alhadi, Atinni, Atalaata, Alarba, Alaamisi, Alzuma, Asipti
  altName?: string;
  zarmaAjami: string; // Zarma in Arabic (Ajami) script
  phonetic: string;
  frenchName: string;
  englishName: string;
  arabicOrigin: string;
  literalMeaningFr: string;
  literalMeaningEn: string;
  culturalNoteFr: string;
  culturalNoteEn: string;
  majorMarkets: {
    town: string;
    region: string;
    specialtyFr: string;
    specialtyEn: string;
  }[];
  exampleZarma: string;
  exampleFr: string;
  exampleEn: string;
}

export interface ZarmaGregorianMonth {
  index: number; // 0 = Jan .. 11 = Dec
  zarmaName: string;
  traditionalLunarCorrespondent: string; // Dadabu Beeri .. Cimsi
  zarmaAjami: string;
  phonetic: string;
  frenchName: string;
  englishName: string;
  seasonId: 'jaw' | 'hayni' | 'kaydiya' | 'hemar';
  agroActivityFr: string;
  agroActivityEn: string;
  avgTempC: string;
  rainfallMm: string;
}

export interface ZarmaLunarMonth {
  order: number; // 1 .. 12
  zarmaName: string; // Exact canonical name requested: Dadabu Beeri, Dadabu Kayna, Gaani, Gaanibanda, Bine Kuna, Banbana, Way-Zeeno, Ce Konna, Mehau, Me-Feeri, Fulanzam, Cimsi
  altZarmaName?: string;
  zarmaAjami: string; // Zarma-Arab Ajami script
  phonetic: string;
  hijriName: string;
  literalFr: string;
  literalEn: string;
  meaningFr: string;
  meaningEn: string;
  keyCelebrationFr?: string;
  keyCelebrationEn?: string;
  proverbZarma: string;
  proverbFr: string;
  proverbEn: string;
}

export interface ZarmaSeason {
  id: 'hayni' | 'kaydiya' | 'hemar' | 'jaw';
  zarmaName: string;
  altZarmaName: string;
  zarmaAjami: string;
  phonetic: string;
  frenchTitle: string;
  englishTitle: string;
  monthsSpanFr: string;
  monthsSpanEn: string;
  startMonth: number; // 1-12
  endMonth: number;   // 1-12
  climateStateCode: string;
  accentColor: string;
  tempRangeC: string;
  humidityRange: string;
  windPatternFr: string;
  windPatternEn: string;
  descriptionFr: string;
  descriptionEn: string;
  agriculturalCycleFr: string[];
  agriculturalCycleEn: string[];
  keyTerms: {
    zarma: string;
    phonetic: string;
    fr: string;
    en: string;
    exampleZarma: string;
    exampleFr: string;
    exampleEn: string;
  }[];
}

export interface ZarmaTimePeriod {
  id: string;
  zarmaName: string;
  altName?: string;
  zarmaAjami: string;
  phonetic: string;
  startHour: number; // 0-24 decimal
  endHour: number;
  timeRangeLabel: string;
  frenchName: string;
  englishName: string;
  solarStateFr: string;
  solarStateEn: string;
  prayerLinkFr: string;
  prayerLinkEn: string;
  greetingZarma: string;
  greetingResponseZarma: string;
  greetingFr: string;
  greetingEn: string;
  dailyActivityFr: string;
  dailyActivityEn: string;
  exampleZarma: string;
  exampleFr: string;
  exampleEn: string;
}

export interface CalendarCustomEvent {
  id: string;
  dateStr: string; // YYYY-MM-DD
  titleZarma: string;
  titleFr: string;
  category: 'market' | 'ceremony' | 'agriculture' | 'community';
  location: string;
  notes?: string;
}

export const ZARMA_DAYS_OF_WEEK: ZarmaDayOfWeek[] = [
  {
    index: 0,
    zarmaAncestralName: 'Fahantaji',
    zarmaName: 'Alhadi',
    zarmaAjami: 'فَهَنْتَجِ / أَلْحَدِ',
    phonetic: '/fa.han.ta.dʒi/ · /al.ha.di/',
    frenchName: 'Dimanche',
    englishName: 'Sunday',
    arabicOrigin: 'Al-Aḥad (الأحد)',
    literalMeaningFr: 'Fahantaji (Zarma originel) · Alhadi (Zarma-Arabe)',
    literalMeaningEn: 'Fahantaji (Original Zarma) · Alhadi (Zarma-Arab)',
    culturalNoteFr: 'Nom ancestral zarma « Fahantaji » et nom zarma-arabe « Alhadi ». Grand jour de caravanes fluviales et d’échanges sur les rives du fleuve Niger.',
    culturalNoteEn: 'Ancestral Zarma name "Fahantaji" and Zarma-Arab name "Alhadi". Major day for riverine trade and rural market gatherings along the Niger River.',
    majorMarkets: [
      {
        town: 'Ayorou (Hayoru)',
        region: 'Tillabéri',
        specialtyFr: 'Grand marché international de bétail (alman) et d’artisanat au bord du fleuve',
        specialtyEn: 'Historic international livestock (alman) and riverine craft market'
      },
      {
        town: 'Gotheye',
        region: 'Dargol / Tillabéri',
        specialtyFr: 'Échanges agricoles de mil (hayni), oignons (albasañ) et nattes tressées',
        specialtyEn: 'Agricultural trade of millet (hayni), onions (albasañ), and woven mats'
      }
    ],
    exampleZarma: 'Fahantaji (Alhadi) no Hayoru habo ga margu Isa me gaa.',
    exampleFr: 'C’est le dimanche (Fahantaji / Alhadi) que le marché d’Ayorou se réunit au bord du fleuve.',
    exampleEn: 'Sunday (Fahantaji / Alhadi) is when the Ayorou market gathers on the river bank.'
  },
  {
    index: 1,
    zarmaAncestralName: 'Mahantaji',
    zarmaName: 'Atinni',
    zarmaAjami: 'مَهَنْتَجِ / أَتِنِّ',
    phonetic: '/ma.han.ta.dʒi/ · /a.tin.ni/',
    frenchName: 'Lundi',
    englishName: 'Monday',
    arabicOrigin: 'Al-Ithnayn (الإثنين)',
    literalMeaningFr: 'Mahantaji (Zarma originel) · Atinni (Zarma-Arabe)',
    literalMeaningEn: 'Mahantaji (Original Zarma) · Atinni (Zarma-Arab)',
    culturalNoteFr: 'Nom ancestral zarma « Mahantaji » et nom zarma-arabe « Atinni ». Jour propice au début des grands travaux champêtres collectifs (boogu) et à l’ouverture de la semaine.',
    culturalNoteEn: 'Ancestral Zarma name "Mahantaji" and Zarma-Arab name "Atinni". Auspicious day for starting collective farming labor (boogu).',
    majorMarkets: [
      {
        town: 'Torodi',
        region: 'Tillabéri (Gourma)',
        specialtyFr: 'Bois de chauffe (bundu), lait frais, bétail et produits du Gourma',
        specialtyEn: 'Firewood (bundu), fresh milk, livestock, and Gourma produce'
      },
      {
        town: 'Say',
        region: 'Tillabéri',
        specialtyFr: 'Céréales, fruits du fleuve et manuscrits de la cité maraboutique',
        specialtyEn: 'Grains, river fruits, and goods of the historic scholarly town'
      }
    ],
    exampleZarma: 'Mahantaji (Atinni) no goy ga sintin kwaara kulu ra.',
    exampleFr: 'Le lundi (Mahantaji / Atinni) est le début du travail dans toute la cité.',
    exampleEn: 'Work begins on Monday (Mahantaji / Atinni) throughout the town.'
  },
  {
    index: 2,
    zarmaAncestralName: 'Bohantaji',
    zarmaName: 'Atalaata',
    zarmaAjami: 'بُوهَنْتَجِ / أَتَلَاتَ',
    phonetic: '/bo.han.ta.dʒi/ · /a.ta.laː.ta/',
    frenchName: 'Mardi',
    englishName: 'Tuesday',
    arabicOrigin: 'Ath-Thulāthā’ (الثلاثاء)',
    literalMeaningFr: 'Bohantaji (Zarma originel) · Atalaata (Zarma-Arabe)',
    literalMeaningEn: 'Bohantaji (Original Zarma) · Atalaata (Zarma-Arab)',
    culturalNoteFr: 'Nom ancestral zarma « Bohantaji » et nom zarma-arabe « Atalaata ». Journée active de commerce régional entre les plateaux du Fakara, du Zarmaganda et la vallée du fleuve.',
    culturalNoteEn: 'Ancestral Zarma name "Bohantaji" and Zarma-Arab name "Atalaata". Active regional trading day linking Zarmaganda and the river valley.',
    majorMarkets: [
      {
        town: 'Balleyara (Tagazar)',
        region: 'Filingué / Tillabéri',
        specialtyFr: 'Grand marché à bétail, dromadaires, chevaux (bari) et forgerons de l’Ouest nigérien',
        specialtyEn: 'Major market for cattle, camels, horses (bari), and blacksmithing'
      },
      {
        town: 'Liboré',
        region: 'Niamey / Kollo',
        specialtyFr: 'Riz du fleuve, maraîchage et poissons fumés (hamisa)',
        specialtyEn: 'River rice, market gardening, and smoked river fish (hamisa)'
      }
    ],
    exampleZarma: 'Bohantaji (Atalaata) no iri ga koy birni ra.',
    exampleFr: 'C’est mardi (Bohantaji / Atalaata) que nous allons en ville.',
    exampleEn: 'Tuesday (Bohantaji / Atalaata) is when we go to town.'
  },
  {
    index: 3,
    zarmaAncestralName: 'Wayhantaji',
    zarmaName: 'Alarba',
    zarmaAjami: 'وَيْهَنْتَجِ / أَلَرْبَ',
    phonetic: '/waj.han.ta.dʒi/ · /a.lar.ba/',
    frenchName: 'Mercredi',
    englishName: 'Wednesday',
    arabicOrigin: 'Al-Arbi‘ā’ (الأربعاء)',
    literalMeaningFr: 'Wayhantaji (Zarma originel) · Alarba (Zarma-Arabe)',
    literalMeaningEn: 'Wayhantaji (Original Zarma) · Alarba (Zarma-Arab)',
    culturalNoteFr: 'Nom ancestral zarma « Wayhantaji » et nom zarma-arabe « Alarba ». Milieu de la semaine marqué par le célèbre marché fluvial et artisanal de Boubon.',
    culturalNoteEn: 'Ancestral Zarma name "Wayhantaji" and Zarma-Arab name "Alarba". Mid-week marked by the renowned riverine pottery market of Boubon.',
    majorMarkets: [
      {
        town: 'Boubon',
        region: 'Karma / Tillabéri',
        specialtyFr: 'Canaris en argile (gulla), marmites en terre (botogo kusu), pirogues (abaara)',
        specialtyEn: 'Clay water jars (gulla), earthen pots (botogo kusu), and wooden pirogues (abaara)'
      },
      {
        town: 'Dogondoutchi',
        region: 'Dosso (Arewa)',
        specialtyFr: 'Mil (hayni), haricot niébé (dunguri) et tissus traditionnels',
        specialtyEn: 'Millet (hayni), cowpea beans (dunguri), and traditional textiles'
      }
    ],
    exampleZarma: 'Wayhantaji (Alarba) kaŋ bisa, iri koy Boubon.',
    exampleFr: 'Le mercredi (Wayhantaji / Alarba) passé nous sommes partis à Boubon.',
    exampleEn: 'Last Wednesday (Wayhantaji / Alarba), we went to Boubon.'
  },
  {
    index: 4,
    zarmaAncestralName: 'Tohantaji',
    zarmaName: 'Alaamisi',
    altName: 'Alkamisa',
    zarmaAjami: 'تُوهَنْتَجِ / أَلَامِسِ',
    phonetic: '/to.han.ta.dʒi/ · /a.laː.mi.si/',
    frenchName: 'Jeudi',
    englishName: 'Thursday',
    arabicOrigin: 'Al-Khamīs (الخميس)',
    literalMeaningFr: 'Tohantaji (Zarma originel) · Alaamisi (Zarma-Arabe)',
    literalMeaningEn: 'Tohantaji (Original Zarma) · Alaamisi (Zarma-Arab)',
    culturalNoteFr: 'Nom ancestral zarma « Tohantaji » et nom zarma-arabe « Alaamisi ». Veille du grand jour de rassemblement ; soir privilégié pour les bénédictions (adduwa) et le marché de Birni N’Gaouré.',
    culturalNoteEn: 'Ancestral Zarma name "Tohantaji" and Zarma-Arab name "Alaamisi". Eve of the Friday prayer and market day of Birni N’Gaouré.',
    majorMarkets: [
      {
        town: 'Birni N’Gaouré (Boboye)',
        region: 'Dosso',
        specialtyFr: 'Dattes du Dallol Bosso, natron, céréales et bétail',
        specialtyEn: 'Dallol Bosso dates, natron, grains, and livestock'
      },
      {
        town: 'Ouallam',
        region: 'Tillabéri (Zarmaganda)',
        specialtyFr: 'Semences sahéliennes, petit bétail et outils aratoires',
        specialtyEn: 'Sahelian seeds, small ruminants, and farming tools'
      }
    ],
    exampleZarma: 'Tohantaji (Alaamisi) no Birni habo.',
    exampleFr: 'C’est jeudi (Tohantaji / Alaamisi) le jour de marché de Birni.',
    exampleEn: 'Thursday (Tohantaji / Alaamisi) is Birni’s market day.'
  },
  {
    index: 5,
    zarmaAncestralName: 'Zinbuza',
    zarmaName: 'Alzuma',
    altName: 'Han beeri',
    zarmaAjami: 'زِنْبُزَ / أَلْزُمَ',
    phonetic: '/zin.bu.za/ · /al.zu.ma/',
    frenchName: 'Vendredi',
    englishName: 'Friday',
    arabicOrigin: 'Al-Jumu‘ah (الجمعة)',
    literalMeaningFr: 'Zinbuza (Zarma originel) · Alzuma / Han beeri (Zarma-Arabe)',
    literalMeaningEn: 'Zinbuza (Original Zarma) · Alzuma / Han beeri (Zarma-Arab)',
    culturalNoteFr: 'Nom ancestral zarma « Zinbuza », nom zarma-arabe « Alzuma » et titre honorifique « Han beeri » (le Grand Jour). Jour de la grande prière collective, des mariages (hiijay) et de la solidarité.',
    culturalNoteEn: 'Ancestral Zarma name "Zinbuza", Zarma-Arab name "Alzuma", and honorific "Han beeri" (the Great Day). Day of congregational prayer and weddings.',
    majorMarkets: [
      {
        town: 'Kirtachi',
        region: 'Kollo / Parc W',
        specialtyFr: 'Miel de brousse, karité, poisson du fleuve et ignames',
        specialtyEn: 'Wild bush honey, shea butter, river fish, and yams'
      },
      {
        town: 'Margou',
        region: 'Dosso / Boboye',
        specialtyFr: 'Arachides, mil et échanges communautaires après la prière',
        specialtyEn: 'Groundnuts, millet, and community trade after prayer'
      }
    ],
    exampleZarma: 'Jama kulu ga koy boŋ jisi do Zinbuza (Alzuma) hano.',
    exampleFr: 'Tout le monde se rend à la grande prière le jour de vendredi (Zinbuza / Alzuma).',
    exampleEn: 'Everyone goes to the grand prayer on Friday (Zinbuza / Alzuma).'
  },
  {
    index: 6,
    zarmaAncestralName: 'Duhantaji',
    zarmaName: 'Asipti',
    zarmaAjami: 'دُوهَنْتَجِ / أَسِبْتِ',
    phonetic: '/du.han.ta.dʒi/ · /a.sip.ti/',
    frenchName: 'Samedi',
    englishName: 'Saturday',
    arabicOrigin: 'As-Sabt (السبت)',
    literalMeaningFr: 'Duhantaji (Zarma originel) · Asipti (Zarma-Arabe)',
    literalMeaningEn: 'Duhantaji (Original Zarma) · Asipti (Zarma-Arab)',
    culturalNoteFr: 'Nom ancestral zarma « Duhantaji » et nom zarma-arabe « Asipti ». Jour des baptêmes traditionnels (boŋcabay), des cérémonies familiales et du marché de Kollo.',
    culturalNoteEn: 'Ancestral Zarma name "Duhantaji" and Zarma-Arab name "Asipti". Popular day for naming ceremonies (boŋcabay) and the Kollo market.',
    majorMarkets: [
      {
        town: 'Kollo',
        region: 'Tillabéri',
        specialtyFr: 'Riz paddy, oignons (albasañ), piments et tissus pagnes (antama)',
        specialtyEn: 'Paddy rice, onions (albasañ), peppers, and woven wrappers (antama)'
      },
      {
        town: 'Karma',
        region: 'Vallée du Fleuve',
        specialtyFr: 'Cultures maraîchères, mangues et vannerie sahélienne',
        specialtyEn: 'Market garden vegetables, mangoes, and Sahelian basketry'
      }
    ],
    exampleZarma: 'Duhantaji (Asipti) ya hano kaŋ zankey si koy lokol.',
    exampleFr: 'Le samedi (Duhantaji / Asipti) est un jour où les enfants ne vont pas à l’école.',
    exampleEn: 'Saturday (Duhantaji / Asipti) is a day when the children do not go to school.'
  }
];

export const ZARMA_GREGORIAN_MONTHS: ZarmaGregorianMonth[] = [
  {
    index: 0,
    zarmaName: 'Janeru',
    traditionalLunarCorrespondent: 'Dadabu Beeri',
    zarmaAjami: 'دَدَبُ ب Beerِ / جَنيرُ',
    phonetic: '/dʒa.ne.ru/ · /da.da.bu beː.ri/',
    frenchName: 'Janvier',
    englishName: 'January',
    seasonId: 'jaw',
    agroActivityFr: 'Cœur de la saison froide (Jaw / Hargu) : récolte des jardins maraîchers (kalo), tissage (biyan) et réparation des greniers (barma).',
    agroActivityEn: 'Heart of the cool dry season (Jaw / Hargu): harvesting irrigated gardens (kalo), weaving (biyan), and repairing granaries (barma).',
    avgTempC: '16°C – 32°C',
    rainfallMm: '0 mm'
  },
  {
    index: 1,
    zarmaName: 'Faberu',
    traditionalLunarCorrespondent: 'Dadabu Kayna',
    zarmaAjami: 'دَدَبُ كَيْنَ / فَبيرُ',
    phonetic: '/fa.be.ru/ · /da.da.bu kaj.na/',
    frenchName: 'Février',
    englishName: 'February',
    seasonId: 'jaw',
    agroActivityFr: 'Fin du froid sec et vents d’Harmattan : commerce des oignons (albasañ), tournois de lutte traditionnelle (arugurgay) et fêtes post-récoltes.',
    agroActivityEn: 'Late cool season and Harmattan winds: onion trade (albasañ), traditional wrestling tournaments (arugurgay), and post-harvest festivals.',
    avgTempC: '19°C – 35°C',
    rainfallMm: '0 mm'
  },
  {
    index: 2,
    zarmaName: 'Marsu',
    traditionalLunarCorrespondent: 'Gaani',
    zarmaAjami: 'غَانِ / مَرْسُ',
    phonetic: '/mar.su/ · /gaː.ni/',
    frenchName: 'Mars',
    englishName: 'March',
    seasonId: 'hayni',
    agroActivityFr: 'Entrée dans la saison chaude (Hayni) : défrichage des champs à la machette (adda) et transport du fumier organique (birji).',
    agroActivityEn: 'Onset of the hot dry season (Hayni): clearing fields with machetes (adda) and spreading organic manure (birji).',
    avgTempC: '23°C – 39°C',
    rainfallMm: '1 mm'
  },
  {
    index: 3,
    zarmaName: 'Afrillu',
    traditionalLunarCorrespondent: 'Gaanibanda',
    zarmaAjami: 'غَانِبَنْدَ / أَفْرِلُّ',
    phonetic: '/a.fril.lu/ · /gaː.ni.ban.da/',
    frenchName: 'Avril',
    englishName: 'April',
    seasonId: 'hayni',
    agroActivityFr: 'Chaleur intense du Sahel : couverture des toits de cases en chaume (baata) avant les pluies et préparation des semences de mil.',
    agroActivityEn: 'Peak Sahelian heat: re-thatching hut roofs with grass (baata) ahead of the rains and sorting millet seeds.',
    avgTempC: '27°C – 42°C',
    rainfallMm: '6 mm'
  },
  {
    index: 4,
    zarmaName: 'Mayu',
    traditionalLunarCorrespondent: 'Bine Kuna',
    zarmaAjami: 'بِنِ كُنَ / مَيُ',
    phonetic: '/ma.ju/ · /bi.ne ku.na/',
    frenchName: 'Mai',
    englishName: 'May',
    seasonId: 'hayni',
    agroActivityFr: 'Premiers nuages et semailles à sec (bisine) dans les champs sablonneux en attendant la première grande pluie (beena-hari).',
    agroActivityEn: 'First clouds and dry planting (bisine) in sandy fields while awaiting the first major rains (beena-hari).',
    avgTempC: '28°C – 40°C',
    rainfallMm: '30 mm'
  },
  {
    index: 5,
    zarmaName: 'Yuni',
    traditionalLunarCorrespondent: 'Banbana',
    zarmaAjami: 'بَنْبَنَ / يُونِ',
    phonetic: '/ju.ni/ · /ban.ba.na/',
    frenchName: 'Juin',
    englishName: 'June',
    seasonId: 'kaydiya',
    agroActivityFr: 'Début de l’hivernage (Kaydiya) : grondements du tonnerre (beenedunduyan) et semailles générales (duma) du mil et du sorgho.',
    agroActivityEn: 'Start of the rainy season (Kaydiya): rolling thunder (beenedunduyan) and general sowing (duma) of millet and sorghum.',
    avgTempC: '26°C – 37°C',
    rainfallMm: '75 mm'
  },
  {
    index: 6,
    zarmaName: 'Yuli',
    traditionalLunarCorrespondent: 'Way-Zeeno',
    zarmaAjami: 'وَيْ-زِينُو / يُولِ',
    phonetic: '/ju.li/ · /waj zeː.no/',
    frenchName: 'Juillet',
    englishName: 'July',
    seasonId: 'kaydiya',
    agroActivityFr: 'Pleine saison des pluies : premier sarclage à la hilaire, entraide agricole communautaire (boogu) et remplissage des mares (bangu).',
    agroActivityEn: 'Full rainy season: first weeding, cooperative farming work parties (boogu), and filling of seasonal ponds (bangu).',
    avgTempC: '24°C – 34°C',
    rainfallMm: '150 mm'
  },
  {
    index: 7,
    zarmaName: 'Agusta',
    traditionalLunarCorrespondent: 'Ce Konna',
    zarmaAjami: 'تشِي كُنَّ / أَغُسْتَ',
    phonetic: '/a.gus.ta/ · /tʃeː kon.na/',
    frenchName: 'Août',
    englishName: 'August',
    seasonId: 'kaydiya',
    agroActivityFr: 'Apogée des pluies (bayaŋ) : deuxième sarclage, pâturage abondant du bétail (alman) en brousse et montée des eaux du fleuve.',
    agroActivityEn: 'Peak rainfall abundance (bayaŋ): second weeding, lush bush grazing for livestock (alman), and rising river waters.',
    avgTempC: '23°C – 32°C',
    rainfallMm: '195 mm'
  },
  {
    index: 8,
    zarmaName: 'Satumba',
    traditionalLunarCorrespondent: 'Mehau',
    zarmaAjami: 'مِهَوْ / سَتُمْبَ',
    phonetic: '/sa.tum.ba/ · /meː.haw/',
    frenchName: 'Septembre',
    englishName: 'September',
    seasonId: 'kaydiya',
    agroActivityFr: 'Maturation des épis de mil (hayni) et du niébé (dunguri) ; apparition des premiers épis grillés nouveaux.',
    agroActivityEn: 'Maturation of millet ears (hayni) and cowpeas (dunguri); tasting of the first roasted new grain.',
    avgTempC: '24°C – 35°C',
    rainfallMm: '90 mm'
  },
  {
    index: 9,
    zarmaName: 'Oktoba',
    traditionalLunarCorrespondent: 'Me-Feeri',
    zarmaAjami: 'مِي-فِيرِ / أُكْتُوبَ',
    phonetic: '/ok.to.ba/ · /meː feː.ri/',
    frenchName: 'Octobre',
    englishName: 'October',
    seasonId: 'hemar',
    agroActivityFr: 'Saison des récoltes (Hemar) : coupe des épis, confection des bottes de mil (hayni boko) et stockage solennel dans les greniers (barma).',
    agroActivityEn: 'Harvest season (Hemar): cutting stalks, tying millet bundles (hayni boko), and storing grain in granaries (barma).',
    avgTempC: '24°C – 38°C',
    rainfallMm: '15 mm'
  },
  {
    index: 10,
    zarmaName: 'Nuwamba',
    traditionalLunarCorrespondent: 'Fulanzam',
    zarmaAjami: 'فُلَنْزَمْ / نُوَمْبَ',
    phonetic: '/nu.wam.ba/ · /fu.lan.zam/',
    frenchName: 'Novembre',
    englishName: 'November',
    seasonId: 'jaw',
    agroActivityFr: 'Transition vers la fraîcheur (Jaw) : rentrée des récoltes de haricot et début des cultures de contre-saison au bord du fleuve.',
    agroActivityEn: 'Transition to cool dry weather (Jaw): completing bean harvests and starting dry-season riverine gardening.',
    avgTempC: '20°C – 36°C',
    rainfallMm: '0 mm'
  },
  {
    index: 11,
    zarmaName: 'Disamba',
    traditionalLunarCorrespondent: 'Cimsi',
    zarmaAjami: 'تشِمْسِ / دِسَمْبَ',
    phonetic: '/di.sam.ba/ · /tʃim.si/',
    frenchName: 'Décembre',
    englishName: 'December',
    seasonId: 'jaw',
    agroActivityFr: 'Nuits fraîches et vent sec : pêche fluviale en pirogue (abaara) au filet (bililli / birji) et veillées familiales autour du thé (attayi).',
    agroActivityEn: 'Cool nights and dry breeze: pirogue river fishing (abaara) with nets (bililli) and evening family gatherings over mint tea (attayi).',
    avgTempC: '17°C – 33°C',
    rainfallMm: '0 mm'
  }
];

export const ZARMA_LUNAR_MONTHS: ZarmaLunarMonth[] = [
  {
    order: 1,
    zarmaName: 'Dadabu Beeri',
    altZarmaName: 'Almuharram / Zammu',
    zarmaAjami: 'دَدَبُ بَيرِ / الْمُحَرَّم',
    phonetic: '/da.da.bu beː.ri/',
    hijriName: 'Muḥarram (محرم)',
    literalFr: 'Le grand tâtonnement / L’ouverture de l’an lunaire',
    literalEn: 'The great groping / Opening of the lunar year',
    meaningFr: 'Premier mois du cycle traditionnel zarma (Dadabu Beeri) ; marqué au 10e jour (Achoura / Zammu) par des repas communautaires, le cousinage à plaisanterie (baase) et les bénédictions.',
    meaningEn: 'First month of the traditional Zarma lunar cycle (Dadabu Beeri); marked on the 10th day by communal feasts, joking cousinship (baase) rituals, and blessings.',
    keyCelebrationFr: '10e jour : Fête de la Bianou / Achoura (partage et cousinage baase)',
    keyCelebrationEn: '10th day: Ashura / Traditional New Year feast & joking cousinship (baase)',
    proverbZarma: 'Albarka ma furo jiiri tajo ra.',
    proverbFr: 'Que la bénédiction entre dans la nouvelle année.',
    proverbEn: 'May blessing enter the new year.'
  },
  {
    order: 2,
    zarmaName: 'Dadabu Kayna',
    altZarmaName: 'Safar',
    zarmaAjami: 'دَدَبُ كَيْنَ / صَفَر',
    phonetic: '/da.da.bu kaj.na/',
    hijriName: 'Ṣafar (صفر)',
    literalFr: 'Le petit tâtonnement',
    literalEn: 'The small groping around',
    meaningFr: 'Deuxième mois lunaire (Dadabu Kayna) qui suit les festivités du nouvel an ; période de patience (suuru), de prudence dans les voyages et de prières protectrices.',
    meaningEn: 'Second lunar month (Dadabu Kayna) following the New Year; a time of patience (suuru), mindful travel, and protective prayers.',
    proverbZarma: 'Suuru ga sanday barmay gaabi ra.',
    proverbFr: 'La patience transforme l’épreuve en force.',
    proverbEn: 'Patience transforms hardship into strength.'
  },
  {
    order: 3,
    zarmaName: 'Gaani',
    altZarmaName: 'Almawluudu handu',
    zarmaAjami: 'غَانِ / رَبِيع الأَوَّل',
    phonetic: '/gaː.ni/',
    hijriName: 'Rabī‘ al-Awwal (ربيع الأول)',
    literalFr: 'Le mois de la danse et de la réjouissance (Mawlid)',
    literalEn: 'The month of dance and celebration (Mawlid)',
    meaningFr: 'Troisième mois lunaire (Gaani) célébrant la naissance du Prophète (Maouloud) et les grandes fêtes culturelles et concours de danse (gaani beefe).',
    meaningEn: 'Third lunar month (Gaani) celebrating the Prophet’s birth (Mawlid) alongside cultural gatherings and traditional dance tournaments (gaani beefe).',
    keyCelebrationFr: '12e nuit : Maouloud (veillées de chants, lecture et célébration de Gaani)',
    keyCelebrationEn: '12th night: Mawlid / Gaani cultural and spiritual celebration',
    proverbZarma: 'Suba, iri ga koy ga di gaani beefe.',
    proverbFr: 'Demain, nous irons voir un concours de danse.',
    proverbEn: 'Tomorrow we are going to see the dance tournament.'
  },
  {
    order: 4,
    zarmaName: 'Gaanibanda',
    altZarmaName: 'Gaani banda',
    zarmaAjami: 'غَانِبَنْدَ / رَبِيع الثَّانِي',
    phonetic: '/gaː.ni.ban.da/',
    hijriName: 'Rabī‘ ath-Thānī (ربيع الثاني)',
    literalFr: 'Après Gaani (le mois suivant la fête de Gaani)',
    literalEn: 'After Gaani (the month following Gaani)',
    meaningFr: 'Quatrième mois lunaire (Gaanibanda) où la vie communautaire reprend son cours paisible après les célébrations de Gaani.',
    meaningEn: 'Fourth lunar month (Gaanibanda) when village life returns to steady rhythm after the Gaani festivities.',
    proverbZarma: 'Baafune diraw no, manti wuru no.',
    proverbFr: 'La vie est un long voyage, ce n’est pas une course.',
    proverbEn: 'Life is a journey, not a frantic race.'
  },
  {
    order: 5,
    zarmaName: 'Bine Kuna',
    altZarmaName: 'Jumādā I',
    zarmaAjami: 'بِنِ كُنَ / جُمَادَى الأُولَى',
    phonetic: '/bi.ne ku.na/',
    hijriName: 'Jumādā al-Ūlā (جمادى الأولى)',
    literalFr: 'À l’intérieur du cœur (au milieu du cycle)',
    literalEn: 'Inside the heart (in the middle of the cycle)',
    meaningFr: 'Cinquième mois lunaire (Bine Kuna) situé au cœur de l’année ; période de recueillement intérieur et d’entraide familiale (almayaali).',
    meaningEn: 'Fifth lunar month (Bine Kuna) at the heart of the year; focused on inner reflection and household solidarity (almayaali).',
    proverbZarma: 'Bine kaŋ gonda lakkal kanay ga duumi.',
    proverbFr: 'Un cœur qui possède la paix intérieure vit longtemps.',
    proverbEn: 'A peaceful heart lives longer.'
  },
  {
    order: 6,
    zarmaName: 'Banbana',
    altZarmaName: 'Bambana',
    zarmaAjami: 'بَنْبَنَ / جُمَادَى الآخِرَة',
    phonetic: '/ban.ba.na/',
    hijriName: 'Jumādā ath-Thāniyah (جمادى الآخرة)',
    literalFr: 'L’affermissement / Sixième lune',
    literalEn: 'The strengthening / Sixth moon',
    meaningFr: 'Sixième mois lunaire (Banbana) consacré au commerce, aux alliances matrimoniales et à l’éducation des jeunes (biiriyan).',
    meaningEn: 'Sixth lunar month (Banbana) dedicated to trade, family alliances, and the upbringing of youth (biiriyan).',
    proverbZarma: 'Bayray bisa arzaka.',
    proverbFr: 'Le savoir et la sagesse surpassent la richesse matérielle.',
    proverbEn: 'Wisdom is superior to material riches.'
  },
  {
    order: 7,
    zarmaName: 'Way-Zeeno',
    altZarmaName: 'Way zeeno me haw / Rajab',
    zarmaAjami: 'وَيْ-زِينُو / رَجَب',
    phonetic: '/waj zeː.no/',
    hijriName: 'Rajab (رجب)',
    literalFr: 'Le mois de la vieille femme (jeûne des aînées)',
    literalEn: 'The old woman’s month (fasting of the elders)',
    meaningFr: 'Septième mois lunaire (Way-Zeeno) où les personnes âgées pieuses (albeeri / arkusu) observent un jeûne surérogatoire en prélude spirituel au mois de Mehau.',
    meaningEn: 'Seventh lunar month (Way-Zeeno) during which pious elders voluntarily fast in spiritual preparation for Mehau.',
    proverbZarma: 'Albora ma du baani nda suuru kwaara ra.',
    proverbFr: 'Que l’ancien vénérable jouisse de paix et de respect dans la cité.',
    proverbEn: 'May the respected elder enjoy peace and reverence in the community.'
  },
  {
    order: 8,
    zarmaName: 'Ce Konna',
    altZarmaName: 'Ce konno / Sha‘bān',
    zarmaAjami: 'تشِي كُنَّ / شَعْبَان',
    phonetic: '/tʃeː kon.na/',
    hijriName: 'Sha‘bān (شعبان)',
    literalFr: 'Le pied chaud (les préparatifs actifs avant le jeûne)',
    literalEn: 'The warm foot (active preparation before the fast)',
    meaningFr: 'Huitième mois lunaire (Ce Konna) précédant immédiatement le Ramadan : on marche beaucoup (« pied chaud ») dans les marchés pour constituer les provisions familiales.',
    meaningEn: 'Eighth lunar month (Ce Konna) right before Ramadan: people walk briskly ("warm foot") through markets to stock household provisions.',
    proverbZarma: 'Goy sando gonda albarka beeri.',
    proverbFr: 'Le travail honnête et assidu a une grande bénédiction.',
    proverbEn: 'Honest hard work carries immense divine blessing.'
  },
  {
    order: 9,
    zarmaName: 'Mehau',
    altZarmaName: 'Me haw / Ramadan handu',
    zarmaAjami: 'مِهَوْ / رَمَضَان',
    phonetic: '/meː.haw/',
    hijriName: 'Ramaḍān (رمضان)',
    literalFr: 'Attacher la bouche (le mois sacré du jeûne)',
    literalEn: 'Tying the mouth (the sacred month of fasting)',
    meaningFr: 'Neuvième mois lunaire (Mehau) universellement connu chez les Zarma : mois du jeûne sacré de l’aube (alfazar) au coucher du soleil (fitiri / hiire), de la prière et du partage de la bouillie (bita).',
    meaningEn: 'Ninth lunar month (Mehau) universally known across Zarma society: month of sacred fasting from dawn (alfazar) to sunset, prayer, and sharing millet porridge (bita).',
    keyCelebrationFr: '27e nuit : Laylat al-Qadr (Nuit du Destin et des invocations adduwa)',
    keyCelebrationEn: '27th night: Night of Decree and fervent supplications (adduwa)',
    proverbZarma: 'Addiini ga boro fondo hanno cabe.',
    proverbFr: 'La religion montre aux hommes le droit chemin.',
    proverbEn: 'Religion shows people the righteous path.'
  },
  {
    order: 10,
    zarmaName: 'Me-Feeri',
    altZarmaName: 'Me feri / Jingari kayna',
    zarmaAjami: 'مِي-فِيرِ / شَوَّال',
    phonetic: '/meː feː.ri/',
    hijriName: 'Shawwāl (شوال)',
    literalFr: 'Dénouer / Ouvrir la bouche (fête de la rupture du jeûne)',
    literalEn: 'Untying / Opening the mouth (feast of breaking the fast)',
    meaningFr: 'Dixième mois lunaire (Me-Feeri) qui s’ouvre par la grande fête de l’Aïd el-Fitr (Korité), où chacun revêt ses plus beaux habits (bankaaray) et demande pardon.',
    meaningEn: 'Tenth lunar month (Me-Feeri) opening with Eid al-Fitr, when families wear festive garments (bankaaray) and exchange blessings.',
    keyCelebrationFr: '1er jour : Fête de Me-Feeri (Aïd el-Fitr / Korité à la grande prière)',
    keyCelebrationEn: '1st day: Feast of Me-Feeri (Eid al-Fitr congregational prayer)',
    proverbZarma: 'Kotaray hanno bisa wura.',
    proverbFr: 'Une amitié sincère et fidèle vaut mieux que l’or.',
    proverbEn: 'A loyal friendship is more precious than gold.'
  },
  {
    order: 11,
    zarmaName: 'Fulanzam',
    altZarmaName: 'Hinanzam',
    zarmaAjami: 'فُلَنْزَمْ / ذُو القَعْدَة',
    phonetic: '/fu.lan.zam/',
    hijriName: 'Dhū al-Qa‘dah (ذو القعدة)',
    literalFr: 'Le mois du repos et de la trêve (entre les deux grandes fêtes)',
    literalEn: 'The month of rest and respite (between the two major feasts)',
    meaningFr: 'Onzième mois lunaire (Fulanzam : « se reposer / souffler ») séparant la fête de Me-Feeri de la grande fête de Cimsi (Tabaski). Départ des pèlerins (Alhaaji) vers La Mecque.',
    meaningEn: 'Eleventh lunar month (Fulanzam: "to rest / recuperate") situated between Me-Feeri and Cimsi. Departure of pilgrims (Alhaaji) to Mecca.',
    proverbZarma: 'Ali farga, a go ga fulanzam tuuro bi cire.',
    proverbFr: 'Ali est fatigué, il se repose sous l’ombre de l’arbre.',
    proverbEn: 'Ali is weary, he is resting beneath the shade of the tree.'
  },
  {
    order: 12,
    zarmaName: 'Cimsi',
    altZarmaName: 'Tabaski / Jingari beeri',
    zarmaAjami: 'تشِمْسِ / ذُو الحِجَّة',
    phonetic: '/tʃim.si/',
    hijriName: 'Dhū al-Ḥijjah (ذو الحجة)',
    literalFr: 'Le mois du grand sacrifice (Tabaski) et du pèlerinage',
    literalEn: 'The month of the great sacrifice (Tabaski) and pilgrimage',
    meaningFr: 'Douzième mois lunaire (Cimsi) célébrant la grande fête du mouton (Tabaski) au 10e jour et l’accomplissement du pèlerinage à La Mecque (Alhaaji).',
    meaningEn: 'Twelfth lunar month (Cimsi) celebrating the great feast of sacrifice (Tabaski / Eid al-Adha) on the 10th day and the Hajj pilgrimage.',
    keyCelebrationFr: '10e jour : Grande fête de Cimsi / Tabaski (sacrifice du bélier et partage)',
    keyCelebrationEn: '10th day: Great Feast of Cimsi / Tabaski (Eid al-Adha)',
    proverbZarma: 'Alhaaji Moussa koy Makka ka ye kambe hanno ra.',
    proverbFr: 'Elhadj Moussa a accompli le pèlerinage à La Mecque et est revenu en paix.',
    proverbEn: 'Alhaji Moussa completed the pilgrimage to Mecca and returned safely.'
  }
];

export const ZARMA_SEASONS: ZarmaSeason[] = [
  {
    id: 'hayni',
    zarmaName: 'Hayni / Zaari konno',
    altZarmaName: 'Hayno (Saison chaude sèche)',
    zarmaAjami: 'هَيْنِ / زَارِ كُنُّ',
    phonetic: '/haj.ni/',
    frenchTitle: 'Saison Chaude & Sèche (Pré-hivernage)',
    englishTitle: 'Hot & Dry Season (Pre-Monsoon)',
    monthsSpanFr: 'Mars (Marsu) — Mai (Mayu)',
    monthsSpanEn: 'March (Marsu) — May (Mayu)',
    startMonth: 3,
    endMonth: 5,
    climateStateCode: '▲ CHALEUR SÈCHE · 38°C–43°C',
    accentColor: '#D97706',
    tempRangeC: '28°C – 43°C',
    humidityRange: '12% – 30%',
    windPatternFr: 'Transition de l’Harmattan sec aux premiers vents humides du sud-ouest',
    windPatternEn: 'Transition from dry Harmattan to early southwestern monsoon breezes',
    descriptionFr: 'Période de forte chaleur solaire précédant les pluies au Niger. Les agriculteurs préparent intensément les terres sablonneuses, réparent les toitures en paille (baata) et pratiquent les semailles à sec (bisine).',
    descriptionEn: 'Period of intense solar heat preceding the rains in Niger. Farmers clear sandy fields, re-thatch roofs with grass (baata), and practice preventive dry sowing (bisine).',
    agriculturalCycleFr: [
      'Défrichage des champs avec la grande machette (adda)',
      'Épandage du fumier organique (birji) sur les terres familiales (batabaraw)',
      'Réfection des toitures de cases en herbe Aristida longiflora (baata)',
      'Semailles à sec (bisine) dès l’apparition des premiers nuages de mai'
    ],
    agriculturalCycleEn: [
      'Clearing fields using the traditional machete (adda)',
      'Spreading organic manure (birji) across family hectares (batabaraw)',
      'Thatching circular hut roofs with Aristida longiflora grass (baata)',
      'Preventive dry planting (bisine) as May clouds gather'
    ],
    keyTerms: [
      {
        zarma: 'Bisine',
        phonetic: '/bi.si.ne/',
        fr: 'Semer à sec avant les premières pluies',
        en: 'Dry planting before the first rains',
        exampleZarma: 'Kawye borey no ga bisine.',
        exampleFr: 'Ce sont les villageois qui sèment à sec.',
        exampleEn: 'The villagers are dry planting.'
      },
      {
        zarma: 'Baata',
        phonetic: '/baː.ta/',
        fr: 'Couvrir le toit de chaume d’une case',
        en: 'To roof a hut with thatch or grass',
        exampleZarma: 'Iri ga hugo boŋo baata hunkuna.',
        exampleFr: 'Nous couvrons le toit de la case de chaume aujourd’hui.',
        exampleEn: 'We are thatching the hut roof today.'
      },
      {
        zarma: 'Adda',
        phonetic: '/ad.da/',
        fr: 'Machette agricole pour le défrichage',
        en: 'Machete used for farming and clearing',
        exampleZarma: 'Ay gonda adda beeri.',
        exampleFr: 'J’ai une grande machette.',
        exampleEn: 'I have a big machete.'
      }
    ]
  },
  {
    id: 'kaydiya',
    zarmaName: 'Kaydiya',
    altZarmaName: 'Beena-hari waati (Hivernage)',
    zarmaAjami: 'كَيْدِيَ / بِينَا-هَرِ',
    phonetic: '/kaj.di.ja/',
    frenchTitle: 'Saison des Pluies / Hivernage',
    englishTitle: 'Rainy Season / Agricultural Monsoon',
    monthsSpanFr: 'Juin (Yuni) — Septembre (Satumba)',
    monthsSpanEn: 'June (Yuni) — September (Satumba)',
    startMonth: 6,
    endMonth: 9,
    climateStateCode: '● HIVERNAGE PLUVIEUX · 24°C–35°C',
    accentColor: '#059669',
    tempRangeC: '23°C – 35°C',
    humidityRange: '60% – 85%',
    windPatternFr: 'Mousson humide du Golfe de Guinée et lignes de grains orageuses',
    windPatternEn: 'Humid monsoon from the Gulf of Guinea with thunder squall lines',
    descriptionFr: 'Cœur vital de l’année écologique zarma. Annoncée par le grondement du tonnerre (beenedunduyan), l’eau du ciel (beena-hari) transforme la brousse en pâturages verdoyants, remplit les mares (bangu) et fait lever le mil et le haricot.',
    descriptionEn: 'Vital heart of the Zarma ecological year. Heralded by rolling thunder (beenedunduyan), rain (beena-hari) turns the bush green, fills seasonal lakes (bangu), and nourishes millet and cowpeas.',
    agriculturalCycleFr: [
      'Semailles générales (duma) après la première pluie utile',
      'Travaux collectifs d’entraide communautaire (boogu) pour le sarclage',
      'Application d’engrais blanc (birjikwaaray) pour fortifier les jeunes pousses',
      'Pâturage des troupeaux (alman) en brousse sous la garde du berger (hawji)'
    ],
    agriculturalCycleEn: [
      'General seed sowing (duma) immediately after the first soaking rain',
      'Cooperative community work parties (boogu) for weeding millet fields',
      'Applying white fertilizer (birjikwaaray) to nourish young seedlings',
      'Grazing livestock herds (alman) in lush bushland under the herdsman (hawji)'
    ],
    keyTerms: [
      {
        zarma: 'Beena-hari',
        phonetic: '/beː.na ha.ri/',
        fr: 'Eau du ciel / Pluie féconde',
        en: 'Sky water / Rainwater',
        exampleZarma: 'Nda beena-haro man kaŋ, borey si hin ga duma.',
        exampleFr: 'Si la pluie ne tombe pas, les gens ne peuvent pas semer.',
        exampleEn: 'If rainwater does not fall, people cannot plant their crops.'
      },
      {
        zarma: 'Beenedunduyan',
        phonetic: '/beː.ne.dun.du.jaŋ/',
        fr: 'Grondement du tonnerre annonciateur',
        en: 'Thunder rumble signaling rain',
        exampleZarma: 'Beenedunduyan ga ci kaŋ beena hari ga ka.',
        exampleFr: 'Le grondement du tonnerre annonce l’arrivée de la pluie.',
        exampleEn: 'The thunder rumble signals that rain is coming.'
      },
      {
        zarma: 'Boogu',
        phonetic: '/boː.gu/',
        fr: 'Travail communautaire d’entraide au champ',
        en: 'Collective cooperative farming labor',
        exampleZarma: 'A gonda boogu suba.',
        exampleFr: 'Il a un travail communautaire demain.',
        exampleEn: 'He is having an organized work party tomorrow.'
      },
      {
        zarma: 'Duma',
        phonetic: '/du.ma/',
        fr: 'Semer, ensemencer la terre',
        en: 'To sow, plant seeds in the field',
        exampleZarma: 'Hay kaŋ ni duma hunkuna, suba a ga hatta.',
        exampleFr: 'Ce que tu sèmes aujourd’hui mûrira demain.',
        exampleEn: 'What you sow today, tomorrow will harvest.'
      }
    ]
  },
  {
    id: 'hemar',
    zarmaName: 'Hemar',
    altZarmaName: 'Hemaro (Moisson & Récoltes)',
    zarmaAjami: 'هِمَرْ',
    phonetic: '/he.mar/',
    frenchTitle: 'Saison Chaude des Récoltes (Post-pluies)',
    englishTitle: 'Warm Harvest Season (Post-Rains)',
    monthsSpanFr: 'Octobre (Oktoba) — Mi-Novembre',
    monthsSpanEn: 'October (Oktoba) — Mid-November',
    startMonth: 10,
    endMonth: 10,
    climateStateCode: '◆ MOISSON & GRENIERS · 25°C–38°C',
    accentColor: '#EAB308',
    tempRangeC: '24°C – 38°C',
    humidityRange: '30% – 50%',
    windPatternFr: 'Arrêt des pluies, ensoleillement doré propice au séchage des épis',
    windPatternEn: 'Cessation of rains, golden sunshine ideal for drying grain heads',
    descriptionFr: 'Saison d’abondance et de gratitude où les épis de mil et le niébé arrivent à maturité. Les familles lient les bottes de céréales (hayni boko) et remplissent les greniers traditionnels (barma).',
    descriptionEn: 'Season of abundance and gratitude when millet and cowpeas reach full maturity. Families tie grain bundles (hayni boko) and fill traditional granaries (barma).',
    agriculturalCycleFr: [
      'Coupe des tiges de mil et confection des gerbes ou bottes (boko)',
      'Séchage au soleil et stockage dans le grenier familial (barma)',
      'Récolte du haricot niébé (dunguri) et partage de la dîme de solidarité',
      'Usage accru des moustiquaires (arcilla) près des plans d’eau résiduels'
    ],
    agriculturalCycleEn: [
      'Cutting millet stalks and tying harvest bundles (boko)',
      'Sun-drying and storing grain inside the family granary (barma)',
      'Harvesting cowpeas (dunguri) and sharing charitable portions',
      'Consistent use of mosquito nets (arcilla) near residual ponds'
    ],
    keyTerms: [
      {
        zarma: 'Barma',
        phonetic: '/bar.ma/',
        fr: 'Grenier traditionnel à céréales',
        en: 'Traditional grain storage granary',
        exampleZarma: 'Ay na hayni nda dunguri dan ay barma ra.',
        exampleFr: 'J’ai mis du mil et du haricot dans mon grenier.',
        exampleEn: 'I put millet and beans in the granary.'
      },
      {
        zarma: 'Boko',
        phonetic: '/bo.ko/',
        fr: 'Botte ou gerbe de tiges de mil',
        en: 'Bundle of millet or sorghum stalks',
        exampleZarma: 'Hayni boko iyye.',
        exampleFr: 'Sept bottes de mil.',
        exampleEn: 'Seven bundles of millet.'
      },
      {
        zarma: 'Arcilla',
        phonetic: '/ar.cil.la/',
        fr: 'Moustiquaire protectrice',
        en: 'Mosquito net for night protection',
        exampleZarma: 'Arcilla ga zankey daabu cino ra.',
        exampleFr: 'La moustiquaire protège les enfants la nuit.',
        exampleEn: 'The mosquito net covers the children at night.'
      }
    ]
  },
  {
    id: 'jaw',
    zarmaName: 'Jaw / Hargu',
    altZarmaName: 'Jawo / Hargo (Saison fraîche et sèche)',
    zarmaAjami: 'جَوْ / هَرْغُ',
    phonetic: '/dʒaw/ · /har.gu/',
    frenchTitle: 'Saison Fraîche & Sèche (Harmattan)',
    englishTitle: 'Cool & Dry Season (Harmattan)',
    monthsSpanFr: 'Novembre (Nuwamba) — Février (Faberu)',
    monthsSpanEn: 'November (Nuwamba) — February (Faberu)',
    startMonth: 11,
    endMonth: 2,
    climateStateCode: '● FRAÎCHEUR & HARMATTAN · 15°C–32°C',
    accentColor: '#0284C7',
    tempRangeC: '15°C – 32°C',
    humidityRange: '15% – 25%',
    windPatternFr: 'Vent frais et sec d’Harmattan soufflant du nord-est (Azawakambe)',
    windPatternEn: 'Cool, dry Harmattan wind blowing from the northeast (Azawakambe)',
    descriptionFr: 'Saison de fraîcheur matinale et nocturne. Les travaux des grands champs étant achevés, c’est le temps des jardins irrigués, de la construction en banco (botogo), du tissage (biyan), des mariages et de la lutte traditionnelle (arugurgay).',
    descriptionEn: 'Season of crisp mornings and cool nights. With rainfed farming complete, communities focus on irrigated gardens, adobe building (cina), weaving (biyan), weddings, and traditional wrestling (arugurgay).',
    agriculturalCycleFr: [
      'Construction et crépissage des maisons en terre de banco (cina nda botogo)',
      'Culture maraîchère des oignons (albasañ) et jardins de contre-saison',
      'Tissage de bandes de coton (biyan) et confection de pagnes (antama)',
      'Championnats de lutte traditionnelle (arugurgay) et cérémonies de mariage'
    ],
    agriculturalCycleEn: [
      'Building and plastering adobe mud houses (cina nda botogo)',
      'Irrigated cultivation of onions (albasañ) and dry-season gardens',
      'Weaving cotton strips (biyan) and traditional wrappers (antama)',
      'Traditional wrestling championships (arugurgay) and weddings'
    ],
    keyTerms: [
      {
        zarma: 'Cina',
        phonetic: '/tʃi.na/',
        fr: 'Bâtir, construire en banco',
        en: 'To build, construct with adobe',
        exampleZarma: 'Iri ga fu taji cina nda botogo.',
        exampleFr: 'Nous construisons une nouvelle demeure en banco.',
        exampleEn: 'We are building a new house with adobe.'
      },
      {
        zarma: 'Arugurgay',
        phonetic: '/a.ru.gur.gaj/',
        fr: 'Lutteurs de lutte traditionnelle nigérienne',
        en: 'Traditional Nigerien wrestlers',
        exampleZarma: 'Nizeer arugurgay ga gurgay kokari ra.',
        exampleFr: 'Les lutteurs du Niger luttent avec bravoure et endurance.',
        exampleEn: 'Nigerien wrestlers compete with valor and endurance.'
      },
      {
        zarma: 'Attayi',
        phonetic: '/at.taː.ji/',
        fr: 'Thé vert à la menthe préparé dans la théière (albarad)',
        en: 'Traditional mint green tea brewed in a teapot (albarad)',
        exampleZarma: 'Iri ga haŋ attayi cino ra nda coroyey.',
        exampleFr: 'Nous buvons du thé le soir avec les amis.',
        exampleEn: 'We drink tea in the evening with friends.'
      }
    ]
  }
];

export const ZARMA_TIME_PERIODS: ZarmaTimePeriod[] = [
  {
    id: 'alfazar',
    zarmaName: 'Alfazar / Susubay',
    altName: 'Subbaahi',
    zarmaAjami: 'أَلْفَزَرْ / سُبَّاهِ',
    phonetic: '/al.fa.zar/ · /su.bbaː.hi/',
    startHour: 5,
    endHour: 8.5,
    timeRangeLabel: '05:00 – 08:30',
    frenchName: 'Aube & Petit Matin',
    englishName: 'Dawn & Early Morning',
    solarStateFr: 'Lever du soleil et fraîcheur matinale',
    solarStateEn: 'Sunrise and morning coolness',
    prayerLinkFr: 'Prière de l’aube (Subha / Fajr)',
    prayerLinkEn: 'Dawn prayer (Fajr)',
    greetingZarma: 'Mate kani? / Ni kani baani?',
    greetingResponseZarma: 'Baani samay!',
    greetingFr: 'Comment s’est passée la nuit ? — Dans la paix parfaite !',
    greetingEn: 'How did you sleep? — In perfect peace!',
    dailyActivityFr: 'Prière de l’aube, prise du petit-déjeuner (alcirkaaray) ou de la bouillie chaude (bita), et départ matinal en voyage (biya) ou aux champs.',
    dailyActivityEn: 'Dawn prayer, taking the morning breakfast (alcirkaaray) or warm millet porridge (bita), and departing early (biya) for fields or travel.',
    exampleZarma: 'Iri ga alcirka subbaahi kulu jina ga koy goy.',
    exampleFr: 'Nous prenons le petit déjeuner chaque matin avant d’aller au travail.',
    exampleEn: 'We eat breakfast every morning before heading to work.'
  },
  {
    id: 'adduha',
    zarmaName: 'Adduha',
    zarmaAjami: 'أَدُّهَا',
    phonetic: '/ad.du.ha/',
    startHour: 8.5,
    endHour: 10.5,
    timeRangeLabel: '08:30 – 10:30',
    frenchName: 'Milieu de la Matinée',
    englishName: 'Mid-Morning',
    solarStateFr: 'Soleil montant et lumineux',
    solarStateEn: 'Rising bright morning sun',
    prayerLinkFr: 'Heure de la prière surérogatoire du Duha',
    prayerLinkEn: 'Time of the optional Duha morning prayer',
    greetingZarma: 'Ni nda subbaahi! / Mate subbaahi?',
    greetingResponseZarma: 'Baani samay, Alhamdulillahi.',
    greetingFr: 'Bonjour (matinée) ! Comment va la matinée ?',
    greetingEn: 'Good mid-morning! How is the morning going?',
    dailyActivityFr: 'Affluence maximale dans les marchés hebdomadaires (habu), commerce des céréales et activités scolaires (caw).',
    dailyActivityEn: 'Peak gathering at weekly markets (habu), grain trading, and school studies (caw).',
    exampleZarma: 'Bi adduha, ay koy habu.',
    exampleFr: 'Hier en milieu de matinée, j’étais parti au marché.',
    exampleEn: 'Yesterday mid-morning, I went to the market.'
  },
  {
    id: 'weete',
    zarmaName: 'Weete',
    zarmaAjami: 'وِيتِ',
    phonetic: '/weː.te/',
    startHour: 10.5,
    endHour: 12,
    timeRangeLabel: '10:30 – 12:00',
    frenchName: 'Fin de Matinée',
    englishName: 'Late Morning',
    solarStateFr: 'Soleil haut précédant le zénith',
    solarStateEn: 'High sun approaching zenith',
    prayerLinkFr: 'Avant le zénith solaire',
    prayerLinkEn: 'Pre-zenith period',
    greetingZarma: 'Ni nda weete! / Ni nda goy!',
    greetingResponseZarma: 'Iri nda baani.',
    greetingFr: 'Bonne fin de matinée ! Bon courage au travail !',
    greetingEn: 'Good late morning! Strength in your work!',
    dailyActivityFr: 'Poursuite des travaux artisanaux, puisage de l’eau et préparation du repas de midi dans la cour (batama).',
    dailyActivityEn: 'Continuing craft work, drawing water, and preparing the midday meal in the courtyard (batama).',
    exampleZarma: 'Weete ra zankey kulu ga tira caw lokkol ra.',
    exampleFr: 'En fin de matinée tous les enfants lisent à l’école.',
    exampleEn: 'In late morning all the children read at school.'
  },
  {
    id: 'zaari',
    zarmaName: 'Zaari / Zaari bindi',
    zarmaAjami: 'زَارِ بِنْدِ',
    phonetic: '/zaː.ri/',
    startHour: 12,
    endHour: 14,
    timeRangeLabel: '12:00 – 14:00',
    frenchName: 'Midi & Zénith Solaire',
    englishName: 'Noon & Solar Zenith',
    solarStateFr: 'Soleil au zénith (chaleur diurne)',
    solarStateEn: 'Sun at zenith (midday heat)',
    prayerLinkFr: 'Approche de la prière de la mi-journée',
    prayerLinkEn: 'Midday transition',
    greetingZarma: 'Ni nda zaari! / Mate zaari?',
    greetingResponseZarma: 'Zaari baani!',
    greetingFr: 'Bon midi ! Comment se passe la journée ?',
    greetingEn: 'Good midday! How is the day going?',
    dailyActivityFr: 'Repas familial du midi (ŋwa) et repos réparateur (fulanzam) à l’ombre des arbres (tuuri biya ra) pendant les heures chaudes.',
    dailyActivityEn: 'Midday family meal (ŋwa) and restful shade (fulanzam) beneath trees (tuuri biya ra) during peak heat.',
    exampleZarma: 'Ali farga, a go ga fulanzam tuuro bi cire zaari ra.',
    exampleFr: 'Ali est fatigué, il se repose sous l’ombre de l’arbre à midi.',
    exampleEn: 'Ali is weary, he is resting beneath the shade of the tree at noon.'
  },
  {
    id: 'aluula',
    zarmaName: 'Aluula',
    zarmaAjami: 'أَلُولَ',
    phonetic: '/a.luː.la/',
    startHour: 14,
    endHour: 16,
    timeRangeLabel: '14:00 – 16:00',
    frenchName: 'Début d’Après-Midi',
    englishName: 'Early Afternoon',
    solarStateFr: 'Soleil déclinant après le zénith',
    solarStateEn: 'Sun declining past zenith',
    prayerLinkFr: 'Première prière de l’après-midi (Dhuhr / Aluula)',
    prayerLinkEn: 'First afternoon prayer (Dhuhr / Aluula)',
    greetingZarma: 'Ni nda zaari! / Irikoy ma gaabi no.',
    greetingResponseZarma: 'Amina, iri nda baani.',
    greetingFr: 'Bon après-midi ! Que Dieu accorde la force.',
    greetingEn: 'Good afternoon! May God grant strength.',
    dailyActivityFr: 'Prière d’Aluula vers 14h00, reprise des échanges et concertations des anciens (albeerey) sur la place publique.',
    dailyActivityEn: 'Aluula prayer around 2:00 PM, resumption of trade and council discussions by elders (albeerey).',
    exampleZarma: 'Kwaara albeerey kulu ka marga do aluula banda.',
    exampleFr: 'Tous les anciens du village sont venus à la réunion après Aluula.',
    exampleEn: 'All the village elders came to the meeting after Aluula.'
  },
  {
    id: 'alaasar',
    zarmaName: 'Alaasar / Wiciri',
    altName: 'Wiciri kambu',
    zarmaAjami: 'أَلَاصَرْ / وِتشِرِ',
    phonetic: '/a.laː.sar/ · /wi.tʃi.ri/',
    startHour: 16,
    endHour: 18.25,
    timeRangeLabel: '16:00 – 18:15',
    frenchName: 'Fin d’Après-Midi',
    englishName: 'Late Afternoon',
    solarStateFr: 'Lumière dorée et adoucissement de la température',
    solarStateEn: 'Golden light and softening temperatures',
    prayerLinkFr: 'Prière de l’après-midi (Asr / Alaasar vers 16h00)',
    prayerLinkEn: 'Late afternoon prayer (Asr / Alaasar around 4:00 PM)',
    greetingZarma: 'Ni nda wiciri! / Mate wiciri?',
    greetingResponseZarma: 'Baani samay!',
    greetingFr: 'Bonne fin d’après-midi !',
    greetingEn: 'Good late afternoon!',
    dailyActivityFr: 'Visites de courtoisie entre voisins, retour des troupeaux du pâturage et jeux de ballon (baalu) des jeunes.',
    dailyActivityEn: 'Courtesy visits among neighbors, return of herds from pasture, and youth football games (baalu).',
    exampleZarma: 'Ay ga ka ni kwaara alaasar.',
    exampleFr: 'Je viendrai chez toi en fin d’après-midi (à l’heure d’Alaasar).',
    exampleEn: 'I will come to your house in the late afternoon.'
  },
  {
    id: 'fitiri',
    zarmaName: 'Fitiri / Hiire',
    altName: 'Almaari kambu',
    zarmaAjami: 'فِتِرِ / هِيرِ',
    phonetic: '/fi.ti.ri/ · /hiː.re/',
    startHour: 18.25,
    endHour: 20,
    timeRangeLabel: '18:15 – 20:00',
    frenchName: 'Crépuscule & Coucher du Soleil',
    englishName: 'Dusk & Sunset',
    solarStateFr: 'Coucher du soleil à l’horizon ouest',
    solarStateEn: 'Sunset on the western horizon',
    prayerLinkFr: 'Prière du coucher du soleil (Maghrib / Fitiri)',
    prayerLinkEn: 'Sunset prayer (Maghrib / Fitiri)',
    greetingZarma: 'Ni nda hiire! / Irikoy ma cino wo te baani.',
    greetingResponseZarma: 'Amina!',
    greetingFr: 'Bonsoir ! Que Dieu fasse de cette soirée une paix.',
    greetingEn: 'Good evening! May God make this evening peaceful.',
    dailyActivityFr: 'Rupture du jeûne pendant le mois de Mehau, retour au foyer familial et allumage du feu de cuisine (bundu danji).',
    dailyActivityEn: 'Breaking the fast during Mehau, returning home, and lighting the evening cooking fire (bundu danji).',
    exampleZarma: 'Iri na bundu kogo sambu ga danji diindi hiire ra.',
    exampleFr: 'Nous avons ramassé du bois sec pour allumer le feu au crépuscule.',
    exampleEn: 'We gathered dry wood to kindle the fire at dusk.'
  },
  {
    id: 'almaari',
    zarmaName: 'Almaari / Ciini',
    altName: 'Ciini bindi (Minuit)',
    zarmaAjami: 'أَلْمَارِ / تشِينِ',
    phonetic: '/al.maː.ri/ · /tʃiː.ni/',
    startHour: 20,
    endHour: 24,
    timeRangeLabel: '20:00 – 05:00',
    frenchName: 'Soirée & Nuit Étoilée',
    englishName: 'Nightfall & Starlit Night',
    solarStateFr: 'Nuit sahélienne, clarté lunaire (handu) et lucioles (bargalu)',
    solarStateEn: 'Sahelian night, moonlight (handu), and fireflies (bargalu)',
    prayerLinkFr: 'Dernière prière de la nuit (Isha / Almaari vers 20h00)',
    prayerLinkEn: 'Night prayer (Isha / Almaari around 8:00 PM)',
    greetingZarma: 'Iri ma kani baani! / Suba hồn!',
    greetingResponseZarma: 'Amina, Irikoy ma iri kaandi baani!',
    greetingFr: 'Dormons en paix ! À demain ! — Que Dieu nous réveille en paix !',
    greetingEn: 'Let us sleep in peace! Until tomorrow! — May God wake us in peace!',
    dailyActivityFr: 'Préparation du thé vert dans la théière (albarad) avec les amis, écoute des nouvelles (albahaaru) et contes sous les étoiles.',
    dailyActivityEn: 'Brewing green mint tea in the teapot (albarad) with friends, listening to the news (albahaaru), and storytelling.',
    exampleZarma: 'Iri ga haŋ attayi cino ra nda coroyey.',
    exampleFr: 'Nous buvons du thé le soir avec les amis.',
    exampleEn: 'We drink tea in the evening with friends.'
  }
];

export const ZARMA_NUMBERS_DAYS: { num: number; zarma: string; phonetic: string }[] = [
  { num: 1, zarma: 'Afo / Fo', phonetic: '/a.fo/' },
  { num: 2, zarma: 'Ihinka / Hinka', phonetic: '/i.hin.ka/' },
  { num: 3, zarma: 'Ihinza / Hinza', phonetic: '/i.hin.za/' },
  { num: 4, zarma: 'Itaaci / Taaci', phonetic: '/i.taː.tʃi/' },
  { num: 5, zarma: 'Igu / Gu', phonetic: '/i.gu/' },
  { num: 6, zarma: 'Iddu', phonetic: '/id.du/' },
  { num: 7, zarma: 'Iyye', phonetic: '/ij.je/' },
  { num: 8, zarma: 'Ahakku / Hakku', phonetic: '/a.hak.ku/' },
  { num: 9, zarma: 'Yagga', phonetic: '/jag.ga/' },
  { num: 10, zarma: 'Way', phonetic: '/waj/' },
  { num: 11, zarma: 'Way cindi fo', phonetic: '/waj tʃin.di fo/' },
  { num: 12, zarma: 'Way cindi hinka', phonetic: '/waj tʃin.di hin.ka/' },
  { num: 13, zarma: 'Way cindi hinza', phonetic: '/waj tʃin.di hin.za/' },
  { num: 14, zarma: 'Way cindi taaci', phonetic: '/waj tʃin.di taː.tʃi/' },
  { num: 15, zarma: 'Way cindi gu (Handu kwaaray)', phonetic: '/waj tʃin.di gu/' },
  { num: 16, zarma: 'Way cindi iddu', phonetic: '/waj tʃin.di id.du/' },
  { num: 17, zarma: 'Way cindi iyye', phonetic: '/waj tʃin.di ij.je/' },
  { num: 18, zarma: 'Way cindi ahakku', phonetic: '/waj tʃin.di a.hak.ku/' },
  { num: 19, zarma: 'Way cindi yagga', phonetic: '/waj tʃin.di jag.ga/' },
  { num: 20, zarma: 'Waranka', phonetic: '/wa.ran.ka/' },
  { num: 21, zarma: 'Waranka cindi fo', phonetic: '/wa.ran.ka tʃin.di fo/' },
  { num: 22, zarma: 'Waranka cindi hinka', phonetic: '/wa.ran.ka tʃin.di hin.ka/' },
  { num: 23, zarma: 'Waranka cindi hinza', phonetic: '/wa.ran.ka tʃin.di hin.za/' },
  { num: 24, zarma: 'Waranka cindi taaci', phonetic: '/wa.ran.ka tʃin.di taː.tʃi/' },
  { num: 25, zarma: 'Waranka cindi gu', phonetic: '/wa.ran.ka tʃin.di gu/' },
  { num: 26, zarma: 'Waranka cindi iddu', phonetic: '/wa.ran.ka tʃin.di id.du/' },
  { num: 27, zarma: 'Waranka cindi iyye', phonetic: '/wa.ran.ka tʃin.di ij.je/' },
  { num: 28, zarma: 'Waranka cindi ahakku', phonetic: '/wa.ran.ka tʃin.di a.hak.ku/' },
  { num: 29, zarma: 'Waranka cindi yagga', phonetic: '/wa.ran.ka tʃin.di jag.ga/' },
  { num: 30, zarma: 'Waranza', phonetic: '/wa.ran.za/' },
  { num: 31, zarma: 'Waranza cindi fo', phonetic: '/wa.ran.za tʃin.di fo/' }
];

export const ZARMA_RELATIVE_TIME_EXPRESSIONS = [
  {
    zarma: 'Hunkuna',
    phonetic: '/hun.ku.na/',
    fr: 'Aujourd’hui (le jour présent)',
    en: 'Today (the present day)',
    exampleZarma: 'Hunkuna beena hirri.',
    exampleFr: 'Aujourd’hui le ciel est nuageux.',
    exampleEn: 'Today the sky is cloudy.'
  },
  {
    zarma: 'Bi',
    phonetic: '/biː/',
    fr: 'Hier (le jour passé)',
    en: 'Yesterday',
    exampleZarma: 'Bi adduha, ay koy habu.',
    exampleFr: 'Hier matin, j’étais parti au marché.',
    exampleEn: 'Yesterday morning, I went to the market.'
  },
  {
    zarma: 'Bi fo',
    phonetic: '/biː fo/',
    fr: 'Avant-hier (deux jours en arrière)',
    en: 'Day before yesterday',
    exampleZarma: 'Bi fo iri koy Kirtachi.',
    exampleFr: 'Avant-hier, nous sommes allés à Kirtachi.',
    exampleEn: 'The day before yesterday we went to Kirtachi.'
  },
  {
    zarma: 'Suba',
    phonetic: '/su.ba/',
    fr: 'Demain (le jour qui vient)',
    en: 'Tomorrow',
    exampleZarma: 'Suba, iri ga koy ga di gaani beefe.',
    exampleFr: 'Demain, nous irons voir un concours de danse.',
    exampleEn: 'Tomorrow we are going to see the dance tournament.'
  },
  {
    zarma: 'Suba si',
    phonetic: '/su.ba si/',
    fr: 'Après-demain (dans deux jours)',
    en: 'Day after tomorrow',
    exampleZarma: 'Suba si no iri ga koy Dooso.',
    exampleFr: 'C’est après-demain que nous irons à Dosso.',
    exampleEn: 'The day after tomorrow we will go to Dosso.'
  },
  {
    zarma: 'Jirbi',
    phonetic: '/dʒir.bi/',
    fr: 'Jour compté (littéralement : sommeil / nuitée)',
    en: 'Counted day (literally: sleep / night)',
    exampleZarma: 'A te jirbi iyye Nyamey ra.',
    exampleFr: 'Il a passé sept jours à Niamey.',
    exampleEn: 'He spent seven days in Niamey.'
  },
  {
    zarma: 'Habu',
    phonetic: '/ha.bu/',
    fr: 'Semaine de 7 jours (et cycle du marché hebdomadaire)',
    en: 'Seven-day week (and weekly market cycle)',
    exampleZarma: 'Habu kulu gonda jirbi iyye.',
    exampleFr: 'Chaque semaine compte sept jours.',
    exampleEn: 'Every week has seven days.'
  },
  {
    zarma: 'Handu',
    phonetic: '/han.du/',
    fr: 'Mois / Lune',
    en: 'Month / Moon',
    exampleZarma: 'Jiiri fo gonda handu way cindi hinka.',
    exampleFr: 'Une année compte douze mois.',
    exampleEn: 'One year has twelve months.'
  },
  {
    zarma: 'Jiiri',
    phonetic: '/dʒiː.ri/',
    fr: 'Année (cycle des 4 saisons)',
    en: 'Year (cycle of the 4 seasons)',
    exampleZarma: 'Jiiri kulu gonda waati taaci.',
    exampleFr: 'Chaque année comporte quatre saisons.',
    exampleEn: 'Every year has four seasons.'
  }
];
