export interface TourItinerary {
  day: number;
  title: string;
  description: string;
  temples?: string[];
  cities?: string[];
}

export interface Tour {
  id: number;
  name: string;
  slug: string;
  duration: string;
  days: number;
  nights: number;
  groupSize: string;
  rating: number;
  description: string;
  longDescription: string;
  templesCount: number;
  citiesCovered: string[];
  highlights: string[];
  inclusions: string[];
  itinerary: TourItinerary[];
  // Media fields
  imageUrl?: string;
  galleryImages?: string[];
  videoUrl?: string;
}

export const tours: Tour[] = [
  {
    id: 1,
    name: "Pancha Dwaraka Tour",
    slug: "pancha-dwaraka-tour",
    duration: "6 Days / 5 Nights",
    days: 6,
    nights: 5,
    groupSize: "15-25 Pilgrims",
    rating: 4.9,
    description: "Experience the sacred Pancha Dwaraka pilgrimage from Chennai to Gujarat with Somnath Jyotirlinga and Statue of Unity.",
    longDescription: "Embark on a divine journey to the Pancha Dwaraka, the five sacred abodes of Lord Krishna in Gujarat. This spiritually enriching tour takes you through ancient temples, each holding profound significance in Hindu mythology. Experience the divine energy at Dwarkadhish Temple, witness the magnificent Somnath Jyotirlinga, and marvel at the world's tallest statue - the Statue of Unity.",
    templesCount: 8,
    citiesCovered: ["Chennai", "Ahmedabad", "Dwarka", "Somnath", "Porbandar", "Kevadia"],
    highlights: [
      "Dwarkadhish Temple - One of the Char Dham",
      "Somnath Jyotirlinga - First among 12 Jyotirlingas",
      "Statue of Unity - World's tallest statue",
      "Nageshwar Jyotirlinga Temple",
      "Rukmini Devi Temple",
      "Bet Dwarka Island"
    ],
    inclusions: [
      "Round trip flight tickets from Chennai",
      "AC accommodation in 3-star hotels",
      "All meals (Vegetarian)",
      "AC transportation for sightseeing",
      "Experienced tour guide",
      "Temple darshan arrangements",
      "All applicable taxes"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chennai to Ahmedabad",
        description: "Arrive at Chennai airport for your flight to Ahmedabad. Upon arrival, transfer to hotel. Evening at leisure to explore local markets.",
        cities: ["Chennai", "Ahmedabad"]
      },
      {
        day: 2,
        title: "Ahmedabad to Dwarka",
        description: "Early morning drive to Dwarka (approx 8 hours). En route visit Nageshwar Jyotirlinga Temple. Evening aarti at Dwarkadhish Temple.",
        temples: ["Nageshwar Jyotirlinga Temple", "Dwarkadhish Temple"],
        cities: ["Ahmedabad", "Dwarka"]
      },
      {
        day: 3,
        title: "Dwarka Exploration",
        description: "Morning boat ride to Bet Dwarka. Visit Rukmini Temple, Gopi Talav, and other sacred sites around Dwarka.",
        temples: ["Bet Dwarka Temple", "Rukmini Devi Temple"],
        cities: ["Dwarka"]
      },
      {
        day: 4,
        title: "Dwarka to Somnath",
        description: "Drive to Somnath via Porbandar (birthplace of Mahatma Gandhi). Evening aarti at Somnath Temple - the first Jyotirlinga.",
        temples: ["Somnath Temple"],
        cities: ["Dwarka", "Porbandar", "Somnath"]
      },
      {
        day: 5,
        title: "Somnath to Statue of Unity",
        description: "Morning darshan at Somnath. Drive to Kevadia to visit the magnificent Statue of Unity. Explore Sardar Sarovar Dam.",
        temples: ["Somnath Temple"],
        cities: ["Somnath", "Kevadia"]
      },
      {
        day: 6,
        title: "Return to Chennai",
        description: "Morning drive to Ahmedabad airport. Flight back to Chennai with divine memories and blessings.",
        cities: ["Kevadia", "Ahmedabad", "Chennai"]
      }
    ]
  },
  {
    id: 2,
    name: "Pancha Dwaraka Extended Tour",
    slug: "pancha-dwaraka-extended-tour",
    duration: "10 Days / 9 Nights",
    days: 10,
    nights: 9,
    groupSize: "15-25 Pilgrims",
    rating: 4.8,
    description: "Comprehensive tour covering all Pancha Dwarakas plus Ambaji Shakti Peetham, Srinath Dwaraka, and sacred Pushkar.",
    longDescription: "This extended spiritual odyssey covers all five Dwarakas along with additional sacred destinations. Experience the divine at Ambaji Shakti Peetham, one of the 51 Shakti Peethas, visit the sacred town of Pushkar with its only Brahma Temple in the world, and seek blessings at Shrinathji Temple in Nathdwara. A complete pilgrimage experience covering Gujarat and Rajasthan.",
    templesCount: 15,
    citiesCovered: ["Chennai", "Ahmedabad", "Dwarka", "Somnath", "Ambaji", "Udaipur", "Nathdwara", "Pushkar", "Jaipur"],
    highlights: [
      "All Pancha Dwarka temples",
      "Ambaji Shakti Peetham",
      "Shrinathji Temple, Nathdwara",
      "Brahma Temple, Pushkar",
      "Somnath & Nageshwar Jyotirlingas",
      "City Palace, Udaipur",
      "Pushkar Lake"
    ],
    inclusions: [
      "Round trip flight tickets from Chennai",
      "AC accommodation in 3-star hotels",
      "All meals (Vegetarian)",
      "AC transportation for sightseeing",
      "Experienced tour guide",
      "Temple darshan arrangements",
      "Boat ride at Pushkar Lake",
      "All applicable taxes"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chennai to Ahmedabad",
        description: "Arrive at Chennai airport for your flight to Ahmedabad. Transfer to hotel and evening orientation.",
        cities: ["Chennai", "Ahmedabad"]
      },
      {
        day: 2,
        title: "Ahmedabad to Ambaji",
        description: "Morning drive to Ambaji (approx 3 hours). Visit Ambaji Shakti Peetham and Gabbar Hill. Evening aarti.",
        temples: ["Ambaji Shakti Peetham"],
        cities: ["Ahmedabad", "Ambaji"]
      },
      {
        day: 3,
        title: "Ambaji to Dwarka",
        description: "Long drive to Dwarka (approx 7 hours). Evening aarti at Dwarkadhish Temple.",
        temples: ["Dwarkadhish Temple"],
        cities: ["Ambaji", "Dwarka"]
      },
      {
        day: 4,
        title: "Dwarka Exploration",
        description: "Visit Nageshwar Jyotirlinga, Bet Dwarka, Rukmini Temple, and Gopi Talav.",
        temples: ["Nageshwar Jyotirlinga Temple", "Bet Dwarka Temple", "Rukmini Devi Temple"],
        cities: ["Dwarka"]
      },
      {
        day: 5,
        title: "Dwarka to Somnath",
        description: "Drive to Somnath via Porbandar. Visit Gandhi's birthplace. Evening aarti at Somnath.",
        temples: ["Somnath Temple"],
        cities: ["Dwarka", "Porbandar", "Somnath"]
      },
      {
        day: 6,
        title: "Somnath to Udaipur",
        description: "Morning darshan at Somnath. Long drive to Udaipur, the City of Lakes.",
        temples: ["Somnath Temple"],
        cities: ["Somnath", "Udaipur"]
      },
      {
        day: 7,
        title: "Udaipur to Nathdwara",
        description: "Morning visit City Palace and Lake Pichola. Drive to Nathdwara for Shrinathji darshan.",
        temples: ["Shrinathji Temple"],
        cities: ["Udaipur", "Nathdwara"]
      },
      {
        day: 8,
        title: "Nathdwara to Pushkar",
        description: "Morning darshan at Shrinathji. Drive to holy Pushkar. Evening aarti at Pushkar Lake.",
        temples: ["Shrinathji Temple", "Brahma Temple"],
        cities: ["Nathdwara", "Pushkar"]
      },
      {
        day: 9,
        title: "Pushkar to Jaipur",
        description: "Morning visit to Brahma Temple and Savitri Temple. Drive to Jaipur. Evening at leisure.",
        temples: ["Brahma Temple", "Savitri Temple"],
        cities: ["Pushkar", "Jaipur"]
      },
      {
        day: 10,
        title: "Return to Chennai",
        description: "Morning flight from Jaipur to Chennai with divine blessings and memories.",
        cities: ["Jaipur", "Chennai"]
      }
    ]
  },
  {
    id: 3,
    name: "Mangalore 12 Temples Tour",
    slug: "mangalore-12-temples-tour",
    duration: "4 Days / 3 Nights",
    days: 4,
    nights: 3,
    groupSize: "10-20 Pilgrims",
    rating: 4.7,
    description: "Explore the magnificent temples of coastal Karnataka including Udupi, Mrudeshwar, Gokarna, and Dharmasthala.",
    longDescription: "Discover the divine beauty of coastal Karnataka's temple heritage. This carefully curated tour takes you through 12 magnificent temples, from the famous Sri Krishna Temple in Udupi to the towering Shiva statue at Murudeshwar, the ancient temples of Gokarna, and the sacred Dharmasthala. Experience unique temple traditions, stunning coastal scenery, and profound spiritual energy.",
    templesCount: 12,
    citiesCovered: ["Chennai", "Mangalore", "Udupi", "Murudeshwar", "Gokarna", "Dharmasthala", "Kukke Subramanya"],
    highlights: [
      "Sri Krishna Temple, Udupi",
      "Murudeshwar Temple with 123 ft Shiva statue",
      "Mahabaleshwar Temple, Gokarna",
      "Dharmasthala Manjunatha Temple",
      "Kukke Subramanya Temple",
      "St. Mary's Island (optional)",
      "Coastal Karnataka cuisine"
    ],
    inclusions: [
      "Round trip flight/train tickets from Chennai",
      "AC accommodation in 3-star hotels",
      "All meals (Vegetarian)",
      "AC transportation for sightseeing",
      "Experienced local guide",
      "Temple darshan arrangements",
      "All applicable taxes"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chennai to Mangalore",
        description: "Morning flight/train to Mangalore. Visit Kudroli Gokarnanatheshwara Temple and Mangaladevi Temple. Evening at leisure.",
        temples: ["Kudroli Gokarnanatheshwara Temple", "Mangaladevi Temple"],
        cities: ["Chennai", "Mangalore"]
      },
      {
        day: 2,
        title: "Udupi & Murudeshwar",
        description: "Early morning drive to Udupi. Visit Sri Krishna Temple. Continue to Murudeshwar for the majestic Shiva statue and temple.",
        temples: ["Sri Krishna Temple Udupi", "Anantheshwara Temple", "Murudeshwar Temple"],
        cities: ["Mangalore", "Udupi", "Murudeshwar"]
      },
      {
        day: 3,
        title: "Gokarna & Dharmasthala",
        description: "Morning visit to Gokarna - Mahabaleshwar Temple and beach temples. Afternoon drive to Dharmasthala for evening aarti.",
        temples: ["Mahabaleshwar Temple", "Maha Ganapati Temple", "Dharmasthala Manjunatha Temple"],
        cities: ["Murudeshwar", "Gokarna", "Dharmasthala"]
      },
      {
        day: 4,
        title: "Kukke Subramanya & Return",
        description: "Morning visit to Kukke Subramanya Temple. Drive back to Mangalore. Afternoon flight/train to Chennai.",
        temples: ["Kukke Subramanya Temple", "Adi Subramanya Temple"],
        cities: ["Dharmasthala", "Kukke Subramanya", "Mangalore", "Chennai"]
      }
    ]
  },
  {
    id: 4,
    name: "Kasi-Prayag-Gaya Yatra",
    slug: "kasi-prayag-gaya-yatra",
    duration: "9 Days / 8 Nights",
    days: 9,
    nights: 8,
    groupSize: "10-15 Pilgrims",
    rating: 4.9,
    description: "Sacred pilgrimage to the holiest sites in North India. Experience Ganga Aarti at Varanasi, Triveni Sangam at Prayagraj, and perform ancestral rituals at Gaya.",
    longDescription: "Embark on the most sacred pilgrimage in Hindu tradition covering Kashi (Varanasi), Prayagraj, and Gaya. This spiritually transformative journey takes you through ancient cities where Lord Rama, Buddha, and countless saints have walked. Perform Pind Daan at Gaya for ancestral peace, take a holy dip at Triveni Sangam, and witness the ethereal Ganga Aarti at the ghats of Varanasi.",
    templesCount: 12,
    citiesCovered: ["Chennai", "Lucknow", "Naimisharanya", "Ayodhya", "Prayagraj", "Varanasi", "Gaya", "Patna"],
    highlights: [
      "Kashi Vishwanath Darshan",
      "Triveni Sangam holy bath",
      "Ganga Aarti at Dashashwamedh Ghat",
      "Gaya Pind Daan ceremony",
      "Ram Janmabhoomi, Ayodhya",
      "Naimisharanya sacred forest",
      "Sarnath Buddhist site"
    ],
    inclusions: [
      "Round trip flight tickets from Chennai",
      "AC accommodation in 3-star hotels",
      "All meals (Vegetarian)",
      "AC transportation for sightseeing",
      "Experienced Pandit for rituals",
      "All ritual materials included",
      "Boat ride on Ganges",
      "All applicable taxes"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chennai to Lucknow",
        description: "Arrive at Chennai airport for flight to Lucknow. Drive to Naimisharanya (approx 3 hours). Evening rest at ashram.",
        cities: ["Chennai", "Lucknow", "Naimisharanya"]
      },
      {
        day: 2,
        title: "Naimisharanya to Ayodhya",
        description: "Morning visit to Chakra Tirtha, Vyasa Gaddi, and Hanumat Kharai. Afternoon drive to Ayodhya. Evening at Ram Janmabhoomi.",
        temples: ["Chakra Tirtha Temple", "Hanuman Garhi", "Ram Janmabhoomi"],
        cities: ["Naimisharanya", "Ayodhya"]
      },
      {
        day: 3,
        title: "Ayodhya to Prayagraj",
        description: "Morning temples in Ayodhya. Drive to Prayagraj. Evening visit to Triveni Sangam for holy dip.",
        temples: ["Kanak Bhawan", "Nageshwarnath Temple"],
        cities: ["Ayodhya", "Prayagraj"]
      },
      {
        day: 4,
        title: "Prayagraj Rituals",
        description: "Full day of rituals at Sangam. Visit Akshaya Vat, Patalpuri Temple, Anand Bhawan, and Allahabad Fort.",
        temples: ["Akshaya Vat", "Patalpuri Temple", "Hanuman Temple"],
        cities: ["Prayagraj"]
      },
      {
        day: 5,
        title: "Prayagraj to Varanasi",
        description: "Morning drive to Varanasi. Afternoon visit Kashi Vishwanath Temple. Evening Ganga Aarti at Dashashwamedh Ghat.",
        temples: ["Kashi Vishwanath Temple", "Annapurna Temple"],
        cities: ["Prayagraj", "Varanasi"]
      },
      {
        day: 6,
        title: "Varanasi Exploration",
        description: "Morning boat ride on Ganges. Visit Sankat Mochan Temple, Tulsi Manas Temple, BHU, and Durga Temple.",
        temples: ["Sankat Mochan Temple", "Tulsi Manas Temple", "Durga Temple"],
        cities: ["Varanasi"]
      },
      {
        day: 7,
        title: "Sarnath & Rituals",
        description: "Morning visit Sarnath where Buddha gave his first sermon. Afternoon Homa Shraddam rituals.",
        temples: ["Dhamek Stupa", "Thai Temple Sarnath"],
        cities: ["Varanasi", "Sarnath"]
      },
      {
        day: 8,
        title: "Varanasi to Gaya",
        description: "Morning drive to Gaya (approx 5 hours). Afternoon rituals at Vishnu Pad Temple and Akshaya Vat.",
        temples: ["Vishnu Pad Temple", "Akshaya Vat Gaya"],
        cities: ["Varanasi", "Gaya"]
      },
      {
        day: 9,
        title: "Gaya Rituals & Return",
        description: "Morning Pind Daan ceremony at Phalgu River. Drive to Patna airport for return flight to Chennai.",
        temples: ["Mangla Gauri Temple", "Phalgu River Ghat"],
        cities: ["Gaya", "Patna", "Chennai"]
      }
    ]
  },
  {
    id: 5,
    name: "Kasi-Rameshwaram Complete Yatra",
    slug: "kasi-rameshwaram-complete-yatra",
    duration: "14 Days / 13 Nights",
    days: 14,
    nights: 13,
    groupSize: "15-25 Pilgrims",
    rating: 4.8,
    description: "Complete spiritual journey combining Rameshwaram and Kasi yatras. Perform Shraddam at Rameshwaram, visit all sacred sites in North India, and return with Ganga water.",
    longDescription: "This comprehensive pilgrimage fulfills the ancient tradition of carrying Ganga water from Kashi to offer at Rameshwaram's Ramanathaswamy Temple. Beginning at Rameshwaram, you'll perform sacred rituals before traveling to North India's holiest sites. After completing rituals at Kashi, Prayagraj, and Gaya, you'll return to Rameshwaram to complete the circuit by offering Ganga Abhishekam to Lord Ramanatha.",
    templesCount: 20,
    citiesCovered: ["Chennai", "Rameshwaram", "Varanasi", "Ayodhya", "Naimisharanya", "Prayagraj", "Gaya", "Patna"],
    highlights: [
      "Dhanushkodi sacred rituals",
      "22 Theertham bath at Rameshwaram",
      "Sethu Madhava Pooja",
      "Kashi Vishwanath Darshan",
      "Gaya Pind Daan",
      "Ganga Abhishekam to Ramanatha",
      "Complete ancestral ritual package"
    ],
    inclusions: [
      "Round trip transportation from Chennai",
      "AC accommodation in 3-star hotels",
      "All meals (Vegetarian)",
      "AC bus/train for all travel",
      "Experienced Pandits for all rituals",
      "All ritual materials included",
      "Boat rides included",
      "All applicable taxes"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chennai to Rameshwaram",
        description: "Early morning departure from Chennai. Arrive Rameshwaram by evening. Rest and preparation for rituals.",
        cities: ["Chennai", "Rameshwaram"]
      },
      {
        day: 2,
        title: "Rameshwaram Rituals",
        description: "Early morning Dhanushkodi rituals - Maha Sankalpam, Sethu Madhava Pooja. 22 Theertham bath and Shraddam.",
        temples: ["Ramanathaswamy Temple", "Agni Theertham"],
        cities: ["Rameshwaram", "Dhanushkodi"]
      },
      {
        day: 3,
        title: "Rameshwaram to Varanasi",
        description: "Morning flight to Varanasi. Evening Ganga Aarti at Dashashwamedh Ghat. Overnight at Varanasi.",
        temples: ["Kashi Vishwanath Temple"],
        cities: ["Rameshwaram", "Varanasi"]
      },
      {
        day: 4,
        title: "Varanasi to Ayodhya",
        description: "Morning drive to Ayodhya. Visit Ram Janmabhoomi, Hanuman Garhi, and Kanak Bhawan.",
        temples: ["Ram Janmabhoomi", "Hanuman Garhi", "Kanak Bhawan"],
        cities: ["Varanasi", "Ayodhya"]
      },
      {
        day: 5,
        title: "Ayodhya to Naimisharanya",
        description: "Full day at Naimisharanya sacred forest. Visit Chakra Tirtha and Vyasa Gaddi.",
        temples: ["Chakra Tirtha Temple", "Vyasa Gaddi"],
        cities: ["Ayodhya", "Naimisharanya"]
      },
      {
        day: 6,
        title: "Naimisharanya to Prayagraj",
        description: "Drive to Prayagraj. Holy bath at Triveni Sangam. Veni Daanam ceremony.",
        temples: ["Akshaya Vat", "Patalpuri Temple"],
        cities: ["Naimisharanya", "Prayagraj"]
      },
      {
        day: 7,
        title: "Prayagraj Rituals",
        description: "Full day of rituals at Prayagraj. Visit Anand Bhawan and Allahabad Fort. Return to Kashi.",
        temples: ["Sangam", "Hanuman Temple Prayagraj"],
        cities: ["Prayagraj", "Varanasi"]
      },
      {
        day: 8,
        title: "Kashi Rituals Day 1",
        description: "Manikarnika Ghat rituals. Visit Kala Bhairav, Annapurna, and other temples.",
        temples: ["Manikarnika Ghat", "Kala Bhairav Temple", "Annapurna Temple"],
        cities: ["Varanasi"]
      },
      {
        day: 9,
        title: "Kashi Rituals Day 2",
        description: "Homa Shraddam at Kashi. Visit Sankat Mochan and Durga Temple.",
        temples: ["Sankat Mochan Temple", "Durga Temple"],
        cities: ["Varanasi"]
      },
      {
        day: 10,
        title: "Varanasi to Gaya",
        description: "Morning drive to Gaya. Afternoon rituals at Vishnu Pad Temple.",
        temples: ["Vishnu Pad Temple"],
        cities: ["Varanasi", "Gaya"]
      },
      {
        day: 11,
        title: "Gaya Rituals",
        description: "Full day Pind Daan rituals at Phalgu River, Akshaya Vat, and Bodh Gaya.",
        temples: ["Akshaya Vat Gaya", "Mahabodhi Temple"],
        cities: ["Gaya", "Bodh Gaya"]
      },
      {
        day: 12,
        title: "Pancha Theertha Shraddam",
        description: "Return to Kashi. Pancha Theertha Shraddam rituals.",
        temples: ["Kashi Vishwanath Temple"],
        cities: ["Gaya", "Varanasi"]
      },
      {
        day: 13,
        title: "Dampathi Pooja & Return",
        description: "Dampathi Pooja, Gho-Daanam ceremonies. Collect Ganga Jal. Flight to Chennai.",
        temples: ["Manikarnika Ghat"],
        cities: ["Varanasi", "Chennai"]
      },
      {
        day: 14,
        title: "Rameshwaram Completion",
        description: "Drive to Rameshwaram. Ganga Pooja and Abhishekam to Ramanatha Swamy. Return to Chennai.",
        temples: ["Ramanathaswamy Temple"],
        cities: ["Chennai", "Rameshwaram"]
      }
    ]
  },
  {
    id: 6,
    name: "Rameshwaram Yatra",
    slug: "rameshwaram-yatra",
    duration: "2 Days / 1 Night",
    days: 2,
    nights: 1,
    groupSize: "10-20 Pilgrims",
    rating: 4.7,
    description: "Short spiritual retreat to Rameshwaram. Perform sacred rituals at Dhanushkodi, bathe in 22 temple theerthams, and receive darshan of Lord Ramanatha Swamy.",
    longDescription: "Experience the divine essence of Rameshwaram, one of the Char Dham destinations, in this compact yet spiritually fulfilling pilgrimage. Perform sacred rituals at the tip of Dhanushkodi where Lord Rama is believed to have built the bridge to Lanka. Purify yourself in the 22 sacred theerthams within the Ramanathaswamy Temple complex and seek blessings at this ancient Jyotirlinga shrine.",
    templesCount: 4,
    citiesCovered: ["Chennai", "Rameshwaram", "Dhanushkodi"],
    highlights: [
      "Dhanushkodi sacred rituals",
      "Maha Sankalpam ceremony",
      "Sethu Madhava Pooja",
      "22 Theertham holy bath",
      "Ramanathaswamy Temple Darshan",
      "Agni Theertham sunrise bath",
      "Gandhamadhana Parvatham"
    ],
    inclusions: [
      "AC bus from Chennai",
      "One night accommodation",
      "All meals (Vegetarian)",
      "Experienced Pandit for rituals",
      "All ritual materials included",
      "Temple darshan arrangements",
      "All applicable taxes"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chennai to Rameshwaram",
        description: "Early morning departure from Chennai (4 AM). Arrive Rameshwaram by afternoon. Dhanushkodi rituals - Maha Sankalpam, Sethu Madhava Pooja. Agni Theertham bath, 22 Theertham Snanam, Ramanathaswamy Temple Darshan.",
        temples: ["Ramanathaswamy Temple", "Agni Theertham", "Gandhamadhana Parvatham"],
        cities: ["Chennai", "Rameshwaram", "Dhanushkodi"]
      },
      {
        day: 2,
        title: "Rituals & Return",
        description: "Optional Homa Shraddam in the morning. Visit Pamban Bridge viewpoint and Panchmukhi Hanuman Temple. Depart for Chennai, arriving by night.",
        temples: ["Panchmukhi Hanuman Temple", "Kothandaramaswamy Temple"],
        cities: ["Rameshwaram", "Chennai"]
      }
    ]
  }
];

export const getTourBySlug = (slug: string): Tour | undefined => {
  return tours.find(tour => tour.slug === slug);
};

export const getTourById = (id: number): Tour | undefined => {
  return tours.find(tour => tour.id === id);
};
