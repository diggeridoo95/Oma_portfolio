export const projects = [
  {
    slug: 'locost-telemetry',
    status: 'inProgress',
    image: '/images/projectlocostmain.png',
    imageAlt: {
      fi: 'Locost-kilpa-auto ja telemetriajärjestelmän laitteistoa.',
      en: 'The Locost race car and telemetry system hardware.',
    },
    technologies: ['React', 'JavaScript', 'Python', 'FastAPI', 'SQLite', 'WebSocket'],
    githubUrl: 'https://github.com/diggeridoo95/locost_telemetry',
    demoUrl: null,
    content: {
      fi: {
        title: 'Locost-telemetria',
        category: 'Ajoneuvotelemetria',
        description: 'Kehitämme kolmen tietotekniikan opiskelijan ryhmässä telemetriajärjestelmää SeAMK:n Project LoCost -kilpa-autoon. Auton ovat rakentaneet SeAMK:n auto- ja työkonetekniikan insinööriopiskelijat.',
        summary: `SeAMK Project LoCost Projektipaja® on SeAMK:n auto- ja työkonetekniikan insinööriopiskelijoiden rakentama LoCost-luokan kilpa-auto. Meidän kolmen tietotekniikan opiskelijan ryhmämme vastaa autoon kehitettävästä telemetriajärjestelmästä. Tavoitteenamme on helpottaa auton teknisen toiminnan seurantaa ja hyödyntää mittausdataa auton säätämisessä sekä suorituskyvyn analysoinnissa.

Ensimmäinen kehitysvaihe keskittyy öljynpaineen seurantaan. Nykyisessä ohjelmistoversiossa React-käyttöliittymä näyttää reaaliaikaiset mittaukset ja mittaushistorian, ja Pythonilla sekä FastAPIlla toteutettu palvelinpuoli tallentaa tiedot SQLite-tietokantaan. Ohjelmistoa kehitetään ja testataan simuloidulla datalla.

Anturin, ESP32:n ja Raspberry Pi:n muodostaman laitteistoketjun toteutus ja käytännön testaus ovat vielä kesken. Myöhemmin järjestelmää on tarkoitus laajentaa muihin antureihin, moottorinohjauksen tietoihin ja etäseurantaan.`,
      },
      en: {
        title: 'Locost Telemetry',
        category: 'Vehicle telemetry',
        description: "Our team of three information technology students is developing a telemetry system for SeAMK's Project LoCost race car. The car was built by SeAMK students in Automotive and Work Machine Engineering.",
        summary: `SeAMK Project LoCost Projektipaja® is a LoCost-class race car built by SeAMK students in Automotive and Work Machine Engineering. Our team of three information technology students is responsible for the telemetry system being developed for the car. Our aim is to make it easier to monitor the car and use measurement data for tuning and performance analysis.

The first development phase focuses on oil pressure monitoring. The current software version includes a React interface displaying live readings and measurement history, while a Python and FastAPI backend stores the data in SQLite. The software is being developed and tested with simulated data.

Implementation and physical testing of the sensor, ESP32 and Raspberry Pi hardware chain are still in progress. Later development is intended to cover additional sensors, engine management data and remote monitoring.`,
      },
    },
  },
  {
    slug: 'jym-workout',
    status: 'mvpReady',
    image: '/images/jymmain.png',
    imageAlt: {
      fi: 'Jym-sovelluksen treeniohjelman luontinäkymä, jossa valitaan treenipäivät ja lisätään liikkeet.',
      en: 'The Jym workout plan creation screen for selecting training days and adding exercises.',
    },
    detailImage: '/images/jym1.png',
    detailImageAlt: {
      fi: 'Jym-sovelluksen etusivu, jossa näkyvät aktiivinen treeniohjelma ja viikon treeni- sekä lepopäivät.',
      en: 'The Jym home page showing the active workout plan and weekly training and rest days.',
    },
    technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'Docker'],
    githubUrl: null,
    demoUrl: null,
    content: {
      fi: {
        title: 'Jym',
        category: 'Treeniohjelmien hallinta',
        description: 'Treeniohjelmien suunnitteluun ja hallintaan tarkoitettu verkkosovellus. Käyttäjä voi rakentaa viikko-ohjelman, määrittää liikkeet sarjoineen ja toistoineen sekä valita aktiivisen treeniohjelman.',
        summary: `Jym on kuntosaliharjoittelun suunnitteluun tarkoitettu verkkosovellus. Käyttäjä voi luoda omia treeniohjelmia, jakaa viikon treeni- ja lepopäiviin sekä määrittää liikkeiden sarjat ja toistot. Aktiiviseksi valittu ohjelma näkyy sovelluksen etusivulla.

Käyttöliittymä on toteutettu Reactilla ja JavaScriptillä, ja palvelinpuoli käyttää Node.js:ää sekä Expressiä. Käyttäjäkohtaiset ohjelmat tallennetaan PostgreSQL-tietokantaan Sequelize-ORM:n kautta. Sovellus sisältää rekisteröitymisen ja istuntopohjaisen kirjautumisen, ja sen voi käynnistää paikallisesti Dockerilla.

Sovelluksen MVP on valmis. Seuraavana tavoitteena on toteuttaa asennettava PWA-versio ja julkaista sovellus käyttöön. Toteutuneiden harjoitusten, käytettyjen painojen ja kehityksen seuranta kuuluvat myöhempään jatkokehitykseen.`,
      },
      en: {
        title: 'Jym',
        category: 'Workout plan management',
        description: 'A web application for creating and managing workout plans. Users can build a weekly schedule, define exercises with sets and repetitions, and choose an active workout plan.',
        summary: `Jym is a web application for planning gym workouts. Users can create their own workout plans, divide the week into training and rest days, and define sets and repetitions for each exercise. The selected active plan is displayed on the home page.

The interface is built with React and JavaScript, while the backend uses Node.js and Express. User-specific plans are stored in PostgreSQL through the Sequelize ORM. The application includes registration and session-based authentication, and it can be run locally with Docker.

The MVP is ready. The next goal is to create an installable PWA version and publish the application. Logging completed workouts, tracking the weights used and monitoring progress are planned for later development.`,
      },
    },
  },
  {
    slug: 'zombie-island',
    status: 'prototype',
    image: '/images/zombie_peli1.png',
    imageAlt: {
      fi: 'Zombie Island -pelin aloitusnäkymä, jossa näkyy zombeja ja pelin käynnistyspainike.',
      en: 'The Zombie Island start screen showing zombies and the start button.',
    },
    detailImage: '/images/zombie_peli3.png',
    detailImageAlt: {
      fi: 'Zombie Island -pelin ensimmäisen persoonan näkymä, jossa zombit lähestyvät aseistautunutta pelaajaa.',
      en: 'A first-person view in Zombie Island with zombies approaching the armed player.',
    },
    technologies: ['Unity 6', 'C#', 'URP', 'NavMesh', 'Unity Animator', 'Unity UI'],
    githubUrl: null,
    demoUrl: null,
    content: {
      fi: {
        title: 'Zombie Island',
        category: '3D-selviytymispeli',
        description: 'Unitylla toteutettu ensimmäisen persoonan selviytymispelin prototyyppi. Pelaaja avaa uusia alueita ja taistelee kasvavia zombiaaltoja vastaan.',
        summary: `Toteutin itsenäisesti Unitylla ensimmäisen persoonan zombie-selviytymispelin prototyypin harjoitellakseni C#-ohjelmointia ja pelinkehitystä. Pelissä edetään ympäristössä, avataan uusia alueita ja selviydytään kasvavista vihollisaalloista.

Toteutin pelaajan liikkumisen, ase- ja elämäpistejärjestelmät sekä NavMesh-reitinhakua hyödyntävät viholliset. Pelimaailman tapahtumia ohjaavat muun muassa avaimella avautuva silta, alueelle saapumisesta käynnistyvät vihollisaallot ja reittipisteiden mukaan liikkuva vene.

Vastasin pelilogiikasta, käyttöliittymästä sekä animaatioiden ja valmiiden assettien yhdistämisestä kokonaisuuteen. Projektissa harjoittelin erityisesti tapahtumapohjaista ohjelmointia, pelitekoälyä ja järjestelmien vaiheittaista kehittämistä.`,
      },
      en: {
        title: 'Zombie Island',
        category: '3D survival game',
        description: 'A first-person survival game prototype built with Unity. The player unlocks new areas and fights increasingly large waves of zombies.',
        summary: `I independently developed a first-person zombie survival game prototype in Unity to practise C# programming and game development. The player explores the environment, unlocks new areas and survives increasingly large waves of enemies.

I implemented player movement, weapon and health systems, and enemies using NavMesh pathfinding. Events in the game world include a bridge unlocked with a key, enemy waves triggered by entering an area, and a boat that moves between waypoints.

I was responsible for the game logic, user interface, and integrating animations and existing assets into the game. The project helped me practise event-driven programming, game AI and developing systems step by step.`,
      },
    },
  },
  {
    slug: 'tetris-overwhelmed',
    status: 'completed',
    image: '/images/tetri-project.png',
    imageAlt: {
      fi: 'Tetris Overwhelmed -pelin värikäs aloitusvalikko.',
      en: 'The colourful start menu of Tetris Overwhelmed.',
    },
    detailImage: '/images/tetris-project2.png',
    detailImageAlt: {
      fi: 'Tetris Overwhelmed -pelin pelinäkymä, jossa näkyvät pelikenttä, pisteet, taso, aika ja seuraava palikka.',
      en: 'Tetris Overwhelmed gameplay showing the board, score, level, timer and next piece.',
    },
    technologies: ['Python', 'Git'],
    githubUrl: 'https://github.com/diggeridoo95/OhjelmistoProjekti_Tetris',
    demoUrl: null,
    content: {
      fi: {
        title: 'Tetris Overwhelmed',
        category: 'Ohjelmistoprojektikurssin ryhmätyö',
        description: 'Neljän hengen ryhmässä ohjelmistoprojektikurssilla toteutettu Tetris-versio, jossa perinteistä peliä täydentävät erikoiskyvyt ja satunnaiset tapahtumat. Kurssilla painotettiin tiimityötä, suunnittelua ja sprinttityöskentelyä.',
        summary: `Toteutimme Tetris Overwhelmed -pelin neljän henkilön ryhmässä ohjelmistoprojektikurssilla. Kurssin päätavoitteena oli harjoitella tiiminä toimimista, ohjelmiston suunnittelua ja sprinttityöskentelyä. Pythonilla toteutettu peli yhdistää perinteisen Tetriksen tasopohjaiseen etenemiseen, erikoiskykyihin ja satunnaisiin tapahtumiin.

Projektin ensimmäiset 2–3 viikkoa käytettiin suunnitteluun ja vaatimusten määrittelyyn. Tätä seurasi kahdeksan viikon sprinttijakso, jonka aikana toteutusta edistettiin ja tehtäviä seurattiin yhteisellä tehtävätaululla. Kurssin lopuksi esittelimme projektin ryhmänä.

Oma osuuteni sisälsi projektin tiedostorakenteen, peliruudukon, pelinäytön tietopaneelin ja pisteytyksen toteutusta. Tein myös aloitus-, tauko- ja asetusvalikoita sekä musiikkiin, ääniefekteihin ja koko näytön tilaan liittyviä toimintoja. Lisäksi toteutin pommi-erikoiskykyä ja pelikentän kääntymistä sekä niihin liittyviä visuaalisia efektejä.`,
      },
      en: {
        title: 'Tetris Overwhelmed',
        category: 'Software project course team assignment',
        description: 'A Tetris variant developed by a team of four on a software project course, adding special abilities and random events to the traditional game. The course focused on teamwork, planning and sprint-based development.',
        summary: `We developed Tetris Overwhelmed as a team of four on a software project course. The main goal was to practise teamwork, software planning and sprint-based development. Built with Python, the game combines traditional Tetris with level progression, special abilities and random events.

The first 2–3 weeks were spent on planning and defining requirements. This was followed by an eight-week sprint phase, during which we developed the game and tracked tasks on a shared task board. At the end of the course, we presented the project as a group.

My contributions included work on the project file structure, game grid, heads-up display and scoring. I also worked on the start, pause and options menus, music, sound effects and fullscreen functionality. In addition, I implemented parts of the bomb ability and board-flipping mechanic, along with related visual effects.`,
      },
    },
  },
]
