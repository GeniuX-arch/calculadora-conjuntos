<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import operaciones from "./js/controlador.ts";

import data from "./js/data.ts";
const estado = ref(0);
const operacion = ref(0);
const form = reactive({
  conjunto1: "",
  conjunto2: "",
});
const response = ref("");
const rules = {
  conjunto1: { required },
  conjunto2: { required },
};

const v$ = useVuelidate(rules, form);
const formatear = () => {
  form.conjunto1 = "";
  form.conjunto2 = "";
};

const handleState = (index: number) => {
  estado.value = index;
  operacion.value = 0;
  formatear();
};

const handleOperacion = (index: number) => {
  operacion.value = index;
  formatear();
};

watch([() => form.conjunto1, () => form.conjunto2], () => {
  if (!v$.value.$invalid) {
    response.value = operaciones(
      data,
      operacion.value,
      estado.value,
      form.conjunto1,
      form.conjunto2
    );
  } else {
    response.value = "";
  }
});
</script>

<template>
  <div
    v-for="(data, index) in data"
    :key="data.nombre"
    class="m-1 p-1 cursor-pointer select-none"
    :class="index === estado ? 'bg-black' : 'bg-gray'"
    @click="handleState(index)"
  >
    {{ data.nombre }}
  </div>

  <div
    v-for="(opera, index) in data[estado].operaciones"
    :key="index"
    class="m-1 p-1 cursor-pointer select-none"
    :class="index === operacion ? 'bg-black' : 'bg-gray'"
    @click="handleOperacion(index)"
  >
    {{ opera }}
  </div>
  <div>
    <input
      v-model="form.conjunto1"
      type="text"
      class="border border-gray-300 rounded p-2 w-full"
      placeholder="Enter first text"
      @blur="v$.conjunto1.$touch()"
    />
    <span
      v-if="v$.conjunto1.$dirty && v$.conjunto1.$error"
      class="text-red-500 text-sm"
    >
      <span v-if="!v$.conjunto1.required">El campo 1 es obligatorio</span>
      <span v-if="!v$.conjunto1.minLength"
        >Debe tener al menos 3 caracteres</span
      >
    </span>

    <input
      v-model="form.conjunto2"
      type="text"
      class="border border-gray-300 rounded p-2 w-full mt-2"
      placeholder="Enter second text"
      @blur="v$.conjunto2.$touch()"
    />
    <span
      v-if="v$.conjunto2.$dirty && v$.conjunto2.$error"
      class="text-red-500 text-sm"
    >
      <span v-if="!v$.conjunto2.required">El campo 2 es obligatorio</span>
      <span v-if="!v$.conjunto2.minLength"
        >Debe tener al menos 3 caracteres</span
      >
    </span>
  </div>
  {{ response }}
</template>

<style scoped></style>
