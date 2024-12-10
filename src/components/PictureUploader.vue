<template>
  <a-upload
    v-model:file-list="fileList"
    name="avatar"
    list-type="picture-card"
    :show-upload-list="false"
    @change="handleChange"
    :customRequest="customerRequest"
    :before-upload="beforeUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width: 100%; object-fit: contain" />
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">上传</div>
    </div>
  </a-upload>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message, type UploadProps } from 'ant-design-vue'
import type { UploadChangeParam } from 'ant-design-vue'
import Api from '../api'

const fileList = ref([])
const loading = ref<boolean>(false)
const imageUrl = ref<string>('')

interface Props {
  bizType: string
  value?: string
  onChange?: (url: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  bizType: 'user_avatar',
  value: () => '',
})

if (props.value) {
  imageUrl.value = props.value
}
watch(
  () => props.value,
  (newVal) => {
    imageUrl.value = newVal
  },
)

const handleChange = async (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }

  if (info.file.status === 'done') {
    loading.value = false
  }
  if (info.file.status === 'error') {
    loading.value = false
    message.error('upload error')
  }
}

const customerRequest = async (info: UploadChangeParam) => {
  const formData = new FormData()
  formData.append('file', info.file as any)
  try {
    const result = await Api.general.uploadFile({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        biz: 'user_avatar',
      },
      data: formData as any,
    })
    if (result.code === 0) {
      imageUrl.value = result.data || ''
      loading.value = false
      props.onChange?.(imageUrl.value)
    } else {
      message.error('上传失败，' + result.msg)
    }
  } catch ( error) {
    message.error('上传失败，服务器错误')
  }
}

// @ts-expect-error 忽略类型检查
const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('文件格式错误，只能上传jpg/png格式的图片')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('文件大小不能超过2MB')
  }
  return isJpgOrPng && isLt2M
}
</script>
<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
