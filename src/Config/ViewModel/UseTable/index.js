import { Table } from '@Model';
import { useState, useCallback } from 'react';
import { log } from '@Utils';
export default () => {
    const { getTables } = Table;
    const [tableList, setTableList] = useState([])
    const [filteredTables, setFilteredTables] = useState([])
    const [selectedTable, setSelectedTable] = useState({})
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
    }, [])

    return {
        _getTables,
        tableList,
        tableError,
        refreshingTable,
        selectedTable,
        setSelectedTable,
        setFilteredTables,
        filteredTables,
    }
}