<template>
  <i :class="icon"></i>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
i {
  display: inline-block;
  height: 1em;
  width: 1em;
  font-size: 20px;
  box-sizing: border-box;
  text-indent: -9999px;
  vertical-align: middle;
  position: relative;
  &::before,
  &::after {
    content: '';
    box-sizing: inherit;
    position: absolute;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}

.icon-close::before {
  width: 90%;
  border-top: 2px solid;
  -ms-transform: translate(-50%, -50%) rotate(45deg);
  transform: translate(-50%, -50%) rotate(45deg);
}
.icon-close::after {
  height: 90%;
  border-left: 2px solid;
  -ms-transform: translate(-50%, -50%) rotate(45deg);
  transform: translate(-50%, -50%) rotate(45deg);
}

.icon-refresh::before {
  width: 0.9em;
  height: 0.9em;
  border: 2px solid;
  border-right-color: transparent;
  border-radius: 50%;
}
.icon-refresh::after {
  border: 0.2em solid;
  border-left-color: transparent;
  border-top-color: transparent;
  left: 75%;
  top: 20%;
}
</style>