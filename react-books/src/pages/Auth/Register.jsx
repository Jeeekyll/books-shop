import React from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {register as registerUser} from "../../store/userSlice";
import BackendErrors from "../../components/BackendErrors";

const registrationSchema = yup.object().shape({
  name: yup
    .string('Enter your name')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(3, 'Password should be of minimum 3 characters length')
    .required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const Register = () => {
  const dispatch = useDispatch();
  const {isLoading, error} = useSelector(({user}) => ({
    isLoading: user.isLoading,
    error: user.error,
  }));

  const {register, handleSubmit, formState: {errors}} = useForm(
    {resolver: yupResolver(registrationSchema)}
  );

  const onSubmit = async data => {
    dispatch(registerUser(data));
  }

  return (
    <>
      <section className="vh-100">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: '15px'}}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      {error && <BackendErrors errors={error}/>}

                      <div className="form-outline mb-4">
                        <input
                          {...register("name")}
                          type="text" id="name" className="form-control form-control-lg"/>
                        {errors.name ? <label className="form-label text-danger" htmlFor="name">
                            *{errors.name?.message}</label>
                          : <label className="form-label text-muted" htmlFor="name">Your Name</label>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          {...register("email")}
                          type="email" id="email" className="form-control form-control-lg"/>
                        {errors.email ? <label className="form-label text-danger" htmlFor="email">
                            *{errors.email?.message}</label>
                          : <label className="form-label text-muted" htmlFor="email">Your Email</label>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          {...register("password")}
                          type="password" id="password" className="form-control form-control-lg"/>
                        {errors.password ? <label className="form-label text-danger" htmlFor="password">
                            *{errors.password?.message}</label>
                          : <label className="form-label text-muted" htmlFor="password">Your Password</label>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          {...register("password_confirmation")}
                          type="password" id="password_confirmation" className="form-control form-control-lg"/>
                        {errors.password_confirmation ?
                          <label className="form-label text-danger" htmlFor="password_confirmation">
                            *{errors.password_confirmation?.message}</label>
                          : <label className="form-label text-muted" htmlFor="password_confirmation">Confirm your
                            password</label>}
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          disabled={isLoading}
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">Have already an account? &nbsp;
                        <Link to="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;