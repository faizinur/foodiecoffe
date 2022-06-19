import { Table } from '@Model';
import { useState, useCallback } from 'react';
import { log } from '@Utils';
let tmpTable = []
export default () => {
    const { getTables } = Table;
    const [tableList, setTableList] = useState([])
    const [filteredTables, setFilteredTables] = useState([])
    const [selectedTable, setSelectedTable] = useState({})
    const [searchValue, setSearchValue] = useState('');
    const [tableError, setTableError] = useState('');
    const [refreshingTable, setRefreshingTable] = useState(false);

    const _getTables = useCallback(async () => {
        try {
            setRefreshingTable(true)
            setTableError('')
            const { status, data, message } = await getTables();
            setSelectedTable({})
            if (status != 'SUCCESS') throw message;
            setTableList(data)
            setRefreshingTable(false)
        } catch (err) {
            log(err)
            setTableError(`error Table ${err}`)
            setRefreshingTable(false)
        }
    }, []);

    const _onChangeText = useCallback(text => {
        setSearchValue(text)
    }, [searchValue])

    const _searcTable = useCallback(fnFilter => {
        try {
            setSelectedTable({});
            tmpTable = [...tableList].filter();
            if (tmpTable.length == 0) throw (`MEJA ${searchValue} TIDAK DITEMUKAN`)
            setFilteredTables(tmpTable)
            tmpTable = [];
        } catch (err) {
            log('_searchTable : ', err)
        }

    }, [tableList, filteredTables, selectedTable, searchValue])

    const _clearFiltered = useCallback(() => {
        try {
            tmpTable = [];
            setFilteredTables([])
            setSelectedTable({})
            setSearchValue('')
        } catch (err) {

        }
    }, [filteredTables, selectedTable, searchValue])
    return {
        _getTables,
        tableList,
        tableError,
        refreshingTable,
        selectedTable,
        setSelectedTable,
        _searcTable,
        filteredTables,
        _clearFiltered,
        searchValue,
        _onChangeText,
    }
}