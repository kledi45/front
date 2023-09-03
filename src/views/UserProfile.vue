<template>
	<main class="profile-page bg-gray-200 h-full">
		<section class="relative block h-[350px]">
			<div class="absolute top-0 w-full h-full bg-center bg-cover" style="
            background-image: url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80');
          ">
				<span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-black"></span>
			</div>
		</section>
		<section class="relative py-20 bg-gray-200 h-full">
			<div class="container mx-auto px-4">
				<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
					<div class="px-6">
						<div class="flex flex-wrap justify-center">
							<div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
								<div class="relative">
									<img style="border-radius: 50%;height: 120px;width:120px;" :src="getImageUrl(this.imageUrl)" />
								</div>
							</div>
							<div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
								<div class="py-6 px-3 mt-32 sm:mt-0">
									<button class="default-btn" type="button">
										Follow
									</button>
								</div>
							</div>
							<div class="w-full lg:w-4/12 px-4 lg:order-1">
								<div class="flex justify-center py-4 lg:pt-4 pt-8">
									<div class="mr-4 p-3 text-center">
										<span class="text-xl font-bold block uppercase tracking-wide text-gray-600">{{
											followers }}</span><span class="text-sm text-gray-400">Followers</span>
									</div>
									<div class="mr-4 p-3 text-center">
										<span class="text-xl font-bold block uppercase tracking-wide text-gray-600">{{
											following }}</span><span class="text-sm text-gray-400">Following</span>
									</div>
									<!-- <div class="lg:mr-4 p-3 text-center">
										<span class="text-xl font-bold block uppercase tracking-wide text-gray-600">89</span><span
											class="text-sm text-gray-400">Comments</span>
									</div> -->
								</div>
							</div>
						</div>
						<div class="text-center mt-12">
							<h3 class="text-4xl font-semibold leading-normal mb-2 text-gray-700 mb-2">
								{{ fullName }}
							</h3>
							<div class="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
								<i class="fas fa-map-marker-alt mr-2 text-lg text-gray-400"></i>
								[User Location]
							</div>
							<div class="mb-2 text-gray-600 mt-10">
								<i class="fas fa-briefcase mr-2 text-lg text-gray-400"></i>[other info]
							</div>
							<div class="mb-2 text-gray-600">
								<i class="fas fa-university mr-2 text-lg text-gray-400"></i>[more info]
							</div>
						</div>
						<div class="mt-10 py-10 border-t border-gray-200 text-center">
							<div class="flex flex-wrap justify-center">
								<div class="w-full lg:w-9/12 px-4">
									<p class="mb-4 text-lg leading-relaxed text-gray-700">
										Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates perferendis
										enim tenetur incidunt rerum! Voluptatum eum et provident consequatur fuga
										recusandae, dolorum non temporibus repellendus aliquam, quam iure quibusdam nobis.
									</p>
									<a href="#pablo" class="font-normal text-primary-500">Show more</a>
								</div>
							</div>
						</div>
						<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
							<div v-for="post in userPosts" :key="post.id"
								class="bg-white rounded-lg shadow-md overflow-hidden">
								<img :src="getImageUrl(post.imageUrl)" alt="Post Image" class="w-full h-48 object-cover">
								<div class="p-4">
									<h2 class="text-lg font-semibold text-gray-800">{{ post.content }}</h2>
									<div class="flex mt-2">
										<div class="mr-5">
										<button class="text-primary-500 hover:text-primary-700 inline-button">
											<IconC :iconName="'HeartIcon'" :iconClass="'w-5 h-5'" />{{ post.likesCount }}
										</button>
										</div>
										<div>
										<button class="text-primary-500 hover:text-primary-700 inline-button">
											<IconC :iconName="'ChatBubbleOvalLeftIcon'" :iconClass="'w-5 h-5'" />{{ post.commentsCount }}
										</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import axios from 'axios';

export default {
    props: {
      userId: {
        type: String, // Adjust the data type as needed
        required: true,
      },
    },
	data() {
		return {
			fullName: '',
			followers: 0,
			following: 0,
			PageIndex: 0,
			PageSize: 10,
			userPosts: [],
            imageUrl: ''
		};
	},
	methods: {
		async myMethod() {
			try {
                const response = await axios.get(
					`https://localhost:7186/api/Users/GetUserProfileById?userId=${this.userId}`
				);
                console.log(response,'ra')
				
				this.fullName = response.data.firstName + ' ' + response.data.lastName;
				this.followers = response.data.followersCount;
				this.following = response.data.followingCount;
                this.imageUrl = response.data.profileImageUrl;
			} catch (error) {
				console.error(error);
			}
		},
		async getUserPosts() {
			try {
		
				const response = await axios.get(
					`https://localhost:7186/api/Users/GetUserPosts/posts?userId=${this.userId}&pageIndex=${this.PageIndex}&pageSize=${this.PageSize}`
				);
				console.log(response);
				this.userPosts = response.data;

				console.log(this.userPosts)

			} catch (error) {
				console.error(error);
			}
		},
		getImageUrl(filePath) {
			return `https://localhost:7186/api/Posts/GetFile?filePath=${encodeURIComponent(filePath)}`;
		},
		likes() {
			const min = 1;
			const max = 100;
			return Math.floor(3 * (max - min + 1)) + min;
		},
	},
	mounted() {
		this.myMethod();
		this.getUserPosts();
	},
    watch: {
    $route(to, from) {
      // Check if the userId parameter has changed
      if (to.params.userId !== from.params.userId) {
        // Fetch the data or perform any necessary actions here
        this.myMethod();
        this.getUserPosts();
        this.getImageUrl();
        
      }
    },
  },
};
</script>


<style>
.inline-button {
  display: inline-block;
}
</style>