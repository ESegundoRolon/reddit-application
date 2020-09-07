
import React, { useState } from 'react';

// Apollo
import { gql, useQuery, useMutation } from '@apollo/client';

// Components
import { Search } from "../../components/Search"
import { Subreddits } from "../../components/Subreddits"

// UI
import { Spin, Space } from 'antd';

// Define query to get all subreddits
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

// Define mutation to update subreddit favourite
const SET_SUBREDDIT_FAVOURITE = gql`
  mutation UpdateSubreddit($url: String!, $favourite: Boolean!) {
    updateSubreddit(url: $url, favourite: $favourite) {
     favourite
     url
    }
  }
`;

const Home = () => {

    // hooks
    const { error, data } = useQuery(GET_SUBREDDITS);
    const [updateSubreddit] = useMutation(SET_SUBREDDIT_FAVOURITE);

    const [searchFilter, setSearchFilter] = useState('');
    const [onlyFavourite, setOnlyFavourite] = useState(false);
    const [onlyNews, setOnlyNews] = useState(false);
    const [onlyPopular, setOnlyPopular] = useState(false);

    // methods
    // the clear filters button added duplicated code and source of data in this class and the search component, it should be good idea add redux

    const onChangeFavourite = value => {
        setOnlyFavourite(value);
    }

    const onChangeNew = value => {
        setOnlyNews(value)
    }

    const onChangePopular = value => {
        setOnlyPopular(value)
    }

    const onClearFilters = () => {

        setOnlyNews(false)
        setOnlyFavourite(false);
        setOnlyNews(false)
        setOnlyPopular(false)
        setSearchFilter('')
    }

    const filterSubreddit = subreddit => {

        let matchTitle = true;
        if (searchFilter !== '' && searchFilter !== undefined) {
            matchTitle = subreddit.title.toLowerCase().includes(searchFilter.toLowerCase());
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

    const onClickFavourite = (e, url, oldFavourite) => {
        e.preventDefault();
        // refresh apollo cache on update single subreddit
        updateSubreddit({
            variables: { url, favourite: oldFavourite == null ? true : !oldFavourite },
            // on update
            update: (cache, { data: { updateSubreddit } }) => {
                // get list
                const data = cache.readQuery({ query: GET_SUBREDDITS });
                // find the mutated single subreddit and override its favourite values
                // since I used url as functional primary key, I must refresh manually. 
                // It is better idea use primary key attribute id and apollo will refresh automatically
                let subredditsCache = [...data.subreddits]

                subredditsCache = subredditsCache.map(subreddit => {
                    if (subreddit.url === updateSubreddit.url) {
                        return { ...subreddit, favourite: updateSubreddit.favourite }
                    } else {
                        return subreddit
                    }
                })
                const newData = { ...data, subreddits: subredditsCache }
                // dispatch the query with the override data
                cache.writeQuery({ query: GET_SUBREDDITS, data: newData }, newData);
            }
        });
    }

    if (!data) return (
        <Space size="middle">
            <Spin size="large" />
        </Space>);
    if (error) return <p>Error :(</p>;

    const { subreddits } = data;

    // apply filter on subreddits
    const filteredSubreddits = subreddits.filter(e => filterSubreddit(e));

    return (<div>
        <Search count={filteredSubreddits.length}
            onClearFiltersCallback={onClearFilters}
            onChangeSearchFilterCallback={setSearchFilter}
            onChangeFavouriteCallback={onChangeFavourite}
            onChangeNewCallback={onChangeNew}
            onChangePopularCallback={onChangePopular} />
        <Subreddits subreddits={filteredSubreddits} onClickFavourite={onClickFavourite} />
    </div>)
}

export default Home;