import { reactive } from "vue";

export const snackbarStore = reactive({
  isVisible: false,
  message: "",
  color: "",

  showSnackbar(message: string, color: string = "success") {
    this.message = message;
    this.color = color;
    this.isVisible = true;
  },

  closeSnackbar() {
    this.isVisible = false;
  },
});
