# Toteutuksen dokumentaatio

Tämä tiedosto kuvaa portfolion nykyisen toteutuksen ja sen keskeiset ratkaisut. Käynnistysohjeet ja yleiskatsaus ovat [README.md](README.md)-tiedostossa. Käyttöliittymän oletuskieli on suomi; komponentit, funktiot ja muut koodin tunnisteet ovat englanniksi.

## Sovelluksen rakenne ja reititys

`portfolio/src/main.jsx` käynnistää sovelluksen Reactin `StrictMode`-tilassa. `BrowserRouter` tarjoaa reitityksen ja `LanguageProvider` yhteisen kielitilan. `App.jsx` kokoaa navigaation, pääsisällön ja alatunnisteen.

| Osoite            | Sivukomponentti     |
| ----------------- | ------------------- |
| `/`               | `Home.jsx`          |
| `/projects`       | `Projects.jsx`      |
| `/projects/:slug` | `ProjectDetail.jsx` |
| `/about`          | `About.jsx`         |
| `/contact`        | `Contact.jsx`       |
| Muut osoitteet    | `NotFound.jsx`      |

Pääsivujen polut ja käännösavaimet ovat `portfolio/src/data/navigation.js`-tiedoston nimettynä vientinä `navigation`. `Navbar.jsx` muodostaa listasta navigaatiolinkit. `App.jsx` käyttää samaa listaa sivun tunnistamiseen ja `Route`-elementtien luomiseen. Sen `pageComponents`-objekti yhdistää avaimet sivukomponentteihin. Projektisivun ja 404-sivun reitit määritellään erikseen. Näin navigaatiodata ei tarvitse React-komponenttien tuonteja.

`NavLink` näyttää aktiivisen sivun kuparinvärisenä ja alleviivattuna. Projektit-linkki on aktiivinen myös yksittäisen projektin sivulla. Osoitteet pysyvät samoina kielenvaihdossa. `App.jsx` päivittää dokumentin otsikon sivun tai projektin nimen mukaan. HTML:n alustava otsikko on `Eemil Hakala - Portfolio`, oletuskieli `fi` ja sivustokuvake `public/favicon.svg`.

Tuotantopalvelimen on ohjattava sovelluksen reitit `index.html`:ään, jotta alasivujen suorat osoitteet toimivat. Tämä dokumentti ei vahvista julkaisua tai tuotantopalvelimen asetuksia.

## Teema ja yhteinen asettelu

Tailwind CSS 4 on yhdistetty Viteen `@tailwindcss/vite`-liitännäisellä tiedostossa `portfolio/vite.config.js`. `src/index.css` sisältää Tailwind-tuonnin, `@theme`-määritykset, perustyylit ja animaatiot. CSS tuodaan tiedostossa `main.jsx`.

| Teema-avain  | Nykyinen väri | Käyttö                                      |
| ------------ | ------------- | ------------------------------------------- |
| `background` | `#141010`     | Sivun tausta                                |
| `surface`    | `#393630`     | Kuvakehykset, merkit ja toissijaiset pinnat |
| `copper`     | `#B87957`     | Korostukset ja aktiivinen navigaatio        |
| `champagne`  | `#C5A982`     | Toissijaiset korostukset                    |
| `primary`    | `#F0EBE3`     | Pääteksti                                   |
| `secondary`  | `#B8B2A9`     | Leipäteksti ja toissijainen teksti          |
| `border`     | `#48443E`     | Reunaviivat                                 |

Teema tuottaa luokkia kuten `bg-background`, `text-primary` ja `border-border`. Fontti on käyttöjärjestelmän sans-serif-fontti. Ulkoista fonttia ei käytetä. Nykyinen taustaväri poikkeaa alkuperäisestä `#242321`-suunnitelmasta.

Sivupohjan `max-w-7xl mx-auto` rajoittaa ja keskittää sisällön. `flex-col min-h-screen` ja pääsisällön `flex-1` pitävät alatunnisteen alhaalla lyhyillä sivuilla. Vähimmäisleveys on 320 px. `html`-elementin `scrollbar-gutter: stable` vähentää sivuttaista siirtymää, kun tilaa vievä vierityspalkki ilmestyy tai katoaa. Pääsisällön pystyvälistys on yleensä `py-14 sm:py-20`, projektisivulla `py-8 lg:py-6`.

Näppäimistökäyttöä tukevat `:focus-visible`-korostus, Siirry sisältöön -linkki ja `main-content`-elementin `tabIndex={-1}`. Viimeksi mainittu mahdollistaa ohjelmallisen kohdistuksen ilman ylimääräistä Tab-pysähdystä. Kuvilla on käännetyt vaihtoehtoiset tekstit; koristeelliset kuvakkeet piilotetaan ruudunlukijalta.

Ulkoasun referenssit ovat `design-references/`-kansiossa. Tailwindin asetukset perustuvat sen omiin ohjeisiin: [Vite-käyttöönotto](https://tailwindcss.com/docs/installation/using-vite) ja [teemamuuttujat](https://tailwindcss.com/docs/theme).

## FI / EN -kielituki ja tekstien ylläpito

`src/translations/fi.js` ja `en.js` sisältävät samarakenteiset käännösobjektit nimettyinä vienteinä. Navigaatio, sivujen otsikot, painikkeet, saavutettavuustekstit ja henkilökohtaiset esittelytekstit luetaan näistä. Projektikohtainen sisältö on erikseen `src/data/projects.js`-tiedostossa.

`LanguageContext.js` luo Contextin. `LanguageProvider.jsx` säilyttää kielen `useState`-tilassa, ja komponentit lukevat sen `useContext`-kutsulla. Tallennettu `en` avaa englannin; muulloin oletuksena on suomi. Vain käyttäjän tekemä kielivalinta kirjoitetaan `localStorage`en avaimella `portfolio-language`. Tallennuksen estyminen ei estä kielenvaihtoa nykyisen käyttökerran aikana. Effect päivittää dokumentin `lang`-attribuutin.

Navigaation FI / EN -painikkeissa aktiivinen kieli korostetaan värillä ja alleviivauksella. `aria-pressed` kertoo valinnan ja käännetyt nimet painikkeiden tarkoituksen. Kielenvaihto päivittää sisällön ilman sivun uudelleenlatausta.

Esittelytekstissä on molemmilla kielillä neljä kappaletta: tausta ja opinnot, työkokemus, harjoittelupaikan etsiminen sekä sosiaalisuus ja harrastukset. `About.jsx` jakaa tekstin tyhjistä riveistä lausekkeella `split(/\n\s*\n/)`, muodostaa kappaleet `map`-kutsulla ja lisää väleihin tilaa `space-y-5`-luokalla. Projektien yhteenvedot käyttävät samaa periaatetta. Suomenkieliset tekstit ovat käyttäjän antamia; englanninkielinen sisältö vastaa niitä.

Pienet nuolifunktiokomponentit, propsit, `map`, `find`, `useState` ja effectien siivous noudattavat Full Stack Openin opetustapaa. Context ja reitityksen rajapinnat perustuvat lisäksi kirjastojen omiin ohjeisiin. Erillistä i18n-kirjastoa tai globaalia tilakirjastoa ei käytetä.

- [Full Stack Open: tila ja tapahtumankäsittely](https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus/)
- [React: useContext](https://react.dev/reference/react/useContext)
- [React: useEffect](https://react.dev/reference/react/useEffect)
- [React Router: reititys](https://reactrouter.com/start/declarative/routing)

## Etusivu ja esittely

Etusivun tekstipalsta ja kuva ovat rinnakkain vähintään 1024 px:n näyttöleveydellä (`lg:grid-cols-[1.15fr_1fr]`), muuten allekkain. Tekstipalsta alkaa yläreunasta (`items-start`). Tervehdys sijoitetaan `relative`-tekstipalstan yläpuolelle luokilla `absolute bottom-full left-0`. Se ei vie tilaa otsikon edestä. Väli nimeen on 16 px ja vähintään sm-koossa 24 px. Myös esittelysivu käyttää yläreunakohdistusta, joten kuvan korkeus ei pystykeskitä otsikkoa alemmas.

`Home.jsx` valitsee tervehdyksen selaimen paikallisesta tunnista:

| Aika        | Käännösavain | Suomenkielinen tervehdys         |
| ----------- | ------------ | -------------------------------- |
| 05.00–11.59 | `morning`    | Valmiina uuteen päivään, ystävä? |
| 12.00–16.59 | `day`        | Hyvää päivää, Mestari!           |
| 17.00–21.59 | `evening`    | Hyvää iltaa, matkalainen!        |
| 22.00–04.59 | `night`      | Zzz.                             |

Tunti alustetaan `useState`-kutsussa ja tarkistetaan 60 sekunnin välein. Effectin siivous poistaa ajastimen sivulta poistuttaessa, myös StrictMode-kehitystilassa. Taustavälilehden ajastinta voidaan hidastaa; kyseessä ei ole sekunnintarkka päivitys. Teksti näytetään normaalilla kirjainkoolla nykyisen kielen `pages.home.welcome`-objektista.

Etusivun `etusivu.webp` näkyy pyöreässä kehyksessä. `aspect-square` varaa neliön, `rounded-full` tekee ympyrän ja `object-cover object-[50%_35%]` säätää kuvan täyttöä ja rajausta. Kehyksen enimmäisleveys on mobiilissa 288 px, sm-koossa 320 px ja lg-koossa 480 px.

Esittelysivun otsikko on palstajaon yläpuolella. Sen alla `mt-6 grid items-start` asettaa leipätekstin ja kuvan samaan yläreunaan tietokonenäkymässä, joten kuva alkaa tekstin eikä otsikon tasolta. Mobiilissa kuva tulee tekstin ja projektilinkin jälkeen. `esittely.webp` on 4:5-kuvasuhteen suorakulmio (`aspect-4/5`). Mobiilissa enimmäiskoko on 320 × 400 px ja tietokoneella 448 × 560 px tavallisella 16 px:n juurifontilla. `lg:grid-cols-[minmax(0,1fr)_28rem]` varaa oikealle kuvalle 28 rem. Navigaation oikean lohkon `lg:w-112` antaa saman 28 remin leveyden ja kohdistaa kuvan vasemman reunan Etusivu/Home-linkin alkuun. `object-cover` täyttää kehyksen, ja `rounded-2xl` pyöristää kulmat.

Tailwind 4:n numeeriset mitoitusluokat käyttävät oletuksena 0,25 remin väliasteikkoa: `max-w-120` vastaa 30 remiä eli 480 px ja `w-112` vastaa 28 remiä eli 448 px tavallisella juurifontilla. Etusivun `lg:max-w-120` palauttaa kuvan suuremman enimmäiskoon tietokoneella, ja projektisivun `max-w-120` rajaa kuvapalstan leveyden. Hakasulkeiden poistaminen suoraan arvoista oli tuottanut toimimattomat luokat `max-w-480px` ja `w-28rem`. Mukautetut arvot kuten `max-w-[480px]` ovat myös kelvollisia; kuvasuhteet `aspect-4/5` ja `aspect-16/10` toimivat Tailwind 4:ssä ilman hakasulkeita. Monimutkaiset ruudukkomääritykset säilyttävät hakasulkeensa.

## Projektidata ja näkymät

`src/data/projects.js` vie nimetyn `projects`-taulukon, jota sekä lista että projektisivu käyttävät. Projektin `slug` toimii osoitetunnisteena ja kortin React-avaimena. `ProjectDetail.jsx` lukee tunnisteen `useParams`-kutsulla ja etsii projektin `find`-kutsulla. Tuntematon tunniste näyttää käännetyn ilmoituksen ja paluulinkin projektilistaan.

| Kenttä                                | Sisältö                                                     |
| ------------------------------------- | ----------------------------------------------------------- |
| `slug`                                | Vakaa, molemmilla kielillä sama osoitetunniste              |
| `status`                              | Projektin tila, joka käännetään käyttöliittymässä           |
| `image`, `imageAlt.fi/en`             | Kortin kuva ja vaihtoehtoiset tekstit; kuva voi olla `null` |
| `detailImage`, `detailImageAlt.fi/en` | Valinnainen projektisivun kuva ja vaihtoehtoiset tekstit    |
| `technologies`                        | Teknologioiden nimet taulukkona                             |
| `githubUrl`, `demoUrl`                | Linkin osoite tai `null`                                    |
| `content.fi/en`                       | `title`, `category`, `description` ja `summary`             |

Projektikortissa kuva on vasemmalla ja teksti oikealla vähintään 768 px:n leveydellä, muuten allekkain. Kuva käyttää 16:10-aluetta, `object-contain`-sovitusta ja `loading="lazy"`-latausta. Projektisivun otsikko on omassa erotinviivalla rajatussa osassaan. Sen alla yhteenveto ja linkit ovat vasemmalla, kuva ja teknologiat oikealla vähintään 1024 px:n leveydellä. Mobiilissa yhteenveto tulee ennen kuvapalstaa.

Kuvapalstan enimmäisleveys on 480 px (`max-w-120` tavallisella juurifontilla). Sen `figure` käyttää luokkia `relative aspect-16/10 w-full`, joten enintään 480 × 300 px:n tila on varattu ennen latautumista. Kuva täyttää kehyksen luokilla `absolute inset-0 h-full w-full object-contain`: sisältö näkyy kokonaan ilman venytystä, ja eri kuvasuhteilla kehykseen jää tyhjää tilaa. Teknologialista ei siirry kuvan latautuessa. Myös puuttuvan kuvan paikkamerkki käyttää samaa kehystä. Taustaa: [MDN:n kuvaelementin mitoitus](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#height).

Projektisivulla on yksi kappaleisiin jaettu yhteenveto. Lyhyt kuvaus ja luokittelu kuuluvat projektilistaan. Ulkoiset lähdekoodi- ja demolinkit näytetään vain, kun osoite on annettu, ja ne avautuvat uuteen välilehteen attribuuteilla `target="_blank"` ja `rel="noopener noreferrer"`. Jym-projektin `demoUrl` on `https://jym-0kwo.onrender.com/`. Projektikortti näyttää Avaa demo / Open demo -linkin Tutustu projektiin / View project -linkin vieressä; projektisivu näyttää sen GitHub-linkin vieressä. Kortin demolinkki käyttää samoja uuden välilehden attribuutteja ja `pages.projectDetail.demoLink`-käännöstä. `flex flex-wrap` sallii linkkien rivittymisen pienellä näytöllä, ja kortin linkin saavutettava nimi sisältää myös projektin nimen. Portfolion sisäiset navigointilinkit toimivat edelleen samassa välilehdessä.

### Tilamerkit

`ProjectCard.jsx` näyttää tilan reunustettuna merkkinä nimen yläpuolella. `inline-flex` asettaa tekstin ja pisteen vierekkäin, `rounded-full` pyöristää merkin ja `bg-surface` erottaa sen kortin taustasta. Teksti säilyy näkyvissä, joten merkitys ei perustu pelkkään väriin. Piste on koristeellinen (`aria-hidden="true"`).

| Tila         | FI / EN                   | Pisteen väri                 |
| ------------ | ------------------------- | ---------------------------- |
| `inProgress` | Kehitteillä / In progress | Kupari                       |
| `mvpReady`   | MVP valmis / MVP ready    | Vaaleanvihreä, `emerald-300` |
| `prototype`  | Prototyyppi / Prototype   | Samppanja                    |
| `completed`  | Valmis / Completed        | Vihreä, `emerald-500`        |

Tuntematon tila käyttää yleistä Projekti/Project-tekstiä ja `secondary`-väristä pistettä.

### Nykyisten projektien sisältö ja lähteet

**Locost-telemetria:** kolme tietotekniikan opiskelijaa kehittää auton telemetriajärjestelmää. Itse SeAMK Project LoCost Projektipaja® -kilpa-auton ovat rakentaneet auto- ja työkonetekniikan opiskelijat. Ohjelmistossa ovat React-käyttöliittymä, Python/FastAPI-palvelinpuoli, SQLite ja WebSocket-yhteys. Öljynpaineen seurantaa kehitetään simuloidulla datalla; anturin, ESP32:n ja Raspberry Pi:n fyysinen integraatio kuvataan keskeneräiseksi. Muut anturit ja etäseuranta ovat tavoitteita. Sisältö perustuu lähdeprojektin dokumentaatioon, paikalliseen `projektimateriaalia/locost-vaatimusmaarittely.pdf`-tiedostoon ja käyttäjän vahvistamaan työnjakoon. [Lähdekoodi](https://github.com/diggeridoo95/locost_telemetry).

**Jym:** MVP sisältää rekisteröitymisen, istuntopohjaisen kirjautumisen ja käyttäjäkohtaisten viikko-ohjelmien, treenipäivien sekä suunniteltujen liikkeiden sarjojen ja toistojen hallinnan. Teknologiat ovat React, JavaScript, Node.js, Express, PostgreSQL, Sequelize ja Docker. Käyttäjän vahvistuksen mukaan PWA on toteutettu ja sovellus julkaistu demona Render-palvelussa: [demo](https://jym-0kwo.onrender.com/). Molempien kielten korttikuvaus ja yhteenvedon viimeinen kappale vastaavat tätä tilannetta; yhteenvedoissa säilyy kolme kappaletta. Tila on edelleen `mvpReady`, ja toteutuneiden harjoitusten, käytettyjen painojen ja kehityksen seuranta kuvataan jatkokehitykseksi. Sisältö perustuu käyttäjän vahvistamaan tilaan ja lähdeprojektin README-tiedoston, dokumentaation ja koodin aiempaan tarkasteluun. GitHub-osoite vahvistettiin paikallisen lähdeprojektin Git-asetuksista: [lähdekoodi](https://github.com/diggeridoo95/jym_workout_tracker_1). Julkaistun sovelluksen toimintaa tai PWA-asennusta ei testattu selaimessa tämän portfoliopäivityksen yhteydessä.

**Zombie Island:** itsenäinen Unity 6 / C# -selviytymispelin prototyyppi. Kuvauksessa käsitellään pelaajaa, aseita, elämäpisteitä, NavMesh-vihollisia, vihollisaaltoja ja pelimaailman tapahtumia. Valmiiden assettien käyttö mainitaan; niitä ei esitetä itse tehdyiksi. Sisältö perustuu käyttäjän materiaaleihin ja paikallisen Unity-projektin keskeisten skriptien ja pakettien aiempaan tarkasteluun. GitHub- ja demolinkit puuttuvat.

**Tetris Overwhelmed:** neljän hengen Python-kurssiprojekti, jonka päätavoitteet olivat tiimityö, suunnittelu ja sprinttityöskentely. Suunnittelu kesti käyttäjän mukaan 2–3 viikkoa, sprinttijakso kahdeksan viikkoa ja lopuksi pidettiin ryhmäesitykset. Eemilin osuus tunnistettiin tehtävätaulujen oranssista väristä: muun muassa tiedostorakenne, ruudukko, HUD, pisteytys, valikot, pommi- ja kentänkääntötoimintoja sekä ääniä. Lähteinä olivat käyttäjän tiedot, tehtävätaulut ja paikallinen `projektimateriaalia/Tetris-vaatimusmäärittely.pdf`. Repositorion sisältöä ei aiemmassa tarkastelussa saatu avattua, joten esimerkiksi Pygamea ei lisätty vahvistamattomana teknologiana. [Lähdekoodi](https://github.com/diggeridoo95/OhjelmistoProjekti_Tetris).

Kaikkien neljän projektin yhteenvedot sisältävät molemmilla kielillä kolme kappaletta. Lähdeprojektien ohjeita käytettiin sisältölähteinä; niiden asennus- tai käyttöönottokomentoja ei suoritettu portfolioon sisältöä koottaessa.

## Kuvat ja niiden ylläpito

Sovelluksen kuvat ovat `portfolio/public/images/`-kansiossa. Selainpolku alkaa `/images/`, ilman `public`-osaa. Kirjainkoon on vastattava tiedostonimeä myös ympäristöissä, joissa tiedostonimet ovat kirjainkoon suhteen merkitseviä.

| Käyttö        | Projektilista         | Projektisivu                                |
| ------------- | --------------------- | ------------------------------------------- |
| Locost        | `locostprojects.webp` | Sama kuva, ei erillistä `detailImage`-arvoa |
| Jym           | `jymprojects.png`     | `jymproject.png`                            |
| Zombie Island | `zombieprojects.webp` | `zombieproject.webp`                        |
| Tetris        | `tetrisprojects.webp` | `tetrisproject.webp`                        |

`projects`-pääte tarkoittaa listaa ja `project` yksittäistä projektisivua. Projektisivu valitsee `detailImage ?? image` ja vaihtoehtoisen tekstin vastaavasti. Jymin kortin vaihtoehtoinen teksti kuvaa treeniohjelman luontia; projektisivun teksti kuvaa etusivua ja viikon treeni- sekä lepopäiviä. Muut kuvat ovat `etusivu.webp`, `esittely.webp`, `email.png` ja `github.png`.

Seitsemän suurta kuvaa pienennettiin Pillow-kirjastolla WebP-muotoon. EXIF-suunta huomioitiin, kuvasuhde säilytettiin ja pienennys tehtiin Lanczos-menetelmällä. Valokuvien laatutaso oli 88 ja projektikuvien 92. Kuvien yleisilme ja kuvakaappauksen tekstien luettavuus tarkistettiin muunnoksen yhteydessä. Portfolion npm-riippuvuuksia ei muutettu; Pillow oli erillinen Python-työkalu muunnosta varten.

| Nykyinen nimi         | Mitat      | WebP-koko muunnoksen jälkeen |
| --------------------- | ---------- | ---------------------------- |
| `etusivu.webp`        | 960 × 960  | 130 142 tavua                |
| `esittely.webp`       | 900 × 1125 | 78 510 tavua                 |
| `locostprojects.webp` | 1280 × 800 | 233 924 tavua                |
| `tetrisprojects.webp` | 1280 × 800 | 242 454 tavua                |
| `tetrisproject.webp`  | 1280 × 723 | 156 860 tavua                |
| `zombieprojects.webp` | 1280 × 800 | 133 654 tavua                |
| `zombieproject.webp`  | 1280 × 717 | 101 348 tavua                |

Muunnoksessa näiden seitsemän kuvan yhteiskoko pieneni 13 767 507 tavusta 1 076 892 tavuun, noin 92,18 %. Jym-kuvat ja kuvakkeet säilyivät PNG-muodossa. Alkuperäiset säilytettiin `image-originals/`-kansiossa alkuperäisillä nimillä, ja siirrossa tarkistettiin SHA-256-summat. Kansio on ohitettu Gitistä ja sijaitsee Viten `public`-kansion ulkopuolella, joten se ei kopioidu buildiin. Kuvia nimettiin myöhemmin uudelleen yllä olevan käytännön mukaisesti.

## Yhteystiedot

`Contact.jsx` näyttää reunustetut linkkipainikkeet sähköpostille, GitHubille ja LinkedInille. Osoitteet ovat `mailto:eemilxhakala@gmail.com`, `https://github.com/diggeridoo95` ja `https://www.linkedin.com/in/hakalaeemil/`. GitHub ja LinkedIn avautuvat uuteen välilehteen attribuuteilla `target="_blank"` ja `rel="noopener noreferrer"`, jolloin portfolio säilyy avoinna. Sähköpostilinkki pyytää selainta avaamaan sähköpostisovelluksen.

Painikkeet rivittyvät pienillä näytöillä (`flex flex-wrap`). `min-h-12` varaa tavallisella juurifontilla vähintään 48 px:n korkeuden. Sähköposti- ja GitHub-kuvakkeet ovat 24 × 24 px:n PNG-kuvia, jotka `brightness-0 invert` muuttaa vaaleiksi. LinkedInin sininen ympyrä ja `in`-teksti tehdään HTML/CSS:llä. Kuvakkeet ovat koristeellisia; näkyvä teksti kertoo linkin tarkoituksen ja sähköpostin saavutettava nimi sisältää osoitteen.

## Reittivaihtojen vieritys ja kohdistus

`NavigationManager.jsx` käyttää nykyistä `BrowserRouter`-reititystä. `useNavigationType` erottaa uuden navigoinnin (`PUSH` tai `REPLACE`) historian takaisin-/eteenpäin-siirtymästä (`POP`). Tavallinen sivunvaihto vie ylös ja kohdistaa `main-content`-elementin. Historiassa palatessa palautetaan tallennettu vaaka- ja pystysijainti. Aiempi pääsisällön linkkikohdistus palautetaan samalla `href`-arvolla löytyvään linkkiin, tai varakohteena käytetään pääsisältöä.

Sijainti ja linkin osoite tallennetaan `useRef`-muuttujan `Map`-rakenteeseen `location.key`-avaimella. Saman sivun eri historiakäynnit säilyvät erillisinä. Tiedot katoavat sivun täydellä uudelleenlatauksella. Ensimmäisellä latauksella komponentti ei vieritä tai kohdista; kielenvaihto ei käynnistä palautusta.

`useLayoutEffect` palauttaa kohdan DOM-päivityksen jälkeen ennen ruudun piirtämistä. `focus({ preventScroll: true })` estää kohdistuksen aiheuttaman ylimääräisen vierityksen, ja `scrollTo` käyttää välitöntä siirtymää. `history.scrollRestoration` asetetaan komponentin elinajaksi arvoon `manual` ja palautetaan siivouksessa aiempaan arvoon. Vieritys, kohdistus ja klikkauksen kaappausvaihe tallentavat tietoja ennen reitin vaihtumista. Kuuntelijat poistetaan effectin siivouksessa. Poistuvan DOM:n mahdollisesti rajaamaa vierityskohtaa ei tallenneta enää siivouksen aikana.

Projektisivun Takaisin projekteihin -linkki on tavallinen navigointilinkki: se avaa listan yläreunasta. Selaimen takaisin-painike palauttaa aiemman kohdan. Saman dokumentin Siirry sisältöön -linkin toimintaa ei korvata. [React Routerin navigointityypit](https://reactrouter.com/7.18.6/api/hooks/useNavigationType).

## Sivujen hillitty sisääntulo

`App.jsx` ympäröi reittisisällön `page-enter`-elementillä, jonka avain on `pathname`. Animaatio alkaa osoitepolun vaihtuessa; kielenvaihto tai etusivun tuntipäivitys ei käynnistä sitä uudelleen. Navigaatio, alatunniste ja kohdistettava `main-content` pysyvät kehyksen ulkopuolella.

`index.css` häivyttää sisällön näkyviin 200 ms:ssa. Ylimmän `section`- tai `article`-elementin suorat sisältöryhmät nousevat 6 px paikoilleen 240 ms:ssa. Aloitusviiveet ovat 0, 20, 40 ja enintään 60 ms. Ryhmiä animoidaan kokonaisuuksina, ei esimerkiksi kaikkia projektikortteja yksitellen. Animaatiot muuttavat läpinäkyvyyttä ja visuaalista siirtymää asettelumittojen sijaan. Navigointi ei odota ajastinta tai poistumisanimaatiota.

Animaatiot ovat käytössä vain `prefers-reduced-motion: no-preference` -ehdolla. Muulloin sisältö näkyy suoraan. Tavallisessa CSS-tilassa sisältöä ei piiloteta. Nousuanimaation `backwards` säilyttää lähtösiirtymän aloitusviiveen aikana; lopuksi elementille ei jää pysyvää transform-määritystä. [MDN: vähennetyn liikkeen asetus](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

## Tarkistukset ja niiden rajat

Kuvien asettelukorjauksen jälkeen lint ja build onnistuivat. Tuotanto-CSS:stä varmistettiin erikseen `lg:max-w-120`-, `max-w-120`- ja `lg:w-112`-mitoitusten sekä `aspect-4/5`- ja `aspect-16/10`-kuvasuhteiden muodostuminen. Kuvien lopullista sijoittelua ei tämän korjauksen yhteydessä testattu selaimessa.

Koodimuutosten yhteydessä `npm.cmd run lint` ja `npm.cmd run build` ovat onnistuneet `portfolio/`-kansiossa. PowerShellissa käytettiin `npm.cmd`-käynnistintä suorituspolitiikan estämän `npm.ps1`:n sijaan. Näillä tarkistettiin staattiset säännöt ja tuotantobuild, ei selaimen toimintaa. Tässä dokumentaatiopäivityksessä niitä ei tarvitse ajaa uudelleen.

Lisäksi aiemmissa tarkistuksissa on varmistettu:

- Kaikki 11 lähdekoodissa viitattua kuvaa löytyivät sekä `public/images/`- että buildin kuvakansiosta täsmälleen oikealla kirjainkoolla.
- Muunnoksessa säilytetyt seitsemän alkuperäistä kuvaa eivät kopioituneet buildiin. Tuolloin buildin koko kuvakansio oli noin 1,34 Mt.
- Molempien kielten esittelytekstissä on neljä ei-tyhjää kappaletta.
- Erillinen Node/VM-simulaatio läpäisi ensimmäisen latauksen, StrictMode-siivoamisen, uuden sivun avaamisen, takaisin-/eteenpäin-palautuksen, linkkikohdistuksen ja varakohteen, saman reitin erilliset historiakäynnit sekä kielenvaihtoa vastaavan uudelleenrenderöinnin. Tämä ei ole projektiin lisätty pysyvä testisarja.

Tässä dokumentaatiopäivityksessä tarkistettiin paikallisten Markdown-linkkien, tiedostopolkujen ja kuvien olemassaolo sekä npm-komentojen vastaavuus `package.json`-tiedostoon. Lisäksi projektimäärä, yhteenvetojen ja esittelyn kappalejaot, navigaation pääsivujen määrä, Jym-linkki ja nykyinen taustaväri tarkistettiin lähdekoodia vasten. Tarkistukset onnistuivat. Sovelluskoodia ei muutettu eikä lint- tai build-komentoja ajettu uudelleen.

Dokumentaation päivitys perustuu paikalliseen koodiin. Ulkoisten GitHub-linkkien julkista saatavuutta tai projektien myöhempää valmistumista ei tällä tarkastelulla vahvisteta.

Ennen julkaisua kannattaa tarkistaa selaimessa responsiivinen asettelu, FI/EN-tekstit ja kielivalinnan säilyminen, Tab-navigointi ja ohituslinkki, hitaan kuvalatauksen vaikutus, animaatiot vähennetyn liikkeen asetuksella sekä pitkältä projektilistalta avaaminen ja palaaminen takaisin-/eteenpäin-painikkeilla. Simulaatio ja onnistunut build eivät korvaa näitä selainkokeita.

## Paikalliset materiaalit

`PLAN.md`, `STRUCTURE.md`, `AGENTS.md`, `projektimateriaalia/` ja `image-originals/` ovat juuren `.gitignore`-määrityksissä. Ne voivat olla käytettävissä paikallisesti, mutta niiden mukanaoloa GitHubista kloonatussa projektissa ei pidä olettaa. `portfolio/.gitignore` ohittaa muun muassa riippuvuudet ja buildit; nykyisessä tiedostossa kuvakansiota ei ole ohitettu. Git-seurantaa ei tarkistettu tai muutettu tässä dokumentaatiotyössä.
