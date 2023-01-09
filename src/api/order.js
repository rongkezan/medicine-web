import { http } from "@/utils";
import { handleQuery } from "./common";

export const queryOrderDetail = async (param) =>{
    const res = await http.post("backend/query/order/detail", param)
    return handleQuery(res)
}

export const queryOrderPage = async (param) =>{
    const res = await http.post("backend/query/order/page", param)
    return handleQuery(res)
}

export const queryOrderStatus = async () =>{
    const res = await http.post('backend/query/orderStatus')
    return handleQuery(res)
}

export const actionOrderExport = async (param) =>{
    return await http.post("backend/action/order/export", param)
}