import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { Input, Checkbox } from 'antd';


const { Search } = Input;

const SearchBar = (props) => {
    const { setSearchFilter, onChangeFavourite, onChangeNew, onChangePopular } = props;

    return (
        <div style = {{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={setSearchFilter}
            style={{ maxWidth: 500 }}
        />
            <Checkbox onChange={onChangeFavourite}>Favourites</Checkbox>
            <Checkbox onChange={onChangeNew}>News</Checkbox>
            <Checkbox onChange={onChangePopular}>Popular</Checkbox>
            
        </div>
    );
};

export default SearchBar;