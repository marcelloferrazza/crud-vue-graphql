import { ref } from "vue";
export const useDialog = () => {
  const dialog = ref({});

  const toggleDialog = (id) => {
    dialog.value[id] = !dialog.value[id];
  };

  return { dialog, toggleDialog };
};