import { useSelector } from 'react-redux';

import { checkIfIsData } from '@common/utils/getData';

import Section from '@components/Section/Section';
import SectionTitle from '@components/Section/SectionTitle';
import Slider from '@components/Slider/Slider';
import Cards from '@components/Cards/Cards';

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

const joinData = (data) => {
  const newData = [];

  const movieCast = data.movieCredits?.cast;
  const movieCrew = data.movieCredits?.crew;

  const tvCast = data.tvCredits?.cast;
  const tvCrew = data.tvCredits?.crew;

  if (movieCast) newData.push(...movieCast);
  if (movieCrew) newData.push(...movieCrew);
  if (tvCast) newData.push(...tvCast);
  if (tvCrew) newData.push(...tvCrew);

  return newData;
};

const getKnownFor = (data) => {
  let newData;

  newData = sortByVoteDescending(data);
  newData = removeDuplicates(newData);
  newData = getFirstVoted(newData);

  return newData;
};

const KnownFor = () => {
  const { person } = useSelector((state) => state.person);

  const data = {
    movieCredits: person.movie_credits,
    tvCredits: person.tv_credits,
  };

  const joinedData = joinData(data);

  if (!checkIfIsData(joinedData)) return null;

  const knownFor = getKnownFor(joinedData);

  if (!checkIfIsData(knownFor)) return null;

  return (
    <Section>
      <SectionTitle title="Known For" />

      <Slider isLinks>
        <Cards cardsData={knownFor} />
      </Slider>
    </Section>
  );
};

export default KnownFor;