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
    fakeJob: 'Project Manager',
    fakeLocation: 'Warszawa',
    fakeBio:
      'Ambitny w pracy, ale najbardziej cenię moment, gdy na pierwszy plan wraca dom i wspólna kolacja. 🥂 Wszystko zaczyna się od relacji.',
    fakePhotoUrl: agataImg,
    realName: 'Agata',
    realAge: 28,
    realRole: 'Królowa Szos i Dobrego Stylu 🚗✨',
    realPhotoUrl: agataRealImg,
  },

  {
    id: 'candidate-ania-ligeza',
    fakeName: 'Adrian',
    fakeAge: 31,
    fakeJob: 'Trener personalny',
    fakeLocation: 'Kraków',
    fakeBio:
      'Buduję firmę wokół sportu i zdrowego stylu życia 💪, a po godzinach uciekam w Karkonosze. Brakuje mi tylko kogoś do nieplanowanego wieczoru.',
    fakePhotoUrl: aniaLigezaImg,
    realName: 'Ania L.',
    realAge: 27,
    realRole: 'Wulkan Pozytywnej Energii ⚡💖',
    realPhotoUrl: aniaLigezaRealImg,
  },

  {
    id: 'candidate-ania-mytych',
    fakeName: 'Wojtek',
    fakeAge: 29,
    fakeJob: 'Doktorant fizyki',
    fakeLocation: 'Wrocław',
    fakeBio:
      'Na co dzień badam rzeczy, których nie da się zobaczyć 🔬. Po godzinach czytam, gram jazz 🎷 i szukam chemii, której fizyka jeszcze nie wyjaśniła.',
    fakePhotoUrl: aniaMytychImg,
    realName: 'Ania M.',
    realAge: 27,
    realRole: 'Mistrzyni Błyskotliwego Humoru 🤓🎉',
    realPhotoUrl: aniaMytychRealImg,
  },

  {
    id: 'candidate-kasia-galon',
    fakeName: 'Tomek',
    fakeAge: 28,
    fakeJob: 'Szef kuchni',
    fakeLocation: 'Poznań',
    fakeBio:
      'Gotuję zawodowo, ale najbardziej lubię, gdy kuchnia zamienia się w pretekst do długiej kolacji 🍷 i dobrego jedzenia. Kto usiądzie naprzeciwko?',
    fakePhotoUrl: kasiaGalonImg,
    realName: 'Kasia G.',
    realAge: 26,
    realRole: 'Czarująca Romantyczka 💐🌸',
    realPhotoUrl: kasiaGalonRealImg,
  },

  {
    id: 'candidate-kasia-pietruc',
    fakeName: 'Mateusz',
    fakeAge: 25,
    fakeJob: 'Barman',
    fakeLocation: 'Gdańsk / Trójmiasto',
    fakeBio:
      'Lubię dobrą atmosferę, ciekawe rozmowy i ludzi, którzy nie boją się spróbować czegoś nowego 🍸. Po pracy najchętniej odkrywam nowe miejsca i testuję kolejne smaki.',
    fakePhotoUrl: kasiaPietrucImg,
    realName: 'Kasia P.',
    realAge: 26,
    realRole: 'Królowa Charyzmy & Stylu 🔥🕶️',
    realPhotoUrl: kasiaPietrucRealImg,
  },

  {
    id: 'candidate-klaudia-maciag',
    fakeName: 'Krzysiek',
    fakeAge: 31,
    fakeJob: 'Agent Nieruchomości',
    fakeLocation: 'Warszawa / Zanzibar',
    fakeBio:
      'Na co dzień pomagam ludziom znaleźć ich miejsce na ziemi 🏠. Po pracy najchętniej uciekam w podróże i odkrywam nowe miejsca. Może kiedyś znajdziemy coś razem?',
    fakePhotoUrl: klaudiaMaciagImg,
    realName: 'Klaudia',
    realAge: 28,
    realRole: 'Plażowa Bogini & Fanka Podróży 🌴🌊',
    realPhotoUrl: klaudiaMaciagRealImg,
  },

  {
    id: 'candidate-kobierska',
    fakeName: 'Kuba',
    fakeAge: 28,
    fakeJob: 'Pilot',
    fakeLocation: 'Podlasie / Warszawa',
    fakeBio:
      'Zawodowo latam ✈️, a prywatnie nie potrafię długo usiedzieć w jednym miejscu. Podróże, spontaniczne wypady i dobra kawa brzmią jak dobry plan.',
    fakePhotoUrl: kobierskaImg,
    realName: 'Kobierska',
    realAge: 27,
    realRole: 'Klasa, Szyk i Elegancja 💎🍸',
    realPhotoUrl: kobierskaRealImg,
  },

  {
    id: 'candidate-magda-tom',
    fakeName: 'Mikołaj',
    fakeAge: 28,
    fakeJob: 'Architekt',
    fakeLocation: 'Warszawa',
    fakeBio:
      'Projektuję przestrzenie, w których dobrze się żyje 🏠. Po pracy najchętniej szukam inspiracji, dobrej kawy i miejsc, do których chce się wracać.',
    fakePhotoUrl: magdaTomImg,
    realName: 'Magda',
    realAge: 27,
    realRole: 'Królowa Miejskiego Szyku 🌆🍹',
    realPhotoUrl: magdaTomRealImg,
  },

  {
    id: 'candidate-maria-tom',
    fakeName: 'Krystian',
    fakeAge: 32,
    fakeJob: 'DJ & producent muzyki',
    fakeLocation: 'Kraków',
    fakeBio:
      'Gram, komponuję i czasem znikam w studiu na całe dnie 🎧. Nie obiecuję muzyki na pierwszej randce, ale druga będzie miała lepszy soundtrack.',
    fakePhotoUrl: mariaTomImg,
    realName: 'Maria',
    realAge: 26,
    realRole: 'Bistro Guru & Mistrzyni Toastów ☕🍷',
    realPhotoUrl: mariaTomRealImg,
  },

  {
    id: 'candidate-marta-tom',
    fakeName: 'Maciek',
    fakeAge: 30,
    fakeJob: 'Fotograf',
    fakeLocation: 'Poznań',
    fakeBio:
      'Najbardziej lubię łapać momenty, których nie da się zaplanować 📸. Po pracy aparat często zabieram na spacer albo spontaniczny wyjazd. Dobra kawa i ciekawa osoba zawsze mile widziane.',
    fakePhotoUrl: martaTomImg,
    realName: 'Marta T.',
    realAge: 28,
    realRole: 'Mistrzyni Parkietu & Uroku 💃✨',
    realPhotoUrl: martaTomRealImg,
  },

  {
    id: 'candidate-marta',
    fakeName: 'Aleksander',
    fakeAge: 27,
    fakeJob: 'Prawnik',
    fakeLocation: 'Katowice / Śląsk',
    fakeBio:
      'Na co dzień żyję między paragrafami ⚖️, ale po pracy zdecydowanie wolę góry, dobrą rozmowę i spontaniczne plany. Kawa i spacer bez patrzenia na zegarek – napisz.',
    fakePhotoUrl: martaImg,
    realName: 'Marta',
    realAge: 27,
    realRole: 'Promienna Gwiazda Imprezy 🌟🥳',
    realPhotoUrl: martaRealImg,
  },

  {
    id: 'candidate-pysia',
    fakeName: 'Filip',
    fakeAge: 29,
    fakeJob: 'Key Account Manager | EY',
    fakeLocation: 'Zakopane / Warszawa',
    fakeBio:
      'W pracy dbam o dobre relacje z klientami 🤝, a po godzinach najbardziej cenię aktywny reset. Pies, rower i spontaniczny wyjazd brzmią lepiej niż kolejny wieczór przy laptopie.',
    fakePhotoUrl: pysiaImg,
    realName: 'Pysia',
    realAge: 26,
    realRole: 'Królowa Wieczoru Panieńskiego 👑💄',
    realPhotoUrl: pysiaRealImg,
  },
];