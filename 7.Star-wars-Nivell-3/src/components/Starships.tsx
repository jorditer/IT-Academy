import { useEffect, useRef } from "react";
import { useStarships } from "../hooks/useStarships";
import { Starship } from "../interfaces/Starship";
import { Link } from "react-router-dom";

const Starships = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useStarships();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.05 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-5 mt-6">
      {data?.pages.map((page) =>
        page.results.map((starship: Starship) => (
          <div
            key={starship.name}
            className="hover-effect bg-stone-950/80 hover:bg-stone-950/85 mx-4 md:mx-24 p-4 rounded-md border-1 border-black hover:shadow-inner active:shadow-none hover:shadow-yellow-500/45"
          >
            <Link to={`/starships/${starship.name}`} state={{ details: starship }}>
              <h2>{starship.name.toUpperCase()}</h2>
              <h3>{starship.model}</h3>
            </Link>
          </div>
        ))
      )}
      <div className="py-2" ref={loadMoreRef} />
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
};

export default Starships;
