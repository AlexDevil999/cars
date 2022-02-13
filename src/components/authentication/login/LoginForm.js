import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import store from '../../../auth'
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showCode,setShowCode] = useState(false);
  const [phone,setPhone] = useState('')
  const [phoneCode,setPhoneCode] = useState('')


  const LoginSchema = Yup.object().shape({
    phone: '',
    code: ''
  });

  const formik = useFormik({
    initialValues: {
      phone: phone,
      code: phoneCode,
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard/cars', { replace: true });
      store.login(phone,phoneCode)
    }
  });

  const isWatchCode = () =>{
      setShowCode(true)
  }

  const handlePhone = (e) => {
    setPhone(e.target.value)
  }

  const handleCode = (e) => {
    setPhoneCode(e.target.value)
  }

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete='phone'
            type='phone'
            label='Номер телефона'
            value={phone}
            onChange={handlePhone}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />
            <TextField
              fullWidth
              autoComplete='current-code'
              type={showPassword ? 'text' : 'code'}
              value = {phoneCode}
              onChange={handleCode}
              label='Code'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword} edge='end'>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.code && errors.code)}
              helperText={touched.code && errors.code}
            />
        </Stack>

        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>

        </Stack>
          <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
          >
          Войти
          </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
