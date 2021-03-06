import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Avatar
} from '@material-ui/core';
import QRCodeDisplayModal from '../../../components/location/QRCodeDisplayModal';

const Results = ({ locations }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleShowQRCode = (location) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <Card>
        <PerfectScrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Logo</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Current Capacity</TableCell>
                  <TableCell>Max Capacity</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Created On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations
                  .slice(page * limit, (page + 1) * limit)
                  .map((location) => (
                    <TableRow
                      hover
                      key={location.id}
                      onClick={() => handleShowQRCode(location)}
                    >
                      <TableCell>
                        <Avatar
                          alt="Place"
                          src={location.logo}
                          variant="rounded"
                        />
                      </TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {location.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{location.description}</TableCell>
                      <TableCell>
                        {location.maximumCapacity - location.currentCapacity}
                      </TableCell>
                      <TableCell>{location.maximumCapacity}</TableCell>
                      <TableCell>
                        {location.createdBy && location.createdBy}
                      </TableCell>
                      <TableCell>
                        {location.createdAt
                          && location.createdAt.format('MMMM D, YYYY')}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={locations.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <QRCodeDisplayModal
        open={!!selectedLocation}
        value={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />
    </>
  );
};

Results.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired
};

export default Results;
