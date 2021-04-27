<template>
	<ul class="menu p-3 text-sm shadow-lg bg-base-100 bg-neutral rounded-box space-y-5">
		<li>
			<router-link :to="{ name: 'update-user' }">
				<i class="eva eva-person-outline eva-lg"></i>
				General
			</router-link>
		</li>
		<li>
			<router-link :to="{ name: 'change-password' }">
				<i class="eva eva-lock-outline eva-lg"></i>
				Change Password
			</router-link>
		</li>
		<li>
			<router-link to="/">
				<i class="eva eva-info-outline eva-lg"></i>
				Information
			</router-link>
		</li>
		<li>
			<router-link to="/">
				<i class="eva eva-bell-outline eva-lg"></i>
				Notifactions
			</router-link>
		</li>
	</ul>
</template>

<style scoped>
ul li a i {
	display: inline-block;
	margin-right: 10px;
}
.router-link-active {
	--tw-bg-opacity: 1;
	background-color: hsla(var(--p, 259 94% 51%) / var(--tw-bg-opacity));
	--tw-text-opacity: 1;
	color: hsla(var(--pc, 0 0% 100%) / var(--tw-text-opacity));
}
</style>
