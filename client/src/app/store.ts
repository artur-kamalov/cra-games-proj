import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from '../features/games/gamesSlice'

export const store = configureStore({
  reducer: {
    gameState: gameReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch