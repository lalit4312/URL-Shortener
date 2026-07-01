import axios from "axios";
const api=axios.create({
    baseURL:"/api",
});

export const shortenUrl=async(url)=>{
    const res=await api.post("/url/shorten",{url});
    return res.data;
};

export const getUrls=async()=>{
    const res=await api.get("/url/urls");
    return res.data;
};

export const getAnalytics=async(id)=>{
    const res=await api.get(`/analytics/${id}`);
    return res.data;
};

export default api;