import Cards from '../../common/components/Cards/Cards';
import Section from '../../common/components/Section/Section';
import Slider from '../../common/components/Slider/Slider';

import { checkIfIsData } from '../../common/utils/getData';

const sortByVoteDescending = (data) => {
  const newData = [...data];

  newData.sort((a, b) => {
    const voteCountA = a.vote_count;
    const voteCountB = b.vote_count;

    if (voteCountA !== 0 && !voteCountA) return 1;
    if (voteCountB !== 0 && !voteCountB) return -1;

    return voteCountB - voteCountA;
  });

  return newData;
};

const removeDuplicates = (data) => {
  const set = new Set();

  const filteredArr = data.filter((item) => {
    const isDuplicated = set.has(item.id);

    set.add(item.id);

    return !isDuplicated;
  });

  return filteredArr;
};

const getFirstVoted = (data) => {
  data = data.slice(0, 9);

  return data.filter((item) => item.vote_count);
};

const KnownFor = ({ data }) => {
  let newData = [];

  const movieCast = data.movieCredits?.cast;
  const movieCrew = data.movieCredits?.crew;

  const tvCast = data.tvCredits?.cast;
  const tvCrew = data.tvCredits?.crew;

  if (movieCast) newData.push(...movieCast);
  if (movieCrew) newData.push(...movieCrew);
  if (tvCast) newData.push(...tvCast);
  if (tvCrew) newData.push(...tvCrew);

  if (!checkIfIsData(newData)) return null;

  newData = sortByVoteDescending(newData);
  newData = removeDuplicates(newData);
  newData = getFirstVoted(newData);

  if (!checkIfIsData(newData)) return null;

  return (
    <Section title="Known For">
      <Slider isLinks>
        <Cards cardsData={newData} />
      </Slider>
    </Section>
  );
};

export default KnownFor;
