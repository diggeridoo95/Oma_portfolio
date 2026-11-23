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

Etusivu esittelee Eemil Hakalan ja sisältää muokattavan esittelytekstiluonnoksen, linkit projekteihin ja yhteystietoihin sekä CSS:llä toteutetun pyöreän profiilikuvan paikkamerkin. Asettelu on leveällä näytöllä kaksipalstainen ja pienellä näytöllä allekkainen.

Projektilista (`/projects`) ja projektisivu (`/projects/:slug`) käyttävät yhteistä `portfolio/src/data/projects.js`-tiedostoa. Mukana on yksi selvästi merkitty esimerkkiprojekti osoitteessa `/projects/example-project`, kuvan paikkamerkki ja esimerkkiteknologiat. Projektisivulla on yksi yhteenveto ja tuki valinnaisille GitHub- ja demolinkeille. Tuntematon projektiosoite näyttää ilmoituksen ja paluulinkin listaan. Esittely- ja yhteystietosivut ovat vielä väliaikaista sisältöä.

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
