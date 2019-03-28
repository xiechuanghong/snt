<template>
  <div class="alarmPolicyGroup deviceManagent common">
    <div class="topInput">
      <el-form
        :model="devieForm"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
              <el-form-item label="告警策略ID:">
                <el-input
                  v-model="devieForm.id"
                  placeholder="请输入告警策略ID"
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="告警等级:">
                <el-input
                  v-model="devieForm.alarmLevel"
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
                  @click="searchList"
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
          :data="policyData"
          style="width: 100%;color:#fff;"
        >
          <el-table-column
            type="index"
            width="50"
            align="center"
          >

          </el-table-column>
          <el-table-column
            label="报警策略ID"
            align="center"
            width="94"
          >
            <span slot-scope="scope">{{ scope.row.id }}</span>
          </el-table-column>
          <el-table-column
            label="通道ID"
            align="center"
          >
            <span slot-scope="scope">{{ scope.row.channelId }}</span>
          </el-table-column>
          <el-table-column
            label="报警上限"
            align="center"
          >
            <span slot-scope="scope">{{ scope.row.maxValue }}</span>
          </el-table-column>
          <el-table-column
            label="报警下限"
            align="center"
          >
            <span slot-scope="scope">{{ scope.row.minValue }}</span>
          </el-table-column>
          <el-table-column
            prop="switch_value"
            label="报警值"
            align="center"
          >
            <span slot-scope="scope">{{ scope.row.switchValue }}</span>
          </el-table-column>
          <el-table-column
            label="告警等级"
            align="center"
          >
            <span slot-scope="scope">{{ scope.row.alarmLevel }}</span>
          </el-table-column>
          <el-table-column
            label="告警次数"
            align="center"
          >
            <span slot-scope="scope">{{ scope.row.alarmTimes }}</span>
          </el-table-column>
          <el-table-column
            label="告警过滤次数"
            align="center"
            width="105"
          >
            <span slot-scope="scope">{{ scope.row.alarmFilterTimes }}</span>
          </el-table-column>
          <el-table-column
            label="上限告警事件"
            align="center"
            width="105"
          >
            <span slot-scope="scope">{{ scope.row.upEventType }}</span>
          </el-table-column>
          <el-table-column
            label="下限告警事件"
            align="center"
            width="105"
          >
            <span slot-scope="scope">{{ scope.row.dowmEventType }}</span>
          </el-table-column>

          <el-table-column
            prop="is_enable"
            label="是否启用"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isEnables"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change='changeUserState(scope.row)'
              >
              </el-switch>
            </template>
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
                @click="updateOpen(scope.row)"
              >修改</el-button>
              <el-button
                size="mini"
                class="btnStyle "
                @click="deletemanage(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="managePageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="managePageInfo.totalCount"
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
        <el-form-item label="通道ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.channelId"
          ></el-input>
        </el-form-item>
        <el-form-item label="报警上限:">
          <el-input
            style="width:350px;"
            v-model="addForm.maxValue"
            @change="inputValue"
            :disabled="max_isDis"
          ></el-input>
        </el-form-item>
        <el-form-item label="报警下限:">
          <el-input
            style="width:350px;"
            v-model="addForm.minValue"
            @change="inputValues"
            :disabled="min_isDis"
          ></el-input>
        </el-form-item>
        <el-form-item label="报警值:">
          <el-input
            style="width:350px;"
            v-model="addForm.switchValue"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警等级:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarmLevel"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警次数:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarmTimes"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警过滤次数:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarmFilterTimes"
          ></el-input>
        </el-form-item>
        <el-form-item label="上限告警事件:">
          <el-input
            style="width:350px;"
            v-model="addForm.upEventType"
          ></el-input>
        </el-form-item>
        <el-form-item label="下限告警事件:">
          <el-input
            style="width:350px;"
            v-model="addForm.dowmEventType"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用:">
          <template>
            <el-radio
              v-model="addForm.isEnable"
              label="1"
              style="color:#fff;margin-top:14px;"
            >是</el-radio>
            <el-radio
              v-model="addForm.isEnable"
              label="0"
              style="color:#fff;margin-top:14px;"
            >否</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button
          class="btnClose"
          @click="addDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="save"
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
        :model="this.updateData"
      >
        <el-form-item label="通道ID:">
          <el-input
            style="width:350px;"
            v-model="updateData.channelId"
          ></el-input>
        </el-form-item>
        <el-form-item label="报警上限:">
          <el-input
            style="width:350px;"
            v-model="updateData.maxValue"
          ></el-input>
        </el-form-item>
        <el-form-item label="报警下限:">
          <el-input
            style="width:350px;"
            v-model="updateData.minValue"
          ></el-input>
        </el-form-item>
        <el-form-item label="报警值:">
          <el-input
            style="width:350px;"
            v-model="updateData.switchValue"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警等级:">
          <el-input
            style="width:350px;"
            v-model="updateData.alarmLevel"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警次数:">
          <el-input
            style="width:350px;"
            v-model="updateData.alarmTimes"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警过滤次数:">
          <el-input
            style="width:350px;"
            v-model="updateData.alarmFilterTimes"
          ></el-input>
        </el-form-item>
        <el-form-item label="上限告警事件:">
          <el-input
            style="width:350px;"
            v-model="updateData.upEventType"
          ></el-input>
        </el-form-item>
        <el-form-item label="下限告警事件:">
          <el-input
            style="width:350px;"
            v-model="updateData.dowmEventType"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用:">
          <template>
            <el-radio
              v-model="updateData.isEnable"
              label="1"
              style="color:#fff;margin-top:14px;"
            >是</el-radio>
            <el-radio
              v-model="updateData.isEnable"
              label="0"
              style="color:#fff;margin-top:14px;"
            >否</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button
          class="btnClose"
          @click="reviseDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="update"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import http from "@/utils/HttpService";
import api from "@/api/API";
export default {
  data() {
    return {
      paginationShow: false,
      reviseDialogFormVisible: false,
      addDialogFormVisible: false,
      addForm: [
        {
          isEnable: "",
          channelId: "",
          maxValue: "",
          minValue: "",
          switchValue: "",
          alarmLevel: "",
          alarmTimes: "",
          alarmFilterTimes: "",
          upEventType: "",
          dowmEventType: ""
        }
      ],
      updateData: [{}],
      devieForm: {
        id: "",
        alarmLevel: ""
      },
      policyData: [{}],
      managePageInfo: {
        page: 1,
        pageNo: 1,
        /*总页数*/
        totalPage: 0,
        /*总条数*/
        totalCount: 0,
        size: 10
      }
    };
  },
  created() {
    this.searchList();
  },
  methods: {
    searchList() {
      var param = this.managePageInfo;
      param.page = parseInt(this.managePageInfo.pageNo);
      param.param = this.devieForm;
      http(api.alarmPolicyManagement.queryManagement, param).then(res => {
        this.policyData = res.data.list;
        this.managePageInfo.totalPage = res.data.pages;
        this.managePageInfo.totalCount = res.data.total;
        this.paginationShow = true;
        if (res.data.pageNum > res.data.pages && res.data.total != 0) {
          this.managePageInfo.page = res.data.pages;
          this.searchList();
        } else {
          this.managePageInfo.page = res.data.pageNum;
        }
      });
    },
    handleSizeChange(val) {
      this.$nextTick(() => this.searchList());
    },
    handleCurrentChange(val) {
      this.searchList();
    },
    updateOpen(row) {
      this.updateData = row;
      this.reviseForm = row;
      if (this.reviseForm.isEnable == 0) {
        this.reviseForm.isEnable = "0";
      } else if (this.reviseForm.isEnable == 1) {
        this.reviseForm.isEnable = "1";
      }
      this.reviseDialogFormVisible = true;
    },
    update() {
      if (this.reviseForm.isEnable == "1") {
        this.reviseForm.isEnable == 1;
      } else if (this.reviseForm.isEnable == "0") {
        this.reviseForm.isEnable == 0;
      }
      http(api.alarmPolicyManagement.updateManagement, this.updateData)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.reviseDialogFormVisible = false;
          this.searchList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "修改失败，请稍后再试"
          });
        });
    },
    deletemanage(row) {
      http(api.alarmPolicyManagement.deleteManagement, row)
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.searchList();
          this.reviseDialogFormVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "删除失败，请稍后再试"
          });
        });
    },
    save() {
      http(api.alarmPolicyManagement.saveManagement, this.addForm)
        .then(res => {
          this.addDialogFormVisible = false;
          this.$message({
            type: "success",
            message: "新增成功"
          });
          this.searchList();
        })
        .catch(() => {
          this.addDialogFormVisible = false;
          this.$message({
            type: "info",
            message: "新增失败，请稍后再试"
          });
        });
    },
    changeUserState(row) {
      if (row.isEnable == 1) {
        row.isEnable = 0;
      } else if (row.isEnable == 0) {
        row.isEnable = 1;
      }
      http(api.alarmPolicyManagement.updateManagement, row).then(res => {
        this.searchList();
        console.log(res);
      });
    },
    inputValue(value) {
      console.log(value);
      if (value.length > 0) {
        this.min_isDis = true;
      } else {
        this.min_isDis = false;
      }
    },
    inputValues(value) {
      if (value.length > 0) {
        this.max_isDis = true;
      } else {
        this.max_isDis = false;
      }
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
