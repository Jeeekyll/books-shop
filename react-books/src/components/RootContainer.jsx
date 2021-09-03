import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/categoriesSlice";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import { Content, Footer } from "antd/lib/layout/layout";
import { PieChartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { fetchTags } from "../store/tagsSlice";
import Spin from "antd/lib/spin";
import TagOutlined from "@ant-design/icons/lib/icons/TagOutlined";

const RootContainer = ({ children }) => {
  const dispatch = useDispatch();
  const { categories, isLoading, tags, isTagsLoading } = useSelector(
    ({ categories, tags }) => ({
      categories: categories.categories,
      isLoading: categories.isLoading,
      tags: tags.tags,
      isTagsLoading: tags.isLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <Layout>
      <Sider width={200} theme={"light"}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["categories"]}
        >
          <SubMenu
            key="categories"
            icon={<PieChartOutlined />}
            title="Categories"
          >
            {isLoading ? (
              <Menu.Item key="10">
                <Spin />
              </Menu.Item>
            ) : (
              categories &&
              categories.map((category) => (
                <Menu.Item key={category.id}>
                  <Link to={"/categories/" + category.slug}>
                    {category.name} ({category.books_count})
                  </Link>
                </Menu.Item>
              ))
            )}
          </SubMenu>

          <SubMenu key="tags" icon={<TagOutlined />} title="Tags">
            {isTagsLoading ? (
              <Menu.Item key="100">
                <Spin />
              </Menu.Item>
            ) : (
              tags &&
              tags.map((tag) => (
                <Menu.Item key={tag.id + categories.length}>
                  <Link to={"/tags/" + tag.slug}>{tag.name}</Link>
                </Menu.Item>
              ))
            )}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <div className="container">{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }} theme={"dark"}>
          Cool Footer ©2021
        </Footer>
      </Layout>
    </Layout>
  );
};

export default RootContainer;
