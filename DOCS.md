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

Osoitteet pysyvät samoina kielenvaihdossa. Sivut käyttävät erillisiä `Home`-, `Projects`-, `ProjectDetail`-, `About`- ja `Contact`-komponentteja. Esittely- ja yhteystietosivujen yleinen `PlaceholderPage` korvattiin omilla sivukomponenteilla, joiden henkilökohtainen sisältö on edelleen selvästi merkittyä väliaikaista sisältöä.

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

`portfolio/src/pages/Home.jsx` toteuttaa etusivun `design-references/home.png`-kuvan pohjalta. Se sisältää tervehdyksen, Eemil Hakalan nimen, opiskelijaroolin, lyhyen esittelyn ja kaksi linkkiä sekä pyöreäksi rajatun profiilikuvan kehysrenkaineen. `App.jsx` ohjaa etusivun reitin tähän komponenttiin.

Esittelytekstin suomenkielinen versio on `portfolio/src/translations/fi.js`:n `pages.home.description`-kentässä ja englanninkielinen versio vastaavassa kohdassa `en.js`:ssä. Tervehdys, rooli, painikkeet, profiilikuvan vaihtoehtoinen teksti (`photoAlt`) ja kuvateksti (`photoCaption`) löytyvät samasta `pages.home`-objektista. Kenttä `title` määrittää välilehden sivunimen.

Käännösten `siteName`-kenttä sisältää nyt nimen `Eemil Hakala`. Samaa kenttää käytetään navigaatiossa, etusivun pääotsikossa ja välilehden otsikon loppuosassa.

### Asettelu ja linkit

Etusivu on yksi `Home`-nuolifunktiokomponentti, joka lukee käännökset olemassa olevasta Contextista. Sen paikallinen tila säilyttää kellonajan mukaan vaihtuvaa tervehdystä varten nykyisen tunnin. `Link`-komponentit vievät `/projects`- ja `/contact`-reiteille ilman koko sivun uudelleenlatausta. Niiden koristeelliset `ArrowUpRight`-kuvakkeet ovat Lucide Reactista ja piilotetaan ruudunlukijoilta `aria-hidden`-attribuutilla.

Tailwindin `grid` asettaa osat oletuksena allekkain. `lg:grid-cols-[1.15fr_1fr]` jakaa sisällön kahteen sarakkeeseen vähintään 1024 pikselin näyttöleveydellä, tekstille hieman enemmän tilaa. `gap-14` ja `lg:gap-12` säätävät osien väliä. `flex-wrap` sallii toimintolinkkien rivittymisen pienillä näytöillä.

### Profiilikuva

Etusivun kuva on `portfolio/public/images/Etusivu2.jpg`, johon viitataan selaimessa osoitteella `/images/Etusivu2.jpg`. Vite tarjoaa `public`-kansion tiedostot suoraan sivuston juuresta, joten polkuun ei lisätä `public`-osaa. Tiedostonimen kirjainkoko säilytetään myös viittauksessa.

`aspect-square` pitää kehysalueen neliönä ja `rounded-full` tekee kuvasta ympyrän. Sisäkkäisten elementtien reunaviivat ja sisennykset muodostavat referenssin kehysrenkaat. `object-cover` täyttää kuva-alueen vääristämättä kuvasuhdetta; reunoilta rajautuu tarvittaessa sisältöä. `object-[50%_35%]` säätää rajauksen painotusta hieman keskikohtaa ylemmäs. Rajaus tapahtuu vain selaimessa, eikä alkuperäistä JPG-tiedostoa muuteta.

Kehysalue on kapealla näytöllä enintään 288 pikseliä leveä, keskikokoisella enintään 320 pikseliä ja suurella enintään 480 pikseliä. `w-full` pienentää sitä tarvittaessa käytettävissä olevaan leveyteen. Suuren näytön enimmäisleveyden luokka korjattiin muotoon `lg:max-w-[480px]`, sillä mukautettu pikseliarvo tarvitsee Tailwindissa hakasulkeet.

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

## Esittely- ja yhteystietosivut

`portfolio/src/pages/About.jsx` ja `Contact.jsx` ovat pienet nuolifunktiokomponentit, jotka lukevat tekstit olemassa olevasta `LanguageContext`ista. Sivujen tekstit ovat käännösten `pages.about`- ja `pages.contact`-objekteissa. `title` on välilehden otsikkoa varten, kun taas `heading` on sivulla näkyvä pääotsikko. `App.jsx` ohjaa `/about`- ja `/contact`-reitit uusiin komponentteihin. Korvattu `PlaceholderPage`-komponentti poistettiin.

### Esittely

Sivu perustuu `design-references/about.png`-kuvaan, johon lisättiin käyttäjän hyväksymä kuva oikealle. Tekstialue sisältää otsikon, esittelytekstin ja linkin projekteihin. Suomenkielinen esittelyteksti on päivitetty käyttäjän antamilla tiedoilla; englanninkielinen sisältö on vielä paikkamerkkitekstiä.

`About.jsx` jakaa `about.description`-tekstin tyhjien rivien kohdalta `split`-kutsulla ja muodostaa jokaisesta osasta oman `<p>`-elementin `map`-kutsulla. Ympäröivän elementin `space-y-5` lisää kappaleiden väliin tilaa. Kappalejaot tehdään käännöstiedoston moniriviseen merkkijonoon jättämällä kappaleiden väliin tyhjä rivi. Sama toteutus toimii molemmilla kielillä, ja teksti ilman tyhjiä rivejä näytetään yhtenä kappaleena.

`grid` pitää tekstin ja kuvan oletuksena allekkain. Vähintään 1024 pikselin näyttöleveydellä `lg:grid-cols-[minmax(0,1fr)_28rem]` varaa kuvalle 28 remin levyisen oikean palstan ja tekstille jäljelle jäävän tilan. `items-center` keskittää palstat pystysuunnassa. Kuva on pienillä näytöillä vaakasuunnassa keskellä ja tietokoneella oikealla (`justify-self-center lg:justify-self-end`).

Esittelysivun kuva on `portfolio/public/images/Esitys.jpg`, jonka selainpolku on `/images/Esitys.jpg`. `aspect-[4/5]` antaa sille pystysuuntaisen 4:5-kuvasuhteen. Pienillä näytöillä `max-w-80` rajoittaa kuvan 320 × 400 pikseliin, ja tietokonenäkymässä `lg:max-w-none` sallii koko kuvapalstan täyttämisen. Tavallisella 16 pikselin juurifontilla tietokonenäkymän koko on 448 × 560 pikseliä. `rounded-2xl` pyöristää kulmat kevyesti, `w-full` mukauttaa leveyden ja `object-cover` täyttää kuva-alueen kuvasuhdetta vääristämättä.

`Navbar.jsx`:n navigaatiolinkit ja kielenvaihtimen sisältävä oikea lohko käyttää samaa 28 remin leveyttä (`lg:w-[28rem]`). Koska navigaatio ja esittelysivu käyttävät yhteistä sisältöaluetta ja samaa oikeaa reunaa, kuvan vasen reuna kohdistuu Etusivu-linkin E-kirjaimen alkuun. Sama linjaus säilyy englanniksi Home-linkin kohdalla. Muutos koskee tietokonenäkymää; pienempien näyttöjen navigaatio säilyy joustavana.

Kuvan vaihtoehtoinen teksti luetaan `pages.about.photoAlt`-kentästä nykyisellä kielellä. Molempien sivujen paikkamerkkien `photoPlaceholder`-avaimet korvattiin `photoAlt`-avaimilla. Alkuperäisiä kuvia ei rajattu, nimetty uudelleen tai pakattu.

### Yhteystiedot

Sivu sisältää otsikon, lyhyen kuvauksen, yhteystietolinkit ja paluulinkin projekteihin. Sähköposti, GitHub ja LinkedIn esitetään käyttäjän toimittaman uuden referenssin mukaisina reunustettuina linkkipainikkeina. Jokaisessa on kuvake vasemmalla ja käännetty teksti oikealla. `rounded-lg` pyöristää kulmat, `border border-border` lisää ohuen reunuksen ja `min-h-12` pitää painikkeen vähintään 48 pikselin korkuisena tavallisella juurifontilla. `flex flex-wrap gap-3` asettaa painikkeet rinnakkain ja sallii rivittymisen pienellä näytöllä.

Painikkeet käyttävät käyttäjän lisäämiä osoitteita: `mailto:eemilxhakala@gmail.com`, `https://github.com/diggeridoo95` ja `https://www.linkedin.com/in/hakalaeemil/`. Ne ovat tavallisia `<a>`-linkkejä. GitHub ja LinkedIn avautuvat samassa välilehdessä; sähköpostilinkki pyytää selainta avaamaan sähköpostisovelluksen. Sähköpostipainikkeen saavutettava nimi sisältää myös osoitteen.

`/images/email.png`- ja `/images/github.png`-kuvakkeet näytetään 24 × 24 pikselin kokoisina. Tailwindin `brightness-0 invert` muuttaa mustat kuviot valkoisiksi läpinäkyvyyden säilyttäen, jotta ne erottuvat tummalla taustalla. Kuvakkeilla on tyhjä `alt` ja `aria-hidden`, koska linkin teksti kertoo jo sen tarkoituksen.

Lisätyn `linkedin.png`-tiedoston ruututausta on osa kuvatiedostoa. Siksi painikkeessa käytetään hyväksytysti HTML/CSS:llä tehtyä sinistä ympyrää ja valkoista `in`-tekstiä. Merkki on koristeellinen ja piilotettu ruudunlukijalta. Alkuperäisiä kuvatiedostoja ei muutettu. Englanninkielinen yhteystietokuvaus päivitettiin vastaamaan nykyisiä linkkejä.

## Sivuttaisen siirtymän ehkäisy

`portfolio/src/index.css` määrittää `html`-elementille `scrollbar-gutter: stable` -säännön perustyylien kerroksessa. Se varaa tilan tilaa vievälle pystysuuntaiselle vierityspalkille myös lyhyillä sivuilla. Näin sisältöalueen leveys ei muutu pelkästään vierityspalkin ilmestyessä tai kadotessa sivua vaihdettaessa. Sisällön päällä näkyvät vierityspalkit eivät vie tilaa, joten niiden yhteydessä sääntö ei lisää varausta.

Muutos koskee sivuttaista siirtymää. Sivujen erilainen sisältökorkeus voi edelleen vaikuttaa alatunnisteen pystysuuntaiseen sijaintiin.

## Kellonajan mukaan vaihtuva tervehdys

`Home.jsx` valitsee etusivun tervehdyksen kävijän selaimen paikallisen kellonajan perusteella. `new Date().getHours()` palauttaa tunnin väliltä 0–23. Sivun oma `getGreetingPeriod`-nuolifunktio valitsee sen perusteella käännösavaimen:

| Paikallinen aika | Avain | Suomenkielinen tervehdys |
| --- | --- | --- |
| 05.00–11.59 | `morning` | Valmiina uuteen päivään, ystävä? |
| 12.00–16.59 | `day` | Hyvää päivää, Mestari! |
| 17.00–21.59 | `evening` | Hyvää iltaa, matkalainen! |
| 22.00–04.59 | `night` | Zzz. |

`useState` alustaa tunnin etusivun avautuessa. `useEffect` käynnistää 60 sekunnin välein toimivan ajastimen, joka lukee tunnin uudelleen. Effectin palauttama siivousfunktio poistaa ajastimen etusivulta poistuttaessa ja estää päällekkäisten ajastimien jäämisen Reactin StrictMode-tarkistuksissa. Selaimen taustavälilehtien ajastimia voidaan hidastaa, joten tarkistus ei ole sekunnintarkka.

Tekstit löytyvät `fi.js`- ja `en.js`-tiedostojen `pages.home.welcome`-objektista. Komponentti näyttää `home.welcome[greetingPeriod]`-tekstin nykyisellä kielellä. Kellonaikaa ei haeta palvelimelta, eikä käyttäjän sijaintia tarvita. Tervehdyksen `uppercase`-luokka poistettiin ja kirjainväliä pienennettiin `tracking-wide`-luokalla, joten teksti näkyy normaalilla kirjainkoolla.

## Tarkistukset

Sivupohjan ja kielituen, etusivun, projektinäkymien sekä esittely- ja yhteystietosivujen toteutusten jälkeen `npm.cmd run lint` ja `npm.cmd run build` suoritettiin onnistuneesti `portfolio/`-kansiossa. Windowsin PowerShellissa käytettiin `npm.cmd`-käynnistintä, koska suorituspolitiikka esti `npm.ps1`:n ajamisen.

Näillä tarkistettiin koodin staattiset säännöt ja tuotantoversion rakentuminen. Ulkoasua, navigointia, näppäimistökäyttöä ja kielivalinnan säilymistä ei vielä testattu selaimessa.
