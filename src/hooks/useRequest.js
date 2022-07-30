import { useCallback, useState } from 'react';

const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback( async (config, dataFormatter) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(config.url, {
                method: config.method ? config.method : 'GET',
                headers: config.headers ? config.headers : {},
                body: JSON.stringify(config.body)
            });
            const data = await response.json();

            if (!response.ok) {
                setError({ 
                    ...data, 
                    statusCode: response.status
                });
                throw new Error('Request failed!');
            }
            dataFormatter(data);
        } catch(err) {
            setError(s => s || { 
                message: 'Something went wrong with our server. Please try again later', 
                statusCode: 500 
            });
        }
        setLoading(false);
    }, [] );

    return { loading, setError, error, fetchData };
}
 
export default useRequest;