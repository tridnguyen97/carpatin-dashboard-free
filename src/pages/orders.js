import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import { Box, Button, Card, Container, Divider, TablePagination, Typography,
  FormHelperText,
  Grid,
  TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
// import { useNavigate } from 'react-router-dom';
import DialogContent from '@material-ui/core/DialogContent';
import * as Yup from 'yup';
import { OrdersFilter } from '../components/orders/orders-filter';
import { OrdersTable } from '../components/orders-table';

// import { orders } from '../__mocks__/orders';
import { getPurchaseOrder, createPurchaseOrder } from '../services/purchaseOrder.service';

export const Orders = () => {
  const [mode, setMode] = useState('table');
  const [query, setQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState([]);

  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const formik = useFormik({
    initialValues: {
      account: 'ACME Corp LLC.',
      item: '1-10',
      vendor: 'chen.simmons@acmecorp.com',
      quantity: 4,
      unit: 'Operation',
      packing: 15,
      delivery_time: '2017-12-07T09:43:03.153Z',
      warehouse: 'TNC',
      note_to_vendor: 'Giao hang khong tre/som hon 1 tieng so voi lich',
      created_by: 'me',
      price: 12000,
      purchase_order_code: '5010001.1704.A211003',
      total_quantity: 12,
      temp_price: 123500,
      log_mode: 'XeADS',
      status: 'placed',
    },
    validationSchema: Yup.object().shape({
      account: Yup.string().max(255),
      item: Yup.string().max(255),
      vendor: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      quantity: Yup.string().max(255).required('Full Name is required'),
      unit: Yup.string().max(255).required('Job name is required')
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
      await createPurchaseOrder(values);
      setOpen(false);
      try {
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    if (formik.status) handleClose();
    getPurchaseOrder()
      .then((res) => {
        console.log(res.data.data);
        setOrders(res.data.data);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Orders | Carpatin Dashboard</title>
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
              Orders
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={handleClickOpen}
            >
              Add
            </Button>
          </Box>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
              <Card
                variant="outlined"
                sx={{ p: 3 }}
              >
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        pb: 3
                      }}
                    >
                      <div>
                        <Typography
                          color="textSecondary"
                          variant="caption"
                        >
                          ADD ORDER
                        </Typography>
                      </div>
                    </Box>
                    <Grid
                      container
                      spacing={2}
                      sx={{ maxWidth: 420 }}
                    >
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                          fullWidth
                          helperText={formik.touched.fullName && formik.errors.fullName}
                          label="Account"
                          name="account"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.account}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                          fullWidth
                          helperText={formik.touched.fullName && formik.errors.fullName}
                          label="Item"
                          name="item"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.item}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                          fullWidth
                          helperText={formik.touched.fullName && formik.errors.fullName}
                          label="Vendor"
                          name="vendor"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.vendor}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                          fullWidth
                          helperText={formik.touched.fullName && formik.errors.fullName}
                          label="Quantity"
                          name="quantity"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.quantity}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                          fullWidth
                          helperText={formik.touched.fullName && formik.errors.fullName}
                          label="Unit"
                          name="unit"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.unit}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                          fullWidth
                          helperText={formik.touched.fullName && formik.errors.fullName}
                          label="Packing"
                          name="packing"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.packing}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                          fullWidth
                          helperText={formik.touched.fullName && formik.errors.fullName}
                          label="Delivery Time"
                          name="deliveryTime"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.delivery_time}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                          fullWidth
                          helperText={formik.touched.fullName && formik.errors.fullName}
                          label="Warehouse"
                          name="warehouse"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.warehouse}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                          fullWidth
                          helperText={formik.touched.fullName && formik.errors.fullName}
                          label="Log Mode"
                          name="logMode"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.log_mode}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                      >
                        <TextField
                          error={Boolean(formik.touched.jobTitle && formik.errors.jobTitle)}
                          fullWidth
                          helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                          label="Note to Vendor"
                          name="noteToVendor"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.note_to_vendor}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                      >
                        <TextField
                          error={Boolean(formik.touched.jobTitle && formik.errors.jobTitle)}
                          fullWidth
                          helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                          label="Created by"
                          name="createdBy"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.created_by}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                      >
                        <TextField
                          error={Boolean(formik.touched.jobTitle && formik.errors.jobTitle)}
                          fullWidth
                          helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                          label="Price"
                          name="price"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                      >
                        <TextField
                          error={Boolean(formik.touched.jobTitle && formik.errors.jobTitle)}
                          fullWidth
                          helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                          label="Total quantity"
                          name="totalQty"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.quantity}
                          variant="outlined"
                        />
                      </Grid>
                      {formik.errors.submit && (
                        <Grid
                          item
                          xs={12}
                        >
                          <FormHelperText error>
                            {formik.errors.submit}
                          </FormHelperText>
                        </Grid>
                      )}
                      <Grid
                        item
                        xs={6}
                      >
                        <Button
                          color="primary"
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Create Purchase order
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </form>
              </Card>
            </DialogContent>
          </Dialog>
          <Card variant="outlined">
            <OrdersFilter
              mode={mode}
              onModeChange={handleModeChange}
              onQueryChange={handleQueryChange}
              query={query}
            />
            <Divider />
            <OrdersTable orders={orders} />
            <Divider />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={orders.length}
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
