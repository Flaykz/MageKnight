/**
 * Persistent progress spine for the setup flow.
 * Reads I · II · III across the top, shows the chosen scenario, and (on the
 * party step) a row of seat dots that fill as heroes are seated. Completed
 * steps are clickable to step back; future steps are locked.
 */

import { useI18n } from "../../i18n";

const SETUP_STEP_ADVENTURE = "adventure" as const;
const SETUP_STEP_PARTY = "party" as const;
const SETUP_STEP_MARCH = "march" as const;

export type SetupStepKey =
  | typeof SETUP_STEP_ADVENTURE
  | typeof SETUP_STEP_PARTY
  | typeof SETUP_STEP_MARCH;

interface SetupSpineStep {
  readonly key: SetupStepKey;
  readonly numeral: string;
  readonly label: string;
}

const SETUP_SPINE_STEPS: readonly SetupSpineStep[] = [
  { key: SETUP_STEP_ADVENTURE, numeral: "I", label: "Adventure" },
  { key: SETUP_STEP_PARTY, numeral: "II", label: "Party" },
  { key: SETUP_STEP_MARCH, numeral: "III", label: "March" },
] as const;

interface SetupSpineProps {
  readonly stepIndex: number;
  readonly maxStep: number;
  readonly scenarioTitle: string;
  readonly playerCount: number;
  readonly filledCount: number;
  readonly activeSeatIndex: number;
  readonly onGoToStep: (index: number) => void;
}

export function SetupSpine({
  stepIndex,
  maxStep,
  scenarioTitle,
  playerCount,
  filledCount,
  activeSeatIndex,
  onGoToStep,
}: SetupSpineProps) {
  const { locale, setLocale, t } = useI18n();
  const localizedSteps = locale === "fr"
    ? ["Aventure", "Compagnie", "Marche"]
    : ["Adventure", "Party", "March"];
  return (
    <header className="setup-spine">
      <div className="setup-spine__brand">
        <b>Mage Knight</b>
        <span>{t("setup.theMuster")}</span>
      </div>

      <nav className="setup-spine__steps" aria-label={t("setup.progress")}>
        {SETUP_SPINE_STEPS.map((spineStep, index) => {
          const state =
            index === stepIndex ? "is-active" : index < stepIndex ? "is-done" : "";
          const reachable = index <= maxStep;
          return (
            <div className="setup-spine__step-wrap" key={spineStep.key}>
              {index > 0 && (
                <span
                  className={`setup-spine__link ${index <= stepIndex ? "is-done" : ""}`}
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                className={`setup-spine__step ${state}`}
                disabled={!reachable}
                onClick={() => reachable && onGoToStep(index)}
                aria-current={index === stepIndex ? "step" : undefined}
              >
                <span className="setup-spine__numeral">{spineStep.numeral}</span>
                <span className="setup-spine__label">{localizedSteps[index]}</span>
              </button>
            </div>
          );
        })}
      </nav>

      <div className="setup-spine__context">
        {stepIndex >= 1 ? (
          <>
            <span className="setup-spine__context-label">{t("setup.scenario")}</span>
            <span className="setup-spine__context-value">{scenarioTitle}</span>
          </>
        ) : (
          <span className="setup-spine__context-label">{t("setup.council")}</span>
        )}
        {stepIndex === 1 && (
          <span
            className="setup-spine__dots"
            aria-label={`${filledCount} of ${playerCount} seats filled`}
          >
            {Array.from({ length: playerCount }, (_, index) => (
              <i
                key={`spine-dot-${index}`}
                className={`${index < filledCount ? "on" : ""} ${
                  index === activeSeatIndex ? "act" : ""
                }`}
              />
            ))}
          </span>
        )}
      </div>

      <label className="setup-spine__language">
        <span className="sr-only">{t("language.label")}</span>
        <select value={locale} onChange={(event) => setLocale(event.target.value as "en" | "fr")}>
          <option value="en">{t("language.english")}</option>
          <option value="fr">{t("language.french")}</option>
        </select>
      </label>
    </header>
  );
}
