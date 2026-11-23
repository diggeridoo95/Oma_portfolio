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

React- ja Vite-pohja on alustettu `portfolio/`-kansioon. Sovellus näyttää tällä hetkellä tekstin ”Hei maailma”. Tailwind CSS, React Router ja Lucide React on asennettu, mutta niiden käyttöönotto sovelluksessa on vielä tekemättä. Sivut ja kielenvaihto ovat suunnitteluvaiheessa.

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
- `DOCS.md` — merkittävien toteutusten dokumentaatio; tällä hetkellä tyhjä.
- `STRUCTURE.md` — ehdotus tavoitellusta kansiorakenteesta, ei nykyisen rakenteen kuvaus.
- `AGENTS.md` — projektin työskentelyohjeet ja muutosten hyväksymiskäytäntö.

Projektissa suositaan pieniä, ymmärrettäviä toteutusvaiheita ja Full Stack Open -kurssin mukaisia Reactin perusmalleja.
