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
              <el-form-item label="设备类型id:"> 
                <el-input
                  v-model="devieForm.id"
                  placeholder="请输入ID"
                ></el-input>
              </el-form-item>
            </td>
            <td>
               <el-form-item label="设备类型名称:">
                  <el-input
                    v-model="devieForm.deviceTypeName"
                    placeholder="请输入设备名称"
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
            label="设备类型ID"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deviceTypeName"
            label="设备类型名称"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="modelNumber"
            label="型号"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="记录创建时间"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="记录更新时间"
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
        :current-page.sync="deviceTypePageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="deviceTypePageInfo.totalCount"
      >
      </el-pagination>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      title="设备新增"
      :visible.sync="addDialogFormVisible"
      class="addDialog"
    >
      <el-form
        class="formInput"
        :model="addForm"
      >
          <el-form-item label="设备类型名称:">
            <el-input
              style="width:350px;"
              v-model="addForm.deviceTypeName"
            ></el-input>
          </el-form-item>
          <el-form-item label="品牌名称:">
            <el-input
              style="width:350px;"
              v-model="addForm.brandName"
            ></el-input>
          </el-form-item>
        <el-form-item label="型号:">
          <el-input
            style="width:350px;"
            v-model="addForm.modelNumber"
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
          @click="save"
        >确 定</el-button>
      </div>
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

        <el-form-item label="设备名称:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.deviceTypeName"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备IP:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.brandName"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备端口:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.modelNumber"
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
      reviseDialogFormVisible: false,
      addDialogFormVisible: false,
      addForm: {
        id: "",
        deviceTypeName: "",
        brandName: "",
        modelNumber: ""
      },
      reviseForm: {},
      devieForm: {
        id: "",
        deviceTypeName: ""
      },
      deviceData: [{}],
      deviceTypePageInfo: {
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
  created(){
    this.searchList()
  },
  methods: {
    searchList() {
      var param = this.deviceTypePageInfo;
      param.page = parseInt(this.deviceTypePageInfo.pageNo);
      param.param = this.devieForm;
      http(api.infoup.queryDeviceType, param).then(res => {
        this.deviceData = res.data.list;
        this.deviceTypePageInfo.totalPage = res.data.pages;
        this.deviceTypePageInfo.totalCount = res.data.total;
        this.paginationShow = true;
        if (res.data.pageNum > res.data.pages &&res.data.total!=0) {
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
    updateOpen(row){
      this.reviseForm=row;
      this.reviseDialogFormVisible=true;
    },
    update(){
      http(api.infoup.updateDeviceType, this.reviseForm)
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
      http(api.infoup.deleteDeviceType, row)
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
      http(api.infoup.saveDeviceType, this.addForm)
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
    changeUserState(row){
      if(row.isEnable==1){
        row.isEnable=0;
      }else if(row.isEnable==0){
        row.isEnable=1;
      }
      http(api.infoup.updateDeviceType, row)
        .then(res => {
          this.searchList();
          console.log(res);
        })
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
