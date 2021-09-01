import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Avatar, Card, Col, Rate } from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";

const Book = ({ id, title, slug, pages, rating, image, description }) => {
  return (
    <Col span={8} key={id}>
      <Card
        bordered={true}
        hoverable
        bodyStyle={{ maxHeight: "100%" }}
        actions={[<Link to={"/books/" + slug}>Read more</Link>]}
      >
        <Avatar src={image} size={120} />
        <Title level={4}>{title}</Title>
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: true,
            symbol: "more",
          }}
        >
          {description}
        </Paragraph>
        <div>{pages} pages</div>
        <div>
          <Rate disabled defaultValue={rating} />
        </div>
      </Card>
    </Col>
  );
};

export default memo(Book);
