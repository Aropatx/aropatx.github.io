/* =========================================================
   LISTA APLIKACJI — tu dodajesz kolejne aplikacje
   ---------------------------------------------------------
   Aby dodać nową aplikację:
   1. Wrzuć ikonę (PNG, najlepiej 512×512 lub większą) do folderu strony.
   2. Skopiuj jeden z obiektów poniżej, wklej na końcu listy i zmień pola.
   3. Gotowe — aplikacja pojawi się w bibliotece i dostanie własną stronę
      pod adresem  #/<id>  (np. #/replay).

   Pola:
   - id            unikalny identyfikator w adresie (małe litery, myślniki)
   - name          nazwa aplikacji
   - icon          plik ikony
   - colors        dwa kolory akcentu [główny, drugi] — banner, przycisk, poświata
   - repo          repozytorium GitHub "właściciel/nazwa" (wersja, rozmiar i data
                   wydania są pobierane automatycznie z najnowszego wydania)
   - asset         nazwa pliku instalatora w wydaniu
   - fallbackVersion  wersja pokazywana, gdy GitHub nie odpowie
   - tagline       krótki opis (kafelek i banner)
   - description   pełny opis (strona aplikacji)
   - features      lista funkcji: icon = id ikony z index.html (np. "film", "music")
   - info          dodatkowe informacje w panelu bocznym
   Teksty podajesz w dwóch językach: { pl: '...', en: '...' }.
   ========================================================= */

window.APPS = [
  {
    id: 'downloader-studio',
    name: 'Downloader Studio',
    icon: 'downloader-studio.png',
    colors: ['#6e6bf5', '#4a3fd0'],
    repo: 'Aropatx/DownloaderStudio-Installer',
    asset: 'DownloaderStudio-Setup.exe',
    fallbackVersion: '6.1.4',
    tagline: {
      pl: 'Pobieranie wideo i muzyki z obsługą kolejki i playlist.',
      en: 'Video and music downloads with queue and playlist support.',
    },
    description: {
      pl: 'Aplikacja do pobierania wideo i muzyki. Obsługuje formaty wideo MP4, MKV i WebM w rozdzielczości do 4K oraz formaty audio MP3, M4A, Opus, FLAC i WAV. Pozwala dodać wiele linków do kolejki, pobierać kilka plików jednocześnie i wybierać pojedyncze filmy z playlist.',
      en: 'An application for downloading video and music. Supports MP4, MKV and WebM video up to 4K and MP3, M4A, Opus, FLAC and WAV audio. Add multiple links to the queue, download several files at once and pick individual videos from playlists.',
    },
    features: [
      { icon: 'film', title: { pl: 'Wideo do 4K', en: 'Video up to 4K' }, text: { pl: 'Formaty MP4, MKV i WebM z wyborem rozdzielczości.', en: 'MP4, MKV and WebM formats with resolution selection.' } },
      { icon: 'music', title: { pl: 'Formaty audio', en: 'Audio formats' }, text: { pl: 'MP3, M4A, Opus oraz bezstratne FLAC i WAV.', en: 'MP3, M4A, Opus and lossless FLAC and WAV.' } },
      { icon: 'list', title: { pl: 'Kolejka pobierania', en: 'Download queue' }, text: { pl: 'Wiele linków naraz i równoległe pobieranie plików.', en: 'Multiple links at once and parallel downloads.' } },
      { icon: 'playlist', title: { pl: 'Playlisty', en: 'Playlists' }, text: { pl: 'Wybór pojedynczych filmów z playlisty.', en: 'Select individual videos from a playlist.' } },
    ],
    info: [
      { label: { pl: 'System', en: 'System' }, value: { pl: 'Windows 10 (1809+) lub 11, 64-bit', en: 'Windows 10 (1809+) or 11, 64-bit' } },
      { label: { pl: 'Język', en: 'Language' }, value: { pl: 'Polski, angielski', en: 'Polish, English' } },
    ],
  },

  {
    id: 'replay',
    name: 'Replay',
    icon: 'replay.png',
    colors: ['#4aa3ff', '#8b5cf6'],
    repo: 'Aropatx/Replay',
    asset: 'Replay-Setup.exe',
    fallbackVersion: '2.5.2',
    tagline: {
      pl: 'Nagrywanie ekranu z buforem powtórek i zapisem klipów.',
      en: 'Screen recording with a replay buffer and clip saving.',
    },
    description: {
      pl: 'Aplikacja do nagrywania ekranu, która w tle zapisuje ostatnie chwile rozgrywki do bufora. Klawisz F8 zapisuje klip, a F10 robi zrzut ekranu. Nagrywa dźwięk systemowy i mikrofon, a zapisane klipy można przeglądać i przycinać w bibliotece.',
      en: 'A screen recording application that keeps the last moments of gameplay in a background buffer. F8 saves a clip and F10 takes a screenshot. Records system audio and microphone, and saved clips can be browsed and trimmed in the library.',
    },
    features: [
      { icon: 'replay', title: { pl: 'Bufor powtórek', en: 'Replay buffer' }, text: { pl: 'Ciągłe nagrywanie ostatnich chwil w tle.', en: 'Continuous background recording of the last moments.' } },
      { icon: 'keyboard', title: { pl: 'Skróty klawiszowe', en: 'Keyboard shortcuts' }, text: { pl: 'F8 zapisuje klip, F10 robi zrzut ekranu. Skróty można zmienić.', en: 'F8 saves a clip, F10 takes a screenshot. Shortcuts can be changed.' } },
      { icon: 'mic', title: { pl: 'Dźwięk i mikrofon', en: 'Audio and microphone' }, text: { pl: 'Dźwięk systemowy i mikrofon z wyborem urządzeń.', en: 'System audio and microphone with device selection.' } },
      { icon: 'scissors', title: { pl: 'Biblioteka nagrań', en: 'Recording library' }, text: { pl: 'Przeglądanie i przycinanie zapisanych klipów.', en: 'Browse and trim saved clips.' } },
    ],
    info: [
      { label: { pl: 'System', en: 'System' }, value: { pl: 'Windows 10 (1809+) lub 11, 64-bit', en: 'Windows 10 (1809+) or 11, 64-bit' } },
      { label: { pl: 'Język', en: 'Language' }, value: { pl: 'Polski, angielski', en: 'Polish, English' } },
    ],
  },
];
