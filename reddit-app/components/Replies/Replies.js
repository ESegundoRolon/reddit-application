import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { Collapse, Descriptions, Empty, Spin, Space } from 'antd';

import { HeartTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
const { Panel } = Collapse;

const GET_REPLIES = gql`
  query Replies($permalink: String!){
    replies(permalink: $permalink) {
      body
      title
      ups
      downs
      created
      author
    }
  }
`;


const Replies = (props) => {
    const { permalink } = props;
    const { loading, error, data } = useQuery(GET_REPLIES, { variables: { permalink } });



    if (!data) return (
        <Space size="middle">
            <Spin size="large" />
        </Space>);
    if (error) return <p>Error :(</p>;
    const { replies } = data;
    return (
        <Collapse>
            {replies.length > 0 ?
                replies.map((reply, idx) => {
                    const { body, title, ups, downs, created, author } = reply;
                    return (
                        <Panel key={idx} header={`Reply ${idx}`}>
                            <Descriptions title="Reply info" layout="horizontal">
                                <Descriptions.Item label="Title" span={4}>{title}</Descriptions.Item>
                                <Descriptions.Item label="Reply" span={4}>{body}</Descriptions.Item>
                                <Descriptions.Item label="Votes">{ups}  <HeartTwoTone twoToneColor="#eb2f96" /></Descriptions.Item>
                                <Descriptions.Item label="Down votes">{downs}  <CloseCircleTwoTone /></Descriptions.Item>
                                <Descriptions.Item label="Author">{author}</Descriptions.Item>
                                <Descriptions.Item label="Created">{created}</Descriptions.Item>
                            </Descriptions>
                        </Panel>);
                })
                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </Collapse>
    );
};

export default Replies;