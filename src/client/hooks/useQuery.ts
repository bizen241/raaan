import { useLocation } from "react-router";
import { EntityObject } from "../../shared/api/entities";

export const useQuery = <E extends EntityObject>() => {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const query = [...urlSearchParams.entries()].reduce((params, [key, value]) => ({ ...params, [key]: value }), {});

  return query as { [P in keyof E]: string | undefined };
};
