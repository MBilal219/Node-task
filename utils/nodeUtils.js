const nodeUtils = {
  FetchApiData: async (fetchEndPoint) => {
    try {
      if (!fetchEndPoint || !typeof fetchEndPoint === "string") {
        console.log("Please neter valid endpoint");
        throw new Error("Please enter valid endpoint");
      }
      const res = await fetch(fetchEndPoint);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Resource not found");
        else throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    } catch (err) {
      console.log("err--->", err);
      throw new Error(err);
    }
  },
};
module.exports = nodeUtils;
