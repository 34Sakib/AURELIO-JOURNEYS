export interface DayItinerary {
  day: number;
  title: string;
  location: string;
  description: string;
  highlight: string;
  accommodation: string;
  meals: string;
}

export interface Journey {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  region: 'Asia' | 'Europe' | 'Africa' | 'South America' | 'Polar & Alpine';
  style: 'Cultural Expeditions' | 'Private Yachting' | 'Wildlife Safari' | 'Wellness Retreat' | 'Alpine & Wilderness';
  durationDays: number;
  pricePerPerson: number;
  heroImage: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  bestTimeToVisit: string;
  destinationSlug: string;
  designer: {
    name: string;
    role: string;
    avatar: string;
    quote: string;
  };
  dayByDay: DayItinerary[];
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: 'Asia' | 'Europe' | 'Africa' | 'South America' | 'Polar & Alpine';
  hook: string;
  heroImage: string;
  carouselImage: string;
  gallery: string[];
  bestTimeToVisit: string;
  durationRange: string;
  timeZone: string;
  language: string;
  overview: string[];
  signatureExperiences: {
    title: string;
    description: string;
    iconName: string;
  }[];
  relatedJourneyIds: string[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
  content: string[];
}

export const DESTINATIONS_DATA: Destination[] = [
  {
    slug: 'kyoto-japan',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    hook: 'Temples, autumn light, and quiet centuries-old ceremony.',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop',
    carouselImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1528164344705-47542687990d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop'
    ],
    bestTimeToVisit: 'March–May, October–December',
    durationRange: '7–10 Days',
    timeZone: 'JST (UTC+9)',
    language: 'Japanese (Private English Specialists)',
    overview: [
      'Kyoto is Japan’s ancient cultural heart, where thousands of classical Buddhist temples, shinto shrines, traditional wooden machiya houses, and pristine moss gardens rest in quiet contemplation.',
      'Our guests experience Kyoto beyond the velvet rope — entering 400-year-old sub-temples after hours, sharing private tea ceremonies with 15th-generation Grand Masters, and residing in heritage ryokan suites with private thermal baths.'
    ],
    signatureExperiences: [
      {
        title: 'After-Hours Temple Illuminations',
        description: 'Private access to Nanzen-ji & Kodai-ji moss gardens after public closing hours.',
        iconName: 'Sparkles'
      },
      {
        title: 'Grand Tea Master Audience',
        description: 'Private matcha ceremony hosted inside a 400-year-old secluded teahouse.',
        iconName: 'Coffee'
      },
      {
        title: 'Exclusive Geiko & Maiko Banquets',
        description: 'Traditional Ochiai dining, music, and conversation in the Gion district.',
        iconName: 'Crown'
      },
      {
        title: 'Master Swordsmith & Artisan Visits',
        description: 'Behind-the-scenes entry into centuries-old lacquerware and silk weaving ateliers.',
        iconName: 'Compass'
      }
    ],
    relatedJourneyIds: ['kyoto-autumn-sanctuary']
  },
  {
    slug: 'amalfi-coast-italy',
    name: 'Amalfi Coast & Capri',
    country: 'Italy',
    region: 'Europe',
    hook: 'Private Riva yachts, lemon groves, and cliffside palazzos.',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop',
    carouselImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200&auto=format&fit=crop'
    ],
    bestTimeToVisit: 'May–September',
    durationRange: '6–9 Days',
    timeZone: 'CET (UTC+1)',
    language: 'Italian (Private English Concierge)',
    overview: [
      'Cascading vertically down limestone cliffs into the Tyrrhenian Sea, the Amalfi Coast represents the pinnacle of Mediterranean glamour and unhurried coastal leisure.',
      'Aurelio Journeys charters 74ft Riva motor yachts to navigate secluded blue grottos, secures terrace reservations at Le Sirenuse Positano, and unlocks private cliffside villa stays in Ravello.'
    ],
    signatureExperiences: [
      {
        title: '74ft Riva Private Yacht Charter',
        description: 'Explore Capri, Positano, and Ischia with a dedicated captain and private chef.',
        iconName: 'Anchor'
      },
      {
        title: 'Secluded Blue & White Grotto Entry',
        description: 'Private after-hours boat access inside Capri’s illuminated sea caves.',
        iconName: 'Waves'
      },
      {
        title: 'Private Cliffside Cooking Masterclass',
        description: 'Handmade ravioli and limoncello crafting in an organic lemon grove in Positano.',
        iconName: 'Utensils'
      },
      {
        title: 'Subterranean 3,000-Bottle Cellar Tasting',
        description: 'Guided Sommelier tasting of vintage Barolo and Campania wines.',
        iconName: 'Wine'
      }
    ],
    relatedJourneyIds: ['amalfi-capri-yachting']
  },
  {
    slug: 'serengeti-tanzania',
    name: 'Serengeti & Ngorongoro',
    country: 'Tanzania',
    region: 'Africa',
    hook: 'Airborne low-altitude flights, Great Migration, and luxury canvas fly-camps.',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1600&auto=format&fit=crop',
    carouselImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
    ],
    bestTimeToVisit: 'July–October (River Crossings)',
    durationRange: '8–12 Days',
    timeZone: 'EAT (UTC+3)',
    language: 'Swahili & English',
    overview: [
      'The endless savannahs of the Serengeti host the world’s most dramatic natural spectacle: the Great Wildebeest Migration across the crocodile-filled Mara River.',
      'Our guests soar in private Eurocopter AS350 helicopters low over the plains, land on private crater rims, and lodge at Singita Sasakwa and mobile luxury canvas camps.'
    ],
    signatureExperiences: [
      {
        title: 'Eurocopter AS350 Low-Altitude Patrols',
        description: 'Track predators and river crossings from 200 feet above the plains.',
        iconName: 'Plane'
      },
      {
        title: 'Rhino Protection Conservation Patrol',
        description: 'Join senior veterinarians and K9 anti-poaching teams on active patrol.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Private Starlight Mobile Fly-Camping',
        description: 'Sleep under luxury canvas deep in the wild interior with zero light pollution.',
        iconName: 'Moon'
      }
    ],
    relatedJourneyIds: ['serengeti-helicopter-safari']
  },
  {
    slug: 'patagonia-chile',
    name: 'Patagonia Fjords',
    country: 'Chile & Argentina',
    region: 'South America',
    hook: 'Granite horns, Southern Ice Field glaciers, and architectural eco-lodges.',
    heroImage: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1600&auto=format&fit=crop',
    carouselImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'
    ],
    bestTimeToVisit: 'November–March',
    durationRange: '9–12 Days',
    timeZone: 'CLT (UTC-3)',
    language: 'Spanish & English',
    overview: [
      'At the southern tip of the Americas, Patagonia presents a landscape of raw granite towers, electric-blue glaciers, turquoise lakes, and windswept pampas.',
      'Stay in iconically designed wooden sanctuaries like Tierra Patagonia and Explora Torres del Paine, complete with private heli-hiking and puma tracking expeditions.'
    ],
    signatureExperiences: [
      {
        title: 'Glacier Ice Walking & Vintage Spirits',
        description: 'Hike across Glacier Grey ice field and enjoy 10,000-year-old glacier ice drinks.',
        iconName: 'Compass'
      },
      {
        title: 'Puma Tracking Expedition',
        description: 'Ethical wild puma tracking with expert resident field biologists.',
        iconName: 'Eye'
      },
      {
        title: 'Chilean Fjord Hydrofoil Navigation',
        description: 'Chartered catamaran navigation through Ultima Esperanza Fjord.',
        iconName: 'Ship'
      }
    ],
    relatedJourneyIds: ['patagonia-wilderness-lodge']
  }
];

export const JOURNEYS_DATA: Journey[] = [
  {
    id: 'kyoto-autumn-sanctuary',
    slug: 'kyoto-autumn-sanctuary',
    title: 'Kyoto Autumn Sanctuary',
    subtitle: 'Private temple stays, tea ceremonies, and evening garden access.',
    region: 'Asia',
    style: 'Cultural Expeditions',
    durationDays: 7,
    pricePerPerson: 12400,
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528164344705-47542687990d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Experience Kyoto away from the crowds with private after-hours access to UNESCO World Heritage Zen temples, exclusive audience with Grand Tea Masters, and private ryokan stays with thermal hot springs.',
    highlights: [
      'Private after-hours illuminations at Nanzen-ji & Kodai-ji temples',
      'Private audience with a 15th-generation Urasenke Tea Master',
      'Stay at a 200-year-old traditional luxury Ryokan with private Onsen',
      'Helicopter transfer from Kansai International to Kyoto Private Helipad'
    ],
    inclusions: [
      'Private dedicated English-speaking Cultural Specialist & Driver',
      'All Luxury Ryokan & Boutique Hotel Suite Accommodations',
      'Daily Kaiseki Fine Dining & Curated Beverage Pairings',
      'Exclusive Private Access Permits & Temple Donations'
    ],
    exclusions: ['International Transpacific Flights', 'Personal Souvenirs & Discretionary Tipping'],
    bestTimeToVisit: 'October — December',
    destinationSlug: 'kyoto-japan',
    designer: {
      name: 'Kenji Takahashi',
      role: 'Senior Curator — Japan & East Asia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      quote: 'Kyoto reveals its secret beauty only when the gates close to the public. We open those gates for you.'
    },
    dayByDay: [
      {
        day: 1,
        title: 'Arrival in Kyoto & Private Ryokan Welcome',
        location: 'Higashiyama District, Kyoto',
        description: 'Private helicopter transfer to your historic ryokan in Higashiyama. Settle into your suite featuring private cedar wood soaking tub overlooking bamboo gardens.',
        highlight: 'Private multi-course Welcome Kaiseki banquet served by your personal Nakai-san.',
        accommodation: 'Sowaka Kyoto (Luxury Heritage Suite)',
        meals: 'Dinner included'
      },
      {
        day: 2,
        title: 'Dawn Meditation & After-Hours Temple Gardens',
        location: 'Nanzen-ji & Arashiyama',
        description: 'Begin before sunrise with monk-led Zen meditation at a centuries-old sub-temple. Stroll through the Sagano Bamboo Grove in private serenity before opening hours.',
        highlight: 'Private tea ritual in a 400-year-old teahouse closed to the public.',
        accommodation: 'Sowaka Kyoto',
        meals: 'Breakfast & Lunch included'
      },
      {
        day: 3,
        title: 'Art of Artisan Craftsmanship & Geiko Evening',
        location: 'Gion & Artisans Quarter',
        description: 'Visit private studios of master sword-smiths, lacquerware artists, and silk weavers. In the evening, enter an exclusive Ochiai dinner hosted by a top Geiko and Maiko.',
        highlight: 'Traditional music, dance, and conversation with Kyoto’s most coveted Geiko.',
        accommodation: 'Aman Kyoto (Maple Suite)',
        meals: 'Breakfast & Kaiseki Dinner included'
      },
      {
        day: 4,
        title: 'Culinary Masterclass & Uji Tea Plantation Flying Visit',
        location: 'Uji & Central Kyoto',
        description: 'Private chartered journey to the emerald hills of Uji. Taste rare shadow-grown Gyokuro tea leaves directly harvested by master growers.',
        highlight: 'Hands-on culinary masterclass with a 3-Michelin-starred Kyoto chef.',
        accommodation: 'Aman Kyoto',
        meals: 'Breakfast, Lunch & Dinner included'
      },
      {
        day: 5,
        title: 'Spiritual Sanctuary of Mount Hiei',
        location: 'Enryaku-ji & Lake Biwa',
        description: 'Ascend Mount Hiei to explore the sacred monastic complex of Enryaku-ji, birthplace of Japanese Buddhism. Private audience with senior monks.',
        highlight: 'Private fire ritual (Goma) dedicated to your personal health and peace.',
        accommodation: 'Four Seasons Hotel Kyoto (Residential Suite)',
        meals: 'Breakfast & Lunch included'
      },
      {
        day: 6,
        title: 'Private Garden Illuminations & Farewell Soirée',
        location: 'Kodai-ji Temple',
        description: 'As twilight settles, Kodai-ji Temple opens its gates exclusively for your party. Walk along illuminated moss gardens and reflective autumn koi ponds.',
        highlight: 'Private harp performance under the illuminated red maple canopy.',
        accommodation: 'Four Seasons Hotel Kyoto',
        meals: 'Breakfast & Farewell Gala Dinner included'
      },
      {
        day: 7,
        title: 'Serene Departure',
        location: 'Kyoto to Osaka/Tokyo',
        description: 'Final serene morning in the Zen courtyard. Private bullet-train Gran Class suite or chauffeur transfer to your departing flight.',
        highlight: 'Bespoke hand-crafted keepsake gift presented by your Travel Designer.',
        accommodation: 'N/A',
        meals: 'Breakfast included'
      }
    ]
  },
  {
    id: 'amalfi-capri-yachting',
    slug: 'amalfi-capri-yachting',
    title: 'Amalfi Coast & Capri Private Yachting',
    subtitle: '74ft Riva yacht charter, cliffside villas, and Michelin dining.',
    region: 'Europe',
    style: 'Private Yachting',
    durationDays: 8,
    pricePerPerson: 18500,
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Navigate the azure waters of the Tyrrhenian Sea aboard a fully crewed private Riva yacht. Drop anchor in secluded coves, dine at cliffside seafood sanctuaries, and stay in historic cliff-top palazzos.',
    highlights: [
      '74ft Riva Private Motor Yacht with dedicated captain and private chef',
      'Exclusive private access to Capri’s White & Green Grottos after hours',
      'Stays at Belmond Hotel Caruso & Le Sirenuse Positano',
      'Private helicopter transfers from Naples International Airport'
    ],
    inclusions: [
      'Full Yacht Fuel, Crew, Tender & Sea Bob Water Toys',
      'All Clifftop Luxury Villa & Hotel Suites',
      'Sommelier-Curated Italian Wine Cellar Onboard',
      'Private Concierge Shore Excursions & Chauffeur Services'
    ],
    exclusions: ['International Flights', 'Discretionary Crew Gratuities'],
    bestTimeToVisit: 'May — September',
    destinationSlug: 'amalfi-coast-italy',
    designer: {
      name: 'Sophia Laurent',
      role: 'Head of Nautical & Mediterranean Expeditions',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      quote: 'The Amalfi Coast is best understood from the water, where dramatic limestone cliffs meet private turquoise coves.'
    },
    dayByDay: [
      {
        day: 1,
        title: 'Embarkation in Naples & Coastal Cruise to Ravello',
        location: 'Ravello',
        description: 'Board your private helicopter to Ravello. Check into your palazzo suite overlooking the Mediterranean before boarding your Riva yacht for sunset aperitifs.',
        highlight: 'Welcome sunset champagne tasting anchored off the coast of Minori.',
        accommodation: 'Belmond Hotel Caruso (Sea View Suite)',
        meals: 'Dinner included'
      },
      {
        day: 2,
        title: 'Capri Isle & Secluded Blue Grotto Access',
        location: 'Capri & Anacapri',
        description: 'Cruise to the iconic island of Capri. Navigate around the Faraglioni rock formations and swim in private emerald coves away from commercial tours.',
        highlight: 'Private after-hours boat access inside the magical Blue Grotto.',
        accommodation: 'JK Place Capri (Penthouse Suite)',
        meals: 'Breakfast & Lunch included'
      },
      {
        day: 3,
        title: 'Cliffside Dining & Anacapri Villa Explorations',
        location: 'Anacapri',
        description: 'Private chairlift ride to Monte Solaro peak followed by lunch at 2-Michelin-starred L’Olivo. Spend the afternoon exploring Villa San Michele.',
        highlight: 'Wine tasting in a subterranean 3,000-bottle cellar with the Head Sommelier.',
        accommodation: 'JK Place Capri',
        meals: 'Breakfast, Lunch & Dinner included'
      },
      {
        day: 4,
        title: 'Sailing to Positano & Sunset Aperitivo',
        location: 'Positano',
        description: 'Sail towards Positano as the pastel cliffside town illuminates in the golden hour light. Tender ashore to your terrace at Le Sirenuse.',
        highlight: 'Sunset cocktails on Franco’s Bar terrace reserved exclusively for your party.',
        accommodation: 'Le Sirenuse Positano (Deluxe Sea View)',
        meals: 'Breakfast & Lunch included'
      },
      {
        day: 5,
        title: 'Private Cooking Masterclass & Lemongrass Groves',
        location: 'Sentiero degli Dei & Positano',
        description: 'Morning walk along the Path of the Gods followed by a private cooking masterclass in an organic cliffside lemon farm.',
        highlight: 'Crafting fresh handmade limoncello and ravioli with Master Chef Nonna Rosa.',
        accommodation: 'Le Sirenuse Positano',
        meals: 'Breakfast & Lunch included'
      },
      {
        day: 6,
        title: 'Ischia Thermal Springs & Spa Sanctuary',
        location: 'Ischia Island',
        description: 'Day sail to the volcanic island of Ischia. Relax in natural thermal hot springs and underwater volcanic thermal baths.',
        highlight: 'Exclusive private spa pavilion reservation at Mezzatorre Hotel & Thermal Spa.',
        accommodation: 'Mezzatorre Hotel & Thermal Spa',
        meals: 'Breakfast & Spa Lunch included'
      },
      {
        day: 7,
        title: 'Regatta & Farewell Sunset Cruise',
        location: 'Sorrento Peninsula',
        description: 'Final full day of yachting around the Punta Campanella Marine Reserve. Swim alongside sea turtles and enjoy a farewell seafood feast.',
        highlight: 'Fresh grilled lobsters and vintage Barolo served by your private yacht chef.',
        accommodation: 'Mezzatorre Hotel & Thermal Spa',
        meals: 'Breakfast, Lunch & Gala Dinner included'
      },
      {
        day: 8,
        title: 'Farewell Amalfi',
        location: 'Naples Airport',
        description: 'Morning luxury speed launch to Naples harbor followed by private car transfer to your departing flight.',
        highlight: 'Bespoke hand-engraved Capri leather travel pouch gift.',
        accommodation: 'N/A',
        meals: 'Breakfast included'
      }
    ]
  },
  {
    id: 'serengeti-helicopter-safari',
    slug: 'serengeti-helicopter-safari',
    title: 'Serengeti & Ngorongoro Helicopter Safari',
    subtitle: 'Private mobile fly-camps, conservation access, and airborne tracking.',
    region: 'Africa',
    style: 'Wildlife Safari',
    durationDays: 9,
    pricePerPerson: 24000,
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Soar low over the vast plains of the Serengeti in a dedicated Eurocopter Eurocopter AS350. Track the Great Migration from above, land on private crater rims, and sleep under luxury canvas under the starry African skies.',
    highlights: [
      'Dedicated Eurocopter AS350 B3 Helicopter with pilot available 24/7',
      'Exclusive private fly-camping right in the path of the Great Migration',
      'Behind-the-scenes rhino collar tracking with senior wildlife veterinarians',
      'Stays at Singita Sasakwa Lodge & Ngorongoro Crater Lodge'
    ],
    inclusions: [
      'Unlimited Private Helicopter Flight Hours in Tanzania',
      'All Luxury Safari Lodge Suites & Private Mobile Tented Camps',
      'Private Master Tracker & Head Ranger',
      'All National Park Conservation Fees & Anti-Poaching Grants'
    ],
    exclusions: ['International Long-haul Flights', 'Personal Safari Gear'],
    bestTimeToVisit: 'July — October (Migration Mara River Crossings)',
    destinationSlug: 'serengeti-tanzania',
    designer: {
      name: 'Marcus Vance',
      role: 'Lead Wilderness & Safari Curator',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
      quote: 'Looking down from 200 feet as two hundred thousand wildebeest cross the Mara River is an emotion words cannot capture.'
    },
    dayByDay: [
      {
        day: 1,
        title: 'Kilimanjaro Touchdown & Private Flight to Grumeti',
        location: 'Grumeti Game Reserve',
        description: 'Land in Kilimanjaro where your private executive turboprop awaits. Transfer to Singita Sasakwa Manor atop the Grumeti hills.',
        highlight: 'Sunset game drive with private tracker spotting black rhinos.',
        accommodation: 'Singita Sasakwa Lodge (Cottage Suite)',
        meals: 'Dinner included'
      },
      {
        day: 2,
        title: 'Airborne Tracking over Northern Migration',
        location: 'Mara River Sector',
        description: 'Take off in your AS350 helicopter to skim low over the Mara River. Observe predator-prey dynamics with zero vehicle dust.',
        highlight: 'Champagne bush landing on a private kopje overlooking 50 miles of savannah.',
        accommodation: 'Singita Sasakwa Lodge',
        meals: 'Breakfast, Bush Lunch & Dinner included'
      },
      {
        day: 3,
        title: 'Conservation Insider: Rhino Protection Flight',
        location: 'Singita Grumeti Conservation Center',
        description: 'Join the K9 Anti-Poaching Unit and head veterinarian on an active conservation patrol flight. Learn tracking tech firsthand.',
        highlight: 'Directly participating in wildlife monitoring data logging.',
        accommodation: 'Singita Mara River Tented Camp',
        meals: 'Breakfast, Lunch & Dinner included'
      },
      {
        day: 4,
        title: 'Private Mobile Fly-Camp in the Deep Wilderness',
        location: 'Central Serengeti',
        description: 'Fly into a custom-erected luxury mobile canvas camp deep in the wild interior. Zero light pollution and five-star private chef service.',
        highlight: 'Gathering around the campfire with Maasai elders telling ancient starlight tales.',
        accommodation: 'Aurelio Signature Mobile Canvas Camp',
        meals: 'Breakfast, Lunch & Fireside Dinner included'
      },
      {
        day: 5,
        title: 'Dawn Hot Air Balloon & Walking Safari',
        location: 'Seronera Valley',
        description: 'Silent dawn hot air balloon float followed by a bush champagne breakfast. Afternoon guided walking safari focusing on micro-fauna and flora.',
        highlight: 'On-foot tracking of big cats with expert armed rangers.',
        accommodation: 'Aurelio Signature Mobile Canvas Camp',
        meals: 'Breakfast, Bush Lunch & Dinner included'
      },
      {
        day: 6,
        title: 'Ngorongoro Crater Rim Landing & Manor Stay',
        location: 'Ngorongoro Conservation Area',
        description: 'Scenic helicopter flight across the Great Rift Valley wall, descending into the caldera of Ngorongoro Crater.',
        highlight: 'Private floor-to-ceiling glass dining overlooking the crater rim.',
        accommodation: 'andBeyond Ngorongoro Crater Lodge (Versailles Suite)',
        meals: 'Breakfast, Lunch & Dinner included'
      },
      {
        day: 7,
        title: 'Full Day Crater Floor Exploration',
        location: 'Ngorongoro Caldera Floor',
        description: 'Descend to the crater floor for an intimate encounter with the highest density of wildlife in Africa, including flamingo-covered Lake Magadi.',
        highlight: 'Gourmet Silver-service picnic lunch under acacia trees near the hippo pool.',
        accommodation: 'andBeyond Ngorongoro Crater Lodge',
        meals: 'Breakfast, Picnic Lunch & Dinner included'
      },
      {
        day: 8,
        title: 'Hadza Bushmen Cultural Encounter',
        location: 'Lake Eyasi',
        description: 'Helicopter flight to Lake Eyasi to meet one of Africa’s last hunter-gatherer tribes, the Hadzabe. Learn ancient fire-making and bow hunting.',
        highlight: 'Authentic bow-making workshop with Hadza tribal elders.',
        accommodation: 'andBeyond Ngorongoro Crater Lodge',
        meals: 'Breakfast, Lunch & Dinner included'
      },
      {
        day: 9,
        title: 'Executive Departure',
        location: 'Arusha to Kilimanjaro',
        description: 'Final scenic flight back to Arusha for coffee tasting at a historic plantation before your international flight home.',
        highlight: 'Custom leather-bound safari journal with photos captured during your flight.',
        accommodation: 'N/A',
        meals: 'Breakfast & Lunch included'
      }
    ]
  },
  {
    id: 'patagonia-wilderness-lodge',
    slug: 'patagonia-wilderness-lodge',
    title: 'Patagonia Fjords & Glacier Lodge',
    subtitle: 'Private catamaran expeditions, granite towers, and heli-hiking.',
    region: 'South America',
    style: 'Alpine & Wilderness',
    durationDays: 10,
    pricePerPerson: 16800,
    heroImage: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Journey to the edge of the earth. Experience Torres del Paine and Chilean Fjords from exclusive architectural eco-lodges, private glaciers ice-walking, and gourmet Patagonian lamb roasts.',
    highlights: [
      'Private helicopter access to untouched glacier peaks in Southern Ice Field',
      'Stay at Explora Torres del Paine & Tierra Patagonia Architectural Lodges',
      'Chartered private catamaran to Grey Glacier ice caves',
      'Puma tracking expedition with resident wildlife biologists'
    ],
    inclusions: [
      'All Private Heli-hiking & Catamaran Excursions',
      'Full Architectural Lodge Suite Accommodations',
      'All Gourmet Meals & Premium Chilean Vintage Wines',
      'Private Thermal Gear & Custom Parka Outfitting'
    ],
    exclusions: ['International Flights to Santiago', 'Personal Trekking Boots'],
    bestTimeToVisit: 'November — March',
    destinationSlug: 'patagonia-chile',
    designer: {
      name: 'Elena Rostova',
      role: 'Expedition & Wilderness Specialist',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      quote: 'Patagonia possesses a raw grandeur that strips away modern distraction, replacing it with sheer awe.'
    },
    dayByDay: [
      {
        day: 1,
        title: 'Arrival in Punta Arenas & Transfer to Tierra Patagonia',
        location: 'Lake Sarmiento',
        description: 'Private charter flight from Santiago to Punta Arenas. Chauffeur transfer along vast pampas to the curved wooden sanctuary of Tierra Patagonia.',
        highlight: 'Sunset viewing of Torres del Paine granite horns reflected in Lake Sarmiento.',
        accommodation: 'Tierra Patagonia (Suite Suite)',
        meals: 'Dinner included'
      },
      {
        day: 2,
        title: 'Puma Tracking Expedition with Field Biologists',
        location: 'Torres del Paine National Park',
        description: 'Dawn search with experienced puma trackers using telephoto optic gear. Track wild pumas hunting guanacos across golden grasslands.',
        highlight: 'Safe, ethical observation of a mother puma and her cubs.',
        accommodation: 'Tierra Patagonia',
        meals: 'Breakfast, Trail Lunch & Dinner included'
      },
      {
        day: 3,
        title: 'Private Catamaran Navigation to Glacier Grey',
        location: 'Grey Lake & Ice Field',
        description: 'Board a private catamaran to sail among massive electric-blue icebergs floating in Grey Lake. Strap on crampons for a private glacier ice-walk.',
        highlight: 'Whiskey served over 10,000-year-old glacier ice carved directly off the iceberg.',
        accommodation: 'Tierra Patagonia',
        meals: 'Breakfast & Glacier Picnic Lunch included'
      },
      {
        day: 4,
        title: 'French Valley Heli-Hiking Sanctuary',
        location: 'French Valley',
        description: 'Helicopter transfer into the heart of the French Valley. Hike surrounded by hanging glaciers and roaring ice avalanches high above.',
        highlight: '360-degree panoramic view of the Cuernos del Paine granite pinnacles.',
        accommodation: 'Explora Patagonia (Suite Exploradores)',
        meals: 'Breakfast & Gourmet Trail Lunch included'
      },
      {
        day: 5,
        title: 'Gaucho Culture & Traditional Asado Roast',
        location: 'Estancia Cerro Guido',
        description: 'Spend the day at a historic 100,000-acre working sheep estancia. Ride Creole horses with local Gauchos across open windswept hills.',
        highlight: 'Traditional Patagonian Asado lamb roasted over open fire pit.',
        accommodation: 'Explora Patagonia',
        meals: 'Breakfast, Asado Lunch & Dinner included'
      },
      {
        day: 6,
        title: 'Chilean Fjords Hydrofoil Cruise',
        location: 'Ultima Esperanza Fjord',
        description: 'Board a high-speed private hydrofoil to navigate the fjord of Last Hope. Visit Balmaceda and Serrano glaciers inaccessible by land.',
        highlight: 'Private wine tasting of Carménère while surrounded by weeping waterfalls.',
        accommodation: 'Singular Patagonia (Heritage Suite)',
        meals: 'Breakfast & Fjord Lunch included'
      },
      {
        day: 7,
        title: 'Sarmiento Lake Kayak Expedition',
        location: 'Lake Sarmiento',
        description: 'Glide in silent sea kayaks across cyan waters framed by ancient thrombolite rock formations formed over millions of years.',
        highlight: 'Spotting Andean Condors soaring above your kayak.',
        accommodation: 'Singular Patagonia',
        meals: 'Breakfast & Dinner included'
      },
      {
        day: 8,
        title: 'Southern Ice Field Flying Excursion',
        location: 'Southern Patagonian Ice Field',
        description: 'Take to the skies in a twin-engine plane over the third largest ice field on planet Earth. Marvel at endless ice rivers reaching the horizon.',
        highlight: 'Aerial photography flight over unmapped mountain peaks.',
        accommodation: 'Singular Patagonia',
        meals: 'Breakfast, Lunch & Dinner included'
      },
      {
        day: 9,
        title: 'Spa & Hydrotherapy Relaxation',
        location: 'Singular Spa Sanctuary',
        description: 'Unwind after high-altitude adventures with heated basalt stone massages, outdoor infinity hot tubs, and Chilean wine pairings.',
        highlight: 'Private evening hydrotherapy circuit overlooking the fjord.',
        accommodation: 'Singular Patagonia',
        meals: 'Breakfast & Farewell Dinner included'
      },
      {
        day: 10,
        title: 'Homeward Journey',
        location: 'Punta Arenas to Santiago',
        description: 'Morning transfer to Punta Arenas airport for your connecting flight to Santiago.',
        highlight: 'Custom wooden Patagonian wool throw blanket gift.',
        accommodation: 'N/A',
        meals: 'Breakfast included'
      }
    ]
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-of-unhurried-travel',
    slug: 'art-of-unhurried-travel',
    title: 'The Art of Unhurried Travel: Why Modern Luxury is Measured in Silence',
    excerpt: 'In an era of hyper-connectivity, the ultimate luxury is no longer speed or spectacle — it is undisturbed space, time, and stillness.',
    category: 'Philosophy',
    readTime: '5 min read',
    date: 'July 14, 2026',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    author: 'Aurelio Editorial Team',
    content: [
      'Travel was once about distance; today, it is about depth. True luxury travel is not measured by the number of countries checked off a bucket list, but by the stillness of moments preserved in memory.',
      'When you step into a 400-year-old Zen garden in Kyoto after hours, with only the rustle of red maple leaves breaking the silence, the velocity of modern life drops away completely.',
      'Our approach to travel design rests on a simple conviction: the traveler’s time is sacred. Every itinerary we compose is engineered to eliminate friction, allowing awe to take center stage.'
    ]
  },
  {
    id: 'kyoto-secret-autumn',
    slug: 'kyoto-secret-autumn',
    title: 'Beyond the Gates: Kyoto’s Private Autumn Illuminations',
    excerpt: 'Inside the historic sub-temples of Higashiyama that open their wooden doors exclusively after nightfall.',
    category: 'Destination Focus',
    readTime: '7 min read',
    date: 'June 28, 2026',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    author: 'Kenji Takahashi',
    content: [
      'To witness Kyoto in autumn is a rite of passage. Yet to witness it in solitary quiet — lit by soft stone lanterns beneath a canopy of fiery Japanese maples — is a privilege reserved for very few.',
      'Through generations of trust built with temple custodians and tea masters, Aurelio Journeys unlocks private evening access to Zen sanctuaries normally sealed at 5 PM.',
      'Here, over freshly whisked matcha served in centuries-old raku bowls, the timeless spirit of old Japan breathes anew.'
    ]
  },
  {
    id: 'patagonia-ice-and-architecture',
    slug: 'patagonia-ice-and-architecture',
    title: 'Sanctuaries of Wood and Wind: Architecture on the Patagonian Pampas',
    excerpt: 'How Chile’s visionaries designed eco-lodges that blend seamlessly into windswept steppe landscapes.',
    category: 'Architecture & Design',
    readTime: '6 min read',
    date: 'May 19, 2026',
    image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1200&auto=format&fit=crop',
    author: 'Elena Rostova',
    content: [
      'Standing before Lake Sarmiento, Tierra Patagonia appears not as a building, but as a fossilized wooden curve shaped by decades of Patagonian wind.',
      'Inside, lenga wood beams, sheepskin rugs, and floor-to-ceiling glass frame the jagged granite horns of Torres del Paine like living works of art.',
      'This is architecture in dialogue with nature — warm, protective, and deeply humbling.'
    ]
  }
];

/* Helper Lookup Functions */
export const getDestinationBySlug = (slug: string): Destination | undefined => {
  return DESTINATIONS_DATA.find((d) => d.slug === slug);
};

export const getJourneyBySlug = (slug: string): Journey | undefined => {
  return JOURNEYS_DATA.find((j) => j.slug === slug || j.id === slug);
};

export const getJournalBySlug = (slug: string): JournalArticle | undefined => {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug || a.id === slug);
};
