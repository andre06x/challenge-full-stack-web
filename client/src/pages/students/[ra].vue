<template>
  <v-container>
    <h2>Editar Aluno</h2>
    <v-form class="my-5">
      <v-text-field label="Nome" v-model="student.name" outlined></v-text-field>
      <v-text-field
        label="CPF"
        disabled
        v-model="student.cpf"
        outlined
      ></v-text-field>
      <v-text-field
        label="Registro Acadêmico"
        disabled
        v-model="student.ra"
        outlined
      ></v-text-field>
      <v-text-field
        label="Email"
        v-model="student.email"
        outlined
      ></v-text-field>
      <v-btn color="secondary" class="mr-5" @click="cancel">Cancelar</v-btn>
      <v-btn color="primary" @click="saveStudent">Salvar</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { studentService } from '@/services/studentService';
import { snackbarStore } from '@/store/snackbarStore';

const route = useRoute();
const router = useRouter();

const student = ref({
  name: '',
  ra: '',
  email: '',
  cpf: ''
});

onMounted(() => {
  getStudent();
});

async function getStudent() {
  try {
    const ra = route.params.ra as string;
    const { data } = await studentService.getStudent(ra);
    console.log(data)
    student.value = data;
  } catch (err: any) {
    const errorMessage: { [key: string]: string } = {
      "400": err?.response?.data?.message,
      "500": "Não foi possível realizar essa operação no momento, tente novamente mais tarde."
    };
    const message = errorMessage[err?.response?.status?.toString()] || errorMessage["500"];
    snackbarStore.showSnackbar(message, "error");
  }
}

async function saveStudent() {
  if (student.value) {
    try {
      const { data } = await studentService.editStudent(student.value.ra, student.value);
      snackbarStore.showSnackbar('Aluno editado com sucesso!', 'success');
      console.log(data);
    } catch (err: any) {
      const errorMessage: { [key: string]: string } = {
        "400": err?.response?.data?.message,
        "500": "Não foi possível realizar essa operação no momento, tente novamente mais tarde."
      };
      const message = errorMessage[err?.response?.status?.toString()] || errorMessage["500"];
      snackbarStore.showSnackbar(message, "error");
    }
  }
}

function cancel() {
  router.push(`/`);
}
</script>
