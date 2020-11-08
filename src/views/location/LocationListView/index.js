import React, { useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Results from './Results';
import { actions } from '../../../redux/modules/locations';
import NoResults from '../../../components/NoResults';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LocationListView = props => {
  const { locations, getLocations } = props;
  const classes = useStyles();

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return (
    <Page className={classes.root} title="Locations">
      <Container maxWidth={false}>
        <Box mt={3}>
          {locations.list.locations.length > 0 ? (
            <Results locations={locations.list.locations} />
          ) : (
            <NoResults />
          )}
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = state => ({
  locations: state.locations
});

const mapDispatchToProps = dispatch => ({
  getLocations: () => dispatch(actions.getLocations())
});

LocationListView.propTypes = {
  getLocations: PropTypes.func.isRequired,
  locations: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool,
    list: PropTypes.shape({
      locations: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    })
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationListView);
