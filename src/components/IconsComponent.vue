<template>
	<div>
		<template v-if="isLoaded && iconType === 'outline'">
			<component :is="heroIconsOutline24[iconName]" :class="iconClass" />
		</template>
		<template v-if="isLoaded && iconType === 'solid'">
			<component :is="heroIconsSolid24[iconName]" :class="iconClass" />
		</template>
	</div>
</template>

<script>
import * as heroIconsOutline24 from "@heroicons/vue/24/outline";
import * as heroIconsSolid24 from "@heroicons/vue/24/solid";
// import * as heroIconsSolid20 from "@heroicons/vue/20/solid";
export default {
	data() {
		return {
			isLoaded: false,
			heroIconsOutline24: heroIconsOutline24,
			heroIconsSolid24: heroIconsSolid24,
			// heroIconsSolid20: heroIconsSolid20,
		};
	},
	props: {
		iconType: { type: String, required: false, default: "outline" },
		// iconSize: { type: String, required: false, default: "24" },
		iconName: String,
		iconClass: String,
	},
	mounted() {
		this.isLoaded = true;
	},
}
</script>