# Toteutuksen dokumentaatio

## Tyylien perusta

Tailwind CSS 4 on yhdistetty Viteen `@tailwindcss/vite`-liitännäisellä tiedostossa `portfolio/vite.config.js`. Uusia riippuvuuksia ei tarvittu.

`portfolio/src/index.css` sisältää Tailwind-tuonnin ja `@theme`-määritykset. CSS tuodaan sovellukseen tiedostossa `portfolio/src/main.jsx`.

### Värit ja fontti

Värit perustuvat design-referenssien tummaan, lämpimään palettiin ja AGENTS.md-tiedoston väriarvoihin.

| Teeman nimi  | Väri      | Käyttö                     |
| ------------ | --------- | -------------------------- |
| `background` | `#242321` | Sivun tausta               |
| `surface`    | `#393630` | Toissijaiset taustat       |
| `copper`     | `#B87957` | Kuparinvärinen korostus    |
| `champagne`  | `#C5A982` | Samppanjanvärinen korostus |
| `primary`    | `#F0EBE3` | Pääteksti                  |
| `secondary`  | `#B8B2A9` | Toissijainen teksti        |
| `border`     | `#48443E` | Reunaviivat                |

Tailwind muodostaa teemasta luokkia kuten `bg-background` (taustaväri), `text-primary` (tekstin väri) ja `border-border` (reunaviivan väri). Luokan `border` avulla voidaan lisäksi määritellä reunaviivan paksuus.

Fonttina on käyttöjärjestelmän sans-serif-fontti. Referenssikuvien tarkkaa fonttia ei ole vielä vahvistettu, eikä ulkoista fonttia ole lisätty.

### Sivun perustyylit

`@layer base` sisältää koko sivun oletukset: tumman taustan, vaalean tekstin, fontin, rivikorkeuden, 320 pikselin vähimmäisleveyden ja vähintään selainikkunan korkuisen sivun. Tailwindin Preflight huolehtii muun muassa selaimen oletusmarginaalien poistamisesta. Komponenttien Tailwind-luokat voivat täydentää perustyylejä.

`portfolio/index.html` määrittää oletuskieleksi suomen (`lang="fi"`) ja välilehden alustavaksi otsikoksi `Portfolio`. Sovelluksen käynnistyttyä kielituki päivittää dokumentin kielen ja sivukohtaisen otsikon.

Tämä käyttöönotto perustuu Tailwindin omiin ohjeisiin, ei Full Stack Open -kurssin React-malleihin:

- [Tailwind CSS ja Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Teemamuuttujat](https://tailwindcss.com/docs/theme)

## Yhteinen sivupohja ja reititys

`portfolio/src/main.jsx` ympäröi sovelluksen React Routerin `BrowserRouter`-komponentilla ja omalla `LanguageProvider`-komponentilla. Näin reititys ja kielitila ovat koko käyttöliittymän käytettävissä.

`App.jsx` kokoaa navigaation, pääsisällön ja alatunnisteen. Reitit määritellään `Routes`- ja `Route`-komponenteilla:

| Osoite            | Sisältö                                          |
| ----------------- | ------------------------------------------------ |
| `/`               | Etusivu                                          |
| `/projects`       | Projektit                                        |
| `/projects/:slug` | Yksittäinen projekti                             |
| `/about`          | Esittely                                         |
| `/contact`        | Yhteystiedot                                     |
| Muut osoitteet    | Sivua ei löytynyt -ilmoitus ja linkki etusivulle |

Osoitteet pysyvät samoina kielenvaihdossa. Etusivu käyttää erillistä `Home`-komponenttia, projektilista `Projects`-komponenttia ja projektisivu `ProjectDetail`-komponenttia. Esittely ja yhteystiedot näyttävät toistaiseksi otsikon ja selvästi merkityn väliaikaisen sisällön käyttäen yksinkertaista `PlaceholderPage`-komponenttia `App.jsx`:ssä.

`Navbar.jsx` sisältää `NavLink`-linkit. React Router tunnistaa aktiivisen linkin, jolle annetaan kuparinvärinen teksti, alleviivaus ja automaattinen `aria-current`-attribuutti. Pienillä näytöillä navigaatio rivittyy. `Footer.jsx` sisältää lyhyen käännetyn tekstin ja erotinviivan.

`App.jsx`:n asettelussa `flex-col` järjestää osat allekkain, `min-h-screen` täyttää vähintään selainikkunan korkeuden ja pääsisällön `flex-1` pitää alatunnisteen alhaalla myös lyhyillä sivuilla. `max-w-7xl` rajoittaa sisällön leveyttä ja `mx-auto` keskittää sen. `sm:`- ja `md:`-alkuiset luokat tulevat käyttöön kyseisestä Tailwindin näyttöleveysrajasta alkaen.

Näppäimistökäyttöä tukevat näkyvä `:focus-visible`-korostus ja kohdistettaessa näkyvä ”Siirry sisältöön” -linkki. Sen `sr-only`-luokka piilottaa linkin visuaalisesti, mutta pitää sen ruudunlukijoiden käytettävissä. Pääsisällön `tabIndex={-1}` mahdollistaa kohdistuksen linkistä ilman ylimääräistä sarkainpysähdystä.

Tuotantopalvelimen pitää myöhemmin ohjata sovelluksen reitit `index.html`:ään, jotta esimerkiksi `/projects` toimii myös suoraan avattuna. Julkaisua tai palvelinasetuksia ei ole vielä tehty.

## FI / EN -kielituki

- `src/translations/fi.js` ja `en.js` sisältävät samarakenteiset käännösobjektit nimettyinä vienteinä. Niissä ovat navigaatio, sivutekstit, saavutettavuustekstit ja otsikoiden tekstit.
- `src/context/LanguageContext.js` luo yhteisen Contextin. Määritys on erillään tarjoajakomponentista, jotta komponenttitiedosto vie vain komponentin ja Viten nopea päivitys toimii selkeästi.
- `src/context/LanguageProvider.jsx` säilyttää valitun kielen `useState`-tilassa. Alustus lukee selaimeen tallennetun valinnan. Ilman kelvollista valintaa aloitetaan suomeksi riippumatta selaimen kielestä.
- Komponentit lukevat `language`-, `changeLanguage`- ja `translations`-arvot Reactin `useContext`-kutsulla. Tilamuutos päivittää tekstit ilman sivun uudelleenlatausta.
- `LanguageSwitcher.jsx` esittää FI / EN -painikkeet navigaatiolinkkien tyylisinä. Valittu kieli korostetaan kuparinvärisellä tekstillä ja alareunan viivalla, ilman pilleritaustaa tai yhteistä reunusta. Fonttikoko ja pystysuuntainen välistys vastaavat navigaatiolinkkejä. `aria-pressed` ilmaisee valinnan ruudunlukijalle. Painikkeilla ja kieliryhmällä on käännetyt saavutettavat nimet.

Vain käyttäjän painikkeella tekemä valinta kirjoitetaan `localStorage`en avaimella `portfolio-language`. Jos selaimen tallennus on estetty, kielen vaihtaminen toimii silti nykyisen käyttökerran aikana.

Tarjoajan `useEffect` päivittää dokumentin `lang`-attribuutin. `App.jsx`:n `useEffect` päivittää välilehden otsikon nykyisen sivun ja kielen mukaan, esimerkiksi `Etusivu | Eemil Hakala`. Contextin tehtävä on jakaa kielitila; reititin vastaa sivun valinnasta.

Pienet nuolifunktiokomponentit, propsit, taulukoiden `map` ja `useState` noudattavat Full Stack Openin perusmalleja. Contextin yksityiskohdat ja reitityksen rajapinnat perustuvat Reactin ja React Routerin omiin ohjeisiin. Erillistä käännöskirjastoa tai omaa hookia ei lisätty.

- [Full Stack Open: tila ja tapahtumankäsittely](https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus/)
- [React: useContext](https://react.dev/reference/react/useContext)
- [React: useEffect](https://react.dev/reference/react/useEffect)
- [React Router: reititys](https://reactrouter.com/start/declarative/routing)

## Etusivu

`portfolio/src/pages/Home.jsx` toteuttaa etusivun `design-references/home.png`-kuvan pohjalta. Se sisältää tervehdyksen, Eemil Hakalan nimen, opiskelijaroolin, lyhyen esittelyn ja kaksi linkkiä sekä pyöreän profiilikuvan paikkamerkin kehysrenkaineen. `App.jsx` ohjaa etusivun reitin tähän komponenttiin.

Esittelyteksti on käyttäjän hyväksymä muokattava luonnos. Sen suomenkielinen versio on `portfolio/src/translations/fi.js`:n `pages.home.description`-kentässä ja englanninkielinen versio vastaavassa kohdassa `en.js`:ssä. Tervehdys, rooli, painikkeet ja profiilikuvan paikkamerkin tekstit löytyvät samasta `pages.home`-objektista. Kenttä `title` määrittää välilehden sivunimen, kun taas `greeting` kuuluu näkyvään pääotsikkoon.

Käännösten `siteName`-kenttä sisältää nyt nimen `Eemil Hakala`. Samaa kenttää käytetään navigaatiossa, etusivun pääotsikossa ja välilehden otsikon loppuosassa.

### Asettelu ja linkit

Etusivu on yksi `Home`-nuolifunktiokomponentti, joka lukee käännökset olemassa olevasta Contextista. Siihen ei lisätty omaa tilaa tai uusia abstraktioita. `Link`-komponentit vievät `/projects`- ja `/contact`-reiteille ilman koko sivun uudelleenlatausta. Niiden koristeelliset `ArrowUpRight`-kuvakkeet ovat Lucide Reactista ja piilotetaan ruudunlukijoilta `aria-hidden`-attribuutilla.

Tailwindin `grid` asettaa osat oletuksena allekkain. `lg:grid-cols-[1.15fr_1fr]` jakaa sisällön kahteen sarakkeeseen vähintään 1024 pikselin näyttöleveydellä, tekstille hieman enemmän tilaa. `gap-14` ja `lg:gap-12` säätävät osien väliä. `flex-wrap` sallii toimintolinkkien rivittymisen pienillä näytöillä.

### Profiilikuvan paikkamerkki

Paikkamerkki on CSS:llä muotoiltu tumma alue, jossa lukee ”Profiilikuva tulossa”. Se ei tarvitse kuvatiedostoa. `aspect-square` pitää alueen neliönä ja `rounded-full` tekee siitä ympyrän. Sisäkkäisten elementtien reunaviivat ja sisennykset muodostavat referenssin kehysrenkaat.

Alue on kapealla näytöllä enintään 288 pikseliä leveä, keskikokoisella enintään 320 pikseliä ja suurella enintään 480 pikseliä. `w-full` pienentää sitä tarvittaessa käytettävissä olevaan leveyteen. Oikean kuvan lähtökooksi suositellaan myöhemmin 800 × 800 pikseliä; kuvan lisääminen tehdään erillisenä hyväksyttävänä muutoksena.

## Projektilista ja projektisivu

`portfolio/src/pages/Projects.jsx` näyttää projektit `design-references/projects.png`-referenssin mukaisina vaakasuuntaisina kortteina. `ProjectCard.jsx` saa yhden projektin propsina. Projektit renderöidään `map`-kutsulla ja niiden `slug` toimii vakaana React-avaimena. Korteissa kuva on vasemmalla ja tiedot oikealla vähintään 768 pikselin leveydellä (`md:grid-cols-[0.9fr_1.1fr]`). Pienemmillä näytöillä sisältö on allekkain.

`ProjectDetail.jsx` lukee osoitteen `slug`-parametrin React Routerin `useParams`-kutsulla ja etsii projektin taulukosta `find`-kutsulla. Paluulinkin alapuolella projektin nimi on omassa koko sisältöalueen levyisessä otsikko-osassa, jonka alareunan `border-b border-border` muodostaa erotinviivan.

Viivan alapuolella sisältö jakautuu vähintään 1024 pikselin näyttöleveydellä kahteen palstaan luokalla `lg:grid-cols-[1.15fr_1fr]`. Vasemmalla ovat yksi yhteenveto ja mahdolliset GitHub- ja demolinkit. Oikealla on kuva ja sen alapuolella teknologiat. Projektisivulla ei näytetä erillistä esimerkkisisällön merkintää, luokittelua, lyhyttä kuvausta tai kuvan esimerkkitekstiä. Lyhyt kuvaus ja luokittelu ovat edelleen projektilistan käytössä. Pienemmillä näytöillä yhteenveto tulee ensin ja kuva sekä teknologiat sen jälkeen.

Oikea palsta on enintään 480 pikseliä leveä (`max-w-[480px]`), ja `w-full` mukauttaa sen pienempään tilaan. Paikkamerkin kuvasuhde on 16:10, joten sen enimmäiskoko on 480 × 300 pikseliä. Oikean kuvan korkeus on enintään 300 pikseliä. `object-contain` näyttää kuvan kokonaan kuvasuhdetta säilyttäen. `items-start` tasaa palstat yläreunasta, ja `lg:justify-self-end` sijoittaa kuvapalstan oikealle.

Otsikkoa ja osien välejä on tiivistetty, jotta sisältö mahtuu paremmin tietokoneen näkymään. `App.jsx` käyttää projektireiteillä pienempää pääsisällön pystyvälistystä (`py-8 lg:py-6`); muilla sivuilla välistys säilyy ennallaan. Sisältöä ei piiloteta tai lukita näytön korkeuteen, joten pieni näyttö, pitkä teksti tai suurennettu fontti voi edelleen vaatia vierittämistä.

Valinnaiset lähdekoodi- ja demolinkit näytetään vain, jos osoitteet on annettu. Ulkoiset linkit avautuvat samassa välilehdessä. Tuntemattomalle slugille näytetään käännetty ilmoitus ja linkki projektilistaan.

`App.jsx` määrittää `/projects/:slug`-reitin ja tunnistaa projektisivun `useMatch`-kutsulla. Välilehden otsikko käyttää projektin käännettyä nimeä tai puuttuvan projektin ilmoitusta. Navigaation Projektit-linkki pysyy aktiivisena myös projektisivulla React Routerin osittaisen reittiosuman ansiosta.

### Yhteinen projektidata

`portfolio/src/data/projects.js` vie nimetyn `projects`-taulukon. Sekä lista että projektisivu käyttävät sitä. Yhden projektin kentät ovat:

| Kenttä                   | Sisältö                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `slug`                   | Yksilöllinen osoitetunniste, joka pysyy samana molemmilla kielillä                                   |
| `isPlaceholder`          | Näytetäänkö esimerkkisisällön merkintä                                                               |
| `image`                  | Kuvan osoite tai `null`, jolloin näytetään CSS-paikkamerkki                                          |
| `imageAlt.fi` ja `.en`   | Oikean kuvan vaihtoehtoinen teksti molemmilla kielillä                                               |
| `technologies`           | Teknologioiden nimet taulukkona                                                                      |
| `githubUrl` ja `demoUrl` | Valinnaiset osoitteet tai `null`                                                                     |
| `content.fi` ja `.en`    | Nimi (`title`), luokittelu (`category`), lyhyt kuvaus (`description`) ja yksi yhteenveto (`summary`) |

Käyttöliittymätekstit ovat edelleen `translations/fi.js`- ja `en.js`-tiedostoissa. Projektikohtaiset tekstit luetaan `project.content[language]`-objektista. Näin kielenvaihto käyttää samoja komponentteja ja samaa projektimerkintää ilman sivujen kopiointia.

Mukana on yksi hyväksytty esimerkkiprojekti, `example-project`. Sen kuvan, tekstien ja teknologioiden ei väitetä kuvaavan oikeaa valmistunutta työtä. Erillinen esimerkkimerkintä näkyy projektikortissa; projektisivulla esimerkkiluonne käy ilmi nimestä ja nykyisestä yhteenvetotekstistä. Esimerkki voidaan myöhemmin korvata oikealla projektilla, kun tiedot ja muutokset on hyväksytty. Projektikuvia ei luotu eikä uusia riippuvuuksia asennettu.

## Tarkistukset

Sivupohjan ja kielituen, etusivun sekä projektilistan ja projektisivun toteutusten jälkeen `npm.cmd run lint` ja `npm.cmd run build` suoritettiin onnistuneesti `portfolio/`-kansiossa. Windowsin PowerShellissa käytettiin `npm.cmd`-käynnistintä, koska suorituspolitiikka esti `npm.ps1`:n ajamisen.

Näillä tarkistettiin koodin staattiset säännöt ja tuotantoversion rakentuminen. Ulkoasua, navigointia, näppäimistökäyttöä ja kielivalinnan säilymistä ei vielä testattu selaimessa.
