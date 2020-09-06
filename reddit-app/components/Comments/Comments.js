import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { Collapse, Descriptions, Empty, Spin, Space } from 'antd';

import { WechatOutlined } from '@ant-design/icons';
import { Replies } from "../Replies";

const { Panel } = Collapse;

const GET_COMMENTS = gql`
  query Comments($url: String!){
    comments(url: $url) {
      total_awards_received
      author
      body
      link_title
      created
      permalink
    }
  }
`;


const Comments = (props) => {
    const { url } = props;
    const { loading, error, data } = useQuery(GET_COMMENTS, { variables: { url } });


    if (!data) return (
    <Space size="middle">
        <Spin size="large" />
    </Space>);
    if (error) return <p>Error :(</p>;
    const { comments } = data;
    return (
        <Collapse>
            {comments.length > 0 ?
                comments.map((comment, idx) => {
                    const { total_awards_received, body, author, link_title, created, permalink } = comment;
                    return (
                        <Panel key={idx + permalink} header={`Comment ${idx}`}>
                            <Descriptions title="Comment info" layout="horizontal">
                                <Descriptions.Item label="Title" span={4}>{link_title}</Descriptions.Item>
                                <Descriptions.Item label="Awards">{total_awards_received}</Descriptions.Item>
                                <Descriptions.Item label="Comment" span={4}>{body}</Descriptions.Item>
                                <Descriptions.Item label="Author">{author}</Descriptions.Item>
                                <Descriptions.Item label="Created">{created}</Descriptions.Item>
                            </Descriptions>
                            <b>Replies</b><WechatOutlined />
                            <Replies permalink={permalink} />
                        </Panel>);
                })
                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </Collapse>
    );
};

export default Comments;