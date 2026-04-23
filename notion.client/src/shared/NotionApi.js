import {api} from "./api.js";

export const NotionApi = {
    getAll: async () => {
        const res = await api.get("/notions");
        return res.data;
    },

    getById: async (id) => {
        const res = await api.get(`/notions/${id}`);
        return res.data;
    },

    create: async (dto) => {
        const res = await api.post("/notions", dto);
        return res.data;
    },

    update: async (id, dto) => {
        const res = await api.put(`/notions/${id}`, dto);
        return res.data;
    },

    remove: async (id) => {
        await api.delete(`/notions/${id}`);
    },
};