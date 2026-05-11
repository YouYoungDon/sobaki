import { useQuery } from "@tanstack/react-query";
import { fetchItemCatalog, fetchMyItems } from "../services/itemService";
import type { ItemSummary } from "../types/domain";

export function useCatalog() {
  const catalogQuery = useQuery<ItemSummary[]>({
    queryKey: ["items", "catalog"],
    queryFn: fetchItemCatalog,
    staleTime: 30_000,
    retry: 1,
  });

  const myItemsQuery = useQuery<ItemSummary[]>({
    queryKey: ["items", "my"],
    queryFn: fetchMyItems,
    staleTime: 30_000,
    retry: 1,
  });

  return {
    catalog: catalogQuery,
    myItems: myItemsQuery,
  };
}
