
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import renderer from "react-test-renderer";
import wait from "waait";

// UI
import { Collapse } from 'antd';
const { Panel } = Collapse;

// test component
import { Comments, GET_COMMENTS } from "../components/Comments";

describe("Comments component", () => {

    it('should render without error', () => {
        renderer.create(
            <MockedProvider mocks={[]} addTypename={false} defaultOptions={{
                watchQuery: { fetchPolicy: 'no-cache' },
                query: { fetchPolicy: 'no-cache' },
            }}>
                <Comments url="url" />
            </MockedProvider>,
        );
    });


    /**
     * Failing due to
     * https://github.com/apollographql/apollo-client/issues/6803
     */
    it("should render collapse with one children", async () => {
        const mocks = [
            {
                request: {
                    query: GET_COMMENTS,
                    variables: {
                        url: "url"
                    },
                },
                result: {
                    data: {
                        comments:
                            [
                                {
                                    total_awards_received: '0',
                                    author: 'stag7533',
                                    body: 'Smoke doesn',
                                    link_title: 'title',
                                    created: '1599429477',
                                    permalink: '/r/Home/comments/inm2af/if_house_walls_have_smoke_smell_from_fire_or/g48bqxp/'
                                }
                            ]

                    },
                },
            },
        ];

        const component = renderer.create(
            <MockedProvider mocks={mocks} addTypename={false}
                defaultOptions={{
                    watchQuery: { fetchPolicy: 'no-cache' },
                    query: { fetchPolicy: 'no-cache' },
                }}>
                <Comments url={"url"} />
            </MockedProvider>
        );

        await wait(0); // wait for response

        const collapse = component.root.findByType(Panel)
        expect(collapse.children.length).toEqual(1)
    });

});
