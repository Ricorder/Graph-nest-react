import gql from 'graphql-tag';

export const SUBSCRIBE_STATISTICS = gql`
  subscription statisticsChanged($title: String!){
    bannerChanged(title: $title) {
      _id
      title
      impressions
			clicks
			costs
    }
  }

`



export const GET_ONE_BANNER = gql`
  query getBanner($id: ID){
    banner(id: $id) {
      _id,
			title,
			impressions,
			clicks,
			costs
    }
  }    
`

export const GRAPHQL_API = 'http://localhost:5000/graphql';

export const TITLE = "Banner List";

export const GET_BANNERS = `
  query banners {
    banners {
      _id,
      title,
      impressions,
      clicks,
      costs
    }
  }
`;

export const GET_ALL_BANNERS = gql`
  query {
    banners {
      _id,
			title,
			impressions,
			clicks,
			costs
    }
  }    
`

export const CREATE_BANNER = `
  mutation banner($input: NewBanner) {
  	create(input: $input) {
      title,
			impressions,
			clicks,
			costs
    }
  }
`

export const CREATE_BANNEN = gql`
  mutation createBanner($input: NewBanner) {
  	create(input: $input) {
      title,
			impressions,
			clicks,
			costs
    }
  }
`

export const CHANGE_BANNER = `
  mutation banners {
    change {
      _id,
      title,
      impressions,
      clicks,
      costs
    }
  }
`;
