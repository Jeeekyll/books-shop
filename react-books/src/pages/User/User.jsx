import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchAuthUser } from "../../store/authUserSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCreateBook from "./UserBookForms/UserCreateBook";
import UserBookSingle from "./UserBookSingle";
import { Button, Col, List, Row, Space, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import "./User.css";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const User = () => {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector(
    ({ authUser, tags }) => ({
      user: authUser.user,
      isLoading: authUser.isLoading,
      error: authUser.error,
    }),
    shallowEqual
  );

  const { nickname, email, created_at, books } = user;
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  return (
    <section className="user">
      <UserCreateBook
        visible={showCreateModal}
        setVisible={setShowCreateModal}
      />

      {isLoading ? (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      ) : (
        <>
          <Row justify="center">
            <Col>
              <Title level={3}>{nickname} profile</Title>
            </Col>
          </Row>
          <Row>
            <Col span={12} offset={6}>
              <Space direction="vertical">
                <h5>Your personal data:</h5>
                <div>Username: {nickname}</div>
                <div>Email: {email}</div>
                <div>Registration: {created_at}</div>
              </Space>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <h5>Your books</h5>
            </Col>
          </Row>
          <Row>
            <Col offset={5}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setShowCreateModal(true);
                }}
              >
                New book
              </Button>
            </Col>
          </Row>

          <Row style={{ marginTop: "1rem" }}>
            <Col span={16} offset={4}>
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  pageSize: 3,
                }}
                dataSource={books}
                renderItem={(book) => (
                  <UserBookSingle key={book.id} {...book} />
                )}
              />
            </Col>
          </Row>
        </>
      )}
    </section>
  );
};

export default User;
