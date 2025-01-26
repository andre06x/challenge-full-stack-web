import { PrismaClient } from "@prisma/client";
import * as httpStatus from "@src/config/constants/httpStatus";

const prisma = new PrismaClient();
interface ErrorCatch {
  status?: number;
  message?: string;
}
interface StudentDataCreate {
  ra: string;
  name: string;
  cpf: string;
  email: string;
}

interface StudentDataEdit {
  name: string;
  email: string;
}

class StudentRepository {
  async create(student: StudentDataCreate) {
    try {
      return await prisma.students.create({
        data: student,
      });
    } catch (error) {
      console.error("Erro ao criar estudante:", error);
      throw error;
    }
  }

  async findAllStudents() {
    try {
      return await prisma.students.findMany();
    } catch (err: unknown) {
      const error = err as ErrorCatch;

      return {
        status: error.status ?? httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message ?? "An unexpected error occurred.",
      };
    }
  }

  async removeStudent(ra: string) {
    try {
      const deletedStudent = await prisma.students.delete({
        where: { ra: ra },
      });

      return deletedStudent;
    } catch (err: unknown) {
      const error = err as ErrorCatch;

      return {
        status: error.status ?? httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message ?? "An unexpected error occurred.",
      };
    }
  }

  async updateStudent(ra: string, studentDataEdit: StudentDataEdit) {
    try {
      const updatedStudent = await prisma.students.update({
        where: { ra: ra },
        data: {
          name: studentDataEdit.name,
          email: studentDataEdit.email,
        },
      });

      return updatedStudent;
    } catch (error) {
      throw new Error("Erro ao atualizar o aluno.");
    }
  }

  async hasStudentExists(student: StudentDataCreate) {
    try {
      const existingStudent = await prisma.students.findFirst({
        where: {
          OR: [{ cpf: student.cpf }, { ra: student.ra }],
        },
      });
      return existingStudent;
    } catch (err: unknown) {
      const error = err as ErrorCatch;

      return {
        status: error.status ?? httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message ?? "An unexpected error occurred.",
      };
    }
  }

  async hasStudentRaExists(ra: string) {
    try {
      const existingStudent = await prisma.students.findFirst({
        where: { ra },
      });
      return existingStudent;
    } catch (err: unknown) {
      const error = err as ErrorCatch;

      return {
        status: error.status ?? httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message ?? "An unexpected error occurred.",
      };
    }
  }
}

export default new StudentRepository();
