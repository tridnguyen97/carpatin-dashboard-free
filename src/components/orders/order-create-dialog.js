import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(props.status)
  }, [props])

  const formik = useFormik({
    initialValues: {
      companyName: 'ACME Corp LLC.',
      companySize: '1-10',
      email: 'chen.simmons@acmecorp.com',
      fullName: 'Chen Simmons',
      jobTitle: 'Operation',
      submit: null
    },
    validationSchema: Yup.object().shape({
      companyName: Yup.string().max(255).required('Company name is required'),
      companySize: Yup
        .string()
        .max(255)
        .oneOf(companySizeOptions)
        .required('Company size is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      fullName: Yup.string().max(255).required('Full Name is required'),
      jobTitle: Yup.string().max(255).required('Job name is required')
    }),
    onSubmit: async (values, helpers) => {
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
  })

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
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
                  <Avatar
                    src="/static/user-chen_simmons.png"
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64
                    }}
                  />
                  <div>
                    <Button
                      color="primary"
                      size="small"
                      sx={{ mb: 1 }}
                      type="button"
                      variant="outlined"
                    >
                      Upload new picture
                    </Button>
                    <div>
                      <Typography
                        color="textSecondary"
                        variant="caption"
                      >
                        Recommended dimensions: 200x200, maximum file size: 5MB
                      </Typography>
                    </div>
                  </div>
                </Box>
                <Grid
                  container
                  spacing={2}
                  sx={{ maxWidth: 420 }}
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                      fullWidth
                      helperText={formik.touched.fullName && formik.errors.fullName}
                      label="Full Name"
                      name="fullName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.fullName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      error={Boolean(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label="Email address"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
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
                      label="Job title"
                      name="jobTitle"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.jobTitle}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      error={Boolean(formik.touched.companyName && formik.errors.companyName)}
                      fullWidth
                      helperText={formik.touched.companyName && formik.errors.companyName}
                      label="Company name"
                      name="companyName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.companyName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      error={Boolean(formik.touched.companySize && formik.errors.companySize)}
                      fullWidth
                      helperText={formik.touched.companySize && formik.errors.companySize}
                      label="Company size"
                      name="companySize"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      select
                      value={formik.values.companySize}
                      variant="outlined"
                    >
                      {companySizeOptions.map((companySizeOption) => (
                        <MenuItem
                          key={companySizeOption}
                          value={companySizeOption}
                        >
                          {companySizeOption}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    xs={12}
                  >
                    <Button
                      color="primary"
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Save settings
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
