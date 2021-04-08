import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import PageContainer from '../common/components/PageContainer';
import PersonHeader from './components/PersonHeader';
import Spacing from '../common/components/Spacing';
import CreditsList from './components/CreditsList/CreditsList';

import useScrollToTop from '../common/hooks/useScrollToTop';
import { personActions } from './personSlice';
import { getAge, formatDataStr } from '../common/utils/date';
import filterConfig from './filterConfig';

const getGender = (gender) => {
  if (!gender) return null;

  return gender === 1 ? 'Female' : 'Male';
};

const generateDataList = (data) => {
  const isDeathday = !!data.deathday;
  let deathday;

  if (isDeathday) {
    const { dateStr, dateParts } = formatDataStr(data.deathday);

    deathday = `${dateStr} (${getAge(dateParts)} years old)`;
  }

  let birthday;

  if (data.birthday) {
    const { dateStr, dateParts } = formatDataStr(data.birthday);

    birthday = isDeathday
      ? dateStr
      : `${dateStr} (${getAge(dateParts)} years old)`;
  }

  const dataList = [];

  dataList.push({
    name: 'Birthday',
    value: birthday,
  });

  if (isDeathday)
    dataList.push({
      name: 'Day of death',
      value: deathday,
    });

  dataList.push({
    name: 'Place of birth',
    value: data.place_of_birth,
  });

  dataList.push({
    name: 'Gender',
    value: getGender(data.gender),
  });

  dataList.push({
    name: 'Known for',
    value: data.known_for_department,
  });

  return dataList;
};

const Person = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const { id } = useParams();

  const [filterBy, setFilterBy] = useState(filterConfig.all.value);

  const { person } = useSelector((state) => state.person);

  const filterByHandler = (e) => {
    setFilterBy(e.target.value);
  };

  useEffect(() => {
    dispatch(personActions.fetchPerson(id));

    return () => {
      dispatch(personActions.resetState());
    };
  }, [dispatch, id]);

  return (
    <>
      <Spacing />

      {person ? (
        <main>
          <PageContainer>
            <PersonHeader
              dataList={generateDataList(person)}
              name={person.name}
              biography={person.biography}
              profilePath={person.profile_path}
              externalIds={person.external_ids}
            />

            <Spacing />

            <CreditsList
              data={{
                movieCredits: person.movie_credits,
                tvCredits: person.tv_credits,
              }}
              filterBy={filterBy}
              filterByHandler={filterByHandler}
            />
          </PageContainer>
        </main>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Person;
