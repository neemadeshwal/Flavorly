import { getUserDetail } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetails = (uid: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-detail", uid],
    queryFn: () => getUserDetail(uid),
  });
  return { isLoading, data, error };
};
