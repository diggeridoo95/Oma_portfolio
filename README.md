# Eemil Hakala — henkilökohtainen portfolio

Reactilla toteutettu kehittäjäportfolio, jossa esittelen projektejani, osaamistani ja taustaani. Sivusto on suunnattu erityisesti suomalaisille työnantajille ja harjoittelupaikkojen hakemista varten.

## Sisältö ja toiminta

Sivustossa on etusivu, projektilista, projektikohtaiset sivut, esittely ja yhteystiedot. Käyttöliittymä mukautuu eri näyttökokoihin. Portfolio toimii selaimessa ilman omaa palvelinpuolta, tietokantaa tai kirjautumista.

- Suomi on oletuskieli. FI / EN -valinta vaihtaa myös saavutettavuustekstit ja välilehden otsikon. Kielivalinta muistetaan selaimessa, jos tallennus on käytettävissä.
- Etusivun tervehdys vaihtuu kävijän paikallisen kellonajan mukaan.
- Projektisivuilla on kappaleisiin jaettu yhteenveto, kuva, teknologiat ja mahdolliset lähdekoodilinkit. Projektien tilat näkyvät tekstin ja värillisen pisteen sisältävinä merkkeinä.
- Uusi sivu avautuu ylhäältä. Selaimen takaisin- ja eteenpäin-painikkeilla palautetaan vierityskohta ja mahdollisuuksien mukaan aiempi linkkikohdistus nykyisen sivulatauksen aikana.
- Sivut tulevat näkyviin lyhyellä häivytyksellä ja pienellä nousuliikkeellä. Vähennetyn liikkeen asetus huomioidaan.
- Näppäimistökäyttöä tukevat kohdistuskorostukset ja Siirry sisältöön -linkki.

## Esiteltävät projektit

| Projekti | Tila | Aihe | Lähdekoodi |
| --- | --- | --- | --- |
| Locost-telemetria | Kehitteillä | Kolmen tietotekniikan opiskelijan toteuttama telemetriajärjestelmä SeAMK:n LoCost-kilpa-autoon | [GitHub](https://github.com/diggeridoo95/locost_telemetry) |
| Jym | MVP valmis | Treeniohjelmien hallinnan PWA-sovellus; demo julkaistu Renderissä | [GitHub](https://github.com/diggeridoo95/jym_workout_tracker_1) · [Demo](https://jym-0kwo.onrender.com/) |
| Zombie Island | Prototyyppi | Itsenäisesti toteutettu Unity-selviytymispeli | — |
| Tetris Overwhelmed | Valmis | Neljän hengen kurssiprojekti, jossa harjoiteltiin tiimityötä ja sprinttityöskentelyä | [GitHub](https://github.com/diggeridoo95/OhjelmistoProjekti_Tetris) |

Jym-sovelluksen PWA-versio on toteutettu ja demoversio julkaistu Render-palvelussa. Avaa demo -linkki löytyy sekä projektikortista että projektisivulta GitHub-linkin vierestä. Toteutuneiden harjoitusten seuranta kuuluu edelleen jatkokehitykseen. Locostissa erotetaan nykyinen ohjelmisto keskeneräisestä laitteistointegraatiosta. Auton rakentamisesta vastaavat SeAMK:n auto- ja työkonetekniikan opiskelijat.

## Työkalut

| Työkalu | Käyttö |
| --- | --- |
| React ja JavaScript/JSX | Käyttöliittymän komponentit ja toiminnallisuus |
| Vite | Kehityspalvelin ja tuotantobuild |
| Tailwind CSS 4 | Tyylit ja responsiivinen asettelu |
| React Router | Reititys ja navigointi |
| Lucide React | Kuvakkeet |
| Oxlint | Koodin staattinen tarkistus |
| npm | Riippuvuudet ja projektikomennot |
| Git ja GitHub | Versionhallinta |

Riippuvuudet ja komennot löytyvät tiedostosta [portfolio/package.json](portfolio/package.json).

## Paikallinen kehitys

Tarvitset Node.js:n ja npm:n. Suorita komennot projektin juuresta:

```sh
cd portfolio
npm install
npm run dev
```

| Komento `portfolio/`-kansiossa | Tarkoitus |
| --- | --- |
| `npm run lint` | Tarkistaa koodin Oxlintilla |
| `npm run build` | Rakentaa tuotantoversion `dist/`-kansioon |
| `npm run preview` | Esikatselee rakennettua versiota paikallisesti |

Jos PowerShellin suorituspolitiikka estää `npm.ps1`:n, käytä komentojen alussa `npm.cmd`, esimerkiksi `npm.cmd run dev`. Tuotantopalvelimen pitää ohjata sovelluksen reitit `index.html`:ään, jotta alasivujen suora avaaminen toimii.

## Rakenne ja sisällön muokkaaminen

| Polku | Sisältö |
| --- | --- |
| `portfolio/src/pages/` | Sivukomponentit ja 404-sivu |
| `portfolio/src/components/` | Navigaatio, projektikortti, alatunniste ja navigoinnin hallinta |
| `portfolio/src/data/projects.js` | Projektitiedot, kuvat ja linkit sekä FI/EN-projektitekstit |
| `portfolio/src/data/navigation.js` | Pääsivujen polut ja käännösavaimet |
| `portfolio/src/translations/` | Käyttöliittymän ja esittelyn FI/EN-tekstit |
| `portfolio/src/context/` | Kielitila ja sen tarjoaja |
| `portfolio/src/index.css` | Teema, perustyylit ja animaatiot |
| `portfolio/public/images/` | Sivuston kuvat ja kuvakkeet |
| `design-references/` | Ulkoasun referenssikuvat |
| [DOCS.md](DOCS.md) | Toteutuksen perustelut, kuvakäytännöt ja tarkistukset |

Projektien kuvanimissä `projects` tarkoittaa projektilistan kuvaa ja `project` projektisivun kuvaa. Etusivu käyttää kuvaa `etusivu.webp` ja esittely kuvaa `esittely.webp`. Suuret kuvat on kevennetty WebP-muotoon; Jym-kuvat ja kuvakkeet ovat PNG-tiedostoja. Projektisivun kuvalle varataan 16:10-kehys jo ennen latautumista.

Alkuperäiset kuvat säilyvät paikallisessa `image-originals/`-kansiossa, joka on ohitettu Gitistä eikä sisälly tuotantobuildiin.

## Tarkistusten tila

Koodimuutosten yhteydessä lint ja tuotantobuild ovat onnistuneet. Kuvaviittausten olemassaolo ja kirjainkoko on tarkistettu. Vierityksen ja kohdistuksen hallintaa on tarkistettu myös erillisellä simulaatiolla. Nämä eivät korvaa selaimessa tehtävää ulkoasun, saavutettavuuden ja navigoinnin testausta; tarkempi tilanne on DOCS.md:ssä.
