import { getTossShareLink, share } from "@apps-in-toss/web-framework";
import { useCallback, useState } from "react";

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  const shareRoom = useCallback(async () => {
    if (isSharing) return;
    try {
      setIsSharing(true);
      const link = await getTossShareLink("intoss://소박이");
      await share({ message: `나의 소박이 방을 구경해보세요 🦦\n${link}` });
    } catch {
      // user cancelled or native share unavailable — silent
    } finally {
      setIsSharing(false);
    }
  }, [isSharing]);

  return { shareRoom, isSharing };
}
