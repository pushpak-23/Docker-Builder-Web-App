<!-- src/components/Stepper.vue -->
<template>
  <div class="stepper-container">
    <div class="flex items-center justify-between relative">
      <!-- Progress line -->
      <div
        class="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"
        aria-hidden="true"
      ></div>
      <div
        class="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-300"
        :style="`width: ${progressPercentage}%`"
        aria-hidden="true"
      ></div>

      <!-- Steps -->
      <button
        v-for="(step, index) in steps"
        :key="index"
        @click="goToStep(index + 1)"
        class="relative z-10 flex flex-col items-center"
        :class="{
          'cursor-pointer':
            index + 1 < currentStep || completedSteps.includes(index + 1),
        }"
      >
        <!-- Step circle -->
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300"
          :class="getStepCircleClasses(index + 1)"
        >
          <span v-if="completedSteps.includes(index + 1)" class="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span v-else class="font-medium">{{ index + 1 }}</span>
        </div>

        <!-- Step label -->
        <span
          class="absolute top-full mt-2 text-sm font-medium text-center"
          :class="getStepLabelClasses(index + 1)"
        >
          {{ step.label }}
        </span>
      </button>
    </div>

    <!-- Step content -->
    <div class="mt-12">
      <transition name="fade" mode="out-in">
        <div :key="currentStep">
          <slot :name="`step-${currentStep}`"></slot>
        </div>
      </transition>
    </div>

    <!-- Navigation buttons -->
    <div class="mt-8 flex justify-between">
      <button
        v-if="currentStep > 1"
        @click="previousStep"
        class="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        Back
      </button>
      <div v-else></div>
      <!-- Empty div for spacing -->

      <button
        v-if="currentStep < steps.length"
        @click="nextStep"
        class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        :disabled="!canProceed"
        :class="{ 'opacity-50 cursor-not-allowed': !canProceed }"
      >
        Next
      </button>
      <button
        v-else
        @click="complete"
        class="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        Generate Files
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  steps: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(
        (step) =>
          typeof step.label === "string" && typeof step.valid === "boolean"
      );
    },
  },
  canProceed: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["step-change", "complete"]);

const currentStep = ref(1);
const completedSteps = ref([]);

const progressPercentage = computed(() => {
  return ((currentStep.value - 1) / (props.steps.length - 1)) * 100;
});

function nextStep() {
  if (currentStep.value < props.steps.length) {
    if (!completedSteps.value.includes(currentStep.value)) {
      completedSteps.value.push(currentStep.value);
    }
    currentStep.value++;
    emit("step-change", currentStep.value);
  }
}

function previousStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
    emit("step-change", currentStep.value);
  }
}

function goToStep(stepNumber) {
  // Only allow jumping to completed steps or the next logical step
  if (
    stepNumber <= currentStep.value ||
    completedSteps.value.includes(stepNumber)
  ) {
    currentStep.value = stepNumber;
    emit("step-change", currentStep.value);
  }
}

function complete() {
  emit("complete");
}

function getStepCircleClasses(stepNumber) {
  if (stepNumber === currentStep.value) {
    return "border-blue-500 bg-blue-500 text-white";
  } else if (completedSteps.value.includes(stepNumber)) {
    return "border-green-500 bg-green-500 text-white";
  } else if (stepNumber < currentStep.value) {
    return "border-blue-500 bg-white text-blue-500";
  } else {
    return "border-gray-300 bg-white text-gray-400";
  }
}

function getStepLabelClasses(stepNumber) {
  if (stepNumber === currentStep.value) {
    return "text-blue-600 font-semibold";
  } else if (completedSteps.value.includes(stepNumber)) {
    return "text-green-600";
  } else if (stepNumber < currentStep.value) {
    return "text-blue-500";
  } else {
    return "text-gray-500";
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.stepper-container {
  @apply max-w-4xl mx-auto px-4 py-8;
}
</style>
