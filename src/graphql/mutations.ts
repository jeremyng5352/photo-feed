// tslint:disable
// this is an auto generated file. This will be overwritten

export const createItem = `mutation CreateItem($input: CreateItemInput!) {
  createItem(input: $input) {
    id
    file {
      bucket
      key
      region
    }
    caption
  }
}
`;
export const updateItem = `mutation UpdateItem($input: UpdateItemInput!) {
  updateItem(input: $input) {
    id
    file {
      bucket
      key
      region
    }
    caption
  }
}
`;
export const deleteItem = `mutation DeleteItem($input: DeleteItemInput!) {
  deleteItem(input: $input) {
    id
    file {
      bucket
      key
      region
    }
    caption
  }
}
`;
