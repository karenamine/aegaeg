import { useState } from 'react';

import ActionsButtons from '../common/components/ActionsButtons';
import AdjustmentBar from '../common/components/Adjustment/AdjustmentBar';
import AdjustmentButton from '../common/components/AdjustmentButton';
import Cards from '../common/components/Cards/Cards';
import LoadMoreBtn from '../common/components/LoadMoreBtn';
import Modal from '../common/components/Modal';
import PageContainer from '../common/components/PageContainer';
import CardsGrid from '../common/components/Cards/CardsGrid';
import useScrollToTop from '../common/hooks/useScrollToTop';

import {
  sortByOptions,
  defaultOptions,
  moviesGenres,
  moviesData,
} from '../common/fake-data';

// ! Try useReducer for complex state.

const changeGenres = (genresList, genreName) => {
  return genresList.map((item) => {
    if (item.name === genreName) {
      return { name: item.name, isSelected: !item.isSelected };
    }

    return item;
  });
};

const Movies = ({ routeName }) => {
  useScrollToTop();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [genres, setGenres] = useState(() => {
    return moviesGenres.map((item) => {
      return { name: item.name, isSelected: false };
    });
  });

  const openModalHandler = () => {
    setIsModalOpened(true);
  };

  const closeModalHandler = () => {
    setIsModalOpened(false);
  };

  const toggleGenreHandler = (e) => {
    let dataGenre = e.target.dataset.genre;

    if (dataGenre) {
      setGenres((prevGenres) => {
        return changeGenres(prevGenres, dataGenre);
      });

      return;
    }

    dataGenre = e.target.closest('[data-genre]').dataset.genre;

    setGenres((prevGenres) => {
      return changeGenres(prevGenres, dataGenre);
    });
  };

  return (
    <PageContainer routeName={routeName}>
      <AdjustmentButton
        ariaLAbel="adjust movies"
        openModalHandler={openModalHandler}
        modal={
          <Modal
            isOpened={isModalOpened}
            closeModalHandler={closeModalHandler}
            title="Adjust Movies"
            content={
              <AdjustmentBar
                sortByOptions={sortByOptions}
                defaultOptions={defaultOptions}
                genres={genres}
                dateTitle="Release Dates"
                toggleGenreHandler={toggleGenreHandler}
              />
            }
            actions={<ActionsButtons />}
          />
        }
      />
      <CardsGrid>
        <Cards cardsData={moviesData.results} />
      </CardsGrid>
      <LoadMoreBtn />
    </PageContainer>
  );
};

export default Movies;
