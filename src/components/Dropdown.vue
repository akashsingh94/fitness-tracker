<template>
  <div class="ft-dropdown-wrapper ft-input-group">
    <label v-if="label" class="ft-form-control-label" for="standard-select">{{
      label
    }}</label>
    <div class="ft-dropdown">
      <select
        required
        id="standard-select"
        @change="$emit('onChange', $event.target.value)"
      >
        <option v-if="placeholder" value="" selected disabled hidden>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="option.value === value"
        >
          {{ option.name }}
        </option>
      </select>
      <span class="ft-dropdown__focus"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
    },
    options: {
      type: Array,
    },
  },
};
</script>

<style>
select:invalid {
  color: #bdbdbd;
}
option {
  color: #212529;
}

select {
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  z-index: 1;
  outline: none;
  border-color: #ced4da;
  padding: 0.375rem 0.75rem;
  width: calc(100% - 15px);
  text-overflow: ellipsis;
  white-space: nowrap;
}

select::-ms-expand {
  display: none;
}

.ft-dropdown {
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 0.25rem;
  cursor: pointer;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  max-width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
}

.ft-dropdown select,
.ft-dropdown::after {
  grid-area: select;
}

.ft-dropdown::after {
  content: "";
  justify-self: end;
  width: 0.7em;
  height: 0.4em;
  background-color: rgba(0, 0, 0, 0.54);
  clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  margin-right: 0.75rem;
}

select:focus + .ft-dropdown__focus {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 2px solid;
  border-color: #4db6ac;
  outline-color: initial;
  box-shadow: #b2dfdb 0px 0px 0px 0.25rem;
  border-radius: inherit;
}
</style>
