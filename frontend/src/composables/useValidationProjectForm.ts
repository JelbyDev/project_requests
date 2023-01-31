import { ref } from 'vue';

export default function () {
  const isFormValid = ref<boolean>(false);
  const validationRules = {
    name: [(v: string): boolean | string => !!v || 'Название не заполнено'],
  };

  return {
    isFormValid,
    validationRules,
  };
}
