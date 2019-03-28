<template>
  <div class="sightTypeManagement common deviceManagent dialogTan">
    <div class="topInput">
      <el-form
        :model="devieForm"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
             <el-form-item label="通道类型名称:">
                <el-input
                  v-model="devieForm.id"
                  placeholder="请输入通道类型名称"
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="设备类型ID:">
                <el-input
                  v-model="devieForm.channelTypeName"
                  placeholder="请输入ID"
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
          :data="sightData"
          style="width: 100%;color:#fff;"
        >
          <el-table-column
            prop="id"
            label="通道类型ID"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deviceTypeId"
            label="设备类型ID"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="channelTypeName"
            label="通道类型名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="valueType"
            label="数据类型"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位"
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
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                class="btnStyle"
                @click="updateOpen(scope.row)"
              >修改</el-button>
               <el-button
                size="mini"
                class="btnStyle"
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
        :current-page.sync="deviceTypePageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="deviceTypePageInfo.totalCount"
      >
      </el-pagination>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      title="通道类型新增"
      :visible.sync="addDialogFormVisible"
      class="addDialog"
    >
      <el-form
        class="formInput"
        :model="addForm"
      >
        <el-form-item label="通道类型ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.deviceTypeId"
            @focus="openDeviceType"
          ></el-input>
        </el-form-item>
        <el-form-item label="通道类型名称:">
          <el-input
            style="width:350px;"
            v-model="addForm.channelTypeName"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据类型:">
          <el-input
            style="width:350px;"
            v-model="addForm.valueType"
          ></el-input>

        </el-form-item>
        <el-form-item label="单位:">
          <el-input
            style="width:350px;"
            v-model="addForm.unit"
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
        :model="reviseForm"
      >
        <el-form-item label="通道类型ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.deviceTypeId"
            @focus="openUpdateDeviceType"
          ></el-input>
        </el-form-item>
        <el-form-item label="通道类型名称:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.channelTypeName"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据类型:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.valueType"
          ></el-input>
        </el-form-item>
        <el-form-item label="单位:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.unit"
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
          @click="reviseDialogFormVisible = false,dTypePageInfo=''"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="reviseDialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!--设备类型-->
    <el-dialog
      title="设备ID"
      :visible.sync="lineDialogFormVisible"
      class="deviceDialogs "
    >
      <template>
        <el-table
          :data="lineDialogData"
          @current-change="selectPeoples"
          style="width: 100%;color:#fff;"
          @row-click="deviceTyLine"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="selectPeoples(scope.row)"
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
          <el-table-column
            prop="brandName"
            label="品牌名称"
            align="center"
          >
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="uPhandleSizeChange"
          @current-change="uPhandleCurrentChange"
          :current-page.sync="dTypePageInfo.pageNo"
          :page-size="3"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dTypePageInfo.totalCount"
        >
        </el-pagination>
      </template>
      <div style="text-align:center;padding-top:20px;">
        <el-button
          class="btnClose"
          @click="addForm.deviceTypeId='',lineDialogFormVisible = false,dTypePageInfo.pageNo=1"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="bit"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改的设备类型弹框 -->
    <el-dialog
      title="设备类型ID"
      :visible.sync="deviceTypeDialogFormVisible"
      class="deviceDialogs "
    >
      <template>
            <el-table
              :data="lineDialogData"
              @current-change="selectUpdatePeoples"
              @row-click="editDeTyLine"
              style="width: 100%;color:#fff;"
            >
              <el-table-column
                label=""
                width="50"
                align="center"
              >
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.checked"
                    @click="selectUpdatePeoples(scope.row)"

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
          <el-table-column
            prop="brandName"
            label="品牌名称"
            align="center"
          >
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="uPhandleSizeChange"
          @current-change="uPhandleCurrentChange"
          :current-page.sync="dTypePageInfo.pageNo"
          :page-size="3"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dTypePageInfo.totalCount"
        >
        </el-pagination>
      </template>
      <div style="text-align:center;padding-top:20px;">
        <el-button
          class="btnClose"
          @click="deviceTypeDialogFormVisible = false,dTypePageInfo.pageNo=1"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="upBit"
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
        paginationShow:false,
        lineDialogFormVisible: false,
        deviceTypeDialogFormVisible:false,
        addForm: {
          id: "",
          deviceTypeId: "",
          channelTypeName: "",
          valueType: "",
          unit: "",
          isEnable:""
        },
        reviseForm: {
        },
        devieForm: {
          id: "",
          channelTypeName: ""
        },
        currentRows:'',
        currentRow:'',
        sightData: [{}],
        lineDialogData: [{}],
        deviceTypePageInfo: {
          page: 1,
          pageNo: 1,
          /*总页数*/
          totalPage: 0,
          /*总条数*/
          totalCount: 0,
          size: 10
        },
        dTypePageInfo: {
          page: 1,
          pageNo: 1,
          /*总页数*/
          totalPage: 0,
          /*总条数*/
          totalCount: 0,
          size: 10
        },
      };
    },
    created() {
      this.searchList();
    },
    methods: {
      searchList() {
        var param = this.deviceTypePageInfo;
        param.page = parseInt(this.deviceTypePageInfo.pageNo);
        param.param = this.devieForm;
        http(api.infoup.queryChanneltype, param).then(res => {
          this.sightData = res.data.list;
          this.deviceTypePageInfo.totalPage = res.data.pages;
          this.deviceTypePageInfo.totalCount = res.data.total;
          this.paginationShow = true;
          if (res.data.pageNum > res.data.pages && res.data.total != 0) {
            this.deviceTypePageInfo.page = res.data.pages;
            this.searchList();
          } else {
            this.deviceTypePageInfo.page = res.data.pageNum;
          }
        })
      },
      handleSizeChange(val) {
        this.$nextTick(() =>this.searchList());
      },
      handleCurrentChange(val) {
        this.searchList();
      },
      uPhandleSizeChange(val) {
        this.$nextTick(() =>this.deviceTypeSelect());
      },
      uPhandleCurrentChange(val) {
        this.deviceTypeSelect();
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
      update(){
        if(this.reviseForm.isEnable==1){
          row.isEnable=0;
        }else if(this.reviseForm.isEnable==0){
          row.isEnable=1;
        }
        http(api.infoup.updateChanneltype, this.reviseForm)
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
          })
        });
      },

      deletemanage(row){
        http(api.infoup.deleteChanneltype, row)
          .then(res => {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.searchList();
          }).catch(() => {
          this.$message({
            type: "info",
            message: "删除失败，请稍后再试"
          })
        });
      },
      save(){
        http(api.infoup.saveChanneltype, this.addForm)
          .then(res => {
            this.addDialogFormVisible=false;
            this.searchList();
            this.$message({
              type: "success",
              message: "新增成功"
            });
          }).catch(() => {
          this.addDialogFormVisible=false;
          this.$message({
            type: "info",
            message: "新增失败，请稍后再试"
          })
        });
      },
      openDeviceType(){
        this.lineDialogFormVisible = true;
        this.deviceTypeSelect();
      },
      selectPeoples(val){
        this.currentRows = val;
      },
      openUpdateDeviceType(){
        this.deviceTypeDialogFormVisible = true;
        this.deviceTypeSelect();
      },
      selectUpdatePeoples(val){
        this.currentRow = val;
      },
      deviceTypeSelect() {
        var param = this.dTypePageInfo;
        param.page = parseInt(this.dTypePageInfo.pageNo);
        http(api.infoup.queryDeviceType, param).then(res => {
          this.lineDialogData = res.data.list;
          this.dTypePageInfo.totalPage = res.data.pages;
          this.dTypePageInfo.totalCount = res.data.total;
          this.paginationShow = true;
          if (res.data.pageNum > res.data.pages && res.data.total != 0) {
            this.dTypePageInfo.page = res.data.pages;
            this.searchList();
          } else {
            this.dTypePageInfo.page = res.data.pageNum;
          }
        });
      },
      bit(){
        this.addForm.deviceTypeId=this.currentRows.id;
        this.lineDialogFormVisible = false;
        this.dTypePageInfo.pageNo=1;
      },
      upBit(){
        this.reviseForm.deviceTypeId=this.currentRows.id;
        this.deviceTypeDialogFormVisible = false;
        this.dTypePageInfo.pageNo=1;
      },
      changeUserState(row){
        if(row.isEnable==1){
          row.isEnable=0;
        }else if(row.isEnable==0){
          row.isEnable=1;
        }
        http(api.infoup.updateChanneltype, row)
          .then(res => {
            this.searchList();
            console.log(res);
          })
      },
      /* 设备类型ID弹框的点击每行选中 */
      deviceTyLine(val) {
        this.lineDialogData.forEach((item, index) => {
          if (item.id == val.id) {
            this.$set(this.lineDialogData[index], "checked", true);
          } else {
            this.$set(this.lineDialogData[index], "checked", false);
          }
        });
      },
      /* 修改的设备类型ID弹框的点击每行选中 */
      editDeTyLine(val) {
        this.lineDialogData.forEach((item, index) => {
          if (item.id == val.id) {
            this.$set(this.lineDialogData[index], "checked", true);
          } else {
            this.$set(this.lineDialogData[index], "checked", false);
          }
        });
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
