/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateItemInput = {
  id?: string | null,
  file: S3ObjectInput,
  caption: string,
};

export type S3ObjectInput = {
  bucket: string,
  key: string,
  region: string,
  localUri?: string | null,
  mimeType?: string | null,
};

export type UpdateItemInput = {
  id: string,
  file?: S3ObjectInput | null,
  caption?: string | null,
};

export type DeleteItemInput = {
  id?: string | null,
};

export type ModelItemFilterInput = {
  id?: ModelIDFilterInput | null,
  caption?: ModelStringFilterInput | null,
  and?: Array< ModelItemFilterInput | null > | null,
  or?: Array< ModelItemFilterInput | null > | null,
  not?: ModelItemFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type CreateItemMutationVariables = {
  input: CreateItemInput,
};

export type CreateItemMutation = {
  createItem:  {
    __typename: "Item",
    id: string,
    file:  {
      __typename: "S3Object",
      bucket: string,
      key: string,
      region: string,
    },
    caption: string,
  } | null,
};

export type UpdateItemMutationVariables = {
  input: UpdateItemInput,
};

export type UpdateItemMutation = {
  updateItem:  {
    __typename: "Item",
    id: string,
    file:  {
      __typename: "S3Object",
      bucket: string,
      key: string,
      region: string,
    },
    caption: string,
  } | null,
};

export type DeleteItemMutationVariables = {
  input: DeleteItemInput,
};

export type DeleteItemMutation = {
  deleteItem:  {
    __typename: "Item",
    id: string,
    file:  {
      __typename: "S3Object",
      bucket: string,
      key: string,
      region: string,
    },
    caption: string,
  } | null,
};

export type GetItemQueryVariables = {
  id: string,
};

export type GetItemQuery = {
  getItem:  {
    __typename: "Item",
    id: string,
    file:  {
      __typename: "S3Object",
      bucket: string,
      key: string,
      region: string,
    },
    caption: string,
  } | null,
};

export type ListItemsQueryVariables = {
  filter?: ModelItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListItemsQuery = {
  listItems:  {
    __typename: "ModelItemConnection",
    items:  Array< {
      __typename: "Item",
      id: string,
      file:  {
        __typename: "S3Object",
        bucket: string,
        key: string,
        region: string,
      },
      caption: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateItemSubscription = {
  onCreateItem:  {
    __typename: "Item",
    id: string,
    file:  {
      __typename: "S3Object",
      bucket: string,
      key: string,
      region: string,
    },
    caption: string,
  } | null,
};

export type OnUpdateItemSubscription = {
  onUpdateItem:  {
    __typename: "Item",
    id: string,
    file:  {
      __typename: "S3Object",
      bucket: string,
      key: string,
      region: string,
    },
    caption: string,
  } | null,
};

export type OnDeleteItemSubscription = {
  onDeleteItem:  {
    __typename: "Item",
    id: string,
    file:  {
      __typename: "S3Object",
      bucket: string,
      key: string,
      region: string,
    },
    caption: string,
  } | null,
};
