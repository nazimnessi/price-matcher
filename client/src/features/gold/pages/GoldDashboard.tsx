import React from "react";
import { Row, Col, Spin } from "antd";
import { GoldCard } from "../components/GoldCard";
import { useGoldRate } from "../hooks/useGoldRate";

export const GoldDashboard: React.FC = () => {
  const { data, isLoading, refetch } = useGoldRate();

  return (
    <Row style={{ padding: 24 }}>
      <Col span={24}>
        {isLoading ? (
          <Spin />
        ) : (
          <GoldCard data={data} isLoading={isLoading} refetch={refetch} />
        )}
      </Col>
    </Row>
  );
};
