import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import IAdsPaginationRequest from "../Features/AdsClubs/Interface/Request/AdsPaginationRequest.interface";
import IAdsPaginationResponse from "../Features/AdsClubs/Interface/Response/AdsPaginationResponse.interface.interface";
import IAdsClubs from "../Features/AdsClubs/Interface/AdsClubs.interface";



export default function useAdsChain(): {
    chain: IAdsPaginationResponse
} {
    const [chain, setChain] = useState<IAdsPaginationResponse>({
      data: [] as IAdsClubs[],
      pageCount: 0
    });
    const [request, setRequest] = useState<IAdsPaginationRequest>({
        Club: "227",
        Sku: '',
        PageNumber: 1,
        PageSize: 100,
        StartDate: '2023-10-10 00:00:00.000'
    });

    const fetchAdsClubs = async () => {
        try {
          const getItem: AxiosRequestConfig = {
            method: 'POST',
            url: `http://199.84.0.201:468/api/TotalAdsClub/GetPaginatedTotalAdsClubs`,
            data: request,
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