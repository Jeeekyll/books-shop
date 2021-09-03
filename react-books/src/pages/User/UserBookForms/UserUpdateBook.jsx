import React, { memo, useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchUpdateBook } from "../../../store/booksSlice";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Rate,
  Row,
  Select,
  Space,
} from "antd";
import { updateBookSchema } from "./validation/userUpdateFormValidation";

const UserUpdateBook = ({
  title,
  id,
  description,
  rating,
  pages,
  category_id,
  tags,
  visible,
  setVisible,
}) => {
  const dispatch = useDispatch();
  const { categories, isLoading, allTags, isSuccess } = useSelector(
    ({ categories, books, tags }) => ({
      categories: categories.categories,
      isLoading: books.isLoading,
      allTags: tags.tags,
      isSuccess: books.isSuccess,
    }),
    shallowEqual
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateBookSchema),
  });

  const onSubmit = (data) => {
    dispatch(fetchUpdateBook({ id, data }));
  };

  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  useEffect(() => {
    onClose();
  }, [isSuccess, onClose]);

  return (
    <Drawer
      title="Update book"
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
              <Controller
                id="title"
                name="title"
                control={control}
                defaultValue={title}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input {...field} placeholder={"Enter title"} />
                )}
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
                defaultValue={rating}
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
              defaultValue={category_id}
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
              defaultValue={tags.map((t) => t.name)}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ minWidth: "100%" }}
                  mode="tags"
                  placeholder="Select favourite tags"
                >
                  {tags &&
                    allTags.map((tag) => (
                      <Select.Option value={tag.id.toString()} key={tag.id}>
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
              defaultValue={pages}
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
                defaultValue={description}
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

export default memo(UserUpdateBook);
