export function moneyFormat (num) {
    if (num) {
        return (Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
    }
    return num
}