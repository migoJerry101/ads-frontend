import { createContext } from 'react';
import IPaginatedChainResponse from "../Features/AdsChains/Interface/Request/Response/PaginatedChainResponse.interface";
import useAdsChain from '../Hooks/useAdsChain';



const AdsChainContext = createContext<IPaginatedChainResponse | undefined>(undefined);

const AdsChainProvider = ({ children }) => {
  const { chain } = useAdsChain();

  return (
    <AdsChainContext.Provider value={chain}>
    {children}
  </AdsChainContext.Provider>
  );
};

export { AdsChainContext, AdsChainProvider };