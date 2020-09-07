// Apollo
import { gql, useQuery } from '@apollo/client';

// Components
import { Replies } from "../Replies";

// UI
import { Collapse, Descriptions, Empty, Spin, Space } from 'antd';
import { WechatOutlined } from '@ant-design/icons';

// props
import PropTypes from 'prop-types';

const { Panel } = Collapse;

// Define query
export const GET_COMMENTS = gql`
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
    
    // Hooks
    const { error, data } = useQuery(GET_COMMENTS, { variables: { url } });


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

                    const createdDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
                    createdDate.setUTCSeconds(created);
                    return (
                        <Panel key={idx + permalink} header={`Comment ${idx}`}>
                            <Descriptions title="Comment info" layout="horizontal">
                                <Descriptions.Item label="Title" span={4}>{link_title}</Descriptions.Item>
                                <Descriptions.Item label="Awards">{total_awards_received}</Descriptions.Item>
                                <Descriptions.Item label="Comment" span={4}>{body}</Descriptions.Item>
                                <Descriptions.Item label="Author">{author}</Descriptions.Item>
                                <Descriptions.Item label="Created">{createdDate.toString()}</Descriptions.Item>
                            </Descriptions>
                            <b>Replies</b><WechatOutlined />
                            <Replies permalink={permalink} />
                        </Panel>);
                })
                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </Collapse>
    );
};

// Mandatory fields
Comments.propTypes = {
    url: PropTypes.string.isRequired
}

export default Comments;