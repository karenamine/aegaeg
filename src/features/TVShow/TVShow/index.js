import useScrollToTop from '~common/hooks/useScrollToTop';

import Spacer from '~common/components/Spacer';
import MainContent from '~common/components/MainContent';
import TVShowHeader from '../TVShowHeader';

import SeriesCast from './SeriesCast';
import Layout from '~components/Layout';
import Separator from '~components/Divider';
import MainContainer from '~components/MainContainer';
import useTVShowsState from '../hooks/useTVShowsState';

const TVShow = () => {
  useScrollToTop();

  const { data } = useTVShowsState();

  return (
    <>
      <Spacer />

      {data ? (
        <MainContent>
          <TVShowHeader />

          <Spacer />

          <MainContainer>
            <Layout>
              <SeriesCast />

              <Separator />
            </Layout>
          </MainContainer>
        </MainContent>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default TVShow;
