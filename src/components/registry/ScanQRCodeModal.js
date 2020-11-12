import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, makeStyles } from '@material-ui/core';
import QrReader from 'react-qr-scanner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LocationCard from '../../views/location/LocationListView/LocationCard';
import SimpleModal from '../SimpleModal';
import { actions } from '../../redux/modules/locations';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  scanAgain: {
    marginRight: theme.spacing(1)
  },
  container: {
    padding: '20px'
  }
}));

const ScanQRCodeModal = props => {
  const { onClose, open, locations, getLocations } = props;
  const classes = useStyles();

  const [delay] = useState(100);
  const [QRData, setQRData] = useState(null);

  const handleScan = data => {
    if (data) {
      const result = locations.find(location => location.id === parseInt(data));
      if (result) {
        setQRData(result);
      }
    }
  };

  const handleClose = () => {
    setQRData(null);
    onClose();
  };

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return (
    <SimpleModal title="Scan a QR code" open={open} onClose={handleClose}>
      <div className={classes.container}>
        {QRData ? (
          <>
            <Box alignItems="center" display="flex" flexDirection="column">
              <LocationCard location={QRData} />
            </Box>
            <Box
              p={2}
              display="flex"
              flexDirection="row"
              justifyContent="center"
            >
              <Button
                className={classes.scanAgain}
                color="secondary"
                variant="contained"
                onClick={() => setQRData(null)}
              >
                Scan Again
              </Button>
              <Button color="primary" variant="contained">
                Check in
              </Button>
            </Box>
          </>
        ) : (
          <Card>
            <CardContent>
              <Box position="relative">
                <QrReader
                  delay={delay}
                  onScan={handleScan}
                  onError={() => {}}
                  style={{
                    width: '100%'
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        )}
      </div>
    </SimpleModal>
  );
};

const mapStateToProps = state => ({
  locations: state.locations.list
});

const mapDispatchToProps = dispatch => ({
  getLocations: () => dispatch(actions.getLocations())
});

ScanQRCodeModal.propTypes = {
  locations: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanQRCodeModal);
