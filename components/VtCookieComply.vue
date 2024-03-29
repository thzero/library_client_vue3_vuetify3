<template>
    <vue-cookie-comply
        :preferences="preferences"
    />
</template>

<script>
import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export default {
	name: 'VtCookieComply',
	props: {
		preferences: {
			type: Object,
			default: null
		}
	},
	setup(props, context) {
		const {
            correlationId,
            error,
            hasFailed,
            hasSucceeded,
            initialize,
            logger,
            noBreakingSpaces,
            notImplementedError,
            success,
			successResponse
		} = useBaseComponent(props, context);

		return {
            correlationId,
            error,
            hasFailed,
            hasSucceeded,
            initialize,
            logger,
            noBreakingSpaces,
            notImplementedError,
            success,
			successResponse
		};
	}
};
</script>

<style>
.cookie-comply__button {
  padding: 6px 16px;
  border: 1px solid #333;
  background-color: var(--color-white);
  font-weight: 600;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  color: black;
}
.cookie-comply-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  color: black;
}
.cookie-comply-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.cookie-comply-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.cookie-comply-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: var(--color-white);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:checked + .cookie-comply-slider {
  background-color: var(--color-green);
}
input:focus + .cookie-comply-slider {
  box-shadow: 0 0 1px var(--color-green);
}
input:checked + .cookie-comply-slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translate(26px);
}
.cookie-comply-slider.cookie-comply-round {
  border-radius: 34px;
}
.cookie-comply-slider.cookie-comply-round:before {
  border-radius: 50%;
}
.cookie-comply-required {
  cursor: not-allowed;
}
input:checked + .cookie-comply-required.cookie-comply-slider {
  background-color: #ccc;
}
.cookie-comply__modal {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--background-overlay);
}
.cookie-comply__modal-middle {
  display: table-cell;
  vertical-align: middle;
}
.cookie-comply__modal-inner {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  padding: var(--spacing-lg);
  background-color: var(--color-white);
  border-radius: var(--spacing-sm);
  box-shadow: var(--box-shadow);
}
.cookie-comply__back-arrow {
  position: absolute;
  left: var(--spacing-lg);
  cursor: pointer;
}
.cookie-comply__modal-content {
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 12px;
  overflow-y: scroll;
  max-height: 400px;
  text-align: left;
  color: black;
}
.cookie-comply__modal-content h2 {
  margin-top: 8px;
}
.cookie-comply__modal-switches {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border-color-lightest);
}
@media (max-width: 480px) {
  .cookie-comply__modal-middle {
    padding: var(--spacing-md);
  }
  .cookie-comply__modal-inner {
    width: auto;
  }
}
.cookie-comply__modal-header {
  border-bottom: var(--border-color-light);
}
.cookie-comply__modal-footer {
  border-top: var(--border-color-light);
  padding-top: var(--spacing-lg);
}
:root {
  --spacing-sm: 8px;
  --spacing-md: 14px;
  --spacing-lg: 20px;
  --color-green: #00c58e;
  --color-white: #ffffff;
  --box-shadow: 0 1px 6px 1px rgb(0 0 0 / 10%), 0 1px 7px 1px rgb(0 0 0 / 6%);
  --border-radius: 8px;
  --background-overlay: rgba(34, 34, 34, 0.3);
  --border-color-lightest: 1px solid rgba(200, 200, 200, 0.2);
  --border-color-light: 1px solid rgba(0, 0, 0, 0.1);
}
.cookie-comply {
  display: grid;
  grid-gap: var(--spacing-lg);
  grid-template-columns: 1fr minmax(35%, 40%);
  position: absolute;
  bottom: 40px;
  left: var(--spacing-sm);
  right: var(--spacing-sm);
  background-color: var(--color-white);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}
@media (max-width: 1024px) {
  .cookie-comply {
    grid-template-columns: none;
  }
}
.cookie-comply__header {
  justify-self: flex-start;
  text-align: initial;
}
.cookie-comply__header-title,
.cookie-comply__header-description {
  margin: 0;
  color: black;
}
.cookie-comply__header-title {
  margin-bottom: var(--spacing-sm);
}
.cookie-comply__header-description {
  line-height: 20px;
}
.cookie-comply__actions {
  display: grid;
  grid-gap: var(--spacing-lg);
  grid-template-columns: repeat(2, 1fr);
  align-self: center;
}
@media (max-width: 480px) {
  .cookie-comply__header {
    margin-bottom: var(--spacing-sm);
  }
  .cookie-comply__actions {
    grid-template-columns: auto;
  }
}
.cookie-comply__button-accept {
  background-color: var(--color-green);
  color: var(--color-white);
  border: none;
}
</style>
