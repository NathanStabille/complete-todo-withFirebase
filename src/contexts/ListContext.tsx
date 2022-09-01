import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getItems } from "../services/List";
import { ListItemType } from "../types/allTypes";

interface IListContext {
  list: ListItemType[];
  setList: (list: ListItemType[]) => void;
  filteredList: ListItemType[];
  setFilteredList: (filteredList: ListItemType[]) => void;
  switchList: boolean;
  toggleSwitchList: () => void;
}

interface IListProviderProps {
  children: ReactNode;
}

const ListContext = createContext({} as IListContext);

export const useListContext = () => {
  return useContext(ListContext);
};

export const ListProvider: React.FC<IListProviderProps> = ({ children }) => {
  const [list, setList] = useState([] as ListItemType[]);
  const [filteredList, setFilteredList] = useState([] as ListItemType[]);
  const [switchList, setSwitchList] = useState(false);

  useEffect(() => {
    const getAllItems = async () => {
      setList(await getItems());
    };

    getAllItems();
  }, []);

  const toggleSwitchList = () => {
    switchList ? setSwitchList(false) : setSwitchList(true);
  };

  return (
    <ListContext.Provider
      value={{
        list,
        setList,
        filteredList,
        setFilteredList,
        switchList,
        toggleSwitchList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
