<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          label="Digite sua busca"
          @keydown.enter="searchStudents"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="searchStudents">Pesquisar</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="secondary" :to="'/students/create'"
          >Cadastrar Aluno</v-btn
        >
      </v-col>
    </v-row>

    <v-data-table
      :items="filteredStudents"
      item-key="ra"
      class="elevation-1"
      :headers="tableHeaders"
    >
      <template v-slot:item="{ item }">
        <tr @click="redirectToEdit(item)">
          <td>{{ item.ra }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.cpf }}</td>
          <td>{{ item.email }}</td>
          <td>
            <v-icon
              class="me-2"
              size="small"
              @click.stop="redirectToEdit(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon size="small" @click.stop="openDeleteDialog(item)">
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="isDialogOpen" max-width="500">
      <v-card>
        <v-card-title class="text-h6"> Confirmar Exclusão </v-card-title>
        <v-card-text>
          Deseja realmente excluir o aluno
          <strong>{{ selectedStudent?.name }}</strong
          >?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="closeDeleteDialog">Cancelar</v-btn>
          <v-btn color="error" @click="confirmDelete">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { studentService } from '@/services/studentService';
import { snackbarStore } from '@/store/snackbarStore';

interface Student {
  ra: string;
  name: string;
  cpf: string;
  id: number;
  email: string;
}

const router = useRouter();

const search = ref('');
const students = ref<Student[]>([]);
const filteredStudents = ref<Student[]>([]);

const tableHeaders = [
  { title: 'Registro Acadêmico', value: 'ra' },
  { title: 'Nome', value: 'name' },
  { title: 'CPF', value: 'cpf' },
  { title: 'Email', value: 'email' },
  { title: 'Ações', value: 'actions', sortable: false },
];

const isDialogOpen = ref(false);
const selectedStudent = ref<Student | null>(null);

async function loadStudents() {
  try {
    const { data } = await studentService.getStudents();
    const dataWithoutId = data.map(({ id, ...rest }: Student) => rest);
    students.value = dataWithoutId;
    filteredStudents.value = dataWithoutId;
  } catch (err: any) {
    const errorMessage: { [key: string]: string } = {
      "400": err?.response?.data?.message,
      "500": "Não foi possível realizar essa operação no momento, tente novamente mais tarde."
    };
    const message = errorMessage[err?.response?.status?.toString()] || errorMessage["500"];
    snackbarStore.showSnackbar(message, "error");
  }
}

function redirectToEdit(student: Student) {
  router.push(`/students/${student.ra}`);
}

function openDeleteDialog(student: Student) {
  selectedStudent.value = student;
  isDialogOpen.value = true;
}

function closeDeleteDialog() {
  selectedStudent.value = null;
  isDialogOpen.value = false;
}

async function confirmDelete() {
  if (selectedStudent.value) {
    const student = selectedStudent.value as Student;
    try {
      await studentService.removeStudent(student.ra);
      filteredStudents.value = filteredStudents.value.filter((s) => s.ra !== student.ra);
      closeDeleteDialog();
      snackbarStore.showSnackbar('Aluno excluído com sucesso!', 'success');
    }catch(err){
      const errorMessage: { [key: string]: string } = {
      "400": err?.response?.data?.message,
      "500": "Não foi possível realizar essa operação no momento, tente novamente mais tarde."
    };
      const message = errorMessage[err?.response?.status?.toString()] || errorMessage["500"];
      snackbarStore.showSnackbar(message, "error");
    }

  }
}
function searchStudents() {
  const lowerSearch = search.value.toLowerCase().trim();
  filteredStudents.value = students.value.filter((student: Student) =>
    student.ra.toLowerCase().includes(lowerSearch) ||
    student.name.toLowerCase().includes(lowerSearch) ||
    student.cpf.toLowerCase().includes(lowerSearch)
  );
}

onMounted(() => {
  loadStudents();
});
</script>
