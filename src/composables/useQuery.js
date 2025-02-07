// src/composables/useQuery.js
import { ref, onMounted } from "vue";
import { useApolloClient } from "@vue/apollo-composable";

export function useQuery(query, variables = {}) {
  const { client } = useApolloClient();
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function fetchQuery() {
    loading.value = true;
    error.value = null;
    try {
      const response = await client.query({
        query,
        variables,
        fetchPolicy: "network-only"
      });
      data.value = response.data;
    } catch (err) {
      error.value = err;
      console.error("Erro na query:", err);
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    fetchQuery();
  });

  return { data, loading, error, refetch: fetchQuery };
}
