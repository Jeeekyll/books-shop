import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { register as registerUser } from "../../store/userSlice";
import BackendErrors from "../../components/BackendErrors";
import { Button, Col, Input, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { registrationSchema } from "./validation/userRegisterFormValidation";

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(({ user }) => ({
    isLoading: user.isLoading,
    error: user.error,
  }));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationSchema) });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <Row justify="center">
      <Col span={8}>
        <Row justify="center">
          <Col>
            <Title level={3}>Create an account</Title>
          </Col>

          <Col span={24}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                {error && (
                  <Col span={24}>
                    <BackendErrors errors={error} />
                  </Col>
                )}
                <Col span={24} style={{ marginTop: "15px" }}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter name" size="large" />
                    )}
                  />
                  {errors.name ? (
                    <label className="text-danger" htmlFor="name">
                      *{errors.name?.message}
                    </label>
                  ) : (
                    <label className="text-muted" htmlFor="name">
                      *Username
                    </label>
                  )}
                </Col>

                <Col span={24} style={{ marginTop: "15px" }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter email"
                        type="email"
                        size="large"
                      />
                    )}
                  />
                  {errors.email ? (
                    <label className="text-danger" htmlFor="email">
                      *{errors.email?.message}
                    </label>
                  ) : (
                    <label className="text-muted" htmlFor="email">
                      *Email
                    </label>
                  )}
                </Col>

                <Col span={24} style={{ marginTop: "15px" }}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        placeholder="Enter password"
                        size="large"
                      />
                    )}
                  />
                  {errors.password ? (
                    <label className="text-danger" htmlFor="password">
                      *{errors.password?.message}
                    </label>
                  ) : (
                    <label className="text-muted" htmlFor="password">
                      *Password
                    </label>
                  )}
                </Col>

                <Col span={24} style={{ marginTop: "15px" }}>
                  <Controller
                    name="password_confirmation"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        placeholder="Confirm password"
                        size="large"
                      />
                    )}
                  />
                  {errors.password_confirmation ? (
                    <label
                      className="text-danger"
                      htmlFor="password_confirmation"
                    >
                      *{errors.password_confirmation?.message}
                    </label>
                  ) : (
                    <label
                      className="text-muted"
                      htmlFor="password_confirmation"
                    >
                      *Confirm password
                    </label>
                  )}
                </Col>
                <Col span={8} style={{ marginTop: "15px" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    size="large"
                  >
                    Register
                  </Button>
                </Col>
                <Col span={24} style={{ marginTop: "20px" }}>
                  <p style={{ textAlign: "center" }}>
                    Already have an account? &nbsp;
                    <Link to="/login">
                      <u>Login here</u>
                    </Link>
                  </p>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Register;
