<template>
  <div class="station common deviceManagent">
    <div class="topInput">
      <el-form
        :model="stationBean"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
              <el-form-item label="站点名称:">
                <el-input
                  v-model="stationBean.stationName"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="子站STU编号:">
                <el-input
                  v-model="stationBean.stationSubId"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </td>
            <td rowspan="2"  style="line-height:20px;">
               <el-form-item >
                <el-button
                  icon="fa fa-search"
                  class="btnStyle selectBtn"
                  @click="searchStationListByParam()"
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
          :data="stationBeanList"
          style="width: 100%;color:#fff;"
          @row-click="showPeopleDetail"
        >
          <el-table-column
            prop="id"
            label="站点ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="stationName"
            label="站点名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="stationSubId"
            label="子站STU编号"
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
        :current-page.sync="pageRequest.page"
        :page-sizes="[10,30,50,100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
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
        <el-form-item label="站点自增ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.stationID"
          ></el-input>
        </el-form-item>
        <el-form-item label="子站STU编号ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.station_sub_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点名称:">
          <el-input
            style="width:350px;"
            v-model="addForm.station_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.station_parent_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="绑定配电房ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.power_room_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点类型ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.station_type_id"
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
        <el-form-item label="站点自增ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.stationID"
          ></el-input>
        </el-form-item>
        <el-form-item label="子站STU编号ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.station_sub_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点名称:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.station_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.station_parent_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="绑定配电房ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.power_room_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点类型ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.station_type_id"
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
import http from "@/utils/HttpService";
import api from "@/api/API";

export default {
  data() {
    return {
      reviseDialogFormVisible: false,
      addDialogFormVisible: false,
      currentPage4: 4,
      valueStatu: true,
      currentRow:null,
      
      totalPage:0, //总页数
      totalCount:0, //总条数
      pageRequest: {
        page: 1, //当前在第几页
        size: 10,
        order:'',
        param: 0
      },
      stationBean:{
        id:null,
        stationSubId:null,
        stationName:null,
        stationParentId:null,
        powerRoomId:null,
        stationTypeId:null,
        createTime:null,
        updateTime:null,
        powerRoomName:null
      },
      stationBeanList:[],

      addForm: {
        stationID: "",
        station_sub_id: "",
        station_name: "",
        station_parent_id: "",
        station_type_id: "",
        power_room_id: ""
      },
      reviseForm: {
        stationID: "",
        station_sub_id: "",
        station_name: "",
        station_parent_id: "",
        station_type_id: "",
        power_room_id: ""
      },
      sightData: [
      ]
    };
  },
  methods: {
    //改变每页显示数量时调用
    handleSizeChange(val) {
      this.pageRequest.size=val;
      this.searchStationList();
    },
    //点击下一页和点击页码时执行
    handleCurrentChange(val) {
      this.pageRequest.page=val;
      this.searchStationList();
    },
    changeUserState(row) {
      console.log(row);
    },
    // 打开编辑用户对话框
    showEditDialog(row) {
      console.log(row);
      this.reviseForm.stationID = row.stationID;
      this.reviseForm.station_sub_id = row.station_sub_id;
      this.reviseForm.station_name = row.station_name;
      this.reviseForm.station_parent_id = row.station_parent_id;
      this.reviseForm.station_type_id = row.station_type_id;
      this.reviseForm.power_room_id = row.power_room_id;
      this.reviseDialogFormVisible = true;
    },
    selectPeople(row){
      console.log(row)
    },
    showPeopleDetail(val){
      console.log(val,123)
      this.sightData.forEach((item,index) => {
        console.log(item.stationID,val.stationID)
        if (item.stationID == val.stationID) {
          console.log(index)
          this.$set(this.sightData[index],'checked',true)
          // item.checked = true;
        } else {
          this.$set(this.sightData[index],'checked',false)
          // item.checked = false;
        }
      });
      console.log(this.sightData)
    },
    demo(row){
      console.log(row);
    },
    //查询站点
    searchStationList() {
      this.pageRequest.param = this.stationBean;
      http(api.infoup.queryStation,this.pageRequest).then(res => {
          this.stationBeanList=res.data.list;
          this.pageRequest.page=res.data.pageNum;
          this.totalPage=res.data.pages;
          this.totalCount=res.data.total;
      }).catch(() => {
        this.$message({
          type: "info",
          message: "请稍后再试"
        })
      });
    },
    //点击查询-模糊查询
    searchStationListByParam(){
      this.pageRequest.page=1;
      //this.pageRequest.order="fuzzy";
      this.searchStationList();
    }
  },
  mounted(){
    this.pageRequest.page=1;
    this.pageRequest.size=10;
    //this.stationBean=null;
    this.searchStationList();
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
