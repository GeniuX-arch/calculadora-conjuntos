<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import operaciones from "./js/controlador.ts";

import data from "./js/data.ts";
const estado = ref(0);
const operacion = ref(0);
const form = reactive({
  conjunto1: "",
  conjunto2: "",
});
const response = ref("");
const soloLetrasSeparadasComa = helpers.withMessage(
  "Solo se permiten letras individuales separadas por comas (ej: a,b,c)",
  helpers.regex(/^[a-zA-Z](?:,[a-zA-Z])*$/)
);
const soloNumerosLetras = helpers.withMessage(
  "Solo se permiten letras y números, sin comas",
  helpers.regex(/^[a-zA-Z0-9]+$/)
);

const soloNumerosLetrasComa = helpers.withMessage(
  "Solo se permiten letras, números, comas y no se puede finalizar con coma",
  helpers.regex(/^(?:[a-zA-Z0-9]+(?:,[a-zA-Z0-9]+)*)?$/)
);
const rules = computed(() => {
  switch (estado.value) {
    case 0:
      return { conjunto1: { soloLetrasSeparadasComa }, conjunto2: { soloLetrasSeparadasComa } };
    case 1:
      return { conjunto1: { soloNumerosLetras }, conjunto2: { soloNumerosLetras } };
    case 2:
    default:
      return { conjunto1: { soloNumerosLetrasComa }, conjunto2: { soloNumerosLetrasComa } };
  }
});

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
      estado.value,
      operacion.value,
      form.conjunto1,
      form.conjunto2
    );
  } else {
    response.value = "";
  }
});
</script>

<template>
  <div id="app" class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="bg-white rounded-xl shadow-lg p-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          Calculadora de Conjuntos
        </h1>
        <p class="text-gray-600">
          Selecciona el tipo de datos y la operación que deseas realizar
        </p>
      </div>

      <!-- Data Type Selection -->
      <section class="flex flex-row gap-20">
        <div class="mb-8 w-1/4">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">
            Tipo de Datos
          </h2>
          <div class="flex flex-col flex-wrap w-full gap-3">
            <div
              v-for="(data, index) in data"
              :key="data.nombre"
              class="relative group transition-all duration-200 transform hover:scale-105"
              @click="handleState(index)"
            >
              <div
                class="p-4 rounded-lg border-2 cursor-pointer select-none text-center font-medium"
                :class="
                  index === estado
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                "
              >
                {{ data.nombre }}
              </div>
              <div
                v-if="index === estado"
                class="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Operations Selection -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">
            Operaciones Disponibles
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div
              v-for="(opera, index) in data[estado].operaciones"
              :key="index"
              class="relative group transition-all duration-200 transform hover:scale-105"
              @click="handleOperacion(index)"
            >
              <div
                class="p-4 rounded-lg border-2 cursor-pointer select-none text-center font-medium"
                :class="
                  index === operacion
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                "
              >
                {{ opera.label }}
              </div>
              <div
                v-if="index === operacion"
                class="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Input Fields -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">
          Datos de Entrada
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Primer conjunto -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Primer Conjunto</label
            >
            <div class="relative">
              <input
                v-model="form.conjunto1"
                type="text"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                :class="
                  v$.conjunto1.$dirty && v$.conjunto1.$error
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300'
                "
                placeholder="Ingresa el primer conjunto"
                @blur="v$.conjunto1.$touch()"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  v-if="v$.conjunto1.$dirty && !v$.conjunto1.$error"
                  class="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div
              v-if="v$.conjunto1.$dirty && v$.conjunto1.$error"
              class="space-y-1"
            >
              <p
                v-if="!v$.conjunto1.minLength"
                class="text-red-600 text-sm flex items-center"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span v-if="v$.conjunto1.$error">
                  {{ v$.conjunto1.$errors[0].$message }}
                </span>
              </p>
            </div>
          </div>

          <!-- Segundo conjunto -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Segundo Conjunto</label
            >
            <div class="relative">
              <input
                v-model="form.conjunto2"
                type="text"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                :class="
                  v$.conjunto2.$dirty && v$.conjunto2.$error
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300'
                "
                placeholder="Ingresa el segundo conjunto"
                @blur="v$.conjunto2.$touch()"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  v-if="v$.conjunto2.$dirty && !v$.conjunto2.$error"
                  class="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div
              v-if="v$.conjunto2.$dirty && v$.conjunto2.$error"
              class="space-y-1"
            >
              <p
                v-if="!v$.conjunto2.minLength"
                class="text-red-600 text-sm flex items-center"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>

                      <span v-if="v$.conjunto2.$error">
                  {{ v$.conjunto2.$errors[0].$message }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div
        v-if="response"
        class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200"
      >
        <h2 class="text-xl font-semibold text-gray-700 mb-3 flex items-center">
          <svg
            class="w-6 h-6 mr-2 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13V12a1 1 0 011-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Resultado
        </h2>
        <div
          class="bg-white rounded-lg p-4 border border-blue-100 font-mono text-lg text-gray-800"
        >
          {{ response }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
