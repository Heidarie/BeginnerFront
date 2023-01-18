import { useEffect, useState, useRef } from "react";
import axios from "axios";
import DataService from "../../../components/data.service";
import { useUIDSeed } from "react-uid";
import { useInfiniteQuery } from "react-query";
import axiosRetry from "axios-retry";

export default function useOffersFilter(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offers, setOffers] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const client = axios.create();
  axiosRetry(client, {
    retries: 5,
    retryDelay: () => 3000,
    retryCondition: () => true,
  });
  useEffect(() => {
    setOffers([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    client({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_API_URL}/Offers?page=${pageNumber}&${query}`,
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

  // const getMoreVideos = async ({ pageNumber, query }) => {
  //   if (query !== "") {
  //     const offers = await DataService.getOffers(pageNumber, query);

  //     return offers;
  //   }
  //   const offers = await DataService.getOffers(pageNumber, query);

  //   return offers;
  // };

  // function AllVideos({ videos, query }) {
  //   const seed = useUIDSeed();

  //   const [querys, setQuerys] = useState([]);

  //   const {
  //     data,
  //     isSuccess,
  //     fetchNextPage,
  //     hasNextPage,
  //     isFetchingNextPage,
  //     isLoading,
  //   } = useInfiniteQuery(
  //     [querys],
  //     getMoreVideos,
  //     {
  //       getNextPageParam: (page) =>
  //         page.current_page === page.last_page
  //           ? undefined
  //           : page.current_page + 1,
  //     },
  //     { initialData: videos }
  //   );

  //   const loadMoreRef = useRef();

  //   useIntersectionObserver({
  //     target: loadMoreRef,
  //     onIntersect: fetchNextPage,
  //     enabled: hasNextPage,
  //   });
  // }
  return { loading, error, offers, hasMore };
}
