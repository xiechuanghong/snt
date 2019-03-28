<template>
  <div class="deviceManagent common">
    <div class="topInput">
      <el-form
        :model="devieForm"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
               <el-form-item label="用户名:">
                <el-input
                  v-model="devieForm.adressIP"
                  placeholder="请输入用户名"
                ></el-input>
               </el-form-item>
            </td>
            <td>
              <el-form-item label="邮箱:">
                <el-input
                  v-model="devieForm.email"
                  placeholder="请输入用户名"
                ></el-input>
               </el-form-item>
            </td>
            <td rowspan="2"  style="line-height:20px;">
               <el-form-item >
                <el-button
                  icon="fa fa-search"
                  class="btnStyle selectBtn"
                >查询</el-button>
                <el-button
                  icon="fa fa-search"
                  class="btnStyle selectBtn"
                >清空</el-button>
                <el-button
                  class="btnStyle addBtn"
                  @click="addDialogFormVisible = true"
                >添加用户名</el-button>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="container">
      <template>
        <el-table
          :data="deviceData"
          style="width: 100%;color:#fff;"
        >
          <el-table-column
            type="index"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="organization"
            label="组织"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="role"
            label="系统角色"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="loginName"
            label="登录名"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="jobNumber"
            label="工号"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="activationTime"
            label="激活时间"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="describe"
            label="描述"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="revise"
            label="操作"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                class="btnStyle"
                @click="showEditDialog(scope.row)"
              >修改</el-button>
              <el-button
                size="mini"
                class="btnStyle "
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
      >
      </el-pagination>
    </div>
    <!-- 添加用户弹框 -->
    <el-dialog
      title="设备新增"
      :visible.sync="addDialogFormVisible"
      class="addDialog"
    >
      <el-form
        class="formInput"
        :model="addForm"
      >
        <el-form-item label="用户名:">
          <el-input
            style="width:350px;"
            v-model="addForm.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录名:">
          <el-input
            style="width:350px;"
            v-model="addForm.loginName"
            placheolder="请输入登录名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input
            style="width:350px;"
            v-model="addForm.password"
            placheolder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户描述:">
          <el-input
            style="width:350px;"
            v-model="addForm.userRole"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始使用时间:">
          <el-input
            style="width:350px;"
            v-model="addForm.userTime"
          ></el-input>
        </el-form-item>
        <el-form-item label="授权结束时间">
          <el-input
            style="width:350px;"
            v-model="addForm.empowerTime"
          ></el-input>
        </el-form-item>
        <el-form-item label="工作号:">
          <el-input
            style="width:350px;"
            v-model="addForm.workNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input
            style="width:350px;"
            v-model="addForm.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户系统角色:">
          <el-select
            v-model="addForm.userRoleSystem"
            style="width:350px"
          >
            <el-option
              label="普通管理员"
              value="conservator"
            ></el-option>
            <el-option
              label="高级管理员"
              value="hignConservator"
            ></el-option>
            <el-option
              label="超级管理员"
              value="superConservator"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="组织:">
          <el-input
            style="width:350px;"
            v-model="addForm.organizations"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button
        class="btnClose"
          @click="addDialogFormVisible = false"
        >取 消</el-button>
        <el-button
        class="btnDet"
          @click="addDialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户弹框 -->

  </div>
</template>
<script>
export default {
  data() {
    return {
      editDialogFormVisble:false,
      reviseDialogFormVisible: false,
      addDialogFormVisible: false,
      currentPage4: 4,
      addForm: {
        userName: "",
        loginName: "",
        password: "",
        userRole: "",
        userTime: "",
        empowerTime: "",
        workNumber: "",
        email: "",
        userRoleSystem:"",
        organizations:""
      },
      reviseForm: {
        type: "",
        name: "",
        IP: "",
        port: "",
        thread: "",
        sonAdress: ""
      },
      devieForm: {
        email: "",
        adressIP: ""
      },
      deviceData: [
        {
          organization: "三级单位001",
          role: "MMCP001",
          userName: "HIPS",
          loginName: "1",
          jobNumber: "192.168.1.251",
          email: "2000",
          activationTime: "23232",
          endTime: "123",
          describe: "123"
        },
        {
          organization: "三级单位001",
          role: "MMCP001",
          userName: "HIPS",
          loginName: "1",
          jobNumber: "192.168.1.251",
          email: "2000",
          activationTime: "23232",
          endTime: "123",
          describe: "123"
        },
        {
          organization: "三级单位001",
          role: "MMCP001",
          userName: "HIPS",
          loginName: "1",
          jobNumber: "192.168.1.251",
          email: "2000",
          activationTime: "23232",
          endTime: "123",
          describe: "123"
        },
        {
          organization: "三级单位001",
          role: "MMCP001",
          userName: "HIPS",
          loginName: "1",
          jobNumber: "192.168.1.251",
          email: "2000",
          activationTime: "23232",
          endTime: "123",
          describe: "123"
        },
        {
          organization: "三级单位001",
          role: "MMCP001",
          userName: "HIPS",
          loginName: "1",
          jobNumber: "192.168.1.251",
          email: "2000",
          activationTime: "23232",
          endTime: "123",
          describe: "123"
        },
        {
          organization: "三级单位001",
          role: "MMCP001",
          userName: "HIPS",
          loginName: "1",
          jobNumber: "192.168.1.251",
          email: "2000",
          activationTime: "23232",
          endTime: "123",
          describe: "123"
        },
        {
          organization: "三级单位001",
          role: "MMCP001",
          userName: "HIPS",
          loginName: "1",
          jobNumber: "192.168.1.251",
          email: "2000",
          activationTime: "23232",
          endTime: "123",
          describe: "123"
        },
        {
          organization: "三级单位001",
          role: "MMCP001",
          userName: "HIPS",
          loginName: "1",
          jobNumber: "192.168.1.251",
          email: "2000",
          activationTime: "23232",
          endTime: "123",
          describe: "123"
        },
        {
          organization: "三级单位001",
          role: "MMCP001",
          userName: "HIPS",
          loginName: "1",
          jobNumber: "192.168.1.251",
          email: "2000",
          activationTime: "23232",
          endTime: "123",
          describe: "123"
        },
        {
          organization: "三级单位001",
          role: "MMCP001",
          userName: "HIPS",
          loginName: "1",
          jobNumber: "192.168.1.251",
          email: "2000",
          activationTime: "23232",
          endTime: "123",
          describe: "123"
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.btnDet{
  background: rgba($color: #40e2f5, $alpha: 0.7);
  color: #fff;
  border-color: rgba($color: #40e2f5, $alpha: 0.7);
}
.btnClose{
  background: rgba($color: #40e2f5, $alpha: 0.3);
  color: #fff;
  border-color: rgba($color: #40e2f5, $alpha: 0.4);
}
</style>
