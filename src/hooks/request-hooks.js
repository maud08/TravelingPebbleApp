import axios from 'axios';
import {useEffect, useState} from 'react';

const {REACT_APP_URL} = process.env;

export const useApiRequest = query => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setError(null);
    setData(null);
    if (query === '') {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    axios
      .get(REACT_APP_URL)
      .then(({data}) => {
        console.log(data);
        setData(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return [isLoading, error, data];
};
