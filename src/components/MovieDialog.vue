<template>
  <v-dialog v-model="internalDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}: {{ translateGender }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" sm="10">
              <v-text-field
                v-model="localMovie.name"
                :label="fieldNameLabel"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="10">
              <v-select
                v-if="gender === 'all'"
                v-model="localMovie.type"
                :items="genders"
                item-value="id"
                item-title="nameTranslate"
                :label="selectLabel"
                emit-value
                map-options
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="close">
          Cancelar
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="save"
          :disabled="!localMovie.name"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useGenderStore } from "@/store/genderStore";
import { translateType } from "@/utils/translate";
export default {
  name: "MovieDialogForm",
  emits: ["update:dialog", "save", "close"],
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },

    pageTitle: {
      type: String,
      default: "",
    },

    formTitle: {
      type: String,
      default: "Novo filme",
    },

    gender: {
      type: String,
      default: "all",
    },

    genders: {
      type: Array,
      default: () => [],
    },

    movie: {
      type: Object,
      default: () => ({
        name: "",
        type: "",
        id: 0,
      }),
    },

    fieldNameLabel: {
      type: String,
      default: "Nome do filme",
    },
    selectLabel: {
      type: String,
      default: "Selecione o gênero",
    },
  },

  data() {
    return {
      localMovie: { ...this.movie },
      internalDialog: this.dialog,
      translateGender: "",
    };
  },

  watch: {
    dialog(val) {
      this.internalDialog = val;
    },
    internalDialog(val) {
      this.$emit("update:dialog", val);
    },
    movie: {
      handler(newVal) {
        this.localMovie = { ...newVal };
      },
      deep: true,
    },
  },

  created() {
    this.translate();
  },

  methods: {
    close() {
      this.internalDialog = false;
      this.$emit("close");
    },
    save() {
      this.$emit("save", this.localMovie);
      this.internalDialog = false;
    },

    translate() {
      this.translateGender = translateType(this.gender);
    },
  },
};
</script>
