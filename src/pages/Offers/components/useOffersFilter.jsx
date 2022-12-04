import { useEffect, useState } from "react";
import axios from "axios";
export default function useOffersFilter(filter, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offers, setOffers] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `https://localhost:7064/Offers`,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setOffers((prevOffers) => {
          return [...new Set([...prevOffers, res.data])];
        });
        setHasMore(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
      });
    return () => cancel();
  }, [filter, pageNumber]);

  return { loading, error, offers, hasMore };
}
