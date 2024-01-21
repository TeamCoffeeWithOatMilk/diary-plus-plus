/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDiary = /* GraphQL */ `
  subscription OnCreateDiary(
    $filter: ModelSubscriptionDiaryFilterInput
    $owner: String
  ) {
    onCreateDiary(filter: $filter, owner: $owner) {
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
  subscription OnUpdateDiary(
    $filter: ModelSubscriptionDiaryFilterInput
    $owner: String
  ) {
    onUpdateDiary(filter: $filter, owner: $owner) {
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
  subscription OnDeleteDiary(
    $filter: ModelSubscriptionDiaryFilterInput
    $owner: String
  ) {
    onDeleteDiary(filter: $filter, owner: $owner) {
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
