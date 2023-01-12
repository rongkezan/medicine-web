import { http } from "@/utils"
import { handleAction, handleQuery } from "./common"

export const saveHeaders = async (param, func) => {
    const res = await http.post('config/save', param)
    return handleAction(res, func)
}

export const queryHeaders = async (param) => {
    const res = await http.post('config/page', param)
    return handleQuery(res)
}

export const deleteHeaders = async (param, func) => {
    const res = await http.post('config/delete', param)
    return handleAction(res, func)
}