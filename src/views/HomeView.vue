<template>
	<div class="container py-5 grid grid-cols-1 md:grid-cols-10 gap-7">
		<div class="col-span-7">
			<template v-for="(item, index) in posts" :key="index">
				<div class="border rounded mb-8">
					<div class="flex p-2 items-center gap-[5px]">
						<div class="bg-gray-200 w-8 h-8 rounded-full"></div>
						<h4 class="font-bold">{{ item.author }}</h4>
						<button class="ml-auto">
							<IconC :iconName="'EllipsisVerticalIcon'" :iconClass="'w-5 h-5'" />
						</button>
					</div>
					<div class="bg-gray-200 w-full h-[250px] md:h-[500px]"></div>
					<div class="p-2 flex flex-col gap-[5px]">
						<div class="flex gap-[10px] items-center">
							<IconC :iconName="'HeartIcon'" :iconClass="item.like ? 'w-5 h-5 fill-red-500' : 'w-5 h-5'"
								:iconType="item.like ? 'solid' : 'outline'" />
							<IconC :iconName="'ChatBubbleOvalLeftIcon'" :iconClass="'w-5 h-5'" />
							<IconC :iconName="'PaperAirplaneIcon'" :iconClass="'w-5 h-5 -rotate-[30deg]'" />
						</div>
						<small>{{ item.likes }} likes</small>
						<h3 class="font-medium">{{ item.author }}</h3>
						<p class="text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non minus possimus,
							corrupti temporibus excepturi molestias sint illo debitis eius facilis animi ullam, natus aspernatur
							perferendis! Laudantium fugiat modi laboriosam animi?</p>
						<p class="underline" v-if="item.comments">View all {{ item.comments }} comments</p>
					</div>
				</div>
			</template>
		</div>
		<div class="col-span-3 sticky top-0">
			<div class="sticky top-[100px]">
				<p class="font-medium">Suggestions for you</p>
				<div class="divide-y flex flex-col mt-4">
					<div class="flex items-center gap-[5px] py-2" v-for="i in 5" :key="i">
						<div class="bg-gray-200 w-8 h-8 rounded-full"></div>
						<p>UBT user {{ i }}</p>
						<a class="text-primary-500 ml-auto">Follow</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			posts: [
				{
					author: 'Cristiano Ronaldo',
					comments: 4,
					like: false,
					likes: 10,
				},
				{
					author: 'Lionel Messi',
					comments: 10,
					like: true,
					likes: 150,
				},
				{
					author: 'Neymar Jr.',
					comments: 0,
					like: false,
					likes: '1.3k',
				},
				{
					author: 'Pepe',
					comments: 2,
					like: false,
					likes: '2k',
				}
			]
		}
		
	},

}
</script>