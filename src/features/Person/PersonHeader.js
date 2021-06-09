import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { formatDataStr, getAge } from '~common/utils/date';

import Header from './components/Header';
import { getData } from './personSelectors';

const getGender = (gender) => {
  if (!gender) return null;

  return gender === 1 ? 'Female' : 'Male';
};

const getLifeDates = (birthday, deathday) => {
  if (deathday) {
    const { dateStr, dateParts } = formatDataStr(deathday);

    deathday = `${dateStr} (${getAge(dateParts)} years old)`;
  }

  if (birthday) {
    const { dateStr, dateParts } = formatDataStr(birthday);

    birthday = deathday
      ? dateStr
      : `${dateStr} (${getAge(dateParts)} years old)`;
  }

  return { birthday, deathday };
};

const getDataList = createSelector(getData, (data) => {
  const dataList = [];

  const { birthday, deathday } = getLifeDates(data.birthday, data.deathday);

  dataList.push({
    name: 'Birthday',
    value: birthday,
  });

  if (deathday)
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
});

const PersonHeader = () => {
  const data = useSelector(getData);
  const dataList = useSelector(getDataList);

  return (
    <Header
      dataList={dataList}
      name={data.name}
      biography={data.biography}
      profilePath={data.profile_path}
      externalIds={data.external_ids}
    />
  );
};

export default PersonHeader;
