# Henkilökohtainen portfolio

Henkilökohtainen kehittäjäportfolio osaamisen ja projektien esittelyyn suomalaisille työnantajille ja harjoittelupaikkojen hakemista varten.

## Suunniteltu sisältö

- Etusivu ja lyhyt esittely.
- Projektilista ja projektikohtaiset sivut.
- Tarkempi esittely ja yhteystiedot.
- Eri näyttökokoihin mukautuva ja saavutettava käyttöliittymä.

## Työkalut

| Työkalu                 | Käyttötarkoitus                                 |
| ----------------------- | ----------------------------------------------- |
| React ja JavaScript/JSX | Käyttöliittymän komponentit ja toiminnallisuus  |
| Vite                    | Kehityspalvelin ja tuotantoversion rakentaminen |
| Tailwind CSS            | Käyttöliittymän tyylit                          |
| React Router            | Sivujen välinen navigointi                      |
| Lucide React            | Kuvakkeet tarvittaessa                          |
| Oxlint                  | Koodin staattinen tarkistus                     |
| npm                     | Riippuvuuksien ja projektikomentojen hallinta   |
| Git ja GitHub           | Versionhallinta ja lähdekoodin jakaminen        |

Sovellus toteutetaan selaimessa toimivana React-sovelluksena. Suunnitelmaan ei tällä hetkellä kuulu palvelinpuolta, tietokantaa tai kirjautumista.

## Nykyinen tila

React- ja Vite-pohja sekä Tailwind CSS ovat käytössä. Sovelluksessa on yhteinen navigaatio ja alatunniste sekä reitit etusivulle, projekteihin, esittelyyn ja yhteystietoihin. Tuntemattomille osoitteille näytetään ilmoitus ja linkki etusivulle.

Etusivu esittelee Eemil Hakalan ja sisältää muokattavan esittelytekstin, linkit projekteihin ja yhteystietoihin sekä pyöreäksi rajatun profiilikuvan (`portfolio/public/images/Etusivu2.jpg`). Asettelu on leveällä näytöllä kaksipalstainen ja pienellä näytöllä allekkainen.

Projektilista (`/projects`) ja projektisivu (`/projects/:slug`) käyttävät yhteistä `portfolio/src/data/projects.js`-tiedostoa. Ensimmäinen esitelty työ on kolmen opiskelijan keskeneräinen Locost-telemetriaprojekti osoitteessa `/projects/locost-telemetry`. Sen kuva on `portfolio/public/images/locost.png`, ja kortissa näkyy tila ”Kehitteillä”. Projektin tiedot, teknologiat ja GitHub-linkki perustuvat projektin dokumentaatioon. Kuvaus erottaa nykyisen ohjelmiston vielä toteutettavasta ja testattavasta laitteistointegraatiosta.

Toinen projekti on Jym-treeniohjelmasovellus osoitteessa `/projects/jym-workout`. Sen MVP on käyttäjän vahvistuksen mukaan valmis: sovelluksessa voi kirjautua sisään ja hallita omia viikko-ohjelmia, treenipäiviä sekä suunniteltuja liikkeitä sarjoineen ja toistoineen. Asennettava PWA-versio ja julkinen käyttöönotto ovat seuraavia tavoitteita. Kortin kuvana on treeniohjelman luontinäkymä `jym1.png` ja projektisivulla etusivun näkymä `jym2.png`. GitHub- ja demolinkit odottavat osoitteiden vahvistamista.

Kolmas projekti on itsenäisesti toteutettu Unity-peliprototyyppi Zombie Island osoitteessa `/projects/zombie-island`. Kortin kuvana on `zombie_peli1.png` ja projektisivun kuvana `zombie_peli3.png`. Suomen- ja englanninkieliset yhteenvedot on jaettu kolmeen kappaleeseen.

Neljäs projekti on ohjelmistoprojektikurssilla neljän henkilön ryhmässä toteutettu Tetris Overwhelmed osoitteessa `/projects/tetris-overwhelmed`. Sen tila on ”Valmis”. Yhteenveto käsittelee kurssin tiimityö- ja suunnittelutavoitteita, 2–3 viikon suunnitteluvaihetta, kahdeksan viikon sprinttijaksoa sekä Eemilin omaa osuutta toteutuksessa. Kortin kuva on `tetri-project.png` ja projektisivun kuva `tetris-project2.png`. Mukana on GitHub-linkki.

Projektisivulla on yksi kappaleisiin jaettu yhteenveto ja tuki valinnaisille GitHub- ja demolinkeille. Korttien tilat käännetään molemmille kielille: `inProgress` tarkoittaa kehitteillä olevaa, `mvpReady` valmista MVP:tä, `prototype` prototyyppiä ja `completed` valmistunutta projektia. Tuntematon projektiosoite näyttää ilmoituksen ja paluulinkin listaan.

Esittelysivulla (`/about`) on esittelyteksti vasemmalla ja 4:5-kuvasuhteen suorakulmainen esityskuva (`portfolio/public/images/Esitys.jpg`) oikealla. Puhelimella ne ovat allekkain. Kuvilla on vaihtoehtoiset tekstit suomeksi ja englanniksi. Suomenkielinen esittely on päivitetty, ja englanninkielinen teksti on vielä paikkamerkki.

Yhteystietosivulla (`/contact`) on reunustetut sähköposti-, GitHub- ja LinkedIn-linkkipainikkeet käyttäjän lisäämillä osoitteilla. Painikkeet asettuvat rinnakkain ja rivittyvät pienillä näytöillä. Sähköposti- ja GitHub-kuvakkeet ovat `public/images/`-kansiosta, ja LinkedInin sininen `in`-merkki on tehty HTML/CSS:llä.

Käyttöliittymän oletuskieli on suomi. FI / EN -painikkeet vaihtavat myös saavutettavuustekstit ja välilehden otsikon ilman sivun uudelleenlatausta. Käyttäjän valinta muistetaan selaimen `localStorage`ssa, jos tallennus on käytettävissä. Komponentit, funktiot ja muut koodin tunnisteet nimetään englanniksi. Etusivun linkkien nuolikuvakkeet tulevat Lucide Reactista.

## Kehityskomennot

Komennot suoritetaan `portfolio/`-kansiossa. Node.js ja npm tarvitaan paikalliseen kehitykseen.

```sh
cd portfolio
npm install
npm run dev
```

`npm install` asentaa riippuvuudet; sitä tarvitaan ensimmäisellä käyttökerralla tai riippuvuuksien muuttuessa.

Muut käytettävissä olevat komennot:

```sh
npm run lint
npm run build
npm run preview
```

`lint` tarkistaa koodin, `build` rakentaa tuotantoversion ja `preview` käynnistää rakennetun version paikallisen esikatselun.

## Projektin tiedostot

- `portfolio/` — sovelluksen lähdekoodi, asetukset ja riippuvuudet.
- `design-references/` — ulkoasun referenssikuvat.
- `PLAN.md` — lyhyt rakennussuunnitelma.
- `DOCS.md` — merkittävien toteutusten dokumentaatio.
- `STRUCTURE.md` — ehdotus tavoitellusta kansiorakenteesta, ei nykyisen rakenteen kuvaus.
- `AGENTS.md` — projektin työskentelyohjeet ja muutosten hyväksymiskäytäntö.

Projektissa suositaan pieniä, ymmärrettäviä toteutusvaiheita ja Full Stack Open -kurssin mukaisia Reactin perusmalleja.
