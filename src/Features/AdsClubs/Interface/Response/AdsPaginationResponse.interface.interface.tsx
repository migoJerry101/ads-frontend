import IAdsClubs from "../AdsClubs.interface";

export default interface IAdsPaginationResponse {
    data: IAdsClubs[],
    pageCount: number,
}