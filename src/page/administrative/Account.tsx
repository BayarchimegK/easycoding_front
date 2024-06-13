import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { AutoFixHigh } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../helper/hooks.tsx'
import { useEffect, useState } from 'react'
import {
    createAccount,
    deleteAccount,
    DialogEnum,
    getAccountDetails,
    getAccounts,
    setMethodIdentifier, setSelectedId,
    setSelectedIdList,
    setSuccessFlag,
    updateAccount,
} from '../../features/administrative/account/AccountTableSlice.tsx'
import { Box, Button } from '@mui/material'
import CreateAccount from '../../component/dialog/CreateAccount.tsx'

const Account = () => {
    const dispatch = useAppDispatch()
    const { successFlag, dataList, selectedIdList, methodIdentifier } = useAppSelector(state => state.account)
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    console.log("dataList: ", dataList)

    useEffect(() => {
        dispatch(getAccounts())
        return () => {
            dispatch(setSuccessFlag(false))
        }
    }, [])
    useEffect(() => {
        if (successFlag){
            dispatch(setSuccessFlag(false))
            setOpenCreateDialog(false)
            dispatch(getAccounts())
        }
    }, [successFlag])
    const handleSelectedId = (params: any) => {
        dispatch(setSelectedId(params.row.userId))
        dispatch(setMethodIdentifier(DialogEnum.ACCOUNT_EDIT))
        dispatch(getAccountDetails({selectedUserId: params.row.userId}))
        setOpenCreateDialog(true)
    }
    const columns: GridColDef<(typeof dataList)[number]>[] = [
        {
            field: 'username',
            headerName: 'username',
            width: 300,
            editable: false,
        },
        {
            field: 'firstname',
            headerName: 'firstname',
            width: 300,
            editable: false,
        },
        {
            field: 'lastname',
            headerName: 'lastname',
            width: 300,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'email',
            width: 300,
            editable: false,
        },
        {
            field: 'regDate',
            headerName: 'created date',
            width: 180,
            editable: false,
        },
        {
            field: 'updDate',
            headerName: 'update date',
            width: 180,
            editable: false,
        },
        {
            field: 'settings', headerName: '', width: 40, type: 'actions', getActions:
                (params) => [
                    <GridActionsCellItem
                        label={'Edit'}
                        icon={<AutoFixHigh fontSize="small" />}
                        onClick={() => handleSelectedId(params)}
                        showInMenu />,
                ],
        },
    ];
    const createAcc = () => {
        dispatch(setMethodIdentifier(DialogEnum.ACCOUNT_CREATE))
        setOpenCreateDialog(true)
    }
    const deleteAcc = () => {
        if (selectedIdList.length > 0) {
            dispatch(deleteAccount())
        }
    }
    const handleOk = (input: any) => {
        if (methodIdentifier == DialogEnum.ACCOUNT_EDIT) {
            dispatch(updateAccount(input))
        } else if (methodIdentifier == DialogEnum.ACCOUNT_CREATE) {
            dispatch(createAccount(input))
        }
    }

    const handleClose = () => {
        setOpenCreateDialog(false);
    };
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <div style={{ fontSize: '25px', fontWeight: 'bold', color: 'green' }}>
                    Account Table
                </div>
                <div>
                    <Button variant="outlined" color="error" sx={{ marginRight: '5px', height: '30px' }} onClick={deleteAcc}>Delete</Button>
                    <Button variant="contained" sx={{ height: '30px' }} onClick={createAcc}>Create</Button>
                </div>
            </div>
            <Box
                sx={{
                    height: 800,
                    width: '100%',
                    border: 1,
                }}>
                <DataGrid
                    rows={dataList}
                    columns={columns}
                    getRowId={(row) => row.userId}
                    rowHeight={40}
                    pageSizeOptions={[10, 25, 50]}

                    checkboxSelection
                    onRowSelectionModelChange={(ids) => {
                        dispatch(setSelectedIdList(ids))
                    }}
                />
            </Box>

            <CreateAccount
                handleOk={handleOk}
                handleClose={handleClose}
                open={openCreateDialog}
            />
        </>
    )
}
export default Account