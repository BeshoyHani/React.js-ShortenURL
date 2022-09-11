import { Box } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { search } from '../../config/shorten_URL_API';
import { Link, useParams } from 'react-router-dom';
import { URLItem } from './../URL/URLItem';
import { Alert } from '@mui/material';

export default function Search() {

    const [searchResult, setSearchResult] = useState([]);
    const query = useParams().query;
    const isInitialMount = useRef(true);

    useEffect(() => {
        const fetch_search_result = async () => {
            try {
                //if (isInitialMount.current) {
                    isInitialMount.current = false;
                    const res = await search(query);
                    setSearchResult(res);
              //  }
            } catch (error) {
                console.log(error.message)
            }
        }

        fetch_search_result();
    }, [query])

    return (
        <Box>

            {
                searchResult.length ?
                    <Box sx={{ overflowX: 'hidden', height: '83vh', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', bottom: '60px', top: '5px' }}>
                        {
                            searchResult.map(url => {
                                return (
                                    <Link to={`../my/urls/${url._id}`} key={`${url._id}`} style={{ textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <URLItem imageURL={url.img} title={url.title} shortURL={url.shortURL} />
                                    </Link>


                                )
                            })
                        }
                    </Box>
                    :
                    <Alert severity="error" sx={{ width: '100%', }}> Oops! No URLs found</Alert>
            }
        </Box>
    )
}