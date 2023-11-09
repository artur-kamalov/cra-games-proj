import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GameType } from '../../types'

const initialState: GameType = {
    name: '',
    category: '',
    images: [],
    mainImage: '',
    price: '',
    inWishList: false,
    isPurchased: false,
    isPublished: false,
}

export const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    changeGameFields: (state, action: PayloadAction<GameType>) => {
        return {...action.payload}
    },
    changeIsPublished: (state, action: PayloadAction<boolean>) => {
        state.isPublished = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeGameFields, changeIsPublished} = gameSlice.actions

export const gameReducer = gameSlice.reducer