const fetchData = async (url, callback = null, timer = 1000) =>
  await fetch(url)
    .then((data) => data.json())
    .then((data) => {
      // setTimeout used to simulate a API request
      // with 1s to show the loading state
      if (callback) {
        setTimeout(callback(data), timer);
      }
      return data;
    })
    .catch((e) => {
      return "error";
    });

export default fetchData;
