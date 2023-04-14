<template>
	<v-app id="root">
		<v-app-bar
			app
			dense
			dark
		>
			<v-btn
				text
				class="hidden-md-and-up"
				@click.stop="toggleDrawer"
			>
				<v-icon>menu</v-icon>
			</v-btn>
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
				<template #activator="{ on }">
					<v-btn
						icon
						v-on="on"
					>
						<v-icon>more_vert</v-icon>
					</v-btn>
				</template>
				<v-list>
					<!-- <v-list-item
						v-if="isLoggedIn"
						to="/profile"
					>
						<v-list-item-action>
							<v-icon>account_circle</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.profile') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item> -->
					<v-list-item
						v-if="isLoggedIn"
						to="/settings"
					>
						<v-list-item-action>
							<v-icon>settings</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.settings') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<!-- <v-list-item @click="clickAbout">
						<v-list-item-action>
							<v-icon>info</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>About</v-list-item-title>
						</v-list-item-content>
					</v-list-item> -->
					<v-list-item
						v-if="!isLoggedIn"
						@click="clickSignIn"
					>
						<v-list-item-action>
							<v-icon color="green darken-2">
								power_settings_new
							</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.signIn') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item
						v-if="isLoggedIn"
						@click="dialogSignOut.open()"
					>
						<v-list-item-action>
							<v-icon color="red darken-2">
								power_settings_new
							</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.signOut') }}</v-list-item-title>
						</v-list-item-content>
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

		<VConfirmationDialog
			:non-recoverable="true"
			:signal="dialogSignOut.signal"
			@cancel="dialogSignOut.cancel()"
			@ok="dialogSignOutOk"
		/>

		<v-footer
			app
		>
			<VLayoutFooter />
		</v-footer>

		<VLoadingOverlay
			:signal="isAuthCompleted"
		/>
	</v-app>
</template>

<script>
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VLayoutFooter from '@thzero/library_client_vue3_vuetify3/components/VLayoutFooter';
import VLoadingOverlay from '@thzero/library_client_vue3_vuetify3/components/VLoadingOverlay';

import { useBaseAdminLayout } from '@thzero/library_client_vue3/layouts/baseAdminLayout';

export default {
	name: 'AdminLayout',
	components: {
		VConfirmationDialog,
		VLayoutFooter,
		VLoadingOverlay
	},
	components: {
		VLayoutFooter,
		// VVersion
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
