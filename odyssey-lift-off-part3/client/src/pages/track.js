import React from "react";
import { Layout, QueryResult, TrackDetail } from "../components";
import { gql, useQuery } from "@apollo/client";

const GET_TRACKS = gql`
  query getTrack($trackId: ID!) {
    track(id: $trackId) {
      id
      title
      author {
        id
        name
        photo
      }
      thumbnail
      length
      modulesCount
      description
      numberOfViews
      modules {
        id
        title
        length
      }
    }
  }
`;

const Track = ({ trackId }) => {
  console.log(trackId);

  const { loading, error, data } = useQuery(GET_TRACKS, {
    variables: {
      trackId,
    },
  });

  return (
    <Layout>
      <QueryResult error={error} data={data} loading={loading}>
        <TrackDetail track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Track;
