import { Table, Auth } from '@Model';
import { useState, useCallback, useMemo } from 'react';
import { log } from '@Utils';
let tmpTable = []
export default () => {
    const { getTables } = Table;
    const { getUserData } = Auth;
    const [tableList, setTableList] = useState([])
    const [filteredTables, setFilteredTables] = useState([])
    const [selectedTable, setSelectedTable] = useState({})
    const [searchValue, setSearchValue] = useState('');
    const [tableError, setTableError] = useState('');
    const [refreshingTable, setRefreshingTable] = useState(false);

    const _getTables = useMemo(() => async () => {
        try {
            setRefreshingTable(true)
            setTableError('')
            const userData = await getUserData();
            if (userData == null) return Promise.reject(`userData null`);
            const { status, data, message } = await getTables(userData.user.merchantId);
            setSelectedTable({})
            if (status != 'SUCCESS') throw message;
            setTableList(data.sort(prev => prev.occupied == true))
            setRefreshingTable(false)
        } catch (err) {
            log(err)
            global.showToast(err);
            setTableError(`error Table ${err}`)
            setRefreshingTable(false)
        }
    }, [selectedTable, tableList]);

    const _onChangeText = useCallback(text => {
        setSearchValue(text)
    }, [searchValue])

    const _searchTable = useCallback(async (fnFilter) => {
        if (typeof fnFilter != 'function') throw (`Error Params`)
        try {
            setSelectedTable({});
            setTableError('')
            tmpTable = [...tableList].filter(fnFilter);
            if (tmpTable.length == 0) {
                setTableError('MEJA_NOT_FOUND')
                return false;
            }
            setFilteredTables(tmpTable.sort(prev => prev.occupied == true))
            tmpTable = [];
        } catch (err) {
            global.showToast(err);
            log('_searchTable : ', err)
            setTableError(err)
        }

    }, [tableList, filteredTables, selectedTable, searchValue])

    const _clearFiltered = useCallback(() => {
        try {
            tmpTable = [];
            setFilteredTables([])
            setSelectedTable({})
            setSearchValue('')
        } catch (err) {
            global.showToast(err);
        }
    }, [filteredTables, selectedTable, searchValue])


    const _selectTable = useCallback(meja => {
        if (selectedTable?.id == meja?.id) {
            setSelectedTable({})
        } else {
            setSelectedTable(meja)
        }
        log(selectedTable?.id)
    }, [selectedTable])

    const _updateTableOccupied = useCallback(meja => {
        let foundIndex = tableList.findIndex(({ id }) => id == meja.id);
        if (foundIndex < 0) return false;
        let tmpTableList = [...tableList]
        tmpTableList[foundIndex] = meja;
        setTableList(tmpTableList);
        setSelectedTable(meja);
        tmpTableList = [];
    }, [selectedTable, tableList])

    return {
        _getTables,
        tableList,
        tableError,
        refreshingTable,
        selectedTable,
        setSelectedTable,
        _searchTable,
        filteredTables,
        _clearFiltered,
        searchValue,
        _onChangeText,
        refreshingTable,
        setRefreshingTable,
        _selectTable,
        _updateTableOccupied,
    }
}