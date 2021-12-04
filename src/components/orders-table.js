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
  Typography
} from '@material-ui/core';
import { Scrollbar } from './scrollbar';

const statusVariants = [
  {
    label: 'Placed',
    value: 'placed'
  },
  {
    label: 'Processed',
    value: 'processed'
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

export const OrdersTable = (props) => {
  const { orders } = props;

  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                Account
              </TableCell>
              <TableCell>
                Item
              </TableCell>
              <TableCell>
                Vendor
              </TableCell>
              <TableCell>
                Qty
              </TableCell>
              <TableCell>
                Unit
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
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const statusVariant = statusVariants.find(
                (variant) => variant.value === order.status
              );

              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      to="#"
                      underline="none"
                      variant="subtitle2"
                    >
                      {`#${order.id}`}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography
                        color="inherit"
                        variant="inherit"
                      >
                        {order.account}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="inherit"
                      >
                        {order.item}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {order.vendor}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={statusVariant.label}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {order.quantity}
                  </TableCell>
                  <TableCell>
                    {order.unit}
                  </TableCell>
                  <TableCell>
                    {order.packing}
                  </TableCell>
                  <TableCell>
                    {order.delivery_time}
                  </TableCell>
                  <TableCell>
                    {order.ware_house}
                  </TableCell>
                  <TableCell>
                    {order.log_mode}
                  </TableCell>
                  <TableCell>
                    {order.note_to_vendor}
                  </TableCell>
                  <TableCell>
                    {order.vendor}
                  </TableCell>
                  <TableCell>
                    {order.vendor}
                  </TableCell>
                  <TableCell>
                    {order.vendor}
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

OrdersTable.propTypes = {
  orders: PropTypes.array.isRequired
};
