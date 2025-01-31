<template>
  <v-dialog
    v-model="internalDialog"
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }} - {{ translateGender }}</span>
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
                v-model="localMovie.type.nameTranslate"
                :items="genders"
                :label="selectLabel"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { translateType } from "@/utils/translate";
export default {
  name: 'MovieDialogForm',
  emits: ['update:dialog', 'save', 'close'],
  props: {

    dialog: {
      type: Boolean,
      default: false,
    },

    pageTitle: {
      type: String,
      default: '',
    },

    formTitle: {
      type: String,
      default: 'Novo filme',
    },

   
    gender: {
      type: String,
      default: 'all',
    },

    genders: {
      type: Array,
      default: () => [
        'Ação',
        'Aventura',
        'Comédia',
        'Drama',
        'Terror',
        'Ficção Científica',
        'Romance',
        'Thriller',
        'Fantasia',
        'Documentário'
      ]
    },

   
    movie: {
      type: Object,
      default: () => ({
        name: '',
        type: '',
        id: 0,
      })
    },

    fieldNameLabel: {
      type: String,
      default: 'Nome do filme',
    },
    selectLabel: {
      type: String,
      default: 'Selecione o gênero',
    },
  },

  data() {
    return {

      localMovie: { ...this.movie },
      internalDialog: this.dialog,
      translateGender: ''
    }
  },

  watch: {

    dialog(val) {
      this.internalDialog = val;
    },
    internalDialog(val) {
      this.$emit('update:dialog', val);
    },
    movie: {
      handler(newVal) {
        this.localMovie = { ...newVal };
      },
      deep: true,
    },
  },

  mounted(){
        this.translate();
    },

  methods: {
    close() {
      this.internalDialog = false; 
      this.$emit('close');
    },
    save() {
      this.$emit('save', this.localMovie);
      this.internalDialog = false;
    },
    translate(){ 
         
         this.translateGender = translateType(this.gender);
       }
  },
}
</script>
