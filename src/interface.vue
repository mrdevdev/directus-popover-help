<template>
	<div class="popover-group">
		<v-form :initial-values="initialValues" :fields="fields" :model-value="values" :primary-key="primaryKey"
			:group="field.meta.field" :validation-errors="validationErrors" :loading="loading" :batch-mode="batchMode"
			@update:model-value="$emit('apply', $event)" />
		<div>
			<Popper class="light" hover closeDelay="300" placement="right">
				<v-button secondary icon rounded class="popover-button">
					<v-icon name="info" />
				</v-button>
				<template #content>
					<div>
						<v-image :src="getImageUrl(groupImage)" />
						<img src="https://blog.hubspot.com/hubfs/github-gradle.jpg">
					</div>
				</template>
			</Popper>
		</div>
	</div>
</template>


<script lang="ts">
import { Field } from '@directus/shared/types';
import { defineComponent, PropType, ref, computed, inject } from 'vue';
import { ValidationError } from '@directus/shared/types';
import { render } from 'micromustache';
import { useI18n } from 'vue-i18n';
import Popper from "vue3-popper";
import axios, { AxiosPromise, Axios } from 'axios';


export default defineComponent({
	name: 'InterfaceGroupDetail',
	components: {
		Popper,
	},
	props: {
		field: {
			type: Object as PropType<Field>,
			required: true,
		},
		fields: {
			type: Array as PropType<Field[]>,
			required: true,
		},
		values: {
			type: Object as PropType<Record<string, unknown>>,
			required: true,
		},
		initialValues: {
			type: Object as PropType<Record<string, unknown>>,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		batchMode: {
			type: Boolean,
			default: false,
		},
		batchActiveFields: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		primaryKey: {
			type: [Number, String],
			required: true,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		validationErrors: {
			type: Array as PropType<ValidationError[]>,
			default: () => [],
		},
		layout: {
			type: String as PropType<'modal' | 'sidebar'>,
			default: 'modal',
		},
		title: {
			type: String,
			default: null,
		},
		image: {
			type: String,
			default: null,
		},
		headerIcon: {
			type: String,
			default: null,
		},
		headerColor: {
			type: String as PropType<'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'>,
			default: 'secondary',
		},
	},
	emits: ['apply'],
	setup(props) {
		const { t } = useI18n();
		const internalActive = ref<boolean>(false);
		const values = inject('values', ref<Record<string, any>>({}));
		const groupTitle = computed<string>(() => {
			if (!props.title) return props.field.name;

			return render(props.title, values.value);
		});

		const groupImage = computed<string>(() => {
			if (!props.image) return props.field.name;

			return render(props.image, values.value);
		});

		const api = inject('api') as Axios;

		return {
			t,
			groupTitle,
			groupImage,
			internalActive,
			getImageUrl
		};

		function getToken(): string | null {
			return api.defaults.headers.common['Authorization']?.split(' ')[1] || null;
		}

		function getImageUrl(imageObject: { url: string } | string) {
			const imgSrc =
				typeof imageObject === 'string'
					? imageObject
					: typeof imageObject === 'object' && imageObject.url
						? imageObject.url
						: null;
			if (!imgSrc) return;
			return `/directus-extension-linkmeta-endpoint/img?url=${encodeURIComponent(imgSrc)}&access_token=${getToken()}`;
		}
	},
});
</script>

<style scoped>
/* .popover-group {
	position: relative;
}

.popover-button {
	position: absolute;
	right: -1rem;
	top: 1rem;
} */

.light {
	--popper-theme-background-color: #ffffff;
	--popper-theme-background-color-hover: #ffffff;
	--popper-theme-text-color: #333333;
	--popper-theme-border-width: 1px;
	--popper-theme-border-style: solid;
	--popper-theme-border-color: #eeeeee;
	--popper-theme-border-radius: 6px;
	--popper-theme-padding: 32px;
	--popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>
