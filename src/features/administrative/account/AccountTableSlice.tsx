import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosInstance.tsx'
import { AppState } from '../../../ts/types.ts'
export const enum DialogEnum {
    // account page
    ACCOUNT_EDIT = 'ACCOUNT_EDIT',
    ACCOUNT_CREATE = 'ACCOUNT_CREATE',
}

const initialState:  any = {
    loading: false,
    successFlag: false,
    dataList: [],
    selectedId: 0,
    selectedIdList: [],
    selectedAccountDetails: {
        userId: 0,
        firstname: '',
        lastname: '',
        email: '',
        username: '',
    },
    methodIdentifier: null
}
//게시판 조회
export const getAccounts = createAsyncThunk(
    'account/data',
    async (_, { rejectWithValue  }) => {
        try {
            return await axiosInstance<any>('/account/data')
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    },
)
export const getAccountDetails = createAsyncThunk(
    'account/details',
    async ({selectedUserId}: { selectedUserId: number }, { rejectWithValue}) => {
        const data = {
            selectedUserId: selectedUserId,
        }
        try {
            return await axiosInstance.post<any>('/account/detail', data)
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    },
)
//게시판 등록
export const createAccount = createAsyncThunk(
    'account/create',
    async (input: any, { rejectWithValue }) => {
        const data = {
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            username: input.username,
        }
        try {
            return await axiosInstance.post<any>('/account/create', data)
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    },
)
//게시판 삭제
export const deleteAccount = createAsyncThunk(
    'account/delete',
    async (_, { rejectWithValue, getState }) => {
        const state = getState() as AppState
        const { selectedIdList } = state.account
        const data = {
            userIdList: selectedIdList,
        }
        try {
            return await axiosInstance.post<any>('/account/delete', data)
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    },
)
//게시판 수정
export const updateAccount = createAsyncThunk(
    'account/update',
    async (input: any, { rejectWithValue, getState }) => {
        const state = getState() as AppState
        const { selectedId } = state.account
        const data = {
            username: input.username,
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            userId: selectedId,
        }
        try {
            return await axiosInstance.post<any>('/account/update', data)
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    },
)
const accountTableSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setSuccessFlag(state, action) {
            state.successFlag = action.payload
        },
        setSelectedIdList(state, action) {
            state.selectedIdList = action.payload
        },
        setSelectedId(state, action) {
            state.selectedId = action.payload
        },
        setMethodIdentifier(state, { payload }: { payload: DialogEnum }) {
            state.methodIdentifier = payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isFulfilled(getAccounts), (state, { payload }) => {
                    state.dataList = payload.data
                })
            .addMatcher(
                isFulfilled(getAccountDetails), (state, { payload }) => {
                    state.selectedAccountDetails.userId = payload.data.userId
                    state.selectedAccountDetails.username = payload.data.username
                    state.selectedAccountDetails.firstname = payload.data.firstname
                    state.selectedAccountDetails.lastname = payload.data.lastname
                    state.selectedAccountDetails.email = payload.data.email
                })
            .addMatcher(
                isFulfilled(createAccount, deleteAccount, updateAccount), (state) => {
                    state.successFlag = true
                })
    },
})

export const {
    setSuccessFlag,
    setSelectedIdList,
    setSelectedId,
    setMethodIdentifier,
} = accountTableSlice.actions

export default accountTableSlice.reducer