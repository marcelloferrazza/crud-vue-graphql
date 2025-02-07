import { ref } from "vue";
import { useApolloClient } from "@vue/apollo-composable";

export function useMutation(mutation) {
  // Desestruturamos para pegar o client real do Apollo
  const { client } = useApolloClient();
  const loading = ref(false);
  const error = ref(null);

  async function mutate(variables) {
    loading.value = true;
    error.value = null;
    try {
      const response = await client.mutate({
        mutation,
        variables,
      });
      return response.data;
    } catch (err) {
      error.value = err;
      console.error("Erro na mutation:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return { mutate, loading, error };
}
