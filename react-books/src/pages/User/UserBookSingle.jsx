import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserDeleteBook from "./UserBookForms/UserDeleteBook";
import UserUpdateBook from "./UserBookForms/UserUpdateBook";
import { Avatar, Image, List } from "antd";
import { EyeOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import fallback from "./logo192.png";
import Paragraph from "antd/lib/typography/Paragraph";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";

const UserBookSingle = ({
  id,
  title,
  slug,
  description,
  category_id,
  pages,
  rating,
  tags,
  image,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const currentBookObject = {
    id,
    title,
    description,
    category_id,
    pages,
    rating,
    tags,
  };

  return (
    <List.Item
      key={title}
      actions={[
        <Link to={"/books/" + slug}>
          <EyeOutlined />
        </Link>,
        <EditOutlined onClick={() => setShowUpdateModal(true)} />,
        <DeleteOutlined onClick={() => setShowDeleteModal(true)} />,
      ]}
      extra={
        image ? (
          <Image width={100} alt="logo" src={image} />
        ) : (
          <Image width={100} alt="logo" src={fallback} />
        )
      }
    >
      <List.Item.Meta
        avatar={<Avatar />}
        title={<a>{title}</a>}
        description={
          <Paragraph
            ellipsis={{
              rows: 2,
              expandable: true,
              symbol: "more",
            }}
          >
            {description}
          </Paragraph>
        }
      />

      <UserDeleteBook
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        id={id}
      />
      <UserUpdateBook
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        {...currentBookObject}
      />
    </List.Item>
  );
};

export default UserBookSingle;
