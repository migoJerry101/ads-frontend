import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import IAdsPaginationRequest from "../Features/AdsClubs/Interface/Request/AdsPaginationRequest.interface";
import IPaginatedChainResponse from "../Features/AdsChains/Interface/Request/Response/PaginatedChainResponse.interface";



export default function useAdsChain(): {
    chain: IPaginatedChainResponse
} {
    const [chain, setChain] = useState<IPaginatedChainResponse>({} as IPaginatedChainResponse);
    const [request, setRequest] = useState<IAdsPaginationRequest>({
        Club: "227",
        Sku: '',
        PageNumber: 1,
        PageSize: 10,
        StartDate: '2023-10-17 00:00:00.000'
    });

    const fetchAdsClubs = async () => {
        try {
          const getItem: AxiosRequestConfig = {
            method: 'post',
            url: `https://localhost:7020/api/TotalAdsChain/GetTotalAdsChain`,
            data: request
          };

          const response = await axios(getItem);

          if (response != null) {
            setChain(response.data);
          }
        } catch (error) {
          console.error("Error fetching item:", error);
        } finally {
            console.error(false);
        }
      };

    useEffect(() =>{
        fetchAdsClubs();
    }, []);

    return {chain}
}