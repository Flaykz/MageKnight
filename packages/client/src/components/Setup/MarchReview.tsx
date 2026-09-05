/**
 * Beat III — March Out.
 *
 * Ceremonial confirmation: the assembled party gathered over the scenario
 * backdrop, the run's facts, and the launch CTA. "Adjust the party" steps back.
 */

import type { HeroId } from "@mage-knight/shared";
import { HERO_NAMES } from "@mage-knight/shared";
import { assetUrl, getHeroTokenUrl } from "../../assets/assetPaths";
import { useI18n } from "../../i18n";
import type { SetupScenarioOption } from "./SetupScreen";

/** Backdrop art per scenario category, sourced from existing site art. */
const SETUP_SCENARIO_ART: Record<string, string> = {
  learning: assetUrl("sites/keep.png"),
  conquest: assetUrl("sites/city_red.png"),
  drills: assetUrl("sites/keep.png"),
};

interface MarchReviewProps {
  readonly scenario: SetupScenarioOption;
  readonly seats: readonly (HeroId | null)[];
  readonly isLaunchable: boolean;
  readonly onBack: () => void;
  readonly onLaunch: () => void;
}

export function MarchReview({
  scenario,
  seats,
  isLaunchable,
  onBack,
  onLaunch,
}: MarchReviewProps) {
  const { t } = useI18n();
  const party = seats.filter((s): s is HeroId => s !== null);
  const art = SETUP_SCENARIO_ART[scenario.category];

  return (
    <div className="setup-beat setup-beat--enter setup-march">
      {art && (
        <div
          className="setup-scene-bg"
          style={{ backgroundImage: `url(${art})` }}
          aria-hidden="true"
        />
      )}

      <div className="setup-march__head">
        <p className="setup-eyebrow">{t("setup.musterAssembled")}</p>
        <h1 className="setup-march__title">{t("setup.marchOut")}</h1>
        <p className="setup-march__scenario">
          {scenario.title} — {scenario.objective.toLowerCase()}.
        </p>
      </div>

      <div className="setup-march__party">
        {party.map((heroId, index) => (
          <div className="setup-march__seat" key={`march-${index}`}>
            <img src={getHeroTokenUrl(heroId)} alt={HERO_NAMES[heroId]} />
            <span className="setup-march__name">{HERO_NAMES[heroId]}</span>
            <span className="setup-march__role">{t("setup.player")} {index + 1}</span>
          </div>
        ))}
      </div>

      <div className="setup-march__facts">
        <Plate k={t("setup.party")} v={`${party.length} ${party.length === 1 ? t("setup.knight") : t("setup.knights")}`} />
        <Plate k={t("setup.length")} v={scenario.rounds} />
        <Plate k={t("setup.objective")} v={scenario.objective} />
      </div>

      <div className="setup-march__foot">
        <button
          type="button"
          className="setup-seal"
          disabled={!isLaunchable}
          onClick={onLaunch}
        >
          <span className="setup-seal__disc">
            {t("setup.marchOut")}
            <br />
            {t("setup.out")}
          </span>
          <span className="setup-seal__caption">{t("setup.beginScenario")}</span>
        </button>
        <button type="button" className="setup-button setup-button--ghost" onClick={onBack}>
          {t("setup.adjustParty")}
        </button>
      </div>
    </div>
  );
}

function Plate({ k, v }: { k: string; v: string }) {
  return (
    <div className="setup-plate">
      <span className="setup-plate__key">{k}</span>
      <span className="setup-plate__value">{v}</span>
    </div>
  );
}
