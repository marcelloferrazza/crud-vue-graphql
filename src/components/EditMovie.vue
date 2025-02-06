<!-- EditMovie.vue -->
<template>
  <MovieDialog
    :dialog="dialog"
    @update:dialog="$emit('update:dialog', $event)"
    :gender="gender"
    :genders="genders"
    :pageTitle="pageTitle"
    formTitle="Editar filme"
    :movie="movieToEdit"
    @save="onSave"
    @close="onClose"
  />
</template>

<script>
import MovieDialog from "@/components/MovieDialog.vue";

export default {
  name: "EditMovie",
  components: { MovieDialog },

  emits: ["update:dialog", "save", "close"],

  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      default: "all",
    },
    genders: {
      type: Array,
      default: () => [],
    },
    pageTitle: {
      type: String,
      default: "",
    },

    movieToEdit: {
      type: Object,
      default: () => ({
        name: "",
        type: "",
        id: 0,
      }),
    },
  },

  methods: {
    onSave(updatedMovie) {
      this.$emit("save", updatedMovie);
    },
    onClose() {
      this.$emit("close");
    },
  },
};
</script>
