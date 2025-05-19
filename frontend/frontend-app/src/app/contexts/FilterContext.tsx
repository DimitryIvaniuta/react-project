import React, {
    useContext,
    useEffect,
    useState,
    useCallback,
    ReactNode
} from 'react';

interface FilterState {
    search: string;
    sortBy: 'name' | 'email' | 'phone' | 'address' | 'createdAt';
    sortDir: 'asc' | 'desc';
}

interface FilterContextType extends FilterState {
    doSearch: (search: string) => void;
    doSort: (field: FilterState['sortBy'], dir: FilterState['sortDir']) => void;
}

const FilterContext = React.createContext<FilterContextType | undefined>(undefined);

type FilterProviderType = {
    children: React.ReactNode;
}

export const FilterProvider: React.FC<FilterProviderType> = ({children}) => {
    const [state, setState] = useState<FilterState>({search: '', sortBy: 'name', sortDir: 'asc'});
    const doSearch = (q:string)=> setState(prev => ({...prev, search: q}));
    const doSort = (field: FilterState['sortBy'], dir: FilterState['sortDir'])=>
        setState(prev => ({...prev, sortBy: field, dir: dir}));
    return (<FilterContext.Provider value={{...state, doSearch, doSort}}>
        {children}
        </FilterContext.Provider>)
}

export const useFilter = () => {
    const ctx = useContext(FilterContext)
    if(!ctx) {
        throw new Error('useFilter must be defined');
    }
    return ctx;
}
