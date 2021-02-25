
const updateOptions = (options) => {
    const update = { ...options };
    if(localStorage.getItem('token')) {
        update.headers = {
            ...update.headers,
            Authorization: `${localStorage.getItem('token')}`,
        }
    }
    return update;
}

export default function fetcher(url, options) {
    return fetch(url, updateOptions(options));
}