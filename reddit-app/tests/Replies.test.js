
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import renderer from "react-test-renderer";
import wait from "waait";
// UI
import { Collapse } from 'antd';
const { Panel } = Collapse;

// test component
import { Replies, GET_REPLIES } from "../components/Replies";

describe("Replies component", () => {

    it('should render without error', () => {
        renderer.create(
            <MockedProvider mocks={[]} addTypename={false} defaultOptions={{
                watchQuery: { fetchPolicy: 'no-cache' },
                query: { fetchPolicy: 'no-cache' },
            }}>
                <Replies permalink="url" />
            </MockedProvider>,
        );
    });

    /**
     * Failing due to
     * https://github.com/apollographql/apollo-client/issues/6803
     */
    it("should render one comment collapse", async () => {
        const mocks = [
            {
                request: {
                    query: GET_REPLIES,
                    variables: {
                        permalink: "url"
                    },
                },
                result: {
                    data: {
                        replies:
                            [
                                {
                                    body: '0',
                                    title: 'stag7533',
                                    ups: '1',
                                    downs: '0',
                                    created: '1599429477',
                                    author: '/r/Home/comments/inm2af/if_house_walls_have_smoke_smell_from_fire_or/g48bqxp/'
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
                <Replies permalink={"url"} />
            </MockedProvider>
        );

        await wait(0); // wait for response

        const collapse = component.root.findByType(Panel)
        expect(collapse.children.length).toEqual(1)
    });

});
