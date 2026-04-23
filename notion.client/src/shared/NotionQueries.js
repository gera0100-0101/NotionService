import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NotionApi } from "./NotionApi";

// GET ALL
export const useNotions = () => {
    return useQuery({
        queryKey: ["notions"],
        queryFn: NotionApi.getAll,
    });
};

// GET BY ID
export const useNotion = (id) => {
    return useQuery({
        queryKey: ["notion", id],
        queryFn: () => NotionApi.getById(id),
        enabled: !!id,
    });
};

// CREATE
export const useCreateNotion = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: NotionApi.create,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["notions"] });
        },
    });
};

// UPDATE
export const useUpdateNotion = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dto }) => NotionApi.update(id, dto),
        onSuccess: (_, vars) => {
            qc.invalidateQueries({ queryKey: ["notions"] });
            qc.invalidateQueries({ queryKey: ["notion", vars.id] });
        },
    });
};

// DELETE
export const useDeleteNotion = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: NotionApi.remove,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["notions"] });
        },
    });
};