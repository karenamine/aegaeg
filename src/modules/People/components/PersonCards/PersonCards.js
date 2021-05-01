import { memo } from 'react';
import { ROUTE_NAMES } from '~common/constants';

import types from '~common/types';

import PersonCard from './PersonCard';

const PersonCards = ({ cardsData }) => {
  const cards = cardsData.map((item) => {
    const knownFor = item.known_for
      .map((el) => el.original_name || el.title)
      .join(', ');

    return (
      <PersonCard
        key={item.id}
        profilePath={item.profile_path}
        name={item.name}
        knownFor={knownFor}
        path={`${ROUTE_NAMES.person}/${item.id}`}
      />
    );
  });

  return cards;
};

PersonCards.propTypes = {
  cardsData: types.cardsData,
};

export default memo(PersonCards);
