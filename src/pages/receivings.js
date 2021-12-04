import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card, Container, Divider, TablePagination, Typography } from '@material-ui/core';
// import { useNavigate } from 'react-router-dom';
import { OrdersFilter } from '../components/orders/orders-filter';
import { ReceivingTable } from '../components/receiving-table';
import { getReceivingMaterial } from '../services/receivingMaterial.service';

export const ReceivingMaterial = () => {
  const [mode, setMode] = useState('table');
  const [query, setQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [receivings, setReceivings] = useState([]);

  const handleModeChange = (event, newMode) => {
    if (newMode) {
      setMode(newMode);
    }
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getReceivingMaterial()
      .then((res) => {
        console.log(res.data.data);
        setReceivings(res.data.data);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Receivings | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          pb: 3,
          pt: 8
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mb: 3
            }}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Receivings
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          <Card variant="outlined">
            <OrdersFilter
              mode={mode}
              onModeChange={handleModeChange}
              onQueryChange={handleQueryChange}
              query={query}
            />
            <Divider />
            <ReceivingTable receivings={receivings} />
            <Divider />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={receivings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};
