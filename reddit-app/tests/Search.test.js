
import React from "react";
import renderer from "react-test-renderer";

// test component
import { Search } from "../components/Search";
// UI
import {  Checkbox, Button, Badge } from 'antd';

describe("Search component", () => {

    const onChangeFavourite = value => {
        expect(expect).toBe(true)
    }

    const onChangeNew = value => {
        expect(expect).toBe(true)
    }

    const onChangePopular = value => {
        expect(expect).toBe(true)
    }

    const onClearFilters = () => {

    }

    const setSearchFilter = value => {

    }

    const count = 100;

    it('should render without error', () => {
        renderer.create(
            <Search count={count}
                onClearFiltersCallback={onClearFilters}
                onChangeSearchFilterCallback={setSearchFilter}
                onChangeFavouriteCallback={onChangeFavourite}
                onChangeNewCallback={onChangeNew}
                onChangePopularCallback={onChangePopular} />

        );
    });

    it("should render badge and fire checkboxs", () => {

        const component = renderer.create(

            <Search count={count}
                onClearFiltersCallback={onClearFilters}
                onChangeSearchFilterCallback={setSearchFilter}
                onChangeFavouriteCallback={onChangeFavourite}
                onChangeNewCallback={onChangeNew}
                onChangePopularCallback={onChangePopular} />

        );

        const testInstance = component.root;

        expect(testInstance.findByType(Badge).props.count).toBe(100);

        // find tall checkboxs
        const allCheckBoxs = testInstance.findAllByType(Checkbox);

        // assert there are 3 checkboxs
        expect(allCheckBoxs.length).toEqual(3);

        // find buttons (Badge is considerer a button)
        const buttons = testInstance.findAllByType(Button);

        // assert there are 3 checkboxs
        expect(buttons.length).toEqual(2);

    });

});
