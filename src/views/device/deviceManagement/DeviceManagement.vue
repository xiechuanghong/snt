<template>
  <div class="deviceManagent common dialogTan">
    <div class="topInput">
       <el-form
        :model="devieForm"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
              <el-form-item label="设备ID:">
                <el-input
                  v-model="devieForm.id"
                  placeholder="请输入ID"
                ></el-input>
              </el-form-item>
            </td>
            <td>
               <el-form-item label="设备名称:">
                  <el-input
                    v-model="devieForm.deviceName"
                    placeholder="请输入联动类型"
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
            prop="id"
            label="设备ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="stationId"
            label="站点ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deviceSubId"
            label="子站STU"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deviceName"
            label="设备名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deviceTypeId"
            label="设备类型ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="powerRoomId"
            label="配电房ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="powerBoxSubid"
            label="开关柜ID"
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
        :current-page.sync="devicePageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="devicePageInfo.totalCount"
      >
      </el-pagination>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      title="设备新增"
      :visible.sync="addDialogFormVisible"
      class="addDialog"
      @open="handleAddOpen"
    >
      <el-form
        class="formInput"
        :model="addForm"
      >
        <el-form-item label="站点:">
          <el-input
            style="width:350px;"
            v-model="addForm.stationName"
            @focus="openStation"
          ></el-input>
        </el-form-item>
        <el-form-item label="配电房:">
          <el-input
            style="width:350px;"
            v-model="addForm.powerRoomName"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="设备名称:">
          <el-input
            style="width:350px;"
            v-model="addForm.deviceName"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型:">
          <el-input
            style="width:350px;"
            v-model="addForm.deviceTypeName"
            @focus="openType"
          ></el-input>
        </el-form-item>
        <el-form-item label="绑定开关柜:">
          <el-input
            style="width:350px;"
            type="textarea"
            autosize
            ref="addPowerBoxInput"
            v-model="addForm.powerBoxName"
            @focus="openPower"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备STU编号:">
          <el-input
            style="width:350px;"
            v-model="addForm.deviceSubId"
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
    <!-- 点击站点ID弹出框 -->
    <el-dialog
      title="站点ID"
      :visible.sync="zhandianDialogFormVisible"
      class="deviceDialogs"
    >
      <template>
        <el-table
          :data="StationData"
          @current-change="selectStation"
          style="width: 100%;color:#fff;"
        >
          <el-table-column
            prop="id"
            label="站点id"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="stationName"
            label="站点名称"
            align="center"
          >
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @current-change="StationCurrentChange"
        :current-page="StationBoxPageInfo.pageNo"
        :page-size="7"
        background
        style="text-align: center"
        layout="prev, pager, next,total"
        :total="StationBoxPageInfo.totalCount"
      >
      </el-pagination>
    </el-dialog>
    <!-- 设备类型ID弹框 -->
    <el-dialog
      title="设备类型ID"
      :visible.sync="roomDialogFormVisible"
      class="deviceDialogs"
    >
      <template>
        <el-table
          :data="typeData"
          @current-change="selectDeviceType"
          style="width: 100%;color:#fff;"
        >
          <el-table-column
            prop="deviceTypeName"
            label="设备类型名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌名称"
            align="center"
          >
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        style="text-align: center"
        @current-change="typeCurrentChange"
        :current-page.sync="typePageInfo.pageNo"
        :page-size="7"
        background
        layout="prev, pager, next,total"
        :total="typePageInfo.totalCount"
      >
      </el-pagination>
    </el-dialog>
    <!-- 绑定开关柜ID弹框 -->
    <el-dialog
      title="开关柜ID"
      :visible.sync="openDialogFormVisible"
      class="deviceDialogs"
    >
      <template>
        <el-table
          :data="PowerBoxData"
          @current-change="selectPowerBox"
          style="width: 100%;color:#fff;"
        >
          <el-table-column
            prop="powerRoomName"
            label="开关柜"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="powerBoxName"
            label="配电房"
            align="center"
          >
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        style="text-align: center"
        @current-change="PowerCurrentChange"
        :current-page="PowerBoxPageInfo.pageNo"
        :page-size="5"
        background
        layout="prev, pager, next,total"
        :total="PowerBoxPageInfo.totalCount"
      >
      </el-pagination>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog
      title="设备修改"
      :visible.sync="reviseDialogFormVisible"
      class="addDialog"
    >
      <el-form
        class="formInput"
        :model="reviseForm"
      >
        <el-form-item label="站点ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.stationId"
            @focus="openUpdateStation"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.deviceTypeId"
            @focus="openUpdateType"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备名称:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.deviceName"
          ></el-input>
        </el-form-item>
        <el-form-item label="配电房ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.powerRoomId"
            disabled
          ></el-input>
        </el-form-item>

        <el-form-item label="绑定开关柜ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.powerBoxSubid"
            @focus="openUpdatePower"
          ></el-input>
        </el-form-item>
        <el-form-item label="子站STU:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.deviceSubId"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用:">
          <template>
            <el-radio
              v-model="reviseForm.isEnable"
              label="1"
              style="color:#fff;margin-top:14px;"
            >是</el-radio>
            <el-radio
              v-model="reviseForm.isEnable"
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
    <!-- 修改的 ，点击站点ID弹出框 -->
    <el-dialog
      title="站点ID"
      :visible.sync="zhandianIDDialogFormVisible"
      class="deviceDialogs"
    >
      <template>
        <el-table
          :data="StationData"
          @current-change="updatePeoples"
          style="width: 100%;color:#fff;"
          @row-click="editZdLine"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="updatePeoples(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="站点id"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="stationName"
            label="站点名称"
            align="center"
          >
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="StationSizeChange"
        @current-change="StationCurrentChange"
        :current-page.sync="StationBoxPageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="StationBoxPageInfo.totalCount"
      >
      </el-pagination>
      <div style="text-align:center;padding-top:20px;">
        <el-button
          class="btnClose"
          @click="zhandianIDDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="pits"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改的，设备类型ID弹框 -->
    <el-dialog
      title="设备类型ID"
      :visible.sync="roomIDDialogFormVisible"
      class="deviceDialogs"
    >
      <template>
        <el-table
          :data="typeData"
          @current-change="updatePeople"
          style="width: 100%;color:#fff;"
          @row-click="editTpLine"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="updatePeople(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="设备类型ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deviceTypeName"
            label="设备类型名称"
            align="center"
          >
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="typeSizeChange"
        @current-change="typeCurrentChange"
        :current-page.sync="typePageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="typePageInfo.totalCount"
      >
      </el-pagination>
      <div style="text-align:center;padding-top:20px;">
        <el-button
          class="btnClose"
          @click="roomIDDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="bits"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改的，绑定开关柜ID弹框 -->
    <el-dialog
      title="开关柜ID"
      :visible.sync="openReviceDialogFormVisible"
      class="deviceDialogs"
    >
      <template>
        <el-table
          :data="PowerBoxData"
          @current-change="updatePeopl"
          style="width: 100%;color:#fff;"
          @row-click="editOpLine"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="updatePeopl(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="powerRoomId"
            label="开关柜ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="powerBoxSubid"
            label="配电房ID"
            align="center"
          >
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="PowerSizeChange"
        @current-change="PowerCurrentChange"
        :current-page.sync="PowerBoxPageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="PowerBoxPageInfo.totalCount"
      >
      </el-pagination>
      <div style="text-align:center;padding-top:20px;">
        <el-button
          class="btnClose"
          @click="openReviceDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="wits"
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
      // 站点ID弹框
      zhandianDialogFormVisible: false,
      // 设备类型ID弹出框
      roomDialogFormVisible: false,
      // 绑定开关柜ID
      openDialogFormVisible: false,
      // 修改的点击站点ID弹出框
      zhandianIDDialogFormVisible: false,
      // 修改的点击站点ID行弹出框
      zhandianIDLineDialogFormVisible: false,
      // 修改的设备类型ID弹出框
      roomIDDialogFormVisible: false,
      // 修改的绑定开关柜ID
      openReviceDialogFormVisible: false,
      addForm: {
        id: "",
        stationId: "",
        deviceSubId: "",
        deviceName: "",
        deviceTypeId: "",
        isEnable: "1",
        powerRoomId: "",
        powerBoxSubid: ""
      },
      reviseForm: {},
      devieForm: {
        id: "",
        deviceName: ""
      },
      deviceData: [{}],
      devicePageInfo: {
        page: 1,
        pageNo: 1,
        /*总页数*/
        totalPage: 0,
        /*总条数*/
        totalCount: 0,
        size: 10
      },
        PowerBoxPageInfo: {
          page: 1,
          pageNo: 1,
          /*总页数*/
          totalPage: 0,
          /*总条数*/
          totalCount: 0,
          size: 5
        },
        StationBoxPageInfo: {
          page: 1,
          pageNo: 1,
          /*总页数*/
          totalPage: 0,
          /*总条数*/
          totalCount: 0,
          size: 7
        },
        typePageInfo: {
          page: 1,
          pageNo: 1,
          /*总页数*/
          totalPage: 0,
          /*总条数*/
          totalCount: 0,
          size: 7
        },
        PowerBoxData: [
          {
          }
        ],
        StationData: [
          {
          }
        ],
        typeData:[{}],
        currentRow:{},
        currentRows:{},
        wurrentRows:{},
        upcurrentRow:{},
        upcurrentRows:{},
        upwurrentRows:{},
    };
  },
  created() {
    this.searchList();
  },
  methods: {
    handleAddOpen(){
      this.addForm = {}
    },
    searchList() {
      var param = this.devicePageInfo;
      param.page = parseInt(this.devicePageInfo.pageNo);
      param.param = this.devieForm;
      http(api.infoup.queryDevice, param).then(res => {
        this.deviceData = res.data.list;
        this.devicePageInfo.totalCount = res.data.total;
        this.paginationShow = true;
        // if (res.data.pageNum > res.data.pages && res.data.total != 0) {
        //   this.devicePageInfo.page = res.data.pages;
        //   this.searchList();
        // } else {
        //   this.devicePageInfo.page = res.data.pageNum;
        // }
      });
    },
    handleSizeChange(val) {
      this.$nextTick(() => this.searchList());
    },
    handleCurrentChange(val) {
      this.searchList();
    },
    updateOpen(row) {
      this.reviseForm = row;
      if (this.reviseForm.isEnable == 0) {
        this.reviseForm.isEnable = "0";
      } else if (this.reviseForm.isEnable == 1) {
        this.reviseForm.isEnable = "1";
      }
      this.reviseDialogFormVisible = true;
    },
    StationCurrentChange(val) {
      this.StationBoxPageInfo.pageNo = val
      this.StationList();
    },
    PowerCurrentChange(val) {
      this.PowerBoxPageInfo.pageNo = val
      this.searchList();
    },
    typeCurrentChange(val) {
      this.typePageInfo.pageNo = val
      this.typeList();
    },
      StationList() {
        var param = this.StationBoxPageInfo;
        param.page = parseInt(this.StationBoxPageInfo.pageNo);
        http(api.infoup.queryStation, param).then(res => {
          this.StationData = res.data.list;
          this.StationBoxPageInfo.totalCount = res.data.total;
          this.paginationShow = true;
          // if (res.data.pageNum > res.data.pages &&res.data.total!=0) {
          //   this.StationBoxPageInfo.page = res.data.pages;
          //   this.searchList();
          // } else {
          //   this.StationBoxPageInfo.page = res.data.pageNum;
          // }
        })
      },
      PowerList() {
        var param = this.PowerBoxPageInfo;
        param.page = parseInt(this.PowerBoxPageInfo.pageNo);
        param.param = {powerRoomId:this.addForm.powerRoomId}
        http(api.infoup.queryPowerBox, param).then(res => {
          this.PowerBoxData = res.data.list;
          this.PowerBoxPageInfo.totalCount = res.data.total;
          this.paginationShow = true;
          // if (res.data.pageNum > res.data.pages &&res.data.total!=0) {
          //   this.PowerBoxPageInfo.page = res.data.pages;
          //   this.searchList();
          // } else {
          //   this.PowerBoxPageInfo.page = res.data.pageNum;
          // }
        })
      },
      typeList() {
        var param = this.typePageInfo;
        param.page = parseInt(this.typePageInfo.pageNo);
        http(api.infoup.queryDeviceType, param).then(res => {
          this.typeData = res.data.list;
          this.typePageInfo.totalPage = res.data.pages;
          this.typePageInfo.totalCount = res.data.total;
          this.paginationShow = true;
          if (res.data.pageNum > res.data.pages &&res.data.total!=0) {
            this.typePageInfo.page = res.data.pages;
            this.searchList();
          } else {
            this.typePageInfo.page = res.data.pageNum;
          }
        })
      },
      openStation(){
        this.StationList();
        this.zhandianDialogFormVisible=true;
      },
      openPower(){
        this.$refs.addPowerBoxInput.blur()
        if(this.addForm.hasOwnProperty('powerRoomId')){
          this.openDialogFormVisible=true;
          this.PowerList();
        }else{
          this.$alert('',"请先选择站点", {type:'info',center:'true',callback:action => {
              this.openStation();
            }
          })
        }
      },
      openType(){
        this.roomDialogFormVisible=true;
        this.typeList();
      },
      openUpdateStation(){
        this.zhandianIDDialogFormVisible=true;
        this.StationList();
      },
      openUpdatePower(){
        this.openReviceDialogFormVisible=true;
        this.PowerList();
      },
      openUpdateType(){
        this.roomIDDialogFormVisible=true;
        this.typeList();
      },
      searchList() {
        var param = this.devicePageInfo;
        param.page = parseInt(this.devicePageInfo.pageNo);
        param.param = this.devieForm;
        http(api.infoup.queryDevice, param).then(res => {
          this.deviceData = res.data.list;
          this.devicePageInfo.totalPage = res.data.pages;
          this.devicePageInfo.totalCount = res.data.total;
          this.paginationShow = true;
          if (res.data.pageNum > res.data.pages &&res.data.total!=0) {
            this.devicePageInfo.page = res.data.pages;
            this.searchList();
          } else {
            this.devicePageInfo.page = res.data.pageNum;
          }
        })
      },
      handleSizeChange(val) {
        this.$nextTick(() =>this.searchList());
      },
      handleCurrentChange(val) {
        this.searchList();
      },
      updateOpen(row){
        this.reviseForm=row;
        if(this.reviseForm.isEnable==0){
          this.reviseForm.isEnable="0";
        }else if( this.reviseForm.isEnable==1){
          this.reviseForm.isEnable="1";
        }
        this.reviseDialogFormVisible=true;
      },
      update(){
        if(this.reviseForm.isEnable=="1"){
          this.reviseForm.isEnable==1
        }else if(this.reviseForm.isEnable=="0"){
          this.reviseForm.isEnable==0
        }
        http(api.infoup.updateDevice, this.reviseForm)
          .then(res => {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.reviseDialogFormVisible = false
            this.searchList();
          }).catch(() => {
          this.$message({
            type: "info",
            message: "修改失败，请稍后再试"
          });
        });
    },
    deletemanage(row) {
      http(api.infoup.deleteDevice, row)
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.searchList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "删除失败，请稍后再试"
          });
        });
    },
    save() {
      http(api.infoup.saveDevice, this.addForm)
        .then(res => {
          this.addDialogFormVisible = false;
          this.searchList();
          this.$message({
            type: "success",
            message: "新增成功"
          });
        })
        .catch(() => {
          this.addDialogFormVisible = false;
          this.$message({
            type: "info",
            message: "新增失败，请稍后再试"
          });
        });
      },
      changeUserState(row){
        if(row.isEnable==1){
          row.isEnable=0;
        }else if(row.isEnable==0){
          row.isEnable=1;
        }
        http(api.infoup.updateDevice, row)
          .then(res => {
            this.searchList();
            console.log(res);
          })
      },
      selectDeviceType(row){
        this.addForm.deviceTypeId=row.id ;
        this.addForm.deviceTypeName=row.deviceTypeName ;
        this.roomDialogFormVisible=false;
      },
      updatePeople(row){
        this.upcurrentRow = row;
      },
      bit(){
        this.addForm.deviceTypeId=this.currentRow.id ;
        this.addForm.deviceTypeName=this.currentRow.deviceTypeName ;
        this.roomDialogFormVisible=false;
      },
      bits(){
        this.reviseForm.deviceTypeId=this.upcurrentRow.id ;
        this.roomIDDialogFormVisible=false;
      },
      selectStation(row){
        // this.currentRows = row;
        this.addForm.stationId=row.id ;
        this.addForm.stationName=row.stationName ;
        this.addForm.powerRoomId=row.powerRoomId ;
        this.addForm.powerRoomName=row.powerRoomName ;
        this.zhandianDialogFormVisible=false;
      },
      updatePeoples(row){
        this.upcurrentRows = row;
      },
      pit(){
        this.addForm.stationId=this.currentRows.id ;
        this.addForm.stationName=this.currentRows.stationName ;
        this.addForm.powerRoomId=this.currentRows.powerRoomId ;
        this.addForm.powerRoomName=this.currentRows.powerRoomName ;
        this.zhandianDialogFormVisible=false;
      }
      ,
      pits(){
        this.reviseForm.stationId=this.upcurrentRows.id ;
        this.zhandianIDDialogFormVisible=false;
      }
      ,
      selectPowerBox(row){
        this.addForm.powerBoxSubid=row.powerBoxSubid;
        this.addForm.powerBoxName=row.powerBoxName;
        this.openDialogFormVisible=false;
      },
      updatePeopl(row){
        this.upwurrentRows = row;
      },
      wit(){
        this.addForm.powerBoxSubid=this.wurrentRows.powerBoxSubid;
        this.addForm.powerBoxName=this.wurrentRows.powerBoxName;
        this.openDialogFormVisible=false;
      }
      ,
      wits(){
        this.reviseForm.powerRoomId=this.upwurrentRows.powerRoomId ;
        this.reviseForm.powerBoxSubid=this.upwurrentRows.powerBoxSubid;
        this.openReviceDialogFormVisible=false;
    },
    changeUserState(row) {
      if (row.isEnable == 1) {
        row.isEnable = 0;
      } else if (row.isEnable == 0) {
        row.isEnable = 1;
      }
      http(api.infoup.updateDevice, row).then(res => {
        this.searchList();
        console.log(res);
      });
    },
    // 站点id弹框的，点击每行选中
    selectLine(val) {
      this.StationData.forEach((item, index) => {
        if (item.id == val.id) {
          this.$set(this.StationData[index], "checked", true);
        } else {
          this.$set(this.StationData[index], "checked", false);
        }
      });
    },
    // 设备类型ID的，点中每行选中
    typeLine(val) {
      this.typeData.forEach((item, index) => {
        if (item.id == val.id) {
          this.$set(this.typeData[index], "checked", true);
        } else {
          this.$set(this.typeData[index], "checked", false);
        }
      });
    },
    // 绑定开关柜ID的，点中每行选中
    openLine(val) {
      this.PowerBoxData.forEach((item, index) => {
        if (item.id == val.id) {
          this.$set(this.PowerBoxData[index], "checked", true);
        } else {
          this.$set(this.PowerBoxData[index], "checked", false);
        }
      });
    },
    // 修改的点击站点ID的，点中每行选中
    editZdLine(val) {
      this.StationData.forEach((item, index) => {
        if (item.id == val.id) {
          this.$set(this.StationData[index], "checked", true);
        } else {
          this.$set(this.StationData[index], "checked", false);
        }
      });
    },
    // 修改设备类型ID的，点中每行选中
    editTpLine(val) {
      this.typeData.forEach((item, index) => {
        if (item.id == val.id) {
          this.$set(this.typeData[index], "checked", true);
        } else {
          this.$set(this.typeData[index], "checked", false);
        }
      });
    },
    // 修改设备类型ID的，点中每行选中
    editOpLine(val) {
      this.PowerBoxData.forEach((item, index) => {
        if (item.id == val.id) {
          this.$set(this.PowerBoxData[index], "checked", true);
        } else {
          this.$set(this.PowerBoxData[index], "checked", false);
        }
      });
    },

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
