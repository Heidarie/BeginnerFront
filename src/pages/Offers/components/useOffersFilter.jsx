import { useEffect, useState } from "react";
import axios from "axios";

export default function useOffersFilter(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offers, setOffers] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setOffers([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `https://localhost:7064/Offers`,
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setOffers((prevOffers) => {
          return [...new Set([...prevOffers, ...res.data])];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setLoading(false);
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { loading, error, offers, hasMore };
}
