import { useParams } from 'react-router-dom';
import { redirect_to_originalURL } from './../../config/shorten_URL_API';

export const Redirect = () => {
    const URLID = useParams().id;
    const redirectToOriginal = async () => {
        try {
            const res = await redirect_to_originalURL(URLID);
            console.log(res)
            window.location.replace(res.url);
        } catch (error) {
            console.log(error.message)
        }
    }

    redirectToOriginal();
}