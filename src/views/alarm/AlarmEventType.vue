<template>
  <div class="alarmEventType common deviceManagent">
    <div class="topInput">
      <el-form
        :model="devieForm"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
             <el-form-item label="告警事件名称:">
                <el-input
                  v-model="devieForm.alarmEventName"
                  placeholder="请输入告警事件名称"
                ></el-input>
              </el-form-item>
            </td>
            <td>
             <el-form-item label="告警事件ID:">
                <el-input
                  v-model="devieForm.alarmEventID"
                  placeholder="请输入ID"
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
          :data="sightData"
          style="width: 100%;color:#fff;"
        >
          <el-table-column
            type="index"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="alarm_id"
            label="告警事件ID"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="event_name"
            label="告警事件名称"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="event_level"
            label="告警事件等级"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="alarm_way"
            label="告警方式"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="alarm_audio"
            label="告警语音格式"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="dis_alarm_audio"
            label="解除语音"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="alarm_sms"
            label="短信告警配置"
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
      title="新增站点"
      :visible.sync="addDialogFormVisible"
      class="addDialog"
    >
      <el-form
        class="formInput"
        :model="addForm"
      >
        <el-form-item label="告警事件ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警事件名称:">
          <el-input
            style="width:350px;"
            v-model="addForm.event_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警事件等级:">
          <el-input
            style="width:350px;"
            v-model="addForm.event_level"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警方式:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_way"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警语音格式:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_audio"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信告警配置:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_sms"
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
        <el-form-item label="告警事件ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.alarm_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警事件名称:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.event_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警事件等级:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.event_level"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警方式:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.alarm_audio"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警语音格式:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.alarm_audio"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信告警配置:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.alarm_sms"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button
          class="btnClose"
          @click="reviseDialogFormVisible = false"
        >取 消</el-button>
        <el-button class="btnDet"  @click="reviseDialogFormVisible = false">确 定</el-button>
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
      valueStatu: true,
      addForm: {
        alarm_id: "",
        event_name: "",
        event_level: "",
        alarm_way: "",
        alarm_audio: "",
        alarm_sms: ""
      },
      reviseForm: {
        alarm_id: "",
        event_name: "",
        event_level: "",
        alarm_way: "",
        alarm_audio: "",
        alarm_sms: ""
      },
      devieForm: {
        alarmEventName: "",
        alarmEventID: ""
      },
      sightData: [
        {
          alarm_id: "RRRTQWE",
          event_name: "MMCP001",
          event_level: "遥信",
          alarm_way: "HHHPPS",
          alarm_audio: "一级单位",
          dis_alarm_audio: "GGGGFFFF",
          alarm_sms: "GGGGFFFF",
          revise: "",
          deleter: ""
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
    },
    changeUserState(row) {
      console.log(row);
    },
    // 打开编辑用户对话框
    showEditDialog(row) {
      console.log(row);
      this.reviseForm.alarm_id = row.alarm_id;
      this.reviseForm.event_name = row.event_name;
      this.reviseForm.event_level = row.event_level;
      this.reviseForm.alarm_way = row.alarm_way;
      this.reviseForm.alarm_audio = row.alarm_audio;
      this.reviseForm.alarm_sms = row.alarm_sms;
      this.reviseDialogFormVisible = true;
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
