import { HERO_NAMES, type HeroId } from "@mage-knight/shared";
import { useI18n } from "../i18n";
import "./HotseatPassScreen.css";

interface HotseatPassScreenProps {
  readonly playerId: string;
  readonly hero?: HeroId;
  readonly onContinue: () => void;
}

export function HotseatPassScreen({
  playerId,
  hero,
  onContinue,
}: HotseatPassScreenProps) {
  const { t } = useI18n();
  const heroName = hero ? HERO_NAMES[hero] : "Next player";
  const seatLabel = playerId.replace("_", " ");

  return (
    <div className="hotseat-pass" role="dialog" aria-modal="true" aria-labelledby="hotseat-pass-title">
      <div className="hotseat-pass__panel">
        <p className="hotseat-pass__eyebrow">{t("hotseat.handoff")}</p>
        <h2 id="hotseat-pass-title" className="hotseat-pass__title">
          {t("hotseat.passTo", { hero: heroName })}
        </h2>
        <p className="hotseat-pass__copy">
          {t("hotseat.privateCards")}
        </p>
        <div className="hotseat-pass__seat" aria-label={t("hotseat.activeSeat", { seat: seatLabel })}>
          {seatLabel}
        </div>
        <button type="button" className="hotseat-pass__button" onClick={onContinue} autoFocus>
          {t("hotseat.revealTurn")}
        </button>
      </div>
    </div>
  );
}
