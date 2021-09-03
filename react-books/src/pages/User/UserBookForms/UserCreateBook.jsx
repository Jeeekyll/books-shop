import React, { memo, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchCreateBook } from "../../../store/booksSlice";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Space,
  InputNumber,
  Rate,
} from "antd";
import { createBookSchema } from "./validation/userCreateFormValidation";

const UserCreateBook = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const { userId, categories, isLoading, tags, isSuccess } = useSelector(
    ({ user, categories, books, tags }) => ({
      categories: categories.categories,
      tags: tags.tags,
      userId: user.user.id,
      isLoading: books.isLoading,
      isSuccess: books.isSuccess,
    }),
    shallowEqual
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createBookSchema),
  });

  const onSubmit = (data) => {
    data.user_id = userId;
    dispatch(fetchCreateBook(data));
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setVisible(false);
    }
  }, [isSuccess, setVisible]);

  return (
    <Drawer
      title="Create a new book"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button type="primary">Submit</Button>
        </Space>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*{error && <BackendErrors errors={error}/>}*/}

        {/* TITLE */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item validateStatus={errors.title ? "error" : "success"}>
              <label htmlFor="title">Title</label>
              <Input
                {...register("title")}
                type="text"
                id="title"
                placeholder={"Enter title"}
              />
              {errors.title && (
                <label className="text-danger" htmlFor="title">
                  *{errors.title.message}
                </label>
              )}
            </Form.Item>
          </Col>
        </Row>

        {/* RATING & CATEGORIES */}
        <Row gutter={16} justify="space-between">
          <Col>
            <Form.Item>
              <label htmlFor="pages">Rating</label>
              <Controller
                id="rating"
                name="rating"
                control={control}
                defaultValue={false}
                rules={{ required: true }}
                render={({ field }) => (
                  <div>
                    <Rate {...field} />
                  </div>
                )}
              />
              {errors.rating && (
                <label className="form-label text-danger" htmlFor="rating">
                  *{errors.rating.message}
                </label>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <div>
              <label htmlFor="category">Category</label>
            </div>
            <Controller
              id="category_id"
              name="category_id"
              control={control}
              defaultValue={false}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} style={{ minWidth: "100%" }}>
                  {categories &&
                    categories.map((category) => (
                      <Select.Option value={category.id} key={category.id}>
                        {category.name}
                      </Select.Option>
                    ))}
                </Select>
              )}
            />
          </Col>
        </Row>

        {/* TAGS & PAGES */}
        <Row gutter={16} style={{ marginTop: "20px" }} justify="space-between">
          <Col span={12}>
            <div>
              <label htmlFor="tags">Select tags</label>
            </div>
            <Controller
              id="tags"
              name="tags"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ minWidth: "100%" }}
                  mode="tags"
                  placeholder="Select favourite tags"
                >
                  {tags &&
                    tags.map((tag) => (
                      <Select.Option value={tag.id} key={tag.id}>
                        {tag.name}
                      </Select.Option>
                    ))}
                </Select>
              )}
            />
          </Col>
          <Col span={12}>
            <label htmlFor="pages">Pages</label>
            <Controller
              id="pages"
              name="pages"
              control={control}
              defaultValue={false}
              rules={{ required: true }}
              render={({ field }) => (
                <div>
                  <InputNumber {...field} placeholder="Enter pages count" />
                </div>
              )}
            />
            {errors.pages && (
              <label className="text-danger" htmlFor="title">
                *{errors.pages.message}
              </label>
            )}
          </Col>
        </Row>

        {/* DESCRIPTION */}
        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col span={24}>
            <Form.Item
              validateStatus={errors.description ? "error" : "success"}
            >
              <label htmlFor="description">Description</label>
              <Controller
                id="description"
                name="description"
                control={control}
                defaultValue={false}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    rows={4}
                    placeholder="Enter description"
                  />
                )}
              />
              {errors.description && (
                <label className="text-danger" htmlFor="description">
                  *{errors.description.message}
                </label>
              )}
            </Form.Item>
          </Col>
        </Row>

        {/* SUBMIT */}
        <Row gutter={16}>
          <Col>
            <Button
              htmlType="submit"
              type="primary"
              loading={isLoading}
              style={{ marginTop: "20px" }}
            >
              Save
            </Button>
          </Col>
        </Row>
      </form>
    </Drawer>
  );
};

export default memo(UserCreateBook);
