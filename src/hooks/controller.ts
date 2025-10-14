import api from "./api/config";
import { toast } from "sonner";

export async function getAll<T>(endpoint: string): Promise<T> {
    const response = await api.get("index.php", {
        params: {
            resource: endpoint
        }
    });
    return response.data;
}

export async function getOne<T>(endpoint: string, id: number): Promise<T> {
    const response = await api.get("index.php", {
        params: {
            resource: endpoint,
            id: id
        }
    })
    return response.data;
}

export const catchError = (error: unknown) => {
    if (error instanceof Error) {
        toast.error(error.message)
    }
    throw error;
}

