import axios from "axios";

const apiService = axios.create({
  baseURL:
    "https://hey-coach-task-server.vercel.app" || "http://localhost:3000/api",
});

export const getLotsApi = async () => {
  try {
    const res = await apiService.get("/lots");
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from register api");
    throw error.response;
  }
};

export const getLotApi = async (payload) => {
  try {
    const res = await apiService.get(`/lots/${payload.lotId}`);
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from register api");
    throw error.response;
  }
};

export const allocateParkingApi = async (payload) => {
  try {
    const res = await apiService.post(`/parking`, payload);
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from register api");
    throw error.response;
  }
};

export const deallocateParkingApi = async (payload) => {
  try {
    console.log(payload, "before");
    const res = await apiService.delete(
      `/parking/${payload.bookingId}`,
      payload
    );
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from register api");
    throw error.response;
  }
};
