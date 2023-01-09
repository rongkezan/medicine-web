import { http } from "@/utils"
import { handleAction, handleQuery } from "./common"

export const queryBannerPage = async (param) => {
    const res = await http.post("backend/query/banner/page", param)
    return handleQuery(res)
}

export const deleteBanner = async (param, func) => {
    const res = await http.post("backend/action/banner/delete", param)
    handleAction(res, func)
}

export const saveBanner = async (param, func) => {
    const res = await http.post("backend/action/banner/save", param)
    handleAction(res, func)
}