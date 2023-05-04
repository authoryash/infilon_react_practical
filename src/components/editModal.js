import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';


const EditModal = ({ open, data, onClose, onSubmit }) => {
  const initialValues = {
    email: data?.email ?? '',
    first_name: data?.first_name ?? '',
    last_name: data?.last_name ?? ''
  };

  const users = useSelector((state) => state.users);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email()
      .required('Email is required')
      .test('unique-email', 'This email is already used!', (value) => {
        if (data) return true;
        return !users.some((user) => user.email === value);
      }),
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required')
  });

  const formik =
    useFormik(
      {
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
          const tempObj = { ...values, id: data.id, avatar: data?.avatar };
          onSubmit(tempObj);
          resetForm();
        },
      });

  const { values, touched, errors, handleSubmit, handleChange, resetForm } =
    formik;

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Edit User'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              id="first_name"
              name="first_name"
              label="First Name"
              value={values.first_name}
              onChange={handleChange}
              error={touched.first_name && !!errors.first_name}
              helperText={touched.first_name && errors.first_name}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              id="last_name"
              name="last_name"
              label="Last Name"
              value={values.last_name}
              onChange={handleChange}
              error={touched.last_name && !!errors.last_name}
              helperText={touched.last_name && errors.last_name}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog >
  );
};

export default EditModal;
