import { http } from "@/utils";
import { handleAction, handleQuery } from "./common";

export const queryMerchantOne = async (param) => {
    const res = await http.post('backend/query/merchant/one', param)
    return handleQuery(res)
}

export const queryMerchantPage = async (param)  => {
    const res = await http.post("backend/query/merchant/page", param)
    return handleQuery(res)
}

export const saveMerchant = async (param, func) => {
    const res = await http.post("backend/action/merchant/save", param)
    return handleAction(res, func)
}

