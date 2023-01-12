import { http } from "@/utils"
import { handleAction, handleQuery } from "./common"

export const queryMarkerDegree = async (param) => {
    const res = await http.post('athMarkerDegree/page', param)
    return handleQuery(res)
}