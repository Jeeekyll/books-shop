import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/userSlice";
import BackendErrors from "../../components/BackendErrors";
import { Button, Col, Input, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { loginSchema } from "./validation/userLoginFormValidation";

const Login = () => {
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector(({ user }) => ({
    isLoading: user.isLoading,
    error: user.error,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <Row justify="center">
      <Col span={8}>
        <Row justify="center">
          <Col>
            <Title level={3}>Login</Title>
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

                <Col span={8} style={{ marginTop: "15px" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    size="large"
                  >
                    Login
                  </Button>
                </Col>
                <Col span={24} style={{ marginTop: "20px" }}>
                  <p style={{ textAlign: "center" }}>
                    You don't have an account? &nbsp;
                    <Link to="/register">
                      <u>Register here</u>
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

export default Login;
