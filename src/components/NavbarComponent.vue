<template>
	<Navbar class="!bg-gray-100 sticky top-0 z-[9999]">
		<template #logo>
			<router-link to="/" class="font-bold text-xl">UBT</router-link>
		</template>
		<template #default="{ isShowMenu }">
			<NavbarCollapse :isShowMenu="isShowMenu">
				<div class="flex-grow"></div>
				<div class="relative">
					<input v-model="searchQuery" type="text" placeholder="Search"
						class="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-primary-500 w-[250px]" />
					<button @click="searchUsers"
						class="bg-primary-500 text-white px-3 py-1 rounded-md hover:bg-primary-600">Search</button>
					<!-- Display search results dropdown -->
					<div v-if="searchResults.length > 0"
						class="absolute top-full left-0 z-10 bg-white border border-gray-300 mt-2 shadow-lg">
						<button @click="closeSearchResults()" style="float: right;">X</button>
						<div v-for="user in searchResults" :key="user.id" class="flex flex-row  p-2" style="min-width: 238px;">
							<div @click="selectUser(user.id)" class="cursor-pointer flex flex-row">
								<img :src="getImageUrl(user.profileImageUrl)" class="profileImg" />
								<h2 class="mt-4">{{ user.firstName }} {{ user.lastName }}</h2>
								<!-- You can add more fields here as needed -->
							</div>
						</div>
					</div>
					<!-- Close button -->
					<button class="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						@click="closeSearchResults">
						<IconC :iconName="'XIcon'" :iconClass="'w-4 h-4'" />
					</button>
				</div>
				<router-link to="/" class="flex items-center gap-[5px] text-gray-500 hover:text-primary-500">
					<IconC :iconName="'InboxIcon'" :iconClass="'w-5 h-5'" />
					<span class="inline md:hidden">Inbox</span>
				</router-link>
				<dropdown placement="bottom">
					<template #trigger="{ toggle }">
						<button @click="toggle" id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification"
							class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-primary-500"
							type="button">
							<IconC :iconName="'BellIcon'" :iconClass="'w-6 h-6'" />
							<span class="inline md:hidden">Notifications</span>
						</button>
					</template>
					<!-- Add Search Bar and Button Here -->
					<div class="dropdown-content min-w-[300px]">
						<div>
							<div class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50">
								Notifications
							</div>
							<div class="divide-y divide-gray-100">
								<a href="#" class="flex px-4 py-3 hover:bg-gray-100">
									<div class="flex-shrink-0">
										<img class="rounded-full w-11 h-11"
											src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
											alt="Jese image">
									</div>
									<div class="w-full pl-3">
										<div class="text-gray-500 text-sm mb-1.5">New message from <span
												class="font-semibold text-gray-900">Jese Leos</span>: "Hey, what's up? All
											set for
											the presentation?"</div>
										<div class="text-xs text-primary-600">a few moments ago</div>
									</div>
								</a>
							</div>
							<a href="#"
								class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100">
								<div class="inline-flex items-center ">
									<svg class="w-4 h-4 mr-2 text-gray-500" aria-hidden="true" fill="currentColor"
										viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
										<path fill-rule="evenodd"
											d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
											clip-rule="evenodd"></path>
									</svg>
									View all
								</div>
							</a>
						</div>
					</div>
				</dropdown>
				<dropdown placement="bottom">
					<template #trigger="{ toggle }">
						<button @click="toggle" id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar"
							class="flex text-sm text-gray-500 hover:text-primary-500 rounded-full md:mr-0" type="button">
							<span class="sr-only">Open user menu</span>
							<IconC :iconName="'UserCircleIcon'" :iconClass="'w-6 h-6'" />
							<span class="inline md:hidden">Profile</span>
						</button>
					</template>
					<div class="dropdown-content min-w-[150px]">
						<div class="px-4 py-3 text-sm text-gray-900">
							<div>Bonnie Green</div>
						</div>
						<ul class="py-2 text-sm text-gray-700">
							<li>
								<a @click="getProfle()" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
							</li>
							<li>
								<a href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
							</li>
						</ul>
						<div class="py-2">
							<a @click="signOut()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign
								out</a>
						</div>
					</div>
				</dropdown>
				<router-link :to="'/posts/create'"><button type="button" class="default-btn">
						<IconC :iconName="'PlusIcon'" :iconClass="'w-5 h-5'" />
					</button></router-link>
			</NavbarCollapse>
		</template>
	</Navbar>
	<!-- Display search results -->
</template>

<script>
import { Navbar, NavbarCollapse, Dropdown } from 'flowbite-vue';
import axios from 'axios'; // Import Axios for HTTP requests
import { getProfile } from '../services/ProfileService.js';
export default {
	components: {
		Navbar,
		NavbarCollapse,
		Dropdown
	},

	data() {
		return {
			searchQuery: '',
			searchResults: [],
			selectedUser: ''
		};
	},

	methods: {
		async searchUsers() {
			try {
				const token = localStorage.getItem('userData');
				const cleanedToken = token.replace(/"/g, '').replace(/\\/g, '');
				const searchQuery = this.searchQuery;
				if (searchQuery != "") {
					const pageSize = 10;
					const page = 0;
					const response = await axios.post(`https:/localhost:7186/api/Users/Search?query=${searchQuery}&pageSize=${pageSize}&page=${page}`, {
						headers: {
							'Authorization': `Bearer ${cleanedToken}`,
						},
					});
					if (response.data.data != null) {
						this.searchResults = response.data.data;
					} else {
						this.searchResults = [];
					}
				}

			} catch (error) {
				console.error('Error searching users:', error);
			}
		},
		getProfle() {
			getProfile();
		},
		getImageUrl(filePath) {
			return `https://localhost:7186/api/Posts/GetFile?filePath=${encodeURIComponent(filePath)}`;
		},
		closeSearchResults() {
			this.searchResults = [];
		},
		selectUser(userId) {
			this.$router.push({ name: 'user-profile', params: { userId } });
		}
	},
	watch: {
		selectedUser(newValue) {
			if (newValue) {
				// Find the selected user from the searchResults array
				const selectedUser = this.searchResults.find(user => user.id === newValue);

				if (selectedUser) {
					// Do something with the selected user, e.g., show their details or perform an action
					console.log('Selected user:', selectedUser);
				}
			}
		}
	}
}
</script>

<style scoped>
.profileImg {
	width: 50px;
	height: 50px;
	border-radius: 50%;
}
</style>