import { apiSlice } from './apiSlice';
import { PROJECTS_URL } from '../constants';

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PROJECTS_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      providesTags: ['Project'],
      keepUnusedDataFor: 5,
    }),
    getAllProjects: builder.query({
      query: () => ({
        url: `${PROJECTS_URL}/projects`,
      }),
      providesTags: ['Project'],
      keepUnusedDataFor: 5,
    }),

    addProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/${data.projectId}`,
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      }),
      invalidatesTags: ['Projects'],
    }),
    getProjectDetails: builder.query({
      query: (id) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    deleteProject: builder.mutation({
      query: (projId) => ({
        url: `${PROJECTS_URL}/${projId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useGetProjectDetailsQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
} = projectApiSlice;
