import { Candidate } from '../types';
import agataImg from '../assets/images/agata_chlop.jpg';
import aniaLigezaImg from '../assets/images/ania_l_chlop.jpg';
import aniaMytychImg from '../assets/images/ania_m_chlop.jpg';
import kasiaGalonImg from '../assets/images/kasia_g_chlop.jpg';
import kasiaPietrucImg from '../assets/images/kasia_p_chlop.jpg';
import klaudiaMaciagImg from '../assets/images/klaudia_chlop.jpg';
import kobierskaImg from '../assets/images/kobierska_chlop.jpg';
import magdaTomImg from '../assets/images/magda_chlop.jpg';
import mariaTomImg from '../assets/images/maria_chlop.jpg';
import martaTomImg from '../assets/images/marta_t_chlop.jpg';
import martaImg from '../assets/images/marta_chlop.jpg';
import pysiaImg from '../assets/images/pysia_chlop.jpg';

import agataRealImg from '../assets/images/agata_baba.jpg';
import aniaLigezaRealImg from '../assets/images/ania_l_baba.jpeg';
import aniaMytychRealImg from '../assets/images/ania_m_baba.jpg';
import kasiaGalonRealImg from '../assets/images/kasia_g_baba.jpg';
import kasiaPietrucRealImg from '../assets/images/kasia_p_baba.jpg';
import klaudiaMaciagRealImg from '../assets/images/klaudia_baba.jpg';
import kobierskaRealImg from '../assets/images/kobierska_baba.jpg';
import magdaTomRealImg from '../assets/images/magda_baba.jpeg';
import mariaTomRealImg from '../assets/images/maria_baba.jpeg';
import martaTomRealImg from '../assets/images/marta_t_baba.jpg';
import martaRealImg from '../assets/images/marta_baba.jpg';
import pysiaRealImg from '../assets/images/pysia_baba.jpg';

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'candidate-agata',
    fakeName: 'Paweł',
    fakeAge: 28,
    fakeJob: 'Prawnik',
    fakeLocation: 'Warszawa',
    fakeBio:
      'Prawnik, ale spokojnie – nie będę analizował regulaminu randki. Padel, boks i włoska kuchnia to mój sposób na dobry wieczór. ⚖️🍝',
    fakePhotoUrl: agataImg,
    realName: 'Agata',
    realAge: 28,
    realRole: 'Królowa Szos i Dobrego Stylu 🚗✨',
    realQuote: 'Zawsze gotowa na spontaniczny wypad i wyśmienitą zabawę do rana!',
    realPhotoUrl: agataRealImg,
  },

  {
    id: 'candidate-ania-ligeza',
    fakeName: 'Adrian',
    fakeAge: 31,
    fakeJob: 'Trener personalny',
    fakeLocation: 'Kraków',
    fakeBio:
      'Buduję firmę wokół sportu i zdrowego stylu życia, a po godzinach uciekam w Karkonosze. Brakuje mi tylko kogoś do nieplanowanego wieczoru. 🏔️',
    fakePhotoUrl: aniaLigezaImg,
    realName: 'Ania L.',
    realAge: 27,
    realRole: 'Wulkan Pozytywnej Energii ⚡💖',
    realQuote: 'Uśmiech numer jeden i niezastąpiona dusza każdego towarzystwa!',
    realPhotoUrl: aniaLigezaRealImg,
  },

  {
    id: 'candidate-ania-mytych',
    fakeName: 'Wojtek',
    fakeAge: 29,
    fakeJob: 'Doktorant fizyki',
    fakeLocation: 'Wrocław',
    fakeBio:
      'Na co dzień badam rzeczy, których nie da się zobaczyć. Po godzinach czytam, gram jazz i szukam chemii, której fizyka jeszcze nie wyjaśniła. 🎷🔬',
    fakePhotoUrl: aniaMytychImg,
    realName: 'Ania M.',
    realAge: 27,
    realRole: 'Mistrzyni Błyskotliwego Humoru 🤓🎉',
    realQuote: 'Z nią nie ma nudy — rozbawi każdego w 3 sekundy!',
    realPhotoUrl: aniaMytychRealImg,
  },

  {
    id: 'candidate-kasia-galon',
    fakeName: 'Tomek',
    fakeAge: 28,
    fakeJob: 'Szef kuchni',
    fakeLocation: 'Poznań',
    fakeBio:
      'Gotuję zawodowo, ale najbardziej lubię, gdy kuchnia zamienia się w pretekst do długiej kolacji i wina. Kto usiądzie naprzeciwko? 🍷',
    fakePhotoUrl: kasiaGalonImg,
    realName: 'Kasia G.',
    realAge: 26,
    realRole: 'Czarująca Romantyczka 💐🌸',
    realQuote: 'Rozdaje najszczersze uśmiechy, kwiaty i najcieplejsze komplementy!',
    realPhotoUrl: kasiaGalonRealImg,
  },

  {
    id: 'candidate-kasia-pietruc',
    fakeName: 'Mateusz',
    fakeAge: 25,
    fakeJob: 'DJ & producent muzyki',
    fakeLocation: 'Gdańsk / Trójmiasto',
    fakeBio:
      'Gram, komponuję i czasem znikam w studiu na całe dnie. Nie obiecuję muzyki na pierwszej randce, ale druga będzie miała lepszy soundtrack. 🎧',
    fakePhotoUrl: kasiaPietrucImg,
    realName: 'Kasia P.',
    realAge: 26,
    realRole: 'Królowa Charyzmy & Stylu 🔥🕶️',
    realQuote: 'Magnetyczne spojrzenie i styl, którego po prostu nie da się podrobić!',
    realPhotoUrl: kasiaPietrucRealImg,
  },

  {
    id: 'candidate-klaudia-maciag',
    fakeName: 'Krzysiek',
    fakeAge: 31,
    fakeJob: 'Pilot',
    fakeLocation: 'Warszawa / Zanzibar',
    fakeBio:
      'Zawodowo latam, prywatnie też lubię wysoko stawiać poprzeczkę. Masz paszport i odrobinę odwagi? Sprawdźmy, dokąd nas to zaprowadzi. ✈️🌴',
    fakePhotoUrl: klaudiaMaciagImg,
    realName: 'Klaudia',
    realAge: 28,
    realRole: 'Plażowa Bogini & Fanka Podróży 🌴🌊',
    realQuote: 'Zawsze przywozi słońce, brązową opaleniznę i tropikalny nastrój!',
    realPhotoUrl: klaudiaMaciagRealImg,
  },

  {
    id: 'candidate-kobierska',
    fakeName: 'Kuba',
    fakeAge: 28,
    fakeJob: 'Architekt IT | McKinsey',
    fakeLocation: 'Podlasie / Warszawa',
    fakeBio:
      'Po latach w korporacji łapię oddech na Podlasiu, pomagając rodzicom przy stadninie koni. Ambitny z natury i chyba trochę romantyk. 🐎',
    fakePhotoUrl: kobierskaImg,
    realName: 'Kobierska',
    realAge: 27,
    realRole: 'Klasa, Szyk i Elegancja 💎🍸',
    realQuote: 'Zimna krew, wielkie serce i niezachwiany wdzięk w każdej sytuacji!',
    realPhotoUrl: kobierskaRealImg,
  },

  {
    id: 'candidate-magda-tom',
    fakeName: 'Krystian',
    fakeAge: 28,
    fakeJob: 'Key Account Manager | EY',
    fakeLocation: 'Warszawa',
    fakeBio:
      'W tygodniu garnitur i lotniska, w weekend pies i trasa rowerowa. Docelowo: domek na wsi i ktoś, dla kogo warto wracać z delegacji. 🚲',
    fakePhotoUrl: magdaTomImg,
    realName: 'Magda',
    realAge: 27,
    realRole: 'Królowa Miejskiego Szyku 🌆🍹',
    realQuote: 'Każde zwykłe wyjście na miasto zamienia w niezapomnianą przygodę!',
    realPhotoUrl: magdaTomRealImg,
  },

  {
    id: 'candidate-maria-tom',
    fakeName: 'Mikołaj',
    fakeAge: 32,
    fakeJob: 'Barman & Sommelier',
    fakeLocation: 'Kraków',
    fakeBio:
      'Hiszpania, Włochy, Portugalia, Australia – 4 języki i za dużo historii na jedną rozmowę. Gotuję naprawdę dobrze i mam plan: kolację i dobre whisky. 🍷',
    fakePhotoUrl: mariaTomImg,
    realName: 'Maria',
    realAge: 26,
    realRole: 'Bistro Guru & Mistrzyni Toastów ☕🍷',
    realQuote: 'Królowa aperitifów i najgłębszych rozmów do białego rana!',
    realPhotoUrl: mariaTomRealImg,
  },

  {
    id: 'candidate-marta-tom',
    fakeName: 'Maciek',
    fakeAge: 30,
    fakeJob: 'Project Manager',
    fakeLocation: 'Poznań',
    fakeBio:
      'Ambitny w pracy, ale najbardziej cenię moment, gdy na pierwszy plan wraca dom i wspólna kolacja. Wszystko zaczyna się od relacji. 🥂',
    fakePhotoUrl: martaTomImg,
    realName: 'Marta T.',
    realAge: 28,
    realRole: 'Mistrzyni Parkietu & Uroku 💃✨',
    realQuote: 'Kiedy wchodzi na parkiet, cała sala robi jej miejsce!',
    realPhotoUrl: martaTomRealImg,
  },

  {
    id: 'candidate-marta',
    fakeName: 'Aleksander',
    fakeAge: 27,
    fakeJob: 'Fotograf & Twórca wideo',
    fakeLocation: 'Katowice / Śląsk',
    fakeBio:
      'Łapię kadry i ulotne momenty w podróży. W weekendy górskie szlaki albo kajak. Kawa i spacer bez patrzenia na zegarek – napisz. 📸',
    fakePhotoUrl: martaImg,
    realName: 'Marta',
    realAge: 27,
    realRole: 'Promienna Gwiazda Imprezy 🌟🥳',
    realQuote: 'Czyste złoto i niezastąpiona przyjaciółka na każdą pogodę!',
    realPhotoUrl: martaRealImg,
  },

  {
    id: 'candidate-pysia',
    fakeName: 'Filip',
    fakeAge: 29,
    fakeJob: 'Architekt krajobrazu',
    fakeLocation: 'Zakopane / Warszawa',
    fakeBio:
      'Złoty chłopak z zamiłowaniem do architektury i szybkiej jazdy. Zawsze mam w kieszeni plan B i bilet na festiwal. 🏎️🎶',
    fakePhotoUrl: pysiaImg,
    realName: 'Pysia',
    realAge: 26,
    realRole: 'Królowa Wieczoru Panieńskiego 👑💄',
    realQuote: 'Charyzma, wdzięk i absolutnie zero kompromisów na parkiecie!',
    realPhotoUrl: pysiaRealImg,
  },
];