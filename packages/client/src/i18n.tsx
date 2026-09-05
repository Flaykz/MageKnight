import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Locale = "en" | "fr";

type MessageKey =
  | "language.label"
  | "language.english"
  | "language.french"
  | "setup.progress"
  | "setup.adventure"
  | "setup.party"
  | "setup.march"
  | "setup.theMuster"
  | "setup.council"
  | "setup.scenario"
  | "setup.chooseAdventure"
  | "setup.scenarios"
  | "setup.scenarioDetail"
  | "setup.players"
  | "setup.length"
  | "setup.atTable"
  | "setup.objective"
  | "setup.playersAtTable"
  | "setup.soloTrial"
  | "setup.scenarioSeats"
  | "setup.player"
  | "setup.playersPlural"
  | "setup.takeSeats"
  | "setup.playerSeats"
  | "setup.seat"
  | "setup.openSeat"
  | "setup.removeHero"
  | "setup.redAffinity"
  | "setup.blueAffinity"
  | "setup.greenAffinity"
  | "setup.whiteAffinity"
  | "setup.seated"
  | "setup.openThisSeat"
  | "setup.seatAsPlayer"
  | "setup.everySeatFilled"
  | "setup.partyAssembled"
  | "setup.knight"
  | "setup.knights"
  | "setup.readyToMarch"
  | "setup.seatingPlayer"
  | "setup.chooseHero"
  | "setup.selectOpenSeat"
  | "setup.reviewMuster"
  | "setup.heroRoster"
  | "setup.musterAssembled"
  | "setup.marchOut"
  | "setup.out"
  | "setup.beginScenario"
  | "setup.adjustParty"
  | "loading.connecting"
  | "loading.reconnecting"
  | "loading.connectionError"
  | "loading.failedConnection"
  | "loading.serverHint"
  | "loading.initializing"
  | "hotseat.handoff"
  | "hotseat.passTo"
  | "hotseat.privateCards"
  | "hotseat.activeSeat"
  | "hotseat.revealTurn";

const MESSAGES: Record<Locale, Record<MessageKey, string>> = {
  en: {
    "language.label": "Language",
    "language.english": "English",
    "language.french": "Français",
    "setup.progress": "Setup progress",
    "setup.adventure": "Adventure",
    "setup.party": "Party",
    "setup.march": "March",
    "setup.theMuster": "The Muster",
    "setup.council": "Council of the Void",
    "setup.scenario": "Scenario",
    "setup.chooseAdventure": "Choose your adventure",
    "setup.scenarios": "{count} scenarios",
    "setup.scenarioDetail": "Scenario detail",
    "setup.players": "Players",
    "setup.length": "Length",
    "setup.atTable": "At table",
    "setup.objective": "Objective",
    "setup.playersAtTable": "Players at the table",
    "setup.soloTrial": "A solo trial — one seat.",
    "setup.scenarioSeats": "This scenario seats {min} to {max}.",
    "setup.player": "player",
    "setup.playersPlural": "players",
    "setup.takeSeats": "Take your seats →",
    "setup.playerSeats": "Player seats",
    "setup.seat": "Seat",
    "setup.openSeat": "open",
    "setup.removeHero": "Remove {hero} from seat {seat}",
    "setup.redAffinity": "Red affinity",
    "setup.blueAffinity": "Blue affinity",
    "setup.greenAffinity": "Green affinity",
    "setup.whiteAffinity": "White affinity",
    "setup.seated": "Seated — Player {player}",
    "setup.openThisSeat": "Open this seat",
    "setup.seatAsPlayer": "Seat as Player {player}",
    "setup.everySeatFilled": "Every seat is filled",
    "setup.partyAssembled": "Party assembled.",
    "setup.knight": "knight",
    "setup.knights": "knights",
    "setup.readyToMarch": "ready to march.",
    "setup.seatingPlayer": "Seating Player {player}.",
    "setup.chooseHero": "Choose a hero from the roster below.",
    "setup.selectOpenSeat": "Select an open seat to assign a hero.",
    "setup.reviewMuster": "Review the muster →",
    "setup.heroRoster": "Hero roster",
    "setup.musterAssembled": "The muster is assembled",
    "setup.marchOut": "March Out",
    "setup.out": "Out",
    "setup.beginScenario": "Begin the scenario",
    "setup.adjustParty": "← Adjust the party",
    "loading.connecting": "Connecting to Rust server...",
    "loading.reconnecting": "Reconnecting to Rust server...",
    "loading.connectionError": "Connection Error",
    "loading.failedConnection": "Failed to connect to Rust server",
    "loading.serverHint": "Make sure mk-server is running: cargo run --release -p mk-server",
    "loading.initializing": "Initializing game...",
    "hotseat.handoff": "Hotseat handoff",
    "hotseat.passTo": "Pass to {hero}",
    "hotseat.privateCards": "Private cards stay covered until the next player is ready.",
    "hotseat.activeSeat": "Active seat {seat}",
    "hotseat.revealTurn": "Reveal turn",
  },
  fr: {
    "language.label": "Langue",
    "language.english": "English",
    "language.french": "Français",
    "setup.progress": "Progression de la mise en place",
    "setup.adventure": "Aventure",
    "setup.party": "Compagnie",
    "setup.march": "Marche",
    "setup.theMuster": "Le rassemblement",
    "setup.council": "Conseil du Néant",
    "setup.scenario": "Scénario",
    "setup.chooseAdventure": "Choisissez votre aventure",
    "setup.scenarios": "{count} scénarios",
    "setup.scenarioDetail": "Détails du scénario",
    "setup.players": "Joueurs",
    "setup.length": "Durée",
    "setup.atTable": "À la table",
    "setup.objective": "Objectif",
    "setup.playersAtTable": "Joueurs à la table",
    "setup.soloTrial": "Une épreuve en solitaire — une place.",
    "setup.scenarioSeats": "Ce scénario accepte {min} à {max} joueurs.",
    "setup.player": "joueur",
    "setup.playersPlural": "joueurs",
    "setup.takeSeats": "Prenez place →",
    "setup.playerSeats": "Places des joueurs",
    "setup.seat": "Place",
    "setup.openSeat": "libre",
    "setup.removeHero": "Retirer {hero} de la place {seat}",
    "setup.redAffinity": "Affinité rouge",
    "setup.blueAffinity": "Affinité bleue",
    "setup.greenAffinity": "Affinité verte",
    "setup.whiteAffinity": "Affinité blanche",
    "setup.seated": "Installé — Joueur {player}",
    "setup.openThisSeat": "Libérer cette place",
    "setup.seatAsPlayer": "Installer comme joueur {player}",
    "setup.everySeatFilled": "Toutes les places sont prises",
    "setup.partyAssembled": "Compagnie rassemblée.",
    "setup.knight": "chevalier",
    "setup.knights": "chevaliers",
    "setup.readyToMarch": "prêts à marcher.",
    "setup.seatingPlayer": "Installation du joueur {player}.",
    "setup.chooseHero": "Choisissez un héros dans la liste ci-dessous.",
    "setup.selectOpenSeat": "Sélectionnez une place libre pour installer un héros.",
    "setup.reviewMuster": "Revoir le rassemblement →",
    "setup.heroRoster": "Liste des héros",
    "setup.musterAssembled": "Le rassemblement est terminé",
    "setup.marchOut": "En avant",
    "setup.out": "",
    "setup.beginScenario": "Commencer le scénario",
    "setup.adjustParty": "← Modifier la compagnie",
    "loading.connecting": "Connexion au serveur Rust...",
    "loading.reconnecting": "Reconnexion au serveur Rust...",
    "loading.connectionError": "Erreur de connexion",
    "loading.failedConnection": "Impossible de joindre le serveur Rust",
    "loading.serverHint": "Vérifiez que mk-server est démarré : cargo run --release -p mk-server",
    "loading.initializing": "Initialisation de la partie...",
    "hotseat.handoff": "Passage de la main",
    "hotseat.passTo": "Passez la main à {hero}",
    "hotseat.privateCards": "Les cartes privées restent cachées jusqu’à ce que le joueur suivant soit prêt.",
    "hotseat.activeSeat": "Place active : {seat}",
    "hotseat.revealTurn": "Révéler le tour",
  },
};

export interface SetupScenarioCopy {
  readonly title: string;
  readonly tagline: string;
  readonly premise: string;
  readonly rounds: string;
  readonly tableLength: string;
  readonly objective: string;
}

const FRENCH_SCENARIO_COPY: Record<string, SetupScenarioCopy> = {
  standard: {
    title: "Première reconnaissance",
    tagline: "Révéler une cité · 4 manches",
    premise:
      "Un éclaireur solitaire s’aventure aux confins sauvages du royaume. Apprenez le rythme du jour et de la nuit, maîtrisez votre paquet et découvrez la première grande cité avant la fin des manches.",
    rounds: "4 manches",
    tableLength: "~45 min",
    objective: "Révéler une cité",
  },
  full_conquest: {
    title: "Conquête totale",
    tagline: "Conquérir chaque cité · 6 manches",
    premise:
      "La campagne complète du Conseil. Deux à quatre Chevaliers-Mages parcourent une vaste carte, gagnent en puissance puis prennent toutes les cités avant leurs rivaux.",
    rounds: "6 manches",
    tableLength: "2–3 h",
    objective: "Conquérir chaque cité",
  },
  blitz_conquest: {
    title: "Conquête éclair",
    tagline: "Conquérir le premier · 4 manches",
    premise:
      "Une guerre plus courte et plus intense. La gloire et la source de mana s’accélèrent : frappez tôt, frappez fort et saisissez les cités avant que les autres ne rassemblent leurs forces.",
    rounds: "4 manches",
    tableLength: "60–90 min",
    objective: "Être le premier à conquérir",
  },
  recon_explore: {
    title: "Secteur d’exploration",
    tagline: "Cartographier les terres · sans ennemis",
    premise:
      "Pas d’ennemis, pas de pression temporelle : seulement vous, la carte et votre paquet de mouvement. Une épreuve paisible pour apprendre à révéler les tuiles et lire le terrain.",
    rounds: "Épreuve libre",
    tableLength: "~20 min",
    objective: "Atteindre la cité",
  },
  exploration: {
    title: "Exercice de campagne",
    tagline: "Révéler une cité · parcours court",
    premise:
      "Un parcours compact pour tester rapidement la carte et les déplacements, sans ennemis mais avec toutes les décisions de révélation.",
    rounds: "Exercice court",
    tableLength: "~12 min",
    objective: "Révéler une cité",
  },
  exploration_tiny: {
    title: "Petite exploration",
    tagline: "Test rapide · carte minimale",
    premise:
      "La configuration la plus courte : le moyen le plus rapide de passer du rassemblement au plateau. Idéal pour un test express.",
    rounds: "Mini-exercice",
    tableLength: "~5 min",
    objective: "Révéler une cité",
  },
};

interface I18nValue {
  readonly locale: Locale;
  readonly setLocale: (locale: Locale) => void;
  readonly t: (key: MessageKey, values?: Record<string, string | number>) => string;
  readonly scenarioCopy: (key: string, fallback: SetupScenarioCopy) => SetupScenarioCopy;
}

const I18nContext = createContext<I18nValue | null>(null);

function detectInitialLocale(): Locale {
  if (typeof window !== "undefined") {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem("mage-knight-locale");
    } catch {
      // Ignore storage restrictions and fall back to the browser language.
    }
    if (saved === "fr" || saved === "en") return saved;
    if (window.navigator.language.toLowerCase().startsWith("fr")) return "fr";
  }
  return "en";
}

export function LanguageProvider({ children }: { readonly children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);
  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("mage-knight-locale", next);
      } catch {
        // The preference remains active for this session.
      }
    }
  };
  const value = useMemo<I18nValue>(() => ({
    locale,
    setLocale,
    t: (key, values) => {
      let message = MESSAGES[locale][key];
      for (const [name, value] of Object.entries(values ?? {})) {
        message = message.replaceAll(`{${name}}`, String(value));
      }
      return message;
    },
    scenarioCopy: (key, fallback) => locale === "fr" ? FRENCH_SCENARIO_COPY[key] ?? fallback : fallback,
  }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (value) return value;
  return {
    locale: "en",
    setLocale: () => undefined,
    t: (key, values) => {
      let message = MESSAGES.en[key];
      for (const [name, value] of Object.entries(values ?? {})) {
        message = message.replaceAll(`{${name}}`, String(value));
      }
      return message;
    },
    scenarioCopy: (_key, fallback) => fallback,
  };
}
