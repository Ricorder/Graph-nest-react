import React, { useState } from 'react';
import * as Constants from './Constants';
import axios from 'axios';

function Banner(props) {
		const [banner, setBanner] = useState({ banners: [] })
	  const getAll = e => {
      e.preventDefault()
      const fetchData = async () => {
        const queryResult = await axios.post(
          Constants.GRAPHQL_API, {
            mutation: Constants.CHANGE_BANNER
          }
        );
        const result = queryResult.data.data; 
        setBanner({ banners: result.banners });
        };
 
        fetchData();
    }
    return (
      <div>
				<ul className="banners">
        	<li>ID: {props.banner._id}</li>
        	<li>Title: {props.banner.title}</li>
        	<li>Impressions: {props.banner.impressions}</li>
        	<li>Clicks: {props.banner.clicks}</li>
        	<li>Costs: {props.banner.costs}</li>
				</ul>
				<button onClick={e => getAll(e)}>Изменить</button>
      </div>
    );
}

export default Banner;
