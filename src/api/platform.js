import { http } from "@/utils";
import { handleAction, handleQuery } from "./common";

export const queryPlatformList = async (param) =>{
    const res = await http.post('backend/query/platform/list', param)
    return handleQuery(res)
}

export const queryPlatformPage = async (param) =>{
    const res = await http.post('backend/query/platform/page', param)
    return handleQuery(res)
}

export const queryPlatformOne = async (param) =>{
    const res = await http.post('backend/query/platform/one', param)
    return handleQuery(res)
}

export const actionPlatformSave = async (param, func)=>{
    const res = await http.post("backend/action/platform/save", param)
    return handleAction(res, func)
}

export const actionPlatformDelete = async (param, func) =>{
    const res = await http.post("backend/action/platform/delete", param)
    return handleAction(res, func)
}