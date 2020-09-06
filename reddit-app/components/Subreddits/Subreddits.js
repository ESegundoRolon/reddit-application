import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { Comments } from "../Comments";
import { Search } from "../Search"
import { Collapse, Descriptions, Spin, Space, Button, Input } from 'antd';
import { FireTwoTone, FrownTwoTone, CheckCircleTwoTone, StopTwoTone, WechatOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const GET_SUBREDDITS = gql`
  query {
    subreddits {
      display_name
      title
      subscribers
      public_description
      url
      new
      popular
      favourite
    }
  }
`;

const SET_SUBREDDIT_FAVOURITE = gql`
  mutation UpdateSubreddit($url: String!, $favourite: Boolean!) {
    updateSubreddit(url: $url, favourite: $favourite) {
     favourite
     url
    }
  }
`;

const Subreddits = () => {
  const { loading, error, data } = useQuery(GET_SUBREDDITS);

  const [updateSubreddit] = useMutation(SET_SUBREDDIT_FAVOURITE);

  // Declare a new state variable, which we'll call "count"
  const [searchFilter, setSearchFilter] = useState('');

  const [onlyFavourite, setOnlyFavourite] = useState(false);

  const [onlyNews, setOnlyNews] = useState(false);

  const [onlyPopular, setOnlyPopular] = useState(false);

  const onChangeFavourite = e => {
    setOnlyFavourite(e.target.checked);
  }

  const onChangeNew = e => {
    setOnlyNews(e.target.checked)
  }

  const onChangePopular = e => {
    setOnlyPopular(e.target.checked)
  }

  const onClickFavourite = (e, url, oldFavourite) => {
    e.preventDefault();
    updateSubreddit({
      variables: { url, favourite: oldFavourite == null ? true : !oldFavourite },
      update: (cache, { data: { updateSubreddit } }) => {
        const data = cache.readQuery({ query: GET_SUBREDDITS });
        data.subreddits = data.subreddits.map(subreddit => {
          if (subreddit.url === updateSubreddit.url) {
            return { ...subreddit, favourite: updateSubreddit.favourite }
          } else {
            return subreddit
          }
        })
        cache.writeQuery({ query: GET_SUBREDDITS, data }, data);
      }
    });
  }

  const filterSubreddit = subreddit => {

    let matchTitle = true;
    if (searchFilter !== '' && searchFilter !== undefined) {
      matchTitle = subreddit.title.includes(searchFilter);
    }

    let matchFavourite = true;
    if (onlyFavourite) {
      matchFavourite = subreddit.favourite;
    }

    let matchNews = true;
    if (onlyNews) {
      matchNews = subreddit.new;
    }

    let matchPopular = true;
    if (onlyPopular) {
      matchPopular = subreddit.popular
    }

    return matchTitle && matchFavourite && matchNews && matchPopular
  }

  if (!data) return (
    <Space size="middle">
      <Spin size="large" />
    </Space>);
  if (error) return <p>Error :(</p>;
  const { subreddits } = data;
  return (
    <div >
      <Search setSearchFilter={setSearchFilter} onChangeFavourite={onChangeFavourite} onChangeNew={onChangeNew} onChangePopular={onChangePopular} />
      <Collapse>
        {
          subreddits.filter(e => filterSubreddit(e)).map(subreddit => {
            const isNew = subreddit.new;
            const { title, subscribers, public_description, url, popular, favourite } = subreddit;

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
    </div>
  );
};

export default Subreddits;