import IAdsChain from "../AdsChain.interface";

export default interface IPaginatedChainResponse {
    data: IAdsChain[],
    pageCount: number,
}