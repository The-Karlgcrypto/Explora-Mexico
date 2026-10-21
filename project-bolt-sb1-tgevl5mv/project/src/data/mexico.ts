export interface Destination {
  id: string;
  name: string;
  stateId: string;
  image: string;
  description: string;
  location: string;
  activities: string[];
  costs: {
    entrada: string;
    transporte: string;
    comida: string;
    hospedaje: string;
  };
}

export interface State {
  id: string;
  name: string;
  tagline: string;
  image: string;
  color: string;
}

export const states: State[] = [
  {
    id: 'oaxaca',
    name: 'Oaxaca',
    tagline: 'Tierra de tradiciones y sabores ancestrales',
    image:
      'https://images.pexels.com/photos/19586637/pexels-photo-19586637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#F4A582',
  },
  {
    id: 'yucatan',
    name: 'Yucatán',
    tagline: 'El corazón de la cultura maya',
    image:
      'https://images.pexels.com/photos/28121859/pexels-photo-28121859.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#A7C7E7',
  },
  {
    id: 'puebla',
    name: 'Puebla',
    tagline: 'Ángeles, talavera y barroco por descubrir',
    image:
      'https://images.pexels.com/photos/27141450/pexels-photo-27141450.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#F6B6C3',
  },
  {
    id: 'veracruz',
    name: 'Veracruz',
    tagline: 'El portal caribeño con ritmo de son',
    image:
      'https://images.pexels.com/photos/13796653/pexels-photo-13796653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#A8DADC',
  },
  {
    id: 'jalisco',
    name: 'Jalisco',
    tagline: 'Cuna del tequila y el mariachi',
    image:
      'https://images.pexels.com/photos/16152936/pexels-photo-16152936.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#F7D794',
  },
  {
    id: 'guanajuato',
    name: 'Guanajuato',
    tagline: 'Una paleta de color entre las montañas',
    image:
      'https://images.pexels.com/photos/12433849/pexels-photo-12433849.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#F8B739',
  },
  {
    id: 'cdmx',
    name: 'Ciudad de México',
    tagline: 'Capital vibrante, mil años de historia',
    image:
      'https://images.pexels.com/photos/20031519/pexels-photo-20031519.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#C7B8E0',
  },
];

export const destinations: Destination[] = [
  {
    id: 'monte-alban',
    name: 'Monte Albán',
    stateId: 'oaxaca',
    image:
      'https://images.pexels.com/photos/30266265/pexels-photo-30266265.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Antigua ciudad zapoteca declarada Patrimonio de la Humanidad. Sus pirámides y observatorio dominan el valle de Oaxaca desde lo alto de una montaña nivelada a mano.',
    location: 'Valle de Etla, Oaxaca — a 9 km de la ciudad de Oaxaca',
    activities: ['Tour arqueológico', 'Caminata panorámica', 'Visita guiada', 'Fotografía'],
    costs: {
      entrada: '$85 MXN',
      transporte: '$120 MXN (taxi desde el centro)',
      comida: '$150 MXN',
      hospedaje: '$600 MXN por noche',
    },
  },
  {
    id: 'hierve-el-agua',
    name: 'Hierve el Agua',
    stateId: 'oaxaca',
    image:
      'https://images.pexels.com/photos/37904583/pexels-photo-37904583.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Cascadas petrificadas únicas en el mundo, formadas por agua mineral calcárea. Sus albercas naturales se asoman sobre un acantilado con vista al valle.',
    location: 'San Pablo Mitla, Oaxaca — a 70 km de la ciudad',
    activities: ['Natación en albercas naturales', 'Caminata', 'Tour en bicicleta', 'Fotografía'],
    costs: {
      entrada: '$50 MXN',
      transporte: '$250 MXN (transporte local)',
      comida: '$120 MXN',
      hospedaje: '$500 MXN por noche',
    },
  },
  {
    id: 'chichen-itza',
    name: 'Chichén Itzá',
    stateId: 'yucatan',
    image:
      'https://images.pexels.com/photos/28121872/pexels-photo-28121872.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Una de las Nuevas Siete Maravillas del Mundo. El templo de Kukulcán proyecta la sombra de una serpiente cada equinoccio, obra maestra de la astronomía maya.',
    location: 'Tinum, Yucatán — a 120 km de Mérida',
    activities: ['Tour arqueológico', 'Espectáculo nocturno', 'Visita guiada', 'Fotografía'],
    costs: {
      entrada: '$272 MXN',
      transporte: '$300 MXN (autobús desde Mérida)',
      comida: '$200 MXN',
      hospedaje: '$900 MXN por noche',
    },
  },
  {
    id: 'cenote-ik-kil',
    name: 'Cenote Ik Kil',
    stateId: 'yucatan',
    image:
      'https://images.pexels.com/photos/29438748/pexels-photo-29438748.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Cenote a cielo abierto de 40 metros de profundidad, rodeado de vegetación y raíces que descienden hasta el agua turquesa. Un remanso sagrado para los mayas.',
    location: 'Pisté, Yucatán — a 3 km de Chichén Itzá',
    activities: ['Natación', 'Salto desde plataformas', 'Relajación', 'Fotografía'],
    costs: {
      entrada: '$200 MXN',
      transporte: '$150 MXN',
      comida: '$180 MXN',
      hospedaje: '$800 MXN por noche',
    },
  },
  {
    id: 'centro-historico-puebla',
    name: 'Centro Histórico de Puebla',
    stateId: 'puebla',
    image:
      'https://images.pexels.com/photos/19676097/pexels-photo-19676097.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Patrimonio de la Humanidad. Catedral barroca, calles de talavera y el colorido mercado El Parián conviven en una ciudad fundada en 1531 entre volcanes.',
    location: 'Puebla de Zaragoza, Puebla',
    activities: ['Tour cultural', 'Gastronomía', 'Compras de artesanías', 'Visita a museos'],
    costs: {
      entrada: 'Gratis (catedral con donativo)',
      transporte: '$50 MXN (urbano)',
      comida: '$180 MXN',
      hospedaje: '$700 MXN por noche',
    },
  },
  {
    id: 'cholula',
    name: 'Cholula',
    stateId: 'puebla',
    image:
      'https://images.pexels.com/photos/17404639/pexels-photo-17404639.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'La pirámide más grande del mundo por volumen, coronada por la Iglesia de Nuestra Señora de los Remedios. Sus túneles internos recorren el interior de la gran plataforma.',
    location: 'San Pedro Cholula, Puebla — a 15 km del centro',
    activities: ['Tour arqueológico', 'Túneles de la pirámide', 'Gastronomía', 'Fotografía'],
    costs: {
      entrada: '$95 MXN',
      transporte: '$60 MXN',
      comida: '$150 MXN',
      hospedaje: '$650 MXN por noche',
    },
  },
  {
    id: 'costa-esmeralda',
    name: 'Costa Esmeralda',
    stateId: 'veracruz',
    image:
      'https://images.pexels.com/photos/11674785/pexels-photo-11674785.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Tramo costero de playas de arena dorada y palmeras, junto a la Laguna de Mandinga. Ideal para escapar del bullicio del puerto de Veracruz.',
    location: 'Actopan, Veracruz — a 40 km del puerto',
    activities: ['Natación', 'Kayak', 'Comida de mar', 'Atardecer'],
    costs: {
      entrada: 'Gratis',
      transporte: '$200 MXN',
      comida: '$220 MXN',
      hospedaje: '$750 MXN por noche',
    },
  },
  {
    id: 'zocalo-veracruz',
    name: 'Zócalo y Malecón de Veracruz',
    stateId: 'veracruz',
    image:
      'https://images.pexels.com/photos/16759581/pexels-photo-16759581.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Corazón portuario con música de son jarocho en cada esquina. El malecón recorre la bahía y el faro mira sobre el Golfo de México.',
    location: 'Veracruz, Veracruz',
    activities: ['Paseo peatonal', 'Música en vivo', 'Café lechero', 'Tour histórico'],
    costs: {
      entrada: 'Gratis',
      transporte: '$40 MXN (urbano)',
      comida: '$200 MXN',
      hospedaje: '$680 MXN por noche',
    },
  },
  {
    id: 'guadalajara-centro',
    name: 'Centro Histórico de Guadalajara',
    stateId: 'jalisco',
    image:
      'https://images.pexels.com/photos/4673308/pexels-photo-4673308.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Catedral gótica, el Hospicio Cabañas con murales de Orozco y la Rotonda de los Jaliscienses Ilustres. El mariachi nació en estas plazas.',
    location: 'Guadalajara, Jalisco',
    activities: ['Tour cultural', 'Murales de Orozco', 'Noche de mariachi', 'Gastronomía'],
    costs: {
      entrada: '$90 MXN (Hospicio Cabañas)',
      transporte: '$50 MXN (tren ligero)',
      comida: '$190 MXN',
      hospedaje: '$820 MXN por noche',
    },
  },
  {
    id: 'tequila',
    name: 'Tequila, Pueblo Mágico',
    stateId: 'jalisco',
    image:
      'https://images.pexels.com/photos/29223501/pexels-photo-29223501.png?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Cuna mundial del tequila, entre campos azules de agave declarados Patrimonio de la Humanidad. Destilerías centenarias y el Volcán de Tequila de fondo.',
    location: 'Tequila, Jalisco — a 60 km de Guadalajara',
    activities: ['Tour de destilería', 'Cata de tequila', 'Tren José Cuervo Express', 'Caminata'],
    costs: {
      entrada: '$200 MXN (tour)',
      transporte: '$400 MXN (Tren Express)',
      comida: '$250 MXN',
      hospedaje: '$900 MXN por noche',
    },
  },
  {
    id: 'guanajuato-centro',
    name: 'Centro Histórico de Guanajuato',
    stateId: 'guanajuato',
    image:
      'https://images.pexels.com/photos/16624775/pexels-photo-16624775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Ciudad colonial de callejones empedrados, plazas escondidas y túneles subterráneos. El Teatro Juárez y la Basílica dominan el corazón Patrimonio de la Humanidad.',
    location: 'Guanajuato, Guanajuato',
    activities: ['Callejoneada', 'Tour de museos', 'Cultura del Quijote', 'Fotografía'],
    costs: {
      entrada: '$60 MXN (museos)',
      transporte: '$50 MXN (urbano)',
      comida: '$180 MXN',
      hospedaje: '$780 MXN por noche',
    },
  },
  {
    id: 'mole-de-xico',
    name: 'Mina de La Valenciana',
    stateId: 'guanajuato',
    image:
      'https://images.pexels.com/photos/33112457/pexels-photo-33112457.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Mina de plata que financió la Nueva España durante siglos. La iglesia de San Cayetano brilla con pan de oro frente a las bocas del socavón.',
    location: 'La Valenciana, Guanajuato — a 6 km del centro',
    activities: ['Tour minero', 'Visita a templo', 'Historia colonial', 'Vista panorámica'],
    costs: {
      entrada: '$120 MXN',
      transporte: '$100 MXN',
      comida: '$170 MXN',
      hospedaje: '$780 MXN por noche',
    },
  },
  {
    id: 'zocalo-cdmx',
    name: 'Zócalo y Centro Histórico',
    stateId: 'cdmx',
    image:
      'https://images.pexels.com/photos/20031519/pexels-photo-20031519.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Plaza mayor más grande de América. La Catedral Metropolitana y los edificios del Templo Mayor conviven sobre las ruinas de Tenochtitlan, la antigua capital mexica.',
    location: 'Cuauhtémoc, Ciudad de México',
    activities: ['Tour histórico', 'Templo Mayor', 'Museos', 'Gastronomía'],
    costs: {
      entrada: '$90 MXN (Templo Mayor)',
      transporte: '$30 MXN (metro)',
      comida: '$150 MXN',
      hospedaje: '$950 MXN por noche',
    },
  },
  {
    id: 'xochimilco',
    name: 'Xochimilco',
    stateId: 'cdmx',
    image:
      'https://images.pexels.com/photos/16977385/pexels-photo-16977385.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Sistema de canales declarado Patrimonio de la Humanidad, herencia de las chinampas prehispánicas. Pasea en trajinera con mariachi y comida al ritmo del agua.',
    location: 'Xochimilco, Ciudad de México — al sur de la ciudad',
    activities: ['Paseo en trajinera', 'Música en vivo', 'Comida a bordo', 'Chinampas'],
    costs: {
      entrada: 'Gratis (trajinera $500 MXN/hora)',
      transporte: '$80 MXN',
      comida: '$220 MXN',
      hospedaje: '$880 MXN por noche',
    },
  },
];
