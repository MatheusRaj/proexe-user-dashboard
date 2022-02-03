import React, { memo, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import Container from 'components/Container';
import { Formik, useFormikContext } from 'formik';
import { IUser } from 'interfaces';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { add, edit, selectUsers } from '../userSlice';

const SetValue = () => {
  const { setValues } = useFormikContext();

  const users = useAppSelector(selectUsers);

  const { id } = useParams();

  useEffect(() => {
    if (!!id) {
      setValues(
        users?.reduce((acc, user) => {
          if (user.id === Number(id)) {
            return { ...user, city: user.address.city };
          }

          return acc;
        }, {} as IUser)
      );
    }
  }, [id, setValues, users]);

  return null;
};

const Form = memo(() => {
  const useStyles = makeStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);

  const { id } = useParams();

  const classes = useStyles();

  return (
    <Container>
      <div>
        <Formik
          initialValues={{
            name: '',
            username: '',
            email: '',
            city: '',
            id: users.reduce((acc, user) => (user.id > acc ? user.id : acc), 0) + 1
          }}
          onSubmit={values => {
            if (!!id) {
              dispatch(edit({ ...values, address: { city: values.city } }));
              navigate('/');
              return;
            }

            dispatch(add({ ...values, address: { city: values.city } }));
            navigate('/');
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Required'),
            username: Yup.string().required('Required'),
            email: Yup.string().email().required('Required'),
            city: Yup.string().required('Required')
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset
            } = props;
            return (
              <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant='h6'>Add New User</Typography>
                <TextField
                  name='name'
                  id='name'
                  label='Full Name'
                  variant='outlined'
                  value={values.name}
                  type='text'
                  helperText={errors.name && touched.name ? errors.name : 'Enter a name.'}
                  error={!!(errors.name && touched.name)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  name='username'
                  id='username'
                  label='Username'
                  variant='outlined'
                  value={values.username}
                  type='text'
                  helperText={errors.username && touched.username ? errors.username : 'Enter a username.'}
                  error={!!(errors.username && touched.username)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  name='email'
                  id='email'
                  label='Email'
                  variant='outlined'
                  value={values.email}
                  type='email'
                  helperText={errors.email && touched.email ? errors.email : 'Enter a valid email.'}
                  error={!!(errors.email && touched.email)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  name='city'
                  id='city'
                  label='City'
                  variant='outlined'
                  value={values.city}
                  type='city'
                  helperText={errors.city && touched.city ? errors.city : 'Enter a city.'}
                  error={!!(errors.city && touched.city)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <div>
                  <Button variant='outlined' onClick={handleReset} disabled={!dirty || isSubmitting}>
                    Reset
                  </Button>
                  <Button type='submit' disabled={isSubmitting}>
                    Submit
                  </Button>

                  <SetValue />
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
});

export default Form;
