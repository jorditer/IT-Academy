import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = (path: string) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith(path)) {
      window.scrollTo(0, 0);
    }
  }, [pathname, path]);
};

export default useScrollToTop;