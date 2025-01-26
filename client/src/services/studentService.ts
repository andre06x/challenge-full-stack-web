import { api } from "@/config/api";

export const studentService = {
  async getStudents() {
    const response = await api.get("/students");
    return response.data;
  },

  async getStudent(ra: string) {
    const response = await api.get(`/students/${ra}`);
    return response.data;
  },

  async removeStudent(ra: string) {
    const response = await api.delete(`/students/${ra}`);
    return response;
  },

  async editStudent(ra: string, data: any) {
    const response = await api.put(`/students/${ra}`, data);
    return response.data;
  },

  async createStudent(data: any) {
    const response = await api.post(`/students/create`, data);
    return response.data;
  },
};
