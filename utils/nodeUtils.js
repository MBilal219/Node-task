const fs = require("fs").promises;
const path = require("path");

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
  // download content
  DownloadContentsFromURLs: async (urls) => {
    try {
      if (!Array.isArray(urls))
        throw new Error("Please provide an array of urls");

      const downloadPromises = urls.map(async (url, i) => {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Failed to download content from ${url}. Status: ${response.status}`
          );
        }

        const content = await response.text();
        const filename = `downloaded_content_${i + 1}.txt`;
        await fs.writeFile(filename, content);

        return filename;
      });

      const downloadedContents = await Promise.all(downloadPromises);

      return downloadedContents;
    } catch (error) {
      console.error("Download failed:", error.message);
      throw error;
    }
  },

  GetFilesFromFolder: async (folderPath, extension) => {
    try {
      if (!folderPath || !typeof folderPath === "string") {
        console.log("Please neter valid path");
        throw new Error("Please enter valid path");
      }
      const files = await fs.readdir(folderPath);
      const filteredFiles = files.filter((file) => {
        const fileExtension = path.extname(file);
        return fileExtension === `.${extension}`;
      });

      return filteredFiles;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  },
};
module.exports = nodeUtils;
