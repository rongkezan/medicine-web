import { http } from "@/utils";
import { handleAction, handleQuery } from "./common";

export const queryWithdrawPage = async (param) => {
    const res = await http.post("backend/query/withdraw/page", param)
    return handleQuery(res)
}

export const queryWthdrawStatus = async () => {
    const res = await http.post("backend/query/withdrawStatus")
    return handleQuery(res)
}

export const actionWithdrawPassManually = async (param, func) => {
    const res = await http.post("backend/action/withdraw/passManually", param)
    handleAction(res, func)
}

export const actionWithdrawPass = async (param, func) => {
    const res = await http.post("backend/action/withdraw/pass", param)
    handleAction(res, func)
}

export const actionWithdrawReject = async (param, func) => {
    const res = await http.post("backend/action/withdraw/reject", param)
    handleAction(res, func)
}