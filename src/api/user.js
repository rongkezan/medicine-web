import { http } from "@/utils";
import { handleAction, handleQuery } from "./common";

export const queryUserOne = async (param) => {
    const res = await http.post("backend/query/user/one", param)
    return handleQuery(res)
}

export const queryUserPage = async (param) => {
    const res = await http.post("backend/query/user/page", param)
    return handleQuery(res)
}

export const actionEditBalance = async (param, func) => {
    const res = await http.post("backend/action/user/editBalance", param)
    return handleAction(res, func)
}

export const login = async (param) => {
    return await http.post("backend/action/admin/login", param)
}

export const queryUserProfile = async () => {
    return await http.post("backend/query/admin/profile")
}