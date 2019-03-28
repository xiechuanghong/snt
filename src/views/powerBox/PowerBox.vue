<template>
  <div class="alarmPolicyGroup common deviceManagent">
    <div class="topInput">
      <el-form
        :model="devieForm"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
              <el-form-item label="配电房ID:">
                <el-input
                  v-model="devieForm.power_room_id"
                  placeholder="请输入配电房ID"
                ></el-input>
              </el-form-item>
            </td>
            <td>
               <el-form-item label="开关柜名称:">
                  <el-input
                    v-model="devieForm.power_box_name"
                    placeholder="请输入开关柜名称"
                  ></el-input>
                </el-form-item>
            </td>
            <td rowspan="2"  style="line-height:20px;">
               <el-form-item >
                <el-button
                  icon="fa fa-search"
                  class="btnStyle selectBtn"
                  @click="searchList"
                >查询</el-button>
                <el-button
                  icon="fa fa-search"
                  class="btnStyle selectBtn"
                >清空</el-button>
                <el-button
                  class="btnStyle addBtn"
                  @click="addDialogFormVisible = true"
                >新 增</el-button>
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
          :data="powerData"
          style="width: 100%;color:#fff;"
        >
          <el-table-column
            prop="box_id"
            label="开关柜ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="power_room_id"
            label="配电房ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="sub_id"
            label="台账ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="power_box_name"
            label="开关柜名称"
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
                class="btnStyle "
                @click="reviseDialogFormVisible = true"
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
        <el-form-item label="开关柜ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.box_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="配电房ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.power_room_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="台账ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.sub_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="开关柜名称:">
          <el-input
            style="width:350px;"
            v-model="addForm.power_box_name"
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
        <el-form-item label="开关柜ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.box_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="配电房ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.power_room_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="台账ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.sub_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="开关柜名称:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.power_box_name"
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
        box_id: "",
        power_room_id: "",
        sub_id: "",
        power_box_name: ""
      },
      reviseForm: {
        box_id: "",
        power_room_id: "",
        sub_id: "",
        power_box_name: ""
      },
      devieForm: {
        power_room_id: "",
        power_box_name: ""
      },
      powerData: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
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
