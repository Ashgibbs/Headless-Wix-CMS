import * as Astronomy from 'astronomy-engine';

// Tithi names in Tamil
const TITHIS = [
  'பிரதமை', 'துவிதியை', 'திருதியை', 'சதுர்த்தி', 'பஞ்சமி',
  'சஷ்டி', 'சப்தமி', 'அஷ்டமி', 'நவமி', 'தசமி',
  'ஏகாதசி', 'துவாதசி', 'திரயோதசி', 'சதுர்தசி', 'பௌர்ணமி',
  'பிரதமை', 'துவிதியை', 'திருதியை', 'சதுர்த்தி', 'பஞ்சமி',
  'சஷ்டி', 'சப்தமி', 'அஷ்டமி', 'நவமி', 'தசமி',
  'ஏகாதசி', 'துவாதசி', 'திரயோதசி', 'சதுர்தசி', 'அமாவாசை'
];

// Tithi English transliteration for display
const TITHIS_ENGLISH = [
  'Prathama', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashti', 'Saptami', 'Ashtami', 'Navami', 'Dasami',
  'Ekadasi', 'Dwadasi', 'Trayodasi', 'Chaturdasi', 'Pournami',
  'Prathama', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashti', 'Saptami', 'Ashtami', 'Navami', 'Dasami',
  'Ekadasi', 'Dwadasi', 'Trayodasi', 'Chaturdasi', 'Amavasai'
];

// Nakshatra names in Tamil
const NAKSHATRAS = [
  'அசுவினி', 'பரணி', 'கார்த்திகை', 'ரோகிணி', 'மிருகசீரிடம்',
  'திருவாதிரை', 'புனர்பூசம்', 'பூசம்', 'ஆயில்யம்', 'மகம்',
  'பூரம்', 'உத்திரம்', 'அஸ்தம்', 'சித்திரை', 'சுவாதி',
  'விசாகம்', 'அனுஷம்', 'கேட்டை', 'மூலம்', 'பூராடம்',
  'உத்திராடம்', 'திருவோணம்', 'அவிட்டம்', 'சதயம்', 'பூரட்டாதி',
  'உத்திரட்டாதி', 'ரேவதி'
];

// Nakshatra English transliteration
const NAKSHATRAS_ENGLISH = [
  'Ashwini', 'Bharani', 'Karthigai', 'Rohini', 'Mrigasheersham',
  'Thiruvathirai', 'Punarpusam', 'Poosam', 'Ayilyam', 'Magam',
  'Pooram', 'Uthiram', 'Hastham', 'Chithirai', 'Swathi',
  'Visakam', 'Anusham', 'Kettai', 'Moolam', 'Pooradam',
  'Uthiradam', 'Thiruvonam', 'Avittam', 'Sathayam', 'Poorattathi',
  'Uthirattathi', 'Revathi'
];

// Yoga names in Tamil
const YOGAS = [
  'விஷ்கம்பம்', 'ப்ரீதி', 'ஆயுஷ்மான்', 'சௌபாக்யம்', 'சோபனம்',
  'அதிகண்டம்', 'சுகர்மா', 'த்ருதி', 'சூலம்', 'கண்டம்',
  'விருத்தி', 'த்ருவம்', 'வியாகாதம்', 'ஹர்ஷணம்', 'வஜ்ரம்',
  'சித்தி', 'வ்யதீபாதம்', 'வரீயான்', 'பரிகம்', 'சிவம்',
  'சித்தம்', 'சாத்தியம்', 'சுபம்', 'சுக்லம்', 'ப்ரம்மம்',
  'இந்திரம்', 'வைத்ருதி'
];

// Yoga English transliteration
const YOGAS_ENGLISH = [
  'Vishkambam', 'Preethi', 'Ayushman', 'Sowbhagyam', 'Shobanam',
  'Athighandam', 'Sukarma', 'Dhrithi', 'Soolam', 'Gandam',
  'Viruthi', 'Dhruvam', 'Vyagatham', 'Harshanam', 'Vajram',
  'Siddhi', 'Vyatheepatham', 'Vareeyan', 'Parigam', 'Sivam',
  'Siddham', 'Sadhyam', 'Subam', 'Suklam', 'Brahmam',
  'Indram', 'Vaidhrithi'
];

// Karana names in Tamil
const KARANAS = [
  'பவம்', 'பாலவம்', 'கௌலவம்', 'தைதுலம்', 'கரம்',
  'வணிஜம்', 'விஷ்டி', 'சகுனி', 'சதுஷ்பாதம்', 'நாகம்', 'கிம்ஸ்துக்னம்'
];

// Karana English transliteration
const KARANAS_ENGLISH = [
  'Bavam', 'Balavam', 'Kaulavam', 'Thaitulam', 'Garam',
  'Vanijam', 'Vishti', 'Sakuni', 'Chatushpadam', 'Nagam', 'Kimsthughnam'
];

// Paksha (lunar fortnight) in Tamil
const PAKSHAS = ['சுக்ல பட்சம்', 'கிருஷ்ண பட்சம்'];
const PAKSHAS_ENGLISH = ['Sukla Paksham', 'Krishna Paksham'];

// Weekday names in Tamil (Kizhamai)
const VARAS = [
  'ஞாயிற்றுக்கிழமை', 'திங்கட்கிழமை', 'செவ்வாய்க்கிழமை', 
  'புதன்கிழமை', 'வியாழக்கிழமை', 'வெள்ளிக்கிழமை', 'சனிக்கிழமை'
];
const VARAS_ENGLISH = [
  'Nyayiru', 'Thingal', 'Sevvai', 
  'Budhan', 'Viyazhan', 'Velli', 'Sani'
];

// Tamil months (Solar calendar - used in Tamil Nadu)
const TAMIL_MONTHS = [
  'சித்திரை', 'வைகாசி', 'ஆனி', 'ஆடி', 'ஆவணி', 'புரட்டாசி',
  'ஐப்பசி', 'கார்த்திகை', 'மார்கழி', 'தை', 'மாசி', 'பங்குனி'
];
const TAMIL_MONTHS_ENGLISH = [
  'Chithirai', 'Vaikasi', 'Aani', 'Aadi', 'Aavani', 'Purattasi',
  'Aippasi', 'Karthigai', 'Margazhi', 'Thai', 'Maasi', 'Panguni'
];

// Tamil 60-year cycle (Prabhava cycle)
const TAMIL_YEARS = [
  'பிரபவ', 'விபவ', 'சுக்ல', 'பிரமோதூத', 'பிரசோற்பத்தி',
  'ஆங்கீரச', 'ஸ்ரீமுக', 'பவ', 'யுவ', 'தாது',
  'ஈஸ்வர', 'வெகுதான்ய', 'பிரமாதி', 'விக்கிரம', 'விஷு',
  'சித்திரபானு', 'சுபானு', 'தாரண', 'பார்த்திப', 'விய',
  'சர்வசித்து', 'சர்வதாரி', 'விரோதி', 'விக்ருதி', 'கர',
  'நந்தன', 'விஜய', 'ஜய', 'மன்மத', 'துர்முகி',
  'ஹேவிளம்பி', 'விளம்பி', 'விகாரி', 'சார்வரி', 'பிலவ',
  'சுபகிருது', 'சோபகிருது', 'குரோதி', 'விசுவாவசு', 'பராபவ',
  'பிலவங்க', 'கீலக', 'சௌமிய', 'சாதாரண', 'விரோதகிருது',
  'பரிதாபி', 'பிரமாதீச', 'ஆனந்த', 'ராட்சச', 'நள',
  'பிங்கள', 'காளயுக்தி', 'சித்தார்த்தி', 'ரௌத்திரி', 'துன்மதி',
  'துந்துபி', 'ருத்ரோத்காரி', 'ரக்தாட்சி', 'குரோதன', 'அட்சய'
];
const TAMIL_YEARS_ENGLISH = [
  'Prabhava', 'Vibhava', 'Shukla', 'Pramoduta', 'Prajotpatti',
  'Angirasa', 'Srimukha', 'Bhava', 'Yuva', 'Dhatu',
  'Eeshvara', 'Vehudhanya', 'Pramathi', 'Vikrama', 'Vishu',
  'Chitrabhanu', 'Subhanu', 'Dharana', 'Parthiba', 'Viya',
  'Sarvajittu', 'Sarvadhari', 'Virodhi', 'Vikrithi', 'Kara',
  'Nandana', 'Vijaya', 'Jaya', 'Manmatha', 'Durmukhi',
  'Hevilambi', 'Vilambi', 'Vikari', 'Sharvari', 'Plava',
  'Shubhakrithu', 'Shobhakrithu', 'Krodhi', 'Vishvavasu', 'Parabhava',
  'Plavanga', 'Keelaka', 'Sowmya', 'Sadharana', 'Virodhikrithu',
  'Paridhaabi', 'Pramadicha', 'Ananda', 'Rakshasa', 'Nala',
  'Pingala', 'Kalayukthi', 'Siddharthi', 'Raudri', 'Durmathi',
  'Dundhubhi', 'Rudhrodgari', 'Raktakshi', 'Krodhana', 'Akshaya'
];

// North Indian (Hindi) Panchangam data
const TITHIS_HINDI = [
  'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी',
  'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
  'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा',
  'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी',
  'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
  'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'अमावस्या'
];

const NAKSHATRAS_HINDI = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा',
  'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा',
  'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी', 'हस्त', 'चित्रा', 'स्वाति',
  'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्वाषाढ़ा',
  'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वा भाद्रपद',
  'उत्तरा भाद्रपद', 'रेवती'
];

const YOGAS_HINDI = [
  'विष्कम्भ', 'प्रीति', 'आयुष्मान', 'सौभाग्य', 'शोभन',
  'अतिगण्ड', 'सुकर्मा', 'धृति', 'शूल', 'गण्ड',
  'वृद्धि', 'ध्रुव', 'व्याघात', 'हर्षण', 'वज्र',
  'सिद्धि', 'व्यतीपात', 'वरीयान', 'परिघ', 'शिव',
  'सिद्ध', 'साध्य', 'शुभ', 'शुक्ल', 'ब्रह्म',
  'इन्द्र', 'वैधृति'
];

const KARANAS_HINDI = [
  'बव', 'बालव', 'कौलव', 'तैतिल', 'गर',
  'वणिज', 'विष्टि', 'शकुनि', 'चतुष्पद', 'नाग', 'किंस्तुघ्न'
];

const PAKSHAS_HINDI = ['शुक्ल पक्ष', 'कृष्ण पक्ष'];

const VARAS_HINDI = [
  'रविवार', 'सोमवार', 'मंगलवार',
  'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'
];

// North Indian lunar months (Purnimant system)
const NORTH_INDIAN_MONTHS = [
  'चैत्र', 'वैशाख', 'ज्येष्ठ', 'आषाढ़', 'श्रावण', 'भाद्रपद',
  'आश्विन', 'कार्तिक', 'मार्गशीर्ष', 'पौष', 'माघ', 'फाल्गुन'
];
const NORTH_INDIAN_MONTHS_ENGLISH = [
  'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada',
  'Ashwin', 'Kartik', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
];

export interface PanchangData {
  date: Date;
  tithi: string;
  tithiTamil: string;
  tithiNumber: number;
  nakshatra: string;
  nakshatraTamil: string;
  nakshatraNumber: number;
  yoga: string;
  yogaTamil: string;
  karana: string;
  karanaTamil: string;
  paksha: string;
  pakshaTamil: string;
  vara: string;
  varaTamil: string;
  tamilMonth: string;
  tamilMonthTamil: string;
  tamilYear: string;
  tamilYearTamil: string;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  moonPhaseTamil: string;
  moonIllumination: number;
  rahu_kaal: string;
  yamagandam: string;
  gulika_kaal: string;
  auspicious: boolean;
  specialDay: string | null;
  specialDayTamil: string | null;
}

export interface NorthIndianPanchangData {
  date: Date;
  tithi: string;
  tithiHindi: string;
  tithiNumber: number;
  nakshatra: string;
  nakshatraHindi: string;
  nakshatraNumber: number;
  yoga: string;
  yogaHindi: string;
  karana: string;
  karanaHindi: string;
  paksha: string;
  pakshaHindi: string;
  vara: string;
  varaHindi: string;
  month: string;
  monthHindi: string;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  moonPhaseHindi: string;
  moonIllumination: number;
  rahu_kaal: string;
  vikramSamvat: number;
  auspicious: boolean;
  specialDay: string | null;
  specialDayHindi: string | null;
}

// Get moon longitude in degrees (Spherical uses 'lon')
function getMoonLongitude(date: Date): number {
  const moonPos = Astronomy.EclipticGeoMoon(date);
  return moonPos.lon;
}

// Get sun longitude in degrees (EclipticCoordinates uses 'elon')
function getSunLongitude(date: Date): number {
  const sunPos = Astronomy.SunPosition(date);
  return sunPos.elon;
}

// Calculate Tithi (lunar day)
function calculateTithi(date: Date): { tithi: string; tithiTamil: string; number: number; paksha: string; pakshaTamil: string } {
  const moonLong = getMoonLongitude(date);
  const sunLong = getSunLongitude(date);
  
  let diff = moonLong - sunLong;
  if (diff < 0) diff += 360;
  
  const tithiNumber = Math.floor(diff / 12) + 1;
  const pakshaIndex = tithiNumber <= 15 ? 0 : 1;
  
  return {
    tithi: TITHIS_ENGLISH[(tithiNumber - 1) % 30] || TITHIS_ENGLISH[0],
    tithiTamil: TITHIS[(tithiNumber - 1) % 30] || TITHIS[0],
    number: tithiNumber,
    paksha: PAKSHAS_ENGLISH[pakshaIndex],
    pakshaTamil: PAKSHAS[pakshaIndex]
  };
}

// Calculate Nakshatra
function calculateNakshatra(date: Date): { nakshatra: string; nakshatraTamil: string; number: number } {
  const moonLong = getMoonLongitude(date);
  const nakshatraNumber = Math.floor(moonLong / (360 / 27)) + 1;
  const index = (nakshatraNumber - 1) % 27;
  
  return {
    nakshatra: NAKSHATRAS_ENGLISH[index],
    nakshatraTamil: NAKSHATRAS[index],
    number: nakshatraNumber
  };
}

// Calculate Yoga
function calculateYoga(date: Date): { yoga: string; yogaTamil: string } {
  const moonLong = getMoonLongitude(date);
  const sunLong = getSunLongitude(date);
  
  let sum = moonLong + sunLong;
  if (sum >= 360) sum -= 360;
  
  const yogaNumber = Math.floor(sum / (360 / 27)) + 1;
  const index = (yogaNumber - 1) % 27;
  
  return {
    yoga: YOGAS_ENGLISH[index],
    yogaTamil: YOGAS[index]
  };
}

// Calculate Karana
function calculateKarana(date: Date): { karana: string; karanaTamil: string } {
  const moonLong = getMoonLongitude(date);
  const sunLong = getSunLongitude(date);
  
  let diff = moonLong - sunLong;
  if (diff < 0) diff += 360;
  
  const karanaNumber = Math.floor(diff / 6) % 11;
  
  return {
    karana: KARANAS_ENGLISH[karanaNumber],
    karanaTamil: KARANAS[karanaNumber]
  };
}

// Get Tamil month based on sun position (Solar calendar)
function getTamilMonth(date: Date): { month: string; monthTamil: string } {
  const sunLong = getSunLongitude(date);
  // Tamil solar months start from Chithirai (mid-April)
  // Aries (0°) corresponds to Chithirai
  const monthIndex = Math.floor(sunLong / 30);
  
  return {
    month: TAMIL_MONTHS_ENGLISH[monthIndex % 12],
    monthTamil: TAMIL_MONTHS[monthIndex % 12]
  };
}

// Calculate sunrise and sunset for Tamil Nadu (default: Chennai)
function calculateSunTimes(date: Date, lat: number, lon: number): { sunrise: string; sunset: string } {
  const observer = new Astronomy.Observer(lat, lon, 0);
  
  try {
    const sunriseTime = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, date, 1);
    const sunsetTime = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, date, 1);
    
    const formatTime = (d: Date | null): string => {
      if (!d) return '--:--';
      return d.toLocaleTimeString('ta-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    };
    
    return {
      sunrise: formatTime(sunriseTime?.date || null),
      sunset: formatTime(sunsetTime?.date || null)
    };
  } catch {
    return { sunrise: '06:00 AM', sunset: '06:30 PM' };
  }
}

// Calculate Rahu Kaal (important in Tamil culture)
function calculateRahuKaal(date: Date, sunrise: string, sunset: string): string {
  const day = date.getDay();
  // Rahu Kaal order for each day (Sunday to Saturday)
  // Sun=8th, Mon=2nd, Tue=7th, Wed=5th, Thu=6th, Fri=4th, Sat=3rd
  const rahuKaalOrder = [8, 2, 7, 5, 6, 4, 3];
  const slot = rahuKaalOrder[day];
  
  // Each slot is 1.5 hours from sunrise
  const startHour = 6 + (slot - 1) * 1.5;
  const endHour = startHour + 1.5;
  
  const formatHour = (h: number): string => {
    const hour = Math.floor(h);
    const min = Math.round((h - hour) * 60);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${min.toString().padStart(2, '0')} ${period}`;
  };
  
  return `${formatHour(startHour)} - ${formatHour(endHour)}`;
}

// Calculate Yamagandam (important in Tamil astrology)
function calculateYamagandam(date: Date): string {
  const day = date.getDay();
  // Yamagandam order for each day
  const yamagandamOrder = [5, 4, 3, 2, 1, 7, 6];
  const slot = yamagandamOrder[day];
  
  const startHour = 6 + (slot - 1) * 1.5;
  const endHour = startHour + 1.5;
  
  const formatHour = (h: number): string => {
    const hour = Math.floor(h);
    const min = Math.round((h - hour) * 60);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${min.toString().padStart(2, '0')} ${period}`;
  };
  
  return `${formatHour(startHour)} - ${formatHour(endHour)}`;
}

// Calculate Gulika Kaal
function calculateGulikaKaal(date: Date): string {
  const day = date.getDay();
  const gulikaOrder = [7, 6, 5, 4, 3, 2, 1];
  const slot = gulikaOrder[day];
  
  const startHour = 6 + (slot - 1) * 1.5;
  const endHour = startHour + 1.5;
  
  const formatHour = (h: number): string => {
    const hour = Math.floor(h);
    const min = Math.round((h - hour) * 60);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${min.toString().padStart(2, '0')} ${period}`;
  };
  
  return `${formatHour(startHour)} - ${formatHour(endHour)}`;
}

// Check for Tamil special days and festivals
function getSpecialDay(tithi: string, paksha: string, nakshatra: string, tamilMonth: string, dayOfWeek: number): { english: string | null; tamil: string | null } {
  // Pournami (Full Moon)
  if (tithi === 'Pournami') {
    return { english: 'Pournami (Full Moon)', tamil: 'பௌர்ணமி' };
  }
  
  // Amavasai (New Moon)
  if (tithi === 'Amavasai') {
    return { english: 'Amavasai (New Moon)', tamil: 'அமாவாசை' };
  }
  
  // Pradosham (13th lunar day - important in Tamil Shaivism)
  if (tithi === 'Trayodasi') {
    return { english: 'Pradosham', tamil: 'பிரதோஷம்' };
  }
  
  // Ekadasi (11th lunar day - fasting day)
  if (tithi === 'Ekadasi') {
    return { english: 'Ekadasi Viratham', tamil: 'ஏகாதசி விரதம்' };
  }
  
  // Chaturthi (4th lunar day - Vinayagar)
  if (tithi === 'Chaturthi') {
    return { english: 'Sankatahara Chaturthi', tamil: 'சங்கடஹர சதுர்த்தி' };
  }
  
  // Ashtami (8th lunar day)
  if (tithi === 'Ashtami' && paksha === 'Krishna Paksham') {
    return { english: 'Krishna Ashtami', tamil: 'கிருஷ்ண அஷ்டமி' };
  }
  
  // Karthigai Nakshatra
  if (nakshatra === 'Karthigai') {
    return { english: 'Karthigai Nakshatram', tamil: 'கார்த்திகை நட்சத்திரம்' };
  }
  
  // Thiruvonam Nakshatra
  if (nakshatra === 'Thiruvonam') {
    return { english: 'Thiruvonam Nakshatram', tamil: 'திருவோண நட்சத்திரம்' };
  }
  
  // Poosam Nakshatra - very auspicious
  if (nakshatra === 'Poosam') {
    return { english: 'Poosam Nakshatram - Auspicious', tamil: 'பூசம் நட்சத்திரம் - சுபம்' };
  }
  
  // Friday with Pournami
  if (dayOfWeek === 5 && tithi === 'Pournami') {
    return { english: 'Lakshmi Pournami', tamil: 'லட்சுமி பௌர்ணமி' };
  }
  
  // Tuesday with Chaturthi
  if (dayOfWeek === 2 && tithi === 'Chaturthi') {
    return { english: 'Angaaraka Chaturthi', tamil: 'அங்காரக சதுர்த்தி' };
  }
  
  return { english: null, tamil: null };
}

// Check if day is auspicious (Tamil tradition)
function isAuspicious(tithi: string, nakshatra: string, yoga: string): boolean {
  const auspiciousTithis = ['Dvitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dasami', 'Ekadasi', 'Trayodasi', 'Pournami'];
  const auspiciousNakshatras = ['Ashwini', 'Rohini', 'Mrigasheersham', 'Poosam', 'Hastham', 'Chithirai', 'Swathi', 'Anusham', 'Thiruvonam', 'Avittam', 'Revathi'];
  const auspiciousYogas = ['Preethi', 'Ayushman', 'Sowbhagyam', 'Shobanam', 'Sukarma', 'Dhrithi', 'Harshanam', 'Siddhi', 'Sivam', 'Siddham', 'Sadhyam', 'Subam', 'Suklam', 'Brahmam'];
  
  return auspiciousTithis.includes(tithi) && auspiciousNakshatras.includes(nakshatra) && auspiciousYogas.includes(yoga);
}

function getMoonPhaseName(phaseAngle: number): { english: string; tamil: string } {
  if (phaseAngle < 22.5) return { english: 'New Moon', tamil: 'அமாவாசை' };
  if (phaseAngle < 67.5) return { english: 'Waxing Crescent', tamil: 'வளர்பிறை' };
  if (phaseAngle < 112.5) return { english: 'First Quarter', tamil: 'முதல் காலாண்டு' };
  if (phaseAngle < 157.5) return { english: 'Waxing Gibbous', tamil: 'வளர்பிறை பெருநிலா' };
  if (phaseAngle < 202.5) return { english: 'Full Moon', tamil: 'பௌர்ணமி' };
  if (phaseAngle < 247.5) return { english: 'Waning Gibbous', tamil: 'தேய்பிறை பெருநிலா' };
  if (phaseAngle < 292.5) return { english: 'Last Quarter', tamil: 'கடைசி காலாண்டு' };
  if (phaseAngle < 337.5) return { english: 'Waning Crescent', tamil: 'தேய்பிறை' };
  return { english: 'New Moon', tamil: 'அமாவாசை' };
}

// Get Tamil year name from 60-year cycle
function getTamilYear(date: Date): { year: string; yearTamil: string } {
  // The Tamil 60-year cycle: year 2000 was "Prabhava" (index 0 of a reference cycle)
  // Adjust: 2024-25 is "Krodhana" (index 58). So offset from 2000: (year - 2000 + 36) % 60
  const year = date.getFullYear();
  const index = ((year - 2000 + 36) % 60 + 60) % 60;
  return {
    year: TAMIL_YEARS_ENGLISH[index],
    yearTamil: TAMIL_YEARS[index]
  };
}

// Main function to get Panchang data (default location: Chennai, Tamil Nadu)
export function getPanchang(date: Date = new Date(), lat: number = 13.0827, lon: number = 80.2707): PanchangData {
  const tithiData = calculateTithi(date);
  const nakshatraData = calculateNakshatra(date);
  const yogaData = calculateYoga(date);
  const karanaData = calculateKarana(date);
  const tamilMonthData = getTamilMonth(date);
  const tamilYearData = getTamilYear(date);
  const sunTimes = calculateSunTimes(date, lat, lon);
  const rahuKaal = calculateRahuKaal(date, sunTimes.sunrise, sunTimes.sunset);
  const yamagandam = calculateYamagandam(date);
  const gulikaKaal = calculateGulikaKaal(date);
  
  const moonIllum = Astronomy.Illumination(Astronomy.Body.Moon, date);
  const moonPhaseData = getMoonPhaseName(moonIllum.phase_angle);
  
  const dayOfWeek = date.getDay();
  const specialDayData = getSpecialDay(tithiData.tithi, tithiData.paksha, nakshatraData.nakshatra, tamilMonthData.month, dayOfWeek);
  
  return {
    date,
    tithi: tithiData.tithi,
    tithiTamil: tithiData.tithiTamil,
    tithiNumber: tithiData.number,
    nakshatra: nakshatraData.nakshatra,
    nakshatraTamil: nakshatraData.nakshatraTamil,
    nakshatraNumber: nakshatraData.number,
    yoga: yogaData.yoga,
    yogaTamil: yogaData.yogaTamil,
    karana: karanaData.karana,
    karanaTamil: karanaData.karanaTamil,
    paksha: tithiData.paksha,
    pakshaTamil: tithiData.pakshaTamil,
    vara: VARAS_ENGLISH[dayOfWeek],
    varaTamil: VARAS[dayOfWeek],
    tamilMonth: tamilMonthData.month,
    tamilMonthTamil: tamilMonthData.monthTamil,
    tamilYear: tamilYearData.year,
    tamilYearTamil: tamilYearData.yearTamil,
    sunrise: sunTimes.sunrise,
    sunset: sunTimes.sunset,
    moonPhase: moonPhaseData.english,
    moonPhaseTamil: moonPhaseData.tamil,
    moonIllumination: Math.round(moonIllum.phase_fraction * 100),
    rahu_kaal: rahuKaal,
    yamagandam,
    gulika_kaal: gulikaKaal,
    auspicious: isAuspicious(tithiData.tithi, nakshatraData.nakshatra, yogaData.yoga),
    specialDay: specialDayData.english,
    specialDayTamil: specialDayData.tamil
  };
}

// Get North Indian lunar month (Purnimant system - based on moon longitude)
function getNorthIndianMonth(date: Date): { month: string; monthHindi: string } {
  const sunLong = getSunLongitude(date);
  // North Indian months roughly follow the solar months but use lunar naming
  const monthIndex = Math.floor(sunLong / 30);
  // Offset: Chaitra starts around Aries (0°), similar to Tamil but lunar naming
  return {
    month: NORTH_INDIAN_MONTHS_ENGLISH[monthIndex % 12],
    monthHindi: NORTH_INDIAN_MONTHS[monthIndex % 12]
  };
}

// Moon phase names in Hindi
function getMoonPhaseHindi(phaseAngle: number): string {
  if (phaseAngle < 22.5) return 'अमावस्या';
  if (phaseAngle < 67.5) return 'शुक्ल वर्धमान';
  if (phaseAngle < 112.5) return 'प्रथम चतुर्थांश';
  if (phaseAngle < 157.5) return 'शुक्ल वर्धमान गिब्बस';
  if (phaseAngle < 202.5) return 'पूर्णिमा';
  if (phaseAngle < 247.5) return 'कृष्ण ह्रासमान गिब्बस';
  if (phaseAngle < 292.5) return 'अंतिम चतुर्थांश';
  if (phaseAngle < 337.5) return 'कृष्ण ह्रासमान';
  return 'अमावस्या';
}

// North Indian special days
function getNorthIndianSpecialDay(tithi: string, paksha: string, nakshatra: string): { english: string | null; hindi: string | null } {
  if (tithi === 'Pournami') return { english: 'Purnima (Full Moon)', hindi: 'पूर्णिमा' };
  if (tithi === 'Amavasai') return { english: 'Amavasya (New Moon)', hindi: 'अमावस्या' };
  if (tithi === 'Trayodasi') return { english: 'Pradosh Vrat', hindi: 'प्रदोष व्रत' };
  if (tithi === 'Ekadasi') return { english: 'Ekadashi Vrat', hindi: 'एकादशी व्रत' };
  if (tithi === 'Chaturthi') return { english: 'Vinayak Chaturthi', hindi: 'विनायक चतुर्थी' };
  if (tithi === 'Ashtami' && paksha === 'Krishna Paksham') return { english: 'Krishna Ashtami', hindi: 'कृष्ण अष्टमी' };
  return { english: null, hindi: null };
}

// North Indian Panchang (default location: Delhi)
export function getNorthIndianPanchang(date: Date = new Date(), lat: number = 28.6139, lon: number = 77.2090): NorthIndianPanchangData {
  const tithiData = calculateTithi(date);
  const nakshatraData = calculateNakshatra(date);
  const yogaData = calculateYoga(date);
  const karanaData = calculateKarana(date);
  const monthData = getNorthIndianMonth(date);
  const sunTimes = calculateSunTimes(date, lat, lon);
  const rahuKaal = calculateRahuKaal(date, sunTimes.sunrise, sunTimes.sunset);

  const moonIllum = Astronomy.Illumination(Astronomy.Body.Moon, date);
  const moonPhaseData = getMoonPhaseName(moonIllum.phase_angle);
  const moonPhaseHindi = getMoonPhaseHindi(moonIllum.phase_angle);

  const specialDayData = getNorthIndianSpecialDay(tithiData.tithi, tithiData.paksha, nakshatraData.nakshatra);

  const dayOfWeek = date.getDay();

  return {
    date,
    tithi: tithiData.tithi,
    tithiHindi: TITHIS_HINDI[(tithiData.number - 1) % 30] || TITHIS_HINDI[0],
    tithiNumber: tithiData.number,
    nakshatra: nakshatraData.nakshatra,
    nakshatraHindi: NAKSHATRAS_HINDI[(nakshatraData.number - 1) % 27] || NAKSHATRAS_HINDI[0],
    nakshatraNumber: nakshatraData.number,
    yoga: yogaData.yoga,
    yogaHindi: YOGAS_HINDI[YOGAS_ENGLISH.indexOf(yogaData.yoga)] || yogaData.yoga,
    karana: karanaData.karana,
    karanaHindi: KARANAS_HINDI[KARANAS_ENGLISH.indexOf(karanaData.karana)] || karanaData.karana,
    paksha: tithiData.paksha,
    pakshaHindi: PAKSHAS_HINDI[tithiData.paksha === 'Sukla Paksham' ? 0 : 1],
    vara: VARAS_ENGLISH[dayOfWeek],
    varaHindi: VARAS_HINDI[dayOfWeek],
    month: monthData.month,
    monthHindi: monthData.monthHindi,
    sunrise: sunTimes.sunrise,
    sunset: sunTimes.sunset,
    moonPhase: moonPhaseData.english,
    moonPhaseHindi: moonPhaseHindi,
    moonIllumination: Math.round(moonIllum.phase_fraction * 100),
    rahu_kaal: rahuKaal,
    vikramSamvat: date.getFullYear() + 57,
    auspicious: isAuspicious(tithiData.tithi, nakshatraData.nakshatra, yogaData.yoga),
    specialDay: specialDayData.english,
    specialDayHindi: specialDayData.hindi
  };
}
