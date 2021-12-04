import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Chip,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  FormHelperText,
  Card,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DialogContent from '@material-ui/core/DialogContent';
import { Scrollbar } from './scrollbar';
import { updateReceivingMaterial } from '../services/receivingMaterial.service';

const statusVariants = [
  {
    label: 'Received',
    value: 'received'
  },
  {
    label: 'Proceeded',
    value: 'proceeded'
  },
  {
    label: 'Delivered',
    value: 'delivered'
  },
  {
    label: 'Complete',
    value: 'complete'
  }
];

export const ReceivingTable = (props) => {
  const { receivings } = props;
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      purchase_order_code: 'ACME Corp LLC.',
      item: '1-10',
      log_mode: 'chen.simmons@acmecorp.com',
      boc_xep: 4,
      quantity: 'Operation',
      packing: 15,
      quy_cach: '2017-12-07T09:43:03.153Z',
      unit_type: 'TNC',
      quality: 'Giao hang khong tre/som hon 1 tieng so voi lich',
      khoiluong: 'me',
      khoiluong2: 12000,
      nhanxet_ghichu: '5010001.1704.A211003',
      code_nhap_po: 12,
      image_quality: 123500,
      image_kl1: null,
      image_kl2: null,
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
      await updateReceivingMaterial(values);
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
  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                PO Code
              </TableCell>
              <TableCell>
                Item
              </TableCell>
              <TableCell>
                Log mode
              </TableCell>
              <TableCell>
                Boc xep
              </TableCell>
              <TableCell>
                Qty
              </TableCell>
              <TableCell>
                Packing
              </TableCell>
              <TableCell>
                DeliveryTime
              </TableCell>
              <TableCell>
                Warehouse
              </TableCell>
              <TableCell>
                LogMode
              </TableCell>
              <TableCell>
                NoteToVendor
              </TableCell>
              <TableCell>
                CreatedBy
              </TableCell>
              <TableCell>
                Price
              </TableCell>
              <TableCell>
                TotalQty
              </TableCell>
              <TableCell>
                Thanhtien_temp
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
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
                            label="Purchase Order Code"
                            name="purchaseOrderCode"
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
                            label="Log Mode"
                            name="logMode"
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
                            label="Boc xep"
                            name="bocXep"
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
                            label="Quantity"
                            name="quantity"
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
                            label="Quy cach"
                            name="quyCach"
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
                            label="Unit Type"
                            name="unitType"
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
                            label="Hinhanh Quality"
                            name="hinhanhQuality"
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
                            label="Hinhanh Khoiluong"
                            name="HinhanhKhoiluong"
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
                            label="Hinhanh Khoiluong2"
                            name="hinhanhKhoiluong2"
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
                            label="Nhanxet Ghichu"
                            name="NhanxetGhichu"
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
                            label="Reported By"
                            name="reportedBy"
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
                            label="Code Nhap PO"
                            name="codeNhapPO"
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
            {receivings.map((receive) => {
              const statusVariant = statusVariants.find(
                (variant) => variant.value === receive.status
              );

              return (
                <TableRow key={receive.id}>
                  <TableCell>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      to="#"
                      underline="none"
                      variant="subtitle2"
                    >
                      {`#${receive.id}`}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography
                        color="inherit"
                        variant="inherit"
                      >
                        {receive.account}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="inherit"
                      >
                        {receive.item}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {receive.vendor}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={statusVariant.label}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {receive.quantity}
                  </TableCell>
                  <TableCell>
                    {receive.unit}
                  </TableCell>
                  <TableCell>
                    {receive.packing}
                  </TableCell>
                  <TableCell>
                    {receive.delivery_time}
                  </TableCell>
                  <TableCell>
                    {receive.ware_house}
                  </TableCell>
                  <TableCell>
                    {receive.log_mode}
                  </TableCell>
                  <TableCell>
                    {receive.note_to_vendor}
                  </TableCell>
                  <TableCell>
                    {receive.vendor}
                  </TableCell>
                  <TableCell>
                    {receive.vendor}
                  </TableCell>
                  <TableCell>
                    {receive.vendor}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      size="large"
                      variant="contained"
                      onClick={handleClickOpen}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};

ReceivingTable.propTypes = {
  receivings: PropTypes.array.isRequired
};
