<template>
	<v-app id="root">
		<v-app-bar
			app
			dense
			dark
		>
			<v-toolbar-title class="headline text-uppercase">
				<router-link
					to="/"
					class="toolbar-title"
				>
					{{ $t('titles.application') }}
				</router-link>
			</v-toolbar-title>
			<v-spacer />
			<v-menu
				bottom
				left
				:close-on-content-click="closeOnContentClick"
			>
				<template v-slot:activator="{ props }">
					<v-btn
						v-bind="props"
						icon="mdi-dots-vertical"
					></v-btn>
				</template>
				<v-list density="compact">
					<!-- <v-list-item
						v-if="isLoggedIn"
						to="/profile"
					>
						<template v-slot:prepend>
							<v-icon color="green darken-2">
								mdi-account
							</v-icon>
						</template>
						<v-list-item-title>{{ $t('titles.profile') }}</v-list-item-title>
					</v-list-item> -->
					<v-list-item
						v-if="isLoggedIn"
						to="/settings"
					>
						<template v-slot:prepend>
							<v-icon>mdi-cog</v-icon>
						</template>
						<v-list-item-title>{{ $t('titles.settings') }}</v-list-item-title>
					</v-list-item>
					<!-- <v-list-item @click="clickAbout">
						<template v-slot:prepend>
							mdi-info
						</template>
						<v-list-item-title>About</v-list-item-title>
					</v-list-item> -->
					<v-list-item
						v-if="!isLoggedIn"
						@click="clickSignIn"
					>
						<template v-slot:prepend>
							<v-icon color="green darken-2">
								mdi-account
							</v-icon>
						</template>
						<v-list-item-title>{{ $t('titles.signIn') }}</v-list-item-title>
					</v-list-item>
					<v-list-item
						v-if="isLoggedIn"
						@click="dialogSignOut.open()"
					>
						<template v-slot:prepend>
							<v-icon color="red darken-2">
								mdi-account
							</v-icon>
						</template>
						<v-list-item-title>{{ $t('titles.signOut') }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>

		<v-main>
			<v-container
				fluid
				pt-2
			>
				<router-view />
			</v-container>
		</v-main>

		<VtConfirmationDialog
			:signal="dialogSignOut.signal"
			@cancel="dialogSignOut.cancel()"
			@ok="dialogSignOutOk"
		/>

		<v-footer
			app
		>
			<VtLayoutFooter />
		</v-footer>

		<VtLoadingOverlay
			:signal="isAuthCompleted"
		/>
	</v-app>
</template>

<script>
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtLayoutFooter from '@thzero/library_client_vue3_vuetify3/components/VtLayoutFooter';
import VtLoadingOverlay from '@thzero/library_client_vue3_vuetify3/components/VtLoadingOverlay';

import { useBaseAdminLayout } from '@thzero/library_client_vue3/layouts/baseAdminLayout';

export default {
	name: 'AdminLayout',
	components: {
		VtConfirmationDialog,
		VtLayoutFooter,
		VtLoadingOverlay
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
			features,
			closeOnContentClick,
			dialogSignOut,
			isAuthCompleted,
			isLoggedIn,
			clickAbout,
			clickSignIn,
			dialogSignOutOk
		} = useBaseAdminLayout(props, context);

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
			features,
			closeOnContentClick,
			dialogSignOut,
			isAuthCompleted,
			isLoggedIn,
			clickAbout,
			clickSignIn,
			dialogSignOutOk
		}
	}
};
</script>

<style scoped>
.toolbar-title {
	color: white;
	text-decoration: none;
}
</style>
