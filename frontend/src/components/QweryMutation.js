import "./QweryMutation.css";
import React, {useEffect, useState} from 'react';
import { GET_ONE_BANNER, GET_ALL_BANNERS, CREATE_BANNEN } from './Constants';
import { useQuery, useMutation } from '@apollo/client';
import * as Constants from './Constants';
import axios from 'axios';
import Banner from './Banner';

const Query = () => {
    // const {data: allBanners, loading: loadingAllBanners, error: errorAllBanners, refetch} = useQuery(GET_ALL_BANNERS)
    // const {data: oneBanner, loading: loadingOneUser} = useQuery(GET_ONE_BANNER, {
    //     variables: {
    //         _id: '61acdc522991c5521c90ee24'
    //     }
    // })
    const [newBanner] = useMutation(CREATE_BANNEN)
    console.log('newBanner', newBanner);

    const [banners, setBanners] = useState({ banners: [] })
    const [title, setTitle] = useState('')
    const [impressions, setImpressions] = useState(0)
    const [clicks, setClicks] = useState(0)
    const [costs, setCosts] = useState(0)

    // console.log(oneBanner)

    // useEffect(() => {
    //     if (!loadingOneUser) {
    //         setBanners(allBanners.getAllBanners)
    //     }
    // }, [allBanners])

    const addBanner = (e) => {
        e.preventDefault()
        newBanner({
            variables: {
                input: {
                    title,
                    impressions,
                    clicks,
                    costs
                }
            }
        }).then(({data}) => {
            console.log(data)
            setTitle('')
            setImpressions(0)
            setClicks(0)
            setCosts(0)
        })
    }
    // const getAll = e => {
    //     e.preventDefault()
    //     refetch()
    // }

    // if (loadingOneUser) {
    //     return <h1>Loading...</h1>
    // }


    // const getAll = e => {
    //     e.preventDefault()
    //     const fetchData = async () => {
    //         const queryResult = await axios.post(
    //             Constants.GRAPHQL_API, {
    //                 query: Constants.GET_BANNERS
    //             }
    //         );
    //     const result = queryResult.data.data; 
    //     setBanners({ banners: result.banners });
    //     };
 
    //     fetchData();
    // }


    const getAll = async (e) => {
        e.preventDefault()
        let response
        const fetchData = async () => {
            response = await fetch('http://https://europe-west3-trying-artics-pipeline.cloudfunctions.net/random-generator:3005/api/v1/todos', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
        };
        const answer = await response.json()
        console.log(answer);
        fetchData();
    }

    const createBaner = e => {
        e.preventDefault()
        console.log('Befor create banner');
        const fetchData = async () => {
            const queryResult = await axios.post(
                Constants.GRAPHQL_API, {
                    mutation: Constants.CREATE_BANNER
                }
            );
        const result = queryResult.data.data;
        console.log('queryResult',queryResult);
        console.log('Create banner',result);
        fetchData();
        }
    }
    return (
        <div>
            <form>
                <div>
                    <label for="title">Title </label>
                    <input id="title" value={title} onChange={e => setTitle(e.target.value)} type="text"/>
                </div>
                <div>
                    <label for="impressions">Impressions </label>
                    <input id="impressions" value={impressions} onChange={e => setImpressions(e.target.value)} type="number"/>
                </div>
                <div>
                    <label for="clicks">Clicks </label>
                    <input id="clicks" value={clicks} onChange={e => setClicks(e.target.value)} type="number"/>
                </div>
                <div>
                    <label for="costs">Costs </label>
                    <input id="costs" value={costs} onChange={e => setCosts(e.target.value)} type="number"/>
                </div>
                <div className="btns">
                    <button onClick={(e) => createBaner(e)}>Создать</button>
                    <button onClick={(e) => addBanner(e)}>Создать старое</button>
                    <button onClick={e => getAll(e)}>Получить</button>
                </div>
            </form>
            <div>
                {banners.banners.map(banner =>(
                    <Banner key={banner.id} banner={banner}/>                   
                ))}
            </div>
        </div>
    );
};

export default Query;