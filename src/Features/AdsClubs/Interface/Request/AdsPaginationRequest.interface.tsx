export default interface IAdsPaginationRequest {
    PageNumber: number,
    PageSize: number | string,
    Club: string,
    Sku: string,
    StartDate: string
}