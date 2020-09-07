
import React, { useState } from 'react';

// UI
import { Input, Checkbox, Button, Badge } from 'antd';

// Props
import PropTypes from 'prop-types';

const { Search } = Input;

const SearchBar = (props) => {
    // callbacks
    const { onChangeSearchFilterCallback, onChangeFavouriteCallback, onChangeNewCallback, onChangePopularCallback, onClearFiltersCallback } = props;
    // attributes
    const { count } = props;

    // hooks
    const [searchFilter, setSearchFilter] = useState('');
    const [onlyFavourite, setOnlyFavourite] = useState(false);
    const [onlyNews, setOnlyNews] = useState(false);
    const [onlyPopular, setOnlyPopular] = useState(false);

    // methods 
    // the clear filters button added duplicated code and source of data in this class and the main Home container class, it should be good idea add redux
    const onChangeFavourite = e => {
        setOnlyFavourite(e.target.checked);
        onChangeFavouriteCallback(e.target.checked)
    }

    const onChangeNew = e => {
        setOnlyNews(e.target.checked)
        onChangeNewCallback(e.target.checked)
    }

    const onChangePopular = e => {
        setOnlyPopular(e.target.checked)
        onChangePopularCallback(e.target.checked)
    }
    const onChangeSetFilter = value => {
        setSearchFilter(value)
        onChangeSearchFilterCallback(value)
    }

    const onClearFilters = e => {
        e.preventDefault()
        setOnlyNews(false)
        setOnlyFavourite(false);
        setOnlyNews(false)
        setOnlyPopular(false)
        setSearchFilter('')
        onClearFiltersCallback()
    }

    const onChangeSetFilterText = e => {
        setSearchFilter(e.target.value)
    }

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Search
                placeholder="Search subreddit by title"
                enterButton="Search"
                size="large"
                onSearch={onChangeSetFilter}
                style={{ maxWidth: 500, marginRight: 15 }}
                value={searchFilter}
                onChange={onChangeSetFilterText}
            />
            <Checkbox onChange={onChangeFavourite} checked={onlyFavourite}>Favourites</Checkbox>
            <Checkbox onChange={onChangeNew} checked={onlyNews}>News</Checkbox>
            <Checkbox onChange={onChangePopular} checked={onlyPopular}>Popular</Checkbox>
            <Button onClick={onClearFilters}>{"Clear filters"}</Button>
            <Badge style={{ marginLeft: 15 }} count={count} />

        </div>
    );
};

// Mandatory fields
SearchBar.propTypes = {
    count: PropTypes.number.isRequired,
    onChangeSearchFilterCallback: PropTypes.func.isRequired,
    onChangeFavouriteCallback: PropTypes.func.isRequired,
    onChangeNewCallback: PropTypes.func.isRequired,
    onChangePopularCallback: PropTypes.func.isRequired,
    onClearFiltersCallback: PropTypes.func.isRequired,
}

export default SearchBar;