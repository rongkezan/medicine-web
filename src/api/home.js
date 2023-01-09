import { http } from "@/utils";
import { handleQuery } from "./common";

export const queryStatistic = async () => {
    const res = await http.post("backend/query/home/statistic")
    return handleQuery(res)
}

export const queryOrderHistories = async (param) => {
    const res = await http.post("statistic/orderHistory", param)
    return handleQuery(res)
}

export const queryUserHistories = async () => {
    const res = await http.post("statistic/userHistory")
    return handleQuery(res)
}