import request from "supertest";
import app from "@src/app";
import StudentsService from "@src/services/student/StudentsService";

jest.mock("@src/services/student/StudentsService");

describe("studentsRouter", () => {
  describe("POST /students/create", () => {
    it("should create a student and return a response", async () => {
      const mockCreateStudent = jest.fn().mockResolvedValue({
        status: 200,
        message: "Student created successfully",
      });
      (StudentsService.createStudent as jest.Mock) = mockCreateStudent;

      const response = await request(app).post("/students/create").send({
        name: "John Doe",
        email: "john.doe@example.com",
        ra: "1234",
        cpf: "1234",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Student created successfully");
      expect(mockCreateStudent).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /students", () => {
    it("should return a list of students", async () => {
      const mockFindAllStudents = jest.fn().mockResolvedValue({
        status: 200,
        data: [
          { ra: "123", name: "John Doe", email: "john.doe@example.com" },
          { ra: "124", name: "Jane Doe", email: "jane.doe@example.com" },
        ],
      });
      (StudentsService.findAllStudents as jest.Mock) = mockFindAllStudents;

      const response = await request(app).get("/students");

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      expect(mockFindAllStudents).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /students/:ra", () => {
    it("should return a student based on RA", async () => {
      const mockGetStudent = jest.fn().mockResolvedValue({
        status: 200,
        data: { ra: "123", name: "John Doe", email: "john.doe@example.com" },
      });
      (StudentsService.getStudent as jest.Mock) = mockGetStudent;

      const response = await request(app).get("/students/123");

      expect(response.status).toBe(200);
      expect(response.body.data.ra).toBe("123");
      expect(mockGetStudent).toHaveBeenCalledTimes(1);
    });
  });

  describe("PUT /students/:ra", () => {
    it("should update a student and return a response", async () => {
      const mockEditStudent = jest.fn().mockResolvedValue({
        status: 200,
        message: "Student updated successfully",
      });
      (StudentsService.editStudent as jest.Mock) = mockEditStudent;

      const response = await request(app).put("/students/123").send({
        name: "John Doe Updated",
        email: "john.doe.updated@example.com",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Student updated successfully");
      expect(mockEditStudent).toHaveBeenCalledTimes(1);
    });
  });

  describe("DELETE /students/:ra", () => {
    it("should remove a student and return a response", async () => {
      const mockRemoveStudent = jest.fn().mockResolvedValue({
        status: 200,
        message: "Student removed successfully",
      });
      (StudentsService.removeStudent as jest.Mock) = mockRemoveStudent;

      const response = await request(app).delete("/students/123");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Student removed successfully");
      expect(mockRemoveStudent).toHaveBeenCalledTimes(1);
    });
  });
});
