import { http } from "@/utils";
import { handleAction, handleQuery } from "./common";

export const queryGoodsPage = async (param) => {
    const res = await http.post('backend/query/goods/page', param)
    return handleQuery(res)
}

export const querySaleStatus = async () => {
    const res = await http.post('backend/query/saleStatus')
    return handleQuery(res)
}

export const offSaleGoods = async (param, func) => {
    const res = await http.post("backend/action/goods/offSale", param)
    return handleAction(res, func)
}