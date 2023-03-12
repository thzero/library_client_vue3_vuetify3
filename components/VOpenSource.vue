<template>
	<v-card>
		<v-card-text
			class="pt-2"
		>
			<v-row
			>
				<v-col
					cols="12"
					lg="6"
					mb-1
					:pr-2="$vuetify.display.lgAndUp"
				>
					<v-table
						fixed-header
						style="width: 100%;"
					>
						<thead>
							<tr>
								<th class="text-center" colspan="2">
									{{ $t('openSource.client') }}
								</th>
							</tr>
							<tr>
								<th class="text-left">
									{{ $t('openSource.resource') }}
								</th>
								<th class="text-left">
									{{ $t('openSource.license') }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(item2, jndex) in dependenciesClient"
								:key="key(jndex, 'b')"
							>
								<td class="text-left">
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
								</td>
								<td class="text-left">
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
								</td>
							</tr>
						</tbody>
					</v-table>
				</v-col>
				<v-col
					cols="12"
					lg="6"
					mb-1
					:pl-2="$vuetify.display.lgAndUp"
				>
					<v-table
						fixed-header
						style="width: 100%;"
					>
						<template #default>
							<thead>
								<tr>
									<th class="text-center" colspan="2">
										{{ $t('openSource.server') }}
									</th>
								</tr>
								<tr>
									<th class="text-left">
										{{ $t('openSource.resource') }}
									</th>
									<th class="text-left">
										{{ $t('openSource.license') }}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(item2, jndex) in dependenciesServer"
									:key="key(jndex, 'b')"
								>
									<td class="text-left">
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
									</td>
									<td class="text-left">
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
									</td>
								</tr>
							</tbody>
						</template>
					</v-table>
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