import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import { useState, useEffect } from 'react'
import { GridInputWrapper } from './common/pure/GridStyled.tsx'
import { useAppDispatch, useAppSelector } from '../../helper/hooks'
import { DialogEnum } from '../../features/administrative/account/AccountTableSlice.tsx'

const CreateAccount = ({ handleOk, handleClose, open }: any) => {
    const dispatch = useAppDispatch()
    const { selectedAccountDetails, methodIdentifier } = useAppSelector(state => state.account)
    const [input, setInput] = useState({ username: '', firstname: '', lastname: '', email: '' })
    useEffect(() => {
        if (open) {
            setInput({ username: selectedAccountDetails.username, firstname: selectedAccountDetails.firstname, lastname: selectedAccountDetails.lastname, email: selectedAccountDetails.email })
            if (methodIdentifier === DialogEnum.ACCOUNT_EDIT) {
                setInput({ username: selectedAccountDetails.username, firstname: selectedAccountDetails.firstname, lastname: selectedAccountDetails.lastname, email: selectedAccountDetails.email })
            } else {
                setInput({ username: '', firstname: '', lastname: '', email: ''  })
            }
        }
        return () => {


        }
    }, [open, methodIdentifier, selectedAccountDetails])

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(pre => ({
            ...pre,
            [event.target.name]: event.target.value,
        }))
    }

    return (
        <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
            <DialogTitle sx={{ fontSize: '16px', fontWeight: 'bold' }}>Account Registration</DialogTitle>
            <DialogContent>
                <GridInputWrapper title='username'>
                    <TextField
                        name='username'
                        fullWidth
                        value={input.username}
                        onChange={handleInput}
                    />
                </GridInputWrapper>

                <GridInputWrapper title='firstname'>
                    <TextField
                        name="firstname"
                        fullWidth
                        value={input.firstname}
                        onChange={handleInput}
                    />
                </GridInputWrapper>
                <GridInputWrapper title='lastname'>
                    <TextField
                        name="lastname"
                        fullWidth
                        value={input.lastname}
                        onChange={handleInput}
                    />
                </GridInputWrapper>
                <GridInputWrapper title='email'>
                    <TextField
                        name="email"
                        fullWidth
                        value={input.email}
                        onChange={handleInput}
                    />
                </GridInputWrapper>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" sx={{ height: '30px' }} onClick={handleClose}>Cancel</Button>
                <Button variant="contained" sx={{ marginRight: '5px', height: '30px' }} onClick={() => handleOk(input)}>Create New</Button>
            </DialogActions>
        </Dialog>
    )
}
export default CreateAccount