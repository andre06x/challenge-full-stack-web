<template>
  <v-container>
    <h2>Cadastrar Aluno</h2>
    <v-form class="my-5" v-model="formIsValid" @submit.prevent="submitForm">
      <v-text-field
        label="Nome"
        v-model="student.name"
        :rules="nameRules"
        outlined
      ></v-text-field>
      <v-text-field
        label="CPF"
        @input="applyCpfMask"
        :rules="cpfRules"
        v-model="student.cpf"
        maxLength="14"
        minLength="14"
        outlined
      ></v-text-field>

      <v-text-field
        label="Registro Acadêmico"
        v-model="student.ra"
        type="number"
        :rules="raRules"
        outlined
      ></v-text-field>
      <v-text-field
        label="Email"
        :rules="emailRules"
        v-model="student.email"
        outlined
      ></v-text-field>
      <v-btn color="secondary" class="mr-5" @click="cancel">Cancelar</v-btn>
      <v-btn color="primary" type="submit">Salvar</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { studentService } from '@/services/studentService';
import { snackbarStore } from '@/store/snackbarStore';


const student  = ref({
  name: '',
  cpf: '',
  ra: '',
  email: ''
});
const router = useRouter()
const formIsValid = ref(false);

const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório'
];
const cpfRules = [
  (v: string) => !!v || 'CPF é obrigatório',
  (v: string) => v.length === 14 || 'CPF deve conter 14 caracteres',
];
const raRules = [
  (v: string) => !!v || 'RA é obrigatório',
];

const emailRules= [
        (v: string) => {
          if (v && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v)) {
            return 'Por favor, insira um email válido';
          }
          return true }
      ]
function applyCpfMask() {
  let cpf = student.value.cpf.replace(/\D/g, '');

  student.value.cpf = cpf
    .replace(/(\d{3})(\d{3})?(\d{3})?(\d{2})?/, (_, p1, p2, p3, p4) => {
      return `${p1}${p2 ? '.' + p2 : ''}${p3 ? '.' + p3 : ''}${p4 ? '-' + p4 : ''}`;
    })
    .substring(0, 14);
}

function submitForm() {
  if (formIsValid.value) {
    saveStudent();
  }
}

async function saveStudent() {
  try {
    await studentService.createStudent(student.value);
    snackbarStore.showSnackbar('Aluno cadastrado com sucesso!', 'success');

    student.value = {} as any
  } catch(err: any){
    const errorMessage: any = {
      "400": err?.response?.data?.message,
      "500": "Não foi possível realizar essa operação no momento, tente novamente mais tarde."
    }
    const message = errorMessage[err?.response?.status] || errorMessage[500];
    snackbarStore.showSnackbar(message, "error");
  }
}

function cancel(){
  router.push('/');
}
</script>
