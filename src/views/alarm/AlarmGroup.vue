<template>
  <div class="alarmGroupType common deviceManagent">
    <div class="topInput">
      <el-form
        :model="devieForm"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
              <el-form-item label="告警组名称:">
                <el-input
                  v-model="devieForm.alarmGroupName"
                  placeholder="请输入告警组名称"
                ></el-input>
              </el-form-item>
            </td>
            <td>
             <el-form-item label="告警组ID:">
                <el-input
                  v-model="devieForm.alarmGroupID"
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
    <!-- 标签页 -->
    <template>
      <el-tabs
        v-model="activeName2"
        type="card"
        class="tap_alarm"
      >
        <el-tab-pane
          label="告警组"
          name="first"
        >
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
                  prop="alarm_group_id"
                  label="告警组ID"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="group_name"
                  label="告警组名称"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="生效时间"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="end_time"
                  label="结束时间"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="station_id"
                  label="站点ID"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="enabled"
                  label="是否启用"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-switch
                      v-model="valueStatu"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    >
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="week"
                  label="告警周期"
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
                      class="btnStyle reviseBtn"
                      @click="showEditDialog(scope.row)"
                    >修改</el-button>
                    <el-button
                      size="mini"
                      class="btnStyle deleterBtn"
                      @click="del(scope.row)"
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
        </el-tab-pane>
        <el-tab-pane
          label="告警组员"
          name="second"
        >
          <!-- 表格 -->
          <div class="container">
            <template>
              <el-table
                :data="alarmGroupData"
                style="width: 100%;color:#fff;"
              >
                <el-table-column
                  type="index"
                  width="50"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="alarm_group_id"
                  label="告警组员分配ID"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="group_id"
                  label="告警组ID"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="member_id"
                  label="告警组员ID"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="revise"
                  label="操作"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      class="btnStyle"
                      @click="showEditMemberDialog(scope.row)"
                    >修改</el-button>
                    <el-button
                      size="mini"
                      class="btnStyle"
                      @click="del(scope.row)"
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
        </el-tab-pane>
      </el-tabs>
    </template>

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
        <el-form-item label="告警组ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.alarm_group_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警组名称:">
          <el-input
            style="width:350px;"
            v-model="addForm.group_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始生效时间:">
          <el-input
            style="width:350px;"
            v-model="addForm.start_time"
          ></el-input>
        </el-form-item>
        <el-form-item label="结束时间:">
          <el-input
            style="width:350px;"
            v-model="addForm.end_time"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点ID：">
          <el-input
            style="width:350px;"
            v-model="addForm.station_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警周期:">
          <el-input
            style="width:350px;"
            v-model="addForm.week"
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
          @click="addData('addForm')"
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
        <el-form-item label="告警组ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.alarm_group_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警组名称:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.group_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="生效时间:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.start_time"
          ></el-input>
        </el-form-item>
        <el-form-item label="结束时间:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.end_time"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.station_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="告警周期:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.week"
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
          @click="editFrom('reviseForm')"
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
      activeName2: "first",
      currentPage4: 4,
      valueStatu: true,
      isDis:false,
      addForm: {
        alarm_group_id: "",
        group_name: "",
        start_time: "",
        end_time: "",
        station_id: "",
        week: ""
      },
      reviseForm: {
        alarm_group_id: "",
        group_name: "",
        start_time: "",
        end_time: "",
        station_id: "",
        week: "",
        radio:""
      },
      devieForm: {
        alarmGroupName: "",
        alarmGroupID: ""
      },
      sightData: [
        {
          alarm_group_id: "AAAAAAAAAA",
          group_name: "MMCP001",
          start_time: "bbbbbbbb",
          end_time: "HHHPPS",
          station_id: "一级单位",
          is_enable: "GGGGFFFF",
          week: "GGGGFFFF",
          revise: "",
          deleter: ""
        },
        {
          alarm_group_id: "AAAAAAAAAA",
          group_name: "MMCP001",
          start_time: "bbbbbbbb",
          end_time: "HHHPPS",
          station_id: "一级单位",
          is_enable: "GGGGFFFF",
          week: "GGGGFFFF",
          revise: "",
          deleter: ""
        },
        {
          alarm_group_id: "AAAAAAAAAA",
          group_name: "MMCP001",
          start_time: "bbbbbbbb",
          end_time: "HHHPPS",
          station_id: "一级单位",
          is_enable: "GGGGFFFF",
          week: "GGGGFFFF",
          revise: "",
          deleter: ""
        },
        {
          alarm_group_id: "AAAAAAAAAA",
          group_name: "MMCP001",
          start_time: "bbbbbbbb",
          end_time: "HHHPPS",
          station_id: "一级单位",
          is_enable: "GGGGFFFF",
          week: "GGGGFFFF",
          revise: "",
          deleter: ""
        },
        {
          alarm_group_id: "AAAAAAAAAA",
          group_name: "MMCP001",
          start_time: "bbbbbbbb",
          end_time: "HHHPPS",
          station_id: "一级单位",
          is_enable: "GGGGFFFF",
          week: "GGGGFFFF",
          revise: "",
          deleter: ""
        }
      ],
      alarmGroupData: [
        {
          alarm_group_id:"PPPPPPPP",
          group_id:"yyyyyyyyyyyyyyyy",
          member_id:"vvvvvvvvvvvvv"
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
    // 打开修改用户对话框
    showEditDialog(row) {
      console.log(row);
      this.reviseForm.alarm_group_id = row.alarm_group_id;
      this.reviseForm.group_name = row.group_name;
      this.reviseForm.start_time = row.start_time;
      this.reviseForm.end_time = row.end_time;
      this.reviseForm.station_id = row.station_id;
      this.reviseForm.week = row.week;
      // if(this.valueStatu == true){
      //   this.reviseForm.radio = '1'
      // }else{
      //   this.reviseForm.radio = '0'
      // }
      this.reviseDialogFormVisible = true;
    },
    // 删除
    del(row) {
      console.log(row);
      this.sightData.splice(this.sightData.alarm_group_id, 1);
    },
    // 新增
    addData(formData) {
      let obj = {
        alarm_group_id: this.addForm.alarm_group_id,
        group_name: this.addForm.group_name,
        start_time: this.addForm.start_time,
        end_time: this.addForm.end_time,
        station_id: this.addForm.station_id,
        week: this.addForm.week
      };
      // console.log(obj)
      this.sightData.push(obj);
      this.addDialogFormVisible = false;
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
