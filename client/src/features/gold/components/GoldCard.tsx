import { Card, Statistic, Row, Col, Button, Typography } from "antd";

const { Title, Text } = Typography;

export const GoldCard = ({
  data,
  isLoading,
  refetch,
}: {
  data: any;
  isLoading: boolean;
  refetch: () => void;
}) => {
  return (
    <Card style={{ maxWidth: 540, margin: "0 auto" }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={4}>Kozhikode Gold Rate</Title>
          <Text type="secondary">Per gram · INR</Text>
        </Col>
        <Col>
          <Button onClick={() => refetch()} type="primary">
            Refresh
          </Button>
        </Col>
      </Row>

      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <Statistic
            title="Current Price"
            value={data?.rate ?? 0}
            precision={2}
            suffix="INR"
            loading={isLoading}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: 12 }}>
        <Col span={24}>
          <Text type="secondary">Source: {data?.source ?? "—"}</Text>
        </Col>
      </Row>
    </Card>
  );
};
