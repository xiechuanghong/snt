<template>
  <div class="linkageLog common deviceManagent">
    <div class="topInput">
      <el-form
        :model="devieForm"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
               <el-form-item label="联动配置ID:">
                  <el-input
                    v-model="devieForm.linkage_id"
                    placeholder="请输入ID"
                  ></el-input>
                </el-form-item>
            </td>
            <td>
              <el-form-item label="联动类型:">
                <el-input
                  v-model="devieForm.linkage_type"
                  placeholder="请输入联动类型"
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
          :data="linkageData"
          style="width: 100%;color:#fff;"
        >
          <el-table-column
            prop="id"
            label="联动配置ID"
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
            prop="deviceId"
            label="设备ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="channelId"
            label="通道ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="linkageType"
            label="联动类型"
            align="center"
          >
          </el-table-column>
         
          <el-table-column
            prop="linkageResult"
            label="联动结果"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="linkageTime"
            label="联动时间"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="linkStationId"
            label="被联动站点ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="linkDeviceId"
            label="被联动设备ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="linkChannelId"
            label="被联动通道ID"
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
        :current-page.sync="linkagePageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="linkagePageInfo.totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import http from "@/utils/HttpService";
  import api from "@/api/API";
export default {
  data() {
    return {
      paginationShow:false,
      addForm: {
        linkage_id: "",
        station_id: "",
        device_id: "",
        channel_id: "",
        linkage_type: "",
        linkage_result: "",
        linkage_time: "",
        link_station_id: "",
        link_device_id: "",
        link_channel_id: "",
        radio: "1",
      },
      reviseForm: {
        linkage_id: "",
        station_id: "",
        device_id: "",
        channel_id: "",
        linkage_type: "",
        linkage_result: "",
        linkage_time: "",
        link_station_id: "",
        link_device_id: "",
        link_channel_id: "",
        radio1: "1",
      },
      devieForm: {
        id: "",
        stationId: ""
      },
      linkageData: [
        {
        }
      ],
      linkagePageInfo:{
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
      var param = this.linkagePageInfo;
      param.page = parseInt(this.linkagePageInfo.pageNo);
      param.param = this.devieForm;
      http(api.likageup.queryManagement, param).then(res => {
        this.linkageData = res.data.list;
        this.linkagePageInfo.totalPage = res.data.pages;
        this.linkagePageInfo.totalCount = res.data.total;
        this.paginationShow = true;
        if (res.data.pageNum > res.data.pages && res.data.total != 0) {
          this.linkagePageInfo.page = res.data.pages;
          this.searchList();
        } else {
          this.linkagePageInfo.page = res.data.pageNum;
        }
      });
    },
    handleSizeChange(val) {
      this.$nextTick(() => this.searchList());
    },
    handleCurrentChange(val) {
      this.searchList();
    },
    Radios(value) {
      console.log(value);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
