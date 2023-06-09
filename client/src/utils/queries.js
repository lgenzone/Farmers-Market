import { gql } from '@apollo/client';


export const GET_ME = gql`
query Query {
    me {
      _id
      username
      email
      phone_number
      merchant
      business_name
      business_description
      image
      products {
        _id
        name
        product_description
        category
        price
        stock
        image
      }
      purchases {
        _id
        date
        products {
          name
          price
        }
      }
    }
  }
`;

export const GET_MERCHANTS = gql`
    query Query {
        getMerchants {
            _id
            business_description
            business_name
            image
            phone_number
            products {
                _id
                category
                name
                price
                stock
                product_description
            }
        }
    }
`;

export const GET_PRODUCTS = gql`
    query GetProducts {
        getProducts {
            _id
            name
            category 
            product_description
            price
            stock
            image
            merchant {
                _id
                business_name
            }
        }
    }
`;

export const GET_CATEGORY = gql`
    query GetCategory($category: String!) {
        getCategory(category: $category) {
            _id
            category
            name
            price
            product_description
            stock
            image
        }
    }
`;

export const GET_PURCHASES = gql`
    query GetPurchases {
        getPurchases {
            _id
            date
            products {
                _id
                category
                name
                price
                product_description
                merchant {
                business_name
                }
            }
        }
    }

`;