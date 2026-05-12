import { Asset } from "@toss/tds-mobile";
import sobakIdleUrl from "../../assets/characters/sobak-idle.json?url";

export default function SobakLottie() {
  return (
    <Asset.Lottie
      src={sobakIdleUrl}
      frameShape={{ width: 280, height: 280 }}
    />
  );
}
