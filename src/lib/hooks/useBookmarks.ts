import { useEffect, useState } from "react";
import { useAppSelector } from "./redux";

export const useBookmarks = () => {
  const [isClient, setIsClient] = useState(false);
  const bookmarkIds = useAppSelector((state) => state.bookmarks.ids);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    bookmarkIds: isClient ? bookmarkIds : [],
    isClient,
  };
};
