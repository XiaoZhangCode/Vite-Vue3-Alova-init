<template>
  <div id="UserListPage">
    <a-card class="container">
      <a-form
        :model="formSearchParams"
        :style="{ marginBottom: '20px' }"
        layout="inline"
        @submit="doSearch"
      >
        <a-form-item name="id" label="编号">
          <a-input v-model:value="formSearchParams.id" placeholder="请输入用户编号" />
        </a-form-item>
        <a-form-item name="userName" label="用户名">
          <a-input v-model:value="formSearchParams.userName" placeholder="请输入用户名" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" style="width: 100px"> 搜索</a-button>
          <a-button
            @click="doReset"
            type="default"
            html-type="button"
            style="margin-left: 15px; width: 100px"
          >
            重置
          </a-button>
        </a-form-item>
      </a-form>
      <a-space style="margin: 0 0 15px">
        <a-button type="primary" :icon="h(PlusOutlined)" @click="showModal('add', {})"
          >添加用户
        </a-button>
      </a-space>
      <a-table
        :columns="columns"
        :data-source="dataList"
        :pagination="{
          current: searchParams.pageNo,
          pageSize: searchParams.pageSize,
          pageSizeOptions,
          total,
          showSizeChanger: true,
          showTotal: (total: number, range: number[]) =>
            `共 ${total} 条数据 第 ${range[0]}-${range[1]} 条`,
        }"
        @change="handleTableChange"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'username'">
            <span>
              <smile-outlined />
              {{ column.title }}
            </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button type="link" size="small" @click="showModal('edit', record)" style="padding: 0"
              >修改
            </a-button>
            <a-button type="link" danger size="small" @click="doDelete(record)">删除</a-button>
            <!--     冻结/解封账号状态       -->
            <a-button
              v-if="record.userStatus === 0"
              type="link"
              size="small"
              style="padding: 0"
              @click="doFreeze(record)"
              >冻结账号
            </a-button>
            <a-button v-else type="link" size="small" style="padding: 0" @click="doUnfreeze(record)"
              >解封
            </a-button>
          </template>
          <template v-else-if="column.key === 'userAvatar'">
            <template v-if="record.userAvatar">
              <a-image :src="record.userAvatar" alt="用户头像" :width="50" :height="50" />
            </template>
            <template v-else>
              <a-image
                :width="50"
                :height="50"
                :preview="false"
                src="https://www.antdv.com/#error"
                fallback="data:image/png;base64,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"
              />
            </template>
          </template>
          <template v-else-if="column.key === 'userRole'">
            <template v-if="record.userRole === 'admin'">
              <a-tag color="green">管理员</a-tag>
            </template>
            <template v-else>
              <a-tag color="blue">用户</a-tag>
            </template>
          </template>
          <template v-else-if="column.key === 'createTime'">
            <template v-if="record.createTime">
              {{ dateFormat(record.createTime, 'yyyy-MM-dd hh:mm:ss') }}
            </template>
          </template>
          <template v-else-if="column.key === 'userStatus'">
            <template v-if="record.userStatus === 0">
              <a-tag color="green">正常</a-tag>
            </template>
            <template v-else>
              <a-tag color="red">冻结</a-tag>
            </template>
          </template>
        </template>
      </a-table>
    </a-card>
    <UserModal
      :model-value="open"
      :title="title"
      :on-cancel="onCancel"
      :on-ok="handleOk"
      :width="600"
      :record="currentRow"
    />
  </div>
</template>
<script lang="ts" setup>
import { ExclamationCircleOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import { createVNode, h, ref, watchEffect } from 'vue'
import UserModal from './UserModal.vue'
import type { UserPageReqDTO, UserVo } from '@/api/globals'
import { dateFormat } from '@/utils/dateUtil.ts'
import Api from '@/api'

const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50'])

const open = ref<boolean>(false)
const title = ref<string>('添加')
const currentRow = ref<UserVo>({})

// 确认提交 可能是更新可能是创建
const handleOk = () => {
  open.value = false
  currentRow.value = {}
  fetchData()
}

const showModal = (type: string, record: UserVo) => {
  open.value = true
  title.value = type === 'add' ? '添加用户' : '修改用户'
  currentRow.value = record
}

const onCancel = () => {
  open.value = false
  currentRow.value = {}
}

// 初始化搜索条件（不应该被修改）
const initSearchParams = {
  pageNo: 1,
  pageSize: 10,
}

const searchParams = ref({
  ...initSearchParams,
})

const formSearchParams = ref<UserPageReqDTO>({} as UserPageReqDTO)
/**
 * 执行搜索
 */
const doSearch = () => {
  searchParams.value = {
    ...initSearchParams,
    ...formSearchParams.value,
  }
}

// 数据
const dataList = ref<UserVo[]>([])
const total = ref(0)

// 获取数据
const fetchData = async () => {
  const res = await Api.general.getUserPage({
    params: {
      ...searchParams.value,
    } as any,
  })
  if (res.data) {
    dataList.value = res.data.list || []
    total.value = res.data.total || 0
  } else {
    message.error('获取数据失败 ' + res.msg)
  }
}

// 分页变化函数
const handleTableChange = (pagination: any) => {
  searchParams.value = {
    ...searchParams.value,
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
  }
  fetchData()
}

watchEffect(() => {
  fetchData()
})

/**
 * 删除
 * @param record
 */
const doDelete = async (record: UserVo) => {
  if (!record.id) {
    return
  }
  Modal.confirm({
    title: '确认要删除此用户吗?',
    icon: createVNode(ExclamationCircleOutlined),
    onOk: async () => {
      const res = await Api.general.deleteUser({
        params: {
          id: record.id as number,
        },
      })
      if (res.code === 0) {
        await fetchData()
        message.success('删除成功')
      } else {
        message.error('删除失败，' + res.msg)
      }
    },
  })
}

/**
 * 重置搜索条件
 */
const doReset = () => {
  searchParams.value = {
    ...initSearchParams,
  }
  formSearchParams.value = {} as UserPageReqDTO
}
// 冻结账号
const doFreeze = async (record: UserVo) => {
  if (!record.id) {
    return
  }
  Modal.confirm({
    title: '确认要冻结此用户吗?',
    icon: createVNode(SmileOutlined),
    onOk: async () => {
      try {
        const result = await Api.general.updateUserStatus({
          params: {
            id: record.id as number,
            status: 1,
          },
        })
        if (result.code === 0) {
          message.success('冻结成功')
          await fetchData()
          return
        } else {
          message.error('冻结失败，' + result.msg)
        }
      } catch (error: any) {
        message.error('请求失败，未知错误')
      }
    },
  })
}
const doUnfreeze = async (record: UserVo) => {
  if (!record.id) {
    return
  }
  Modal.confirm({
    title: '确认要解冻此用户吗?',
    icon: createVNode(SmileOutlined),
    onOk: async () => {
      try {
        const result = await Api.general.updateUserStatus({
          params: {
            id: record.id as number,
            status: 0,
          },
        })
        if (result.code === 0) {
          message.success('解冻成功')
          await fetchData()
          return
        } else {
          message.error('解冻失败，' + result.msg)
        }
      } catch (e) {
        message.error('请求失败，未知错误')
      }
    },
  })
}

const columns = [
  {
    key: 'id',
    title: 'id',
    dataIndex: 'id',
    width: '80px',
  },
  {
    key: 'userName',
    title: '用户名',
    dataIndex: 'userName',
    width: '120px',
  },
  {
    key: 'userAccount',
    title: '账号',
    dataIndex: 'userAccount',
  },
  {
    key: 'userAvatar',
    title: '头像',
    dataIndex: 'userAvatar',
  },
  {
    key: 'createTime',
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    key: 'userRole',
    title: '角色',
    dataIndex: 'userRole',
  },
  {
    key: 'userStatus',
    title: '账号状态',
    dataIndex: 'userStatus',
  },
  {
    title: '操作',
    key: 'action',
  },
]
</script>
<style scoped></style>
