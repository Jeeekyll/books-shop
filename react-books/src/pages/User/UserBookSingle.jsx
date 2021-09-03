import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserDeleteBook from "./UserBookForms/UserDeleteBook";
import UserUpdateBook from "./UserBookForms/UserUpdateBook";
import { Avatar, Image, List, Upload } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import fallback from "./logo192.png";
import Paragraph from "antd/lib/typography/Paragraph";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { useDispatch } from "react-redux";
import { fetchBookImage } from "../../store/booksSlice";

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
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isImageLoading] = useState(false);

  const currentBookObject = {
    id,
    title,
    description,
    category_id,
    pages,
    rating,
    tags,
  };

  const uploadButton = (
    <div>
      {isImageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <List.Item
      key={title}
      actions={[
        <Link to={"/books/" + slug}>
          <EyeOutlined style={{ fontSize: "18px" }} />
        </Link>,
        <EditOutlined
          style={{ fontSize: "18px" }}
          onClick={() => setShowUpdateModal(true)}
        />,
        <DeleteOutlined
          style={{ fontSize: "18px" }}
          onClick={() => setShowDeleteModal(true)}
        />,
      ]}
      extra={
        image ? (
          <Image
            width={100}
            alt="logo"
            src={image}
            placeholder={<Image preview={false} src={fallback} width={100} />}
          />
        ) : (
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            defaultFileList={image}
            customRequest={(file) => {
              dispatch(fetchBookImage({ id, file }));
            }}
          >
            {uploadButton}
          </Upload>
        )
      }
    >
      <List.Item.Meta
        avatar={<Avatar />}
        title={title}
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
        visible={showDeleteModal}
        setVisible={setShowDeleteModal}
        id={id}
      />
      <UserUpdateBook
        visible={showUpdateModal}
        setVisible={setShowUpdateModal}
        {...currentBookObject}
      />
    </List.Item>
  );
};

export default UserBookSingle;
