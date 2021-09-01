import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/categoriesSlice";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import { Content, Footer } from "antd/lib/layout/layout";
import { PieChartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const RootContainer = ({ children }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, []);

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
            {categories &&
              categories.map((category) => (
                <Menu.Item key={category.id}>
                  <Link to={"/categories/" + category.slug}>
                    {category.name} ({category.books_count})
                  </Link>
                </Menu.Item>
              ))}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <div className="container">{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Cool Footer ©2021</Footer>
      </Layout>
    </Layout>
  );
};

export default RootContainer;
