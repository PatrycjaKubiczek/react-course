import axios from "axios";

const BASE_URL = "http://localhost:3000/timeboxes";
const AxiosTimeboxesAPI = {
  getAllTimeboxes: async function (accessToken) {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const timeboxes = response.data;
    return timeboxes;
  },
  addTimebox: async function (timeboxToAdd, accessToken) {
    const response = await axios.post(BASE_URL, timeboxToAdd, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const addedTimebox = response.data;
    return addedTimebox;
  },
  replaceTimebox: async function (timeboxToReplace, accessToken) {
    if (!timeboxToReplace.id) {
      throw new Error("Timebox has to have an id to be updated");
    }
    const response = await axios.put(
      `${BASE_URL}/${timeboxToReplace.id}`,
      timeboxToReplace,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const replacedTimebox = response.data;
    return replacedTimebox;
  },
  removeTimebox: async function (timeboxToRemove, accessToken) {
    if (!timeboxToRemove.id) {
      throw new Error("Timebox has to have an id to be updated");
    }
    await axios.delete(`${BASE_URL}/${timeboxToRemove.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      timeboxToRemove,
    });
  },
};

export default AxiosTimeboxesAPI;
