<template>
	<div class="user-box">
		<div>
			<el-card>
				<el-table
					:data="userList">
					<el-table-column
						label="头像">
						<template slot-scope="scope">
							<img class="avatar" :src="scope.row.avatar">
						</template>
					</el-table-column>
					<el-table-column
						label="姓名"
						prop="name">	
					</el-table-column>
				</el-table>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	created () {
		this.getUserList()
	},
	data () {
		return {
			userList: []
		}
	},
	methods: {
		getUserList () {
			this.$http.get('https://cloud.minapp.com/userve/v1/miniapp/user-profile/')
				.then(({ data }) => {
					this.userList = data.objects.filter(user => user.nickname != null)
				}).catch((err) => {
					this.$message.error('获取数据出错')
				})
		}
	}
}
</script>

<style scoped>
	.avatar {
		max-width: 40px;
		max-height: 40px;
	}
</style>

