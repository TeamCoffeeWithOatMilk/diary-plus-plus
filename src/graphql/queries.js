/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDiary = /* GraphQL */ `
  query GetDiary($id: ID!) {
    getDiary(id: $id) {
      id
      owner
      title
      content
      imageUrl
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listDiaries = /* GraphQL */ `
  query ListDiaries(
    $filter: ModelDiaryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDiaries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        title
        content
        imageUrl
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncDiaries = /* GraphQL */ `
  query SyncDiaries(
    $filter: ModelDiaryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDiaries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        owner
        title
        content
        imageUrl
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
