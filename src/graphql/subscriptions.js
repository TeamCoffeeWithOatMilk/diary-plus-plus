/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDiary = /* GraphQL */ `
  subscription OnCreateDiary($filter: ModelSubscriptionDiaryFilterInput) {
    onCreateDiary(filter: $filter) {
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
export const onUpdateDiary = /* GraphQL */ `
  subscription OnUpdateDiary($filter: ModelSubscriptionDiaryFilterInput) {
    onUpdateDiary(filter: $filter) {
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
export const onDeleteDiary = /* GraphQL */ `
  subscription OnDeleteDiary($filter: ModelSubscriptionDiaryFilterInput) {
    onDeleteDiary(filter: $filter) {
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
