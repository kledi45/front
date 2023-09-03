<template>
    <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
        <h2 class="text-xl font-semibold mb-4">Create a New Post</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-4">
                <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
                <textarea v-model="post.Content" id="content" rows="4" class="form-input mt-1 block w-full"></textarea>
            </div>
            <div class="mb-4">
                <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
                <input type="file" ref="imageInput" @change="handleImageUpload" class="mt-1">
            </div>
            <div class="mt-4">
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
                    Create Post
                </button>
            </div>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            post: {
                Content: '',
                Image: null,
                ImageUrl: null,
                VideoUrl: null,
                Location: null,
                GroupId: null, 
                UserId: '',
            },
        };
    },
    methods: {
        handleImageUpload(event) {
            this.post.Image = event.target.files[0];
        },
        async submitForm() {

            const dto = new FormData();
            dto.append('Content', this.post.Content);
            dto.append('Image', this.post.Image);
            dto.append('ImageUrl', this.post.ImageUrl);
            dto.append('VideoUrl', this.post.VideoUrl);
            dto.append('Location', this.post.Location);
            dto.append('GroupId', this.post.GroupId);


            try {
                const token = localStorage.getItem('userData');
                const cleanedToken = token.replace(/"/g, '').replace(/\\/g, '');
                const response = await axios.post('https://localhost:7186/api/Posts', dto, {
                    headers: {
                        'Authorization': `Bearer ${cleanedToken}`,
                    },
                });
                
                if(response)
                    window.location = '/'

                this.post = {
                    Content: '',
                    Image: null,
                    UserId: '',
                };

                console.log(this.post)
            } catch (error) {
                console.error('Error creating post:', error);
            }
        },
    },
};
</script>
  
<style>
/* You can add Tailwind CSS classes here if needed */
</style>
  