import React, { memo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchRemoveBook } from "../../../store/booksSlice";
import Modal from "antd/lib/modal";

const UserDeleteBook = ({ id, visible, setVisible }) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(({ books }) => ({
    isLoading: books.isLoading,
  }));

  return (
    <Modal
      title="Delete book"
      visible={visible}
      onOk={() => dispatch(fetchRemoveBook(id))}
      confirmLoading={isLoading}
      onCancel={() => setVisible(false)}
    >
      <p>Are you sure?</p>
    </Modal>
  );
};

export default memo(UserDeleteBook);
