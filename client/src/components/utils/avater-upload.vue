<template>
	<TransitionRoot appear :show="showModal" as="template">
		<Dialog as="div" static :open="showModal">
			<div class="fixed inset-0 z-10 overflow-y-auto">
				<div class="min-h-screen px-4 text-center">
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0"
						enter-to="opacity-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100"
						leave-to="opacity-0"
					>
						<DialogOverlay class="bg-gray-700 fixed inset-0 opacity-50" />
					</TransitionChild>

					<span class="inline-block h-screen align-middle" aria-hidden="true">
						&#8203;
					</span>

					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<div
							class="align-middle bg-neutral inline-flex flex-col overflow-hidden p-6 rounded-2xl shadow-xl text-left text-neutral-content transform transition-all"
							style="width: 500px; height: 500px"
						>
							<div
								v-if="!image.loading && imageSrc"
								class="image-container"
							>
								<Cropper
									ref="cropper"
									:src="imageSrc"
									class="w-full h-full"
									:auto-zoom="true"
									image-restriction="stencil"
									:resize-image="{
										adjustStencil: false
									}"
									:stencil-props="{
										handlers: {},
										movable: false,
										scalable: false,
										aspectRatio: 12 / 12
									}"
									:stencil-size="{
										width: 400,
										height: 400
									}"
								></Cropper>
							</div>
							<div
								v-else
								class="flex flex-col flex-1 items-center justify-center"
							>
								<label for="upload-avater" class="btn btn-primary w-9/12">
									<input
										type="file"
										name="avater"
										id="upload-avater"
										class="hidden"
										accept="image/*"
										:disabled="image.loading"
										@change="loadImage($event)"
									/>
									<div v-if="image.loading" class="loader">
										<div
											class="loader-inner auth-loading-spiner semi-circle-spin mx-auto"
										>
											<div></div>
										</div>
									</div>
									<template v-else>
										<i
											class="eva eva-cloud-upload-outline eva-lg"
										></i>
										<span class="ml-2">Upload</span>
									</template>
								</label>
								<span class="mt-4">Max file size 1MB or 1024 KB</span>
							</div>
							<div class="space-x-2 pt-3 text-right">
								<template v-if="imageSrc">
									<button
										class="btn btn-primary btn-sm"
										@click="uploadImage"
									>
										<div v-if="uploading" class="loader w-32">
											<div
												class="loader-inner upload-loading-spiner semi-circle-spin mx-auto"
											>
												<div></div>
											</div>
										</div>
										<span v-else>upload</span>
									</button>
									<button
										class="btn btn-primary btn-sm"
										@click="resetImage"
									>
										reset
									</button>
								</template>
								<button class="btn btn-sm" @click="handleCancle">
									cancle
								</button>
							</div>
						</div>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from '@headlessui/vue';
import { useMutation } from '@urql/vue';
import { useToast } from 'vue-toastification';
// @ts-ignore
import { Cropper } from 'vue-advanced-cropper';
import { UPLOAD_IMAGE } from '../../typeDefs';
import { getMimeType } from '../../utils/image-cropper';

const init = {
	uploadedImage: {
		src: '',
		type: ''
	},
	loading: false
};

export default defineComponent({
	props: {
		showModal: Boolean
	},
	setup(props, cxt) {
		const cropper = ref(null);
		const image = reactive({ ...init });
		const toast = useToast();
		const imageSrc = computed(() => image.uploadedImage.src);
		const { executeMutation, fetching: uploading } = useMutation(UPLOAD_IMAGE);

		function resetImage() {
			if (uploading.value) return;
			image.loading = false;
			image.uploadedImage = init.uploadedImage;
		}

		function handleCancle() {
			if (uploading.value) return;
			resetImage();
			cxt.emit('close-modal');
		}

		function uploadImage() {
			if (uploading.value) return;
			// @ts-ignore
			const { canvas } = cropper.value.getResult();
			if (canvas) {
				canvas.toBlob((blob: Blob) => {
					executeMutation({ type: 'avater', file: blob }).then(result => {
						if (result.error) {
							toast.error('some thing went wrong');
						} else {
							toast.success('avater updated');
							handleCancle();
						}
					});
				}, 'image/png');
			}
		}

		function loadImage(event: any) {
			if (image.loading || uploading.value) return;
			const { files } = event.target as HTMLInputElement;
			if (files && files[0]) {
				image.loading = true;
				if (image.uploadedImage.src) {
					URL.revokeObjectURL(image.uploadedImage.src);
				}
				const blob = URL.createObjectURL(files[0]);
				const reader = new FileReader();
				reader.onload = e => {
					image.uploadedImage = {
						src: blob,
						// @ts-ignore
						type: getMimeType(e.target?.result, files[0].type)
					};
					image.loading = false;
				};
				reader.readAsDataURL(files[0]);
			}
		}

		return {
			cropper,
			image,
			loadImage,
			imageSrc,
			resetImage,
			uploadImage,
			uploading,
			handleCancle
		};
	},
	components: {
		Cropper,
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogOverlay
	}
});
</script>

<style scoped>
.image-container {
	margin: auto;
	width: 400px;
	height: 400px;
	cursor: move;
}
.upload-loading-spiner {
	width: 14px;
	height: 14px;
}
</style>
