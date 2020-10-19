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

.icon-copy::before {
  width: 0.7em;
  height: 0.8em;
  border: 2px solid;
  border-bottom-color: transparent;
  border-right-color: transparent;
  border-radius: 0.1em;
  left: 40%;
  top: 40%;
}
.icon-copy::after {
  width: 0.7em;
  height: 0.8em;
  border: 2px solid;
  border-radius: 0.1em;
  left: 60%;
  top: 60%;
}

.icon-share {
  border: solid transparent;
  border-width: 2px 2px 0 0;
  box-shadow: inset 0 -2px, inset 2px 0;
}
.icon-share::before {
  width: 0.4em;
  height: 0.4em;
  border-style: solid;
  border-width: 0 2px 2px 0;
  left: 100%;
  top: 0.2em;
  -ms-transform: translate(-125%, -50%) rotate(-45deg);
  transform: translate(-125%, -50%) rotate(-45deg);
}
.icon-share::after {
  width: 0.6em;
  height: 0.6em;
  border-style: solid;
  border-width: 2px 0 0 2px;
  border-radius: 75% 15%;
}

.icon-download {
  border: solid transparent;
  border-width: 0 1px;
  box-shadow: inset 0 -2px;
}
.icon-download::before {
  width: 0.5em;
  height: 0.5em;
  border-style: solid;
  border-width: 2px 0 0 2px;
  -ms-transform: translate(-50%, -0.3em) rotate(-135deg);
  transform: translate(-50%, -0.3em) rotate(-135deg);
}
.icon-download::after {
  height: 0.6em;
  border-left: 2px solid;
  top: 40%;
}

.icon-upload {
  border: solid transparent;
  border-width: 0 1px;
  box-shadow: inset 0 -2px;
}
.icon-upload::before {
  width: 0.5em;
  height: 0.5em;
  border-style: solid;
  border-width: 2px 0 0 2px;
  -ms-transform: translate(-50%, -60%) rotate(45deg);
  transform: translate(-50%, -60%) rotate(45deg);
}
.icon-upload::after {
  height: 0.6em;
  border-left: 2px solid;
}

.icon-bookmark::before {
  width: 0.85em;
  height: 0.9em;
  border: 2px solid;
  border-bottom: 0;
  border-radius: 0.1rem 0.1em 0 0;
}
.icon-bookmark::after {
  width: 0.5em;
  height: 0.5em;
  border-style: solid;
  border-width: 2px 2px 0 0;
  border-radius: 2px;
  -ms-transform: translate(-50%, 0.2em) rotate(-45deg) skew(15deg, 15deg);
  transform: translate(-50%, 0.2em) rotate(-45deg) skew(15deg, 15deg);
}

.icon-forward::before {
  height: 0.65em;
  width: 0.65em;
  border-style: solid;
  border-width: 2px 0 0 2px;
  -ms-transform: translate(-50%, -50%) rotate(135deg);
  transform: translate(-50%, -50%) rotate(135deg);
}
.icon-forward::after {
  width: 0.8em;
  border-top: 2px solid;
  left: 45%;
}

.icon-right::before {
  border: 0.2em solid transparent;
  border-left-color: currentColor;
  -ms-transform: translate(-25%, -50%);
  transform: translate(-25%, -50%);
}

.icon-down::before {
  border: 0.2em solid transparent;
  border-top-color: currentColor;
  -ms-transform: translate(-50%, -25%);
  transform: translate(-50%, -25%);
}

.icon-top::before {
  border: 0.2em solid transparent;
  border-bottom-color: currentColor;
  -ms-transform: translate(-50%, -75%);
  transform: translate(-50%, -75%);
}

.icon-left::before {
  border: 0.2em solid transparent;
  border-right-color: currentColor;
  -ms-transform: translate(-50%, -75%);
  transform: translate(-50%, -75%);
}
</style>