import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCurrentQuests, progressQuest } from "../services/questService";
import type { QuestSummary } from "../types/domain";

export function useQuest() {
  const queryClient = useQueryClient();

  const questQuery = useQuery<QuestSummary[]>({
    queryKey: ["quests", "current"],
    queryFn: fetchCurrentQuests,
    staleTime: 30_000,
    retry: 1,
  });

  const progressMutation = useMutation({
    mutationFn: (id: string) => progressQuest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quests", "current"] });
    },
  });

  return {
    ...questQuery,
    progressQuest: progressMutation.mutateAsync,
  };
}
