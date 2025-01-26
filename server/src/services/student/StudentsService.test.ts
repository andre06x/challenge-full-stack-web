import { Request } from "express";
import StudentsService from "@src/services/student/StudentsService";
import StudentsRepository from "@src/repositories/students/StudentsRepository";
import StudentsException from "@src/config/exceptions/StudentsException";
import * as httpStatus from "@src/config/constants/httpStatus";

interface StudentDataCreate {
  ra: string;
  name: string;
  cpf: string;
  email: string;
}

describe("StudentsService - studentsExists", () => {
  it("Should throw an error if the student already exists", async () => {
    const mockStudentData: StudentDataCreate = {
      ra: "12345",
      name: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@example.com",
    };

    jest.spyOn(StudentsService, "studentsExists").mockImplementationOnce(() => {
      throw new StudentsException(httpStatus.BAD_REQUEST, "Estudante já cadastrado.");
    });

    try {
      await StudentsService.studentsExists(mockStudentData);
    } catch (err: any) {
      expect(err).toBeInstanceOf(StudentsException);
      expect(err.status).toBe(httpStatus.BAD_REQUEST);
      expect(err.message).toBe("Estudante já cadastrado.");
    }

    expect(StudentsService.studentsExists).toHaveBeenCalledWith(mockStudentData);
  });

  it("Should proceed normally if the student does not exist", async () => {
    const mockStudentData: StudentDataCreate = {
      ra: "12345",
      name: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@example.com",
    };

    jest.spyOn(StudentsService, "studentsExists").mockResolvedValueOnce(undefined);

    const result = await StudentsService.studentsExists(mockStudentData);

    expect(result).toBeUndefined();

    expect(StudentsService.studentsExists).toHaveBeenCalledWith(mockStudentData);
  });

  it("Should throw an error if there is a failure checking the existence of the student", async () => {
    const mockStudentData: StudentDataCreate = {
      ra: "12345",
      name: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@example.com",
    };

    jest
      .spyOn(StudentsRepository, "hasStudentExists")
      .mockRejectedValueOnce(new Error("Query failed"));

    try {
      await StudentsService.studentsExists(mockStudentData);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Query failed");
    }

    expect(StudentsRepository.hasStudentExists).toHaveBeenCalledWith(mockStudentData);
  });
});

describe("StudentsService - createStudent", () => {
  const mockRequest = (body: any): Request =>
    ({
      body,
    } as Request);

  const mockStudentData: StudentDataCreate = {
    ra: "123456",
    name: "Test Student",
    cpf: "123.456.789-00",
    email: "test@student.com",
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should create a student successfully", async () => {
    jest.spyOn(StudentsService, "validateCreateStudent").mockImplementation(() => {});
    jest.spyOn(StudentsService, "studentsExists").mockResolvedValue(undefined);
    jest.spyOn(StudentsRepository, "create").mockResolvedValue({
      id: 1,
      ...mockStudentData,
    });

    const req = mockRequest(mockStudentData);
    const response = await StudentsService.createStudent(req);

    expect(response.status).toBe(httpStatus.SUCCESS);
    expect(response.data).toEqual({ ...mockStudentData, id: 1 });
  });

  it("Should return error if student data is invalid", async () => {
    const req = mockRequest(null);

    const response = await StudentsService.createStudent(req);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.message).toBe("Dados do estudante inválidos");
  });

  it("Should throw an error if the student already exists", async () => {
    jest.spyOn(StudentsService, "studentsExists").mockImplementation(() => {
      throw new StudentsException(httpStatus.BAD_REQUEST, "Estudante já cadastrado.");
    });

    const req = mockRequest(mockStudentData);

    const response = await StudentsService.createStudent(req);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.message).toBe("Estudante já cadastrado.");
  });

  it("Should return internal server error for unexpected exceptions", async () => {
    jest.spyOn(StudentsService, "studentsExists").mockImplementation(() => {
      throw new Error("Estudante já cadastrado.");
    });

    const req = mockRequest(mockStudentData);

    const response = await StudentsService.createStudent(req);

    expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    expect(response.message).toBe("Estudante já cadastrado.");
  });

  it("Should throw an error if there is an issue during student creation", async () => {
    jest.spyOn(StudentsService, "validateCreateStudent").mockImplementation(() => {});
    jest.spyOn(StudentsService, "studentsExists").mockResolvedValue(undefined);
    jest
      .spyOn(StudentsRepository, "create")
      .mockRejectedValueOnce(new Error("Failed to create student"));

    const req = mockRequest(mockStudentData);
    const response = await StudentsService.createStudent(req);

    expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    expect(response.message).toBe("Failed to create student");
  });
});
