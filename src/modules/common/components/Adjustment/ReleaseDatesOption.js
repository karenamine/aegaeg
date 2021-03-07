import DatePickerContainer from './DatePickerContainer';
import DatePicker from './DatePicker';
import OptionTitle from './OptionTitle';
import OptionContainer from './OptionContainer';

const ReleaseDatesOption = ({ dateTitle }) => {
  return (
    <OptionContainer>
      <OptionTitle>{dateTitle}</OptionTitle>

      <DatePickerContainer>
        <DatePicker
          id="date-picker-from"
          ariaLabel="change release dates from"
          label="From"
        />

        <DatePicker
          id="date-picker-to"
          ariaLabel="change release dates to"
          label="To"
        />
      </DatePickerContainer>
    </OptionContainer>
  );
};

export default ReleaseDatesOption;