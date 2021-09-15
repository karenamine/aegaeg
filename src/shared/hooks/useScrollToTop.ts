import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { scrollToTop } from '~/shared/utils';

export const useScrollToTop = () => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      scrollToTop();
    });

    return () => {
      unlisten();
    };
  }, [history]);
};