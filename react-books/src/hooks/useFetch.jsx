import {useEffect, useState} from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

const useFetch = (url) => {
  const baseUrl = 'http://127.0.0.1:8000/';

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  //axios initial object params
  const [options, setOptions] = useState({});
  //token to do auth requests
  const [token] = useLocalStorage('token');

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;

    const requestOptions = {
      ...options,
      ...{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        }
      }
    };

    axios(baseUrl + url, requestOptions)
      .then((response) => {
        setIsLoading(false);
        setResponse(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          setError(error?.response?.data?.errors);
        }
      });
  }, [isLoading, options, url, token]);

  return [{isLoading, response, error}, doFetch];
}

export default useFetch;