<template>
	<v-card>
		<v-card-text
			class="pt-2"
		>
			<v-row dense>
				<v-col
					cols="0"
					md="2"
				>
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="text-center"
				>
					<v-row dense>
						<v-col
							cols="12"
							class="text-center"
						>
							{{ $t('openSource.client') }}
						</v-col>
					</v-row>
					<v-row dense>
						<v-col
							cols="9"
							class="text-left"
						>
							{{ $t('openSource.resource') }}
						</v-col>
						<v-col
							cols="3"
							class="text-left"
						>
							{{ $t('openSource.license') }}
						</v-col>
					</v-row>
					<v-row
						v-for="(item2, jndex) in dependenciesClient"
						:key="key(jndex, 'b')"
						dense
					>
						<v-col
							cols="9"
							class="text-left"
						>
							<a
								v-if="item2.url"
								class="opensource-padding"
								:href="item2.url"
							>
								{{ item2.name }}
							</a>
							<span
								v-if="!item2.url"
								class="opensource-padding"
							>
								{{ item2.name }}
							</span>
						</v-col>
						<v-col
							cols="3"
							class="text-left"
						>
							<a
								v-if="item2.licenseUrl"
								class="opensource-padding"
								:href="item2.licenseUrl"
							>
								{{ item2.licenseName }}
							</a>
							<span
								v-if="!item2.licenseUrl"
								class="opensource-padding"
							>
								{{ item2.licenseName }}
							</span>
						</v-col>
					</v-row>
					<v-row dense>
						<v-col
							cols="12"
							class="text-center"
						>
							{{ $t('openSource.server') }}
						</v-col>
					</v-row>
					<v-row dense>
						<v-col
							cols="9"
							class="text-left"
						>
							{{ $t('openSource.resource') }}
						</v-col>
						<v-col
							cols="3"
							class="text-left"
						>
							{{ $t('openSource.license') }}
						</v-col>
					</v-row>
					<v-row
						v-for="(item2, jndex) in dependenciesServer"
						:key="key(jndex, 'b')"
						dense
					>
						<v-col
							cols="9"
							class="text-left"
						>
							<a
								v-if="item2.url"
								class="opensource-padding"
								:href="item2.url"
							>
								{{ item2.name }}
							</a>
							<span
								v-if="!item2.url"
								class="opensource-padding"
							>
								{{ item2.name }}
							</span>
						</v-col>
						<v-col
							cols="3"
							class="text-left"
						>
							<a
								v-if="item2.licenseUrl"
								class="opensource-padding"
								:href="item2.licenseUrl"
							>
								{{ item2.licenseName }}
							</a>
							<span
								v-if="!item2.licenseUrl"
								class="opensource-padding"
							>
								{{ item2.licenseName }}
							</span>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
import { useFrameworkOpenSourceComponent } from '@thzero/library_client_vue3_vuetify3/components/frameworkOpenSource';

export default {
	name: 'VOpenSource',
	props: {
		modelValue: {
			type: Array,
			default: []
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
			successResponse,
			combineDependencies,
			data,
			dependenciesClient,
			dependenciesServer,
			initializeDependenciesClientBase,
			key,
			serviceStore
		} = useFrameworkOpenSourceComponent(props, context, {
			initializeDependenciesClient: () => {
				return props.modelValue;
			}
		});

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
			successResponse,
			combineDependencies,
			data,
			dependenciesClient,
			dependenciesServer,
			initializeDependenciesClientBase,
			key,
			serviceStore
		};
	}
};
</script>

<style scoped>
	.opensource-padding {
		padding-left: 16px
	}
</style>
