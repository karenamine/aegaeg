import Filter from '../../../common/components/Filter/Filter';
import FilterContainer from '../../../common/components/Filter/FilterContainer';
import SectionTitle from '../../../common/components/SectionTitle';
import ProjectsTimeline from './ProjectsTimeline';

import { formatDataStr } from '../../../common/utils/date';
import filterConfig from '../../filterConfig';

const filterData = (data, filterBy) => {
  const filteredData = [];

  const movieCast = data.movieCredits?.cast;
  const movieCrew = data.movieCredits?.crew;

  const tvCast = data.tvCredits?.cast;
  const tvCrew = data.tvCredits?.crew;

  switch (filterBy) {
    case filterConfig.all.value:
      [movieCast, movieCrew, tvCast, tvCrew].forEach((item) => {
        if (item) filteredData.push(...item);
      });
      break;

    case filterConfig.movies.value:
      [movieCast, movieCrew].forEach((item) => {
        if (item) filteredData.push(...item);
      });
      break;

    case filterConfig.tvShows.value:
      [tvCast, tvCrew].forEach((item) => {
        if (item) filteredData.push(...item);
      });
      break;

    default:
      break;
  }

  return filteredData;
};

const sortByDateDescending = (data) => {
  const newData = [...data];

  // Sort: items without a date --> items by date descending.
  newData.sort((a, b) => {
    let dateA = a.dateStr;
    let dateB = b.dateStr;

    if (!dateA) return -1;
    if (!dateB) return 1;

    dateA = formatDataStr(dateA).dateObj.getTime();
    dateB = formatDataStr(dateB).dateObj.getTime();

    return dateB - dateA;
  });

  return newData;
};

const createTimelineData = (data) => {
  const timelineData = {};

  data.forEach((item) => {
    const job = item.character || item.job;
    const name = item.title || item.name;
    const departmentName = item.department || 'Acting';
    const departmentKey = departmentName.toLowerCase();
    const dateStr = item.release_date || item.first_air_date;
    const year = dateStr && formatDataStr(dateStr).dateParts.year;

    if (!timelineData[item.id]) {
      timelineData[item.id] = {
        id: item.id,
        name,
        year,
        dateStr,

        // Doesn't need fallback
        employment: {
          [departmentKey]: {
            name: departmentName,
            value: job,
          },
        },
      };

      return;
    }

    if (timelineData[item.id].employment[departmentKey]) {
      const department = timelineData[item.id].employment[departmentKey];
      let value;

      value = department.value.split(', ');
      value.push(job);
      value = value.join(', ');
      department.value = value;

      return;
    }

    timelineData[item.id].employment[departmentKey] = {
      name: departmentName,
      value: job,
    };
  });

  return Object.values(timelineData);
};

const CreditsList = ({ data, filterBy, filterByHandler }) => {
  const isMovieCast = !!data.movieCredits?.cast?.length;
  const isMovieCrew = !!data.movieCredits?.crew?.length;

  const isTVCast = !!data.tvCredits?.cast?.length;
  const isTVCrew = !!data.tvCredits?.crew?.length;

  const isNeedInFiltering =
    (isMovieCast || isMovieCrew) && (isTVCast || isTVCrew);

  const isData = isMovieCast || isMovieCrew || isTVCast || isTVCrew;

  let projects;

  if (isData) {
    let timelineData;

    timelineData = filterData(data, filterBy);
    timelineData = createTimelineData(timelineData);
    timelineData = sortByDateDescending(timelineData);

    projects = (
      <section>
        <SectionTitle title="Projects" />

        <ProjectsTimeline data={timelineData} />
      </section>
    );
  }

  return (
    <>
      {isNeedInFiltering && (
        <FilterContainer>
          <Filter
            config={filterConfig}
            filterBy={filterBy}
            filterByHandler={filterByHandler}
          />
        </FilterContainer>
      )}

      {projects}
    </>
  );
};

export default CreditsList;