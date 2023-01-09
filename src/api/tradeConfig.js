import { http } from "@/utils";
import { handleAction, handleQuery } from "./common";

export const queryTradeConfigRules = async ()=> {
    const res = await http.post("backend/query/tradeConfigRules")
    return handleQuery(res)
}

export const queryWithdrawConfigOne = async (param)=> {
    const res = await http.post("backend/query/withdrawConfig/one", param)
    return handleQuery(res)
}

export const queryTradeConfigPage = async (param) => {
    const res = await http.post("backend/query/tradeConfig/page", param)
    return handleQuery(res)
}

export const actionTradeConfigDelete = async (param, func) => {
    const res = await http.post("backend/action/tradeConfig/delete", param)
    handleAction(res, func)
}

export const actionWithdrawConfigSave = async (param, func) => {
    const res = await http.post('backend/action/withdrawConfig/save', param)
    handleAction(res, func)
}

export const actionTradeConfigSave = async (param, func) => {
    const res = await http.post('backend/action/tradeConfig/save', param)
    handleAction(res, func)
}