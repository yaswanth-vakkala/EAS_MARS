import { EXPENSES_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const expensesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: EXPENSES_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Expenses'],
    }),
    getExpensesHistory: builder.query({
      query: () => ({
        url: `${EXPENSES_URL}/history`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Expense'],
    }),
    getExpenseDetails: builder.query({
      query: (expenseId) => ({
        url: `${EXPENSES_URL}/${expenseId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createExpense: builder.mutation({
      query: (data) => ({
        url: `${EXPENSES_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Expense'],
    }),
    updateExpense: builder.mutation({
      query: (data) => ({
        url: `${EXPENSES_URL}/${data._id}`,
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      }),
      invalidatesTags: ['Expenses'],
    }),
    uploadExpenseImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteExpense: builder.mutation({
      query: (expenseId) => ({
        url: `${EXPENSES_URL}/${expenseId}`,
        method: 'DELETE',
      }),
      providesTags: ['Expense'],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useGetExpensesHistoryQuery,
  useGetExpenseDetailsQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useUploadExpenseImageMutation,
  useDeleteExpenseMutation,
} = expensesApiSlice;
