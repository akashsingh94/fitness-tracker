<template>
  <div class="ft-input-group">
    <label class="ft-form-control-label">{{ label }}</label>
    <input
      :type="type"
      class="ft-form-control ft-text-field"
      :placeholder="label"
      :aria-label="label"
      :value="value"
      @input="$emit('onChange', $event.target.value)"
      :required="required"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.ft-text-field {
  display: block;
  max-width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.23);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: "Poppins", sans-serif;
}

.ft-text-field:focus {
  border-color: #4db6ac;
  outline-color: initial;
  box-shadow: #b2dfdb 0px 0px 0px 0.25rem;
}
.ft-text-field:focus-visible {
  outline: none;
}
::placeholder {
  color: #bdbdbd;
}
</style>
