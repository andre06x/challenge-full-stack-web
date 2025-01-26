import { Request } from "express";
import StudentRepository from "@src/repositories/students/StudentsRepository";
import * as httpStatus from "@src/config/constants/httpStatus";
import StudentsException from "@src/config/exceptions/StudentsException";

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

interface StudentParam {
  ra: string;
}

interface StudentDataEdit {
  name: string;
  email: string;
}

class StudentsService {
  async createStudent(req: Request) {
    try {
      const studentData = req.body as StudentDataCreate | null;

      if (!studentData) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: "Dados do estudante inválidos",
        };
      }

      this.validateCreateStudent(studentData);
      await this.studentsExists(studentData);

      const createdStudent = await StudentRepository.create(studentData);

      return {
        status: httpStatus.SUCCESS,
        data: createdStudent,
      };
    } catch (err: unknown) {
      const error = err as ErrorCatch;

      return {
        status: error.status ?? httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message ?? "Erro no servidor",
      };
    }
  }

  async findAllStudents() {
    try {
      const students = await StudentRepository.findAllStudents();

      return {
        status: httpStatus.SUCCESS,
        data: students,
      };
    } catch (err: unknown) {
      const error = err as ErrorCatch;

      return {
        status: error.status ?? httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message ?? "Erro no servidor",
      };
    }
  }

  async editStudent(req: Request<StudentParam, any, StudentDataEdit>) {
    try {
      const studentDataBody = req.body as StudentDataEdit;
      const studentDataRa = req.params.ra;
      this.validateEditStudent(studentDataBody, studentDataRa);
      await this.studentsRaExists(studentDataRa);

      const editedStudent = await StudentRepository.updateStudent(
        studentDataRa,
        studentDataBody
      );

      return {
        status: httpStatus.SUCCESS,
        data: editedStudent,
      };
    } catch (err: unknown) {
      const error = err as ErrorCatch;

      return {
        status: error.status ?? httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message ?? "Erro no servidor",
      };
    }
  }

  async removeStudent(req: Request<StudentParam, any, any>) {
    try {
      const studentDataRa = req.params.ra;

      if (!studentDataRa) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: "Dados do estudante inválidos",
        };
      }

      await this.studentsRaExists(studentDataRa);
      const removeStudent = await StudentRepository.removeStudent(studentDataRa);

      return {
        status: httpStatus.SUCCESS,
        data: removeStudent,
      };
    } catch (err: unknown) {
      const error = err as ErrorCatch;

      return {
        status: error.status ?? httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message ?? "Erro no servidor",
      };
    }
  }

  async getStudent(req: Request<StudentParam, any, any>) {
    try {
      const studentDataRa = req.params.ra;

      if (!studentDataRa) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: "RA inválido.",
        };
      }

      const student = await this.studentsRaExists(studentDataRa);

      return {
        status: httpStatus.SUCCESS,
        data: student,
      };
    } catch (err: unknown) {
      const error = err as ErrorCatch;

      return {
        status: error.status ?? httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message ?? "Erro no servidor",
      };
    }
  }

  validateCreateStudent(dataStudents: StudentDataCreate) {
    if (!dataStudents.ra || !dataStudents.cpf || !dataStudents.name) {
      throw new StudentsException(httpStatus.BAD_REQUEST, "Dados do estudante inválidos");
    }
  }
  validateEditStudent(dataStudents: StudentDataEdit, ra: string) {
    if (!dataStudents.name) {
      throw new StudentsException(
        httpStatus.BAD_REQUEST,
        "É necessário um nome para continuar."
      );
    }

    if (!ra) {
      throw new StudentsException(
        httpStatus.BAD_REQUEST,
        "É necessário o Registro Acadêmico para continuar."
      );
    }
  }

  async studentsExists(studentsExists: StudentDataCreate) {
    const student = await StudentRepository.hasStudentExists(studentsExists);
    if (student) {
      throw new StudentsException(httpStatus.BAD_REQUEST, "Estudante já cadastrado.");
    }
  }

  async studentsRaExists(ra: string) {
    const student = await StudentRepository.hasStudentRaExists(ra);
    if (!student) {
      throw new StudentsException(
        httpStatus.BAD_REQUEST,
        "Registro do aluno não encontrado."
      );
    }

    return student;
  }
}

export default new StudentsService();
