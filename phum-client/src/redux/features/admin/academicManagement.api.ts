import type { TQueryParam, TResponseRedux } from "../../../types";
import type { TAcademicFaculty, TAcademicSemester } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

export const academicManangement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        //const params = new URLSearchParams()
        // params.append('name', 'Fall')
        // params.append(args[0].name, args[0].value)

        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        //console.log("Inside redux",response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),

     getAllFacultys: builder.query({
      query: (args) => {
        console.log({args});
        //const params = new URLSearchParams()
        // params.append('name', 'Fall')
        // params.append(args[0].name, args[0].value)

        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/academic-faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        console.log("Inside redux getAllFaculty",response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),


  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useGetAllFacultysQuery,
  useAddAcademicFacultyMutation,
} = academicManangement;

//  query: () => ({
//       url: "/academic-semesters",
//       method: "GET",
//       params: {name: "Fall"}
//     }),
