<template>
  <div class="alarmMember common deviceManagent">
    <div class="topInput">
      <el-form
        :model="devieForm"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
              <el-form-item label="告警组员名称:">
                <el-input
                  v-model="devieForm.alarm_member"
                  placeholder="请输入告警组员名称"
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="告警组员ID:">
                <el-input
                  v-model="devieForm.alarm_member_id"
                  placeholder="请输入ID"
                ></el-input>
              </el-form-item>
            </td>
            <td
              rowspan="2"
              style="line-height:20px;"
            >
              <el-form-item>
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
                >新增</el-button>
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
            prop="alarm_member_id"
            label="告警组员ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="alarm_member_name"
            label="告警组员名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="moblie_phone"
            label="电话号码"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="tel_phone"
            label="手机号码"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮件"
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
                @click="reviseDialogFormVisible = true"
              >修改</el-button>
              <el-button
                size="mini"
                class="btnStyle"
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
    <!-- 新增弹框 -->
    <el-dialog
      title="通道新增"
      :visible.sync="addDialogFormVisible"
      class="addDialog"
    >
      <el-form
        class="formInput"
        :model="addForm"
      >
        <el-form-item label="告警组员ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_member_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警组员名称:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_member_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码:">
          <el-input
            style="width:350px;"
            v-model="addForm.moblie_phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input
            style="width:350px;"
            v-model="addForm.tel_phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮件:">
          <el-input
            style="width:350px;"
            v-model="addForm.email"
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
    <!-- 修改弹框 -->
    <el-dialog
      title="通道修改"
      :visible.sync="reviseDialogFormVisible"
      class="addDialog"
    >
      <el-form
        class="formInput"
        :model="reviseForm"
      >
        <el-form-item label="告警组员ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.alarm_member_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警组员名称:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.alarm_member_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.moblie_phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.tel_phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.email"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button
          class="btnClose"
          @click="reviseDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="reviseDialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reviseDialogFormVisible: false,
      addDialogFormVisible: false,
      currentPage4: 4,
      addForm: {
        alarm_member_id: "",
        alarm_member_name: "",
        moblie_phone: "",
        tel_phone: "",
        email: "",
      },
      reviseForm: {
        alarm_member_id: "",
        alarm_member_name: "",
        moblie_phone: "",
        tel_phone: "",
        email: "",
      },
      devieForm: {
        alarm_member: "",
        alarm_member_id: ""
      },
      deviceData: [
        {
          alarm_member_id: "AAAAAAAAAA",
          alarm_member_name: "刘德华",
          moblie_phone: "88888888",
          tel_phone: "13888888888",
          email: "123@qq.com",
          revise: "",
          deleter: ""
        },
        {
          alarm_member_id: "BBBBBBBBBBBBB",
          alarm_member_name: "刘德华",
          moblie_phone: "88888888",
          tel_phone: "13888888888",
          email: "123@qq.com",
          revise: "",
          deleter: ""
        },
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
