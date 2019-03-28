<template>
  <div class="alarmPolicymodel common deviceManagent">
    <div class="topInput">
      <el-form
        :model="devieForm"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
              <el-form-item label="告警模板ID:">
                <el-input
                  v-model="devieForm.alarm_policy_model_id"
                  placeholder="请输入告警模板ID"
                ></el-input>
              </el-form-item>
            </td>
            <td>
             <el-form-item label="告警等级:">
                <el-input
                  v-model="devieForm.alarm_level"
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
            prop="alarm_policy_model_id"
            label="告警模板ID"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="device_type_id"
            label="设备类型ID"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="channel_type_id"
            label="通道类型ID"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="switch_value"
            label="报警值"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="alarm_level"
            label="告警等级"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="alarm_times"
            label="告警次数"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="alarm_filter_times"
            label="过滤次数"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="up_event_type"
            label="上限告警事件"
            align="center"
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="down_event_type"
            label="下限告警事件"
            align="center"
            width="110"
          >
          </el-table-column>

          <el-table-column
            prop="is_enable"
            label="是否启用"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="valueStatu"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change='changeUserState(scope.row)'
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="revise"
            label="修改"
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
        <el-form-item label="告警模板ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_policy_model_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.device_type_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="通道类型ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.channel_type_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="报警上限:">
          <el-input
            style="width:350px;"
            v-model="addForm.max_value"
          ></el-input>
        </el-form-item>
        <el-form-item label="报警下限:">
          <el-input
            style="width:350px;"
            v-model="addForm.min_value"
          ></el-input>
        </el-form-item>
        <el-form-item label="报警值:">
          <el-input
            style="width:350px;"
            v-model="addForm.switch_value"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警等级:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_level"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警次数:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_times"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警过滤次数:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_filter_times"
          ></el-input>
        </el-form-item>
        <el-form-item label="上限告警事件:">
          <el-input
            style="width:350px;"
            v-model="addForm.up_event_type"
          ></el-input>
        </el-form-item>
        <el-form-item label="下限告警事件:">
          <el-input
            style="width:350px;"
            v-model="addForm.down_event_type"
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
        <el-form-item label="告警模板ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_policy_model_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.device_type_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="通道类型ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.channel_type_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="报警上限:">
          <el-input
            style="width:350px;"
            v-model="addForm.max_value"
          ></el-input>
        </el-form-item>
        <el-form-item label="报警下限:">
          <el-input
            style="width:350px;"
            v-model="addForm.min_value"
          ></el-input>
        </el-form-item>
        <el-form-item label="报警值:">
          <el-input
            style="width:350px;"
            v-model="addForm.switch_value"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警等级:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_level"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警次数:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_times"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警过滤次数:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_filter_times"
          ></el-input>
        </el-form-item>
        <el-form-item label="上限告警事件:">
          <el-input
            style="width:350px;"
            v-model="addForm.up_event_type"
          ></el-input>
        </el-form-item>
        <el-form-item label="下限告警事件:">
          <el-input
            style="width:350px;"
            v-model="addForm.down_event_type"
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
      valueStatu: true,
      currentPage4: 4,
      addForm: {
        alarm_policy_model_id: "",
        device_type_id: "",
        channel_type_id: "",
        max_value: "",
        min_value: "",
        switch_value: "",
        alarm_level: "",
        alarm_times: "",
        alarm_filter_times: "",
        up_event_type: "",
        down_event_type: ""
      },
      reviseForm: {
        alarm_policy_model_id: "",
        device_type_id: "",
        channel_type_id: "",
        max_value: "",
        min_value: "",
        switch_value: "",
        alarm_level: "",
        alarm_times: "",
        alarm_filter_times: "",
        up_event_type: "",
        down_event_type: ""
      },
      devieForm: {
        alarm_policy_id: "",
        alarm_level: ""
      },
      policyData: [
        {}
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
