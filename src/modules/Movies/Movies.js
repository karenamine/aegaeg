import { Container } from '@material-ui/core';
import RouteHeader from '../common/components/RouteHeader';

const Movies = ({ name }) => {
  return (
    <Container maxWidth="xl">
      <RouteHeader routeName={name} />
    </Container>
  );
};

export default Movies;