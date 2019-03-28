<template>
  <div class="alarmPolicyGroup common deviceManagent">
    <div
      class="topInput"
      style="height:120px;"
    >
      <el-form
        :model="standingBookBean"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
              <el-form-item label="区/局：">
                <el-select
                  v-model="standingBookBean.area"
                  filterable
                  clearable
                  placeholder="请输入"
                >
                  <el-option
                    label="天河区"
                    value="1"
                  >天河区</el-option>
                  <el-option
                    label="海珠区"
                    value="2"
                  >海珠区</el-option>
                  <el-option
                    label="番禺区"
                    value="3"
                  >番禺区</el-option>
                </el-select>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="班/组:">
                <el-input
                  v-model="standingBookBean.group"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item
                label="变电站:"
                style="margin-right:20px;"
              >
                <el-input
                  v-model="standingBookBean.substation"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </td>

          </tr>
          <tr>
            <td>
              <el-form-item label="馈线：">
                <el-input
                  v-model="standingBookBean.feeder"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="配电房:">
                <el-input
                  v-model="standingBookBean.powerRoom"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </td>
            <td
              rowspan="2"
              style="width: 100px;line-height:20px;"
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
          :data="standingBookBeanList"
          style="width: 100%;color:#fff;"
        >
          <el-table-column
            prop="id"
            label="台账ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="area"
            label="区/局"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="group"
            label="班/组"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="substation"
            label="变电站"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="feeder"
            label="馈线"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="powerRoom"
            label="配电房"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="lng"
            label="经度"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="lat"
            label="纬度"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
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
                class="btnStyle selectBtn"
                @click="reviseDialogFormVisible = true"
              >修改</el-button>
              <el-button
                size="mini"
                class="btnStyle selectBtn"
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
      title="通道新增"
      :visible.sync="addDialogFormVisible"
      class="addDialog"
    >
      <el-form
        class="formInput"
        :model="addForm"
      >
        <el-form-item label="台账ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.book_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="市:">
          <el-input
            style="width:350px;"
            v-model="addForm.city"
          ></el-input>
        </el-form-item>
        <el-form-item label="区/局:">
          <el-input
            style="width:350px;"
            v-model="addForm.area"
          ></el-input>
        </el-form-item>
        <el-form-item label="班/组:">
          <el-input
            style="width:350px;"
            v-model="addForm.group"
          ></el-input>
        </el-form-item>
        <el-form-item label="变电站ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.substation_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="变电站:">
          <el-input
            style="width:350px;"
            v-model="addForm.substation"
          ></el-input>
        </el-form-item>
        <el-form-item label="馈线ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.feeder_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="馈线:">
          <el-input
            style="width:350px;"
            v-model="addForm.feeder"
          ></el-input>
        </el-form-item>
        <el-form-item label="配电房ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.power_room_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="配电房名称:">
          <el-input
            style="width:350px;"
            v-model="addForm.power_room"
          ></el-input>
        </el-form-item>
        <el-form-item label="经度:">
          <el-input
            style="width:350px;"
            v-model="addForm.lng"
          ></el-input>
        </el-form-item>
        <el-form-item label="纬度:">
          <el-input
            style="width:350px;"
            v-model="addForm.lat"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input
            style="width:350px;"
            v-model="addForm.address"
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
        <el-form-item label="台账ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.book_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="市:">
          <el-input
            style="width:350px;"
            v-model="addForm.city"
          ></el-input>
        </el-form-item>
        <el-form-item label="区/局:">
          <el-input
            style="width:350px;"
            v-model="addForm.area"
          ></el-input>
        </el-form-item>
        <el-form-item label="班/组:">
          <el-input
            style="width:350px;"
            v-model="addForm.group"
          ></el-input>
        </el-form-item>
        <el-form-item label="变电站ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.substation_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="变电站:">
          <el-input
            style="width:350px;"
            v-model="addForm.substation"
          ></el-input>
        </el-form-item>
        <el-form-item label="馈线ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.feeder_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="馈线:">
          <el-input
            style="width:350px;"
            v-model="addForm.feeder"
          ></el-input>
        </el-form-item>
        <el-form-item label="配电房ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.power_room_id"
          ></el-input>
        </el-form-item>
        <el-form-item label="配电房名称:">
          <el-input
            style="width:350px;"
            v-model="addForm.power_room"
          ></el-input>
        </el-form-item>
        <el-form-item label="经度:">
          <el-input
            style="width:350px;"
            v-model="addForm.lng"
          ></el-input>
        </el-form-item>
        <el-form-item label="纬度:">
          <el-input
            style="width:350px;"
            v-model="addForm.lat"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input
            style="width:350px;"
            v-model="addForm.address"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button
          type="btnClose"
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
      totalPage: 0, //总页数
      totalCount: 0, //总条数
      pageRequest: {
        page: 1, //当前在第几页
        size: 10,
        order: "",
        param: 0
      },

      standingBookBean: {
        id: null,
        area: null,
        group: null,
        substationId: null,
        substation: null,
        feederId: null,
        feeder: null,
        powerRoomId: null,
        powerRoom: null,
        lng: null,
        lat: null,
        address: null,
        createTime: null,
        updateTime: null
      },
      standingBookBeanList: [],

      reviseDialogFormVisible: false,
      addDialogFormVisible: false,
      currentPage4: 4,
      addForm: {
        book_id: "",
        city: "",
        area: "",
        group: "",
        substation_id: "",
        substation: "",
        feeder_id: "",
        feeder: "",
        power_room_id: "",
        power_room: "",
        lng: "",
        lat: "",
        address: ""
      },
      reviseForm: {
        book_id: "",
        city: "",
        area: "",
        group: "",
        substation_id: "",
        substation: "",
        feeder_id: "",
        feeder: "",
        power_room_id: "",
        power_room: "",
        lng: "",
        lat: "",
        address: ""
      },
      devieForm: {
        book_id: "",
        power_room_id: "",
        city: ""
      },
      standingData: [{}]
    };
  },
  methods: {
    //改变每页显示数量时调用
    handleSizeChange(val) {
      this.pageRequest.size = val;
      this.searchStandingBookList();
    },
    //点击下一页和点击页码时执行
    handleCurrentChange(val) {
      this.pageRequest.page = val;
      this.searchStandingBookList();
    },
    //查询台账
    searchStandingBookList() {
      this.pageRequest.param = this.standingBookBean;
      http(api.infoup.queryStandingBook, this.pageRequest)
        .then(res => {
          this.standingBookBeanList = res.data.list;
          this.pageRequest.page = res.data.pageNum;
          this.totalPage = res.data.pages;
          this.totalCount = res.data.total;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "请稍后再试"
          });
        });
    },
    //点击查询-模糊查询
    searchStandingBookListByParam() {
      this.pageRequest.page = 1;
      this.searchStandingBookList();
    }
  },
  mounted() {
    this.pageRequest.page = 1;
    this.pageRequest.size = 10;
    this.searchStandingBookList();
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
