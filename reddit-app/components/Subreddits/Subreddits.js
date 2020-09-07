// Components
import { Comments } from "../Comments";

// UI
import { Collapse, Descriptions, Spin, Space, Button } from 'antd';
import { FireTwoTone, FrownTwoTone, CheckCircleTwoTone, StopTwoTone, WechatOutlined } from '@ant-design/icons';

// Props
import PropTypes from 'prop-types';

const { Panel } = Collapse;

const Subreddits = (props) => {

  const { subreddits, onClickFavourite } = props;

  if (!subreddits) return (
    <Space size="middle">
      <Spin size="large" />
    </Space>);

  return (

    <Collapse>
      {
        subreddits.map(subreddit => {
          const isNew = subreddit.new;
          const { title, subscribers, public_description, url, popular, favourite } = subreddit;

          // remove last backslash
          const editedUrl = url.slice(0, -1)
          return (
            <Panel key={url} header={title}>
              <Descriptions title="Subreddit info" layout="horizontal">
                <Descriptions.Item label="Subsribers">{subscribers}</Descriptions.Item>
                <Descriptions.Item label="Description">{public_description}</Descriptions.Item>
                <Descriptions.Item label="Popular">{popular ? <FireTwoTone /> : <FrownTwoTone />}</Descriptions.Item>
                <Descriptions.Item label="New">{isNew ? <CheckCircleTwoTone /> : <StopTwoTone />}</Descriptions.Item>
                <Descriptions.Item label="Favourite"><Button onClick={e => onClickFavourite(e, url, favourite)}>{favourite ? <CheckCircleTwoTone /> : <StopTwoTone />}</Button></Descriptions.Item>
              </Descriptions>
              <b>Comments</b><WechatOutlined />
              <Comments url={editedUrl} />
            </Panel>);
        })
      }
    </Collapse>

  );
};

// Mandatory fields
Subreddits.propTypes = {
  subreddits: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    subscribers: PropTypes.string,
    public_description: PropTypes.string,
    url: PropTypes.string.isRequired,
    popular: PropTypes.bool,
    favourite: PropTypes.bool,
    new: PropTypes.bool
  })).isRequired
}

export default Subreddits;