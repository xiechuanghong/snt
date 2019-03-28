<template>
  <div class="sithtManagement common deviceManagent dialogTan">
    <div class="topInput">
      <el-form
        :model="devieForm"
        class="tableForm"
        label-width="100px"
      >
        <table>
          <tr>
            <td>
              <el-form-item label="通道名称:">
                <el-input
                  v-model="devieForm.id"
                  placeholder="请输入通道名称"
                ></el-input>
              </el-form-item>
            </td>
            <td>
                <el-form-item label="设备ID:">
                  <el-input
                    v-model="devieForm.deviceId"
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
          :data="deviceData"
          style="width: 100%;color:#fff;"
        >
          <el-table-column
            prop="id"
            label="通道ID"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deviceId"
            label="设备ID"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deviceTypeId"
            label="设备类型id"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="channelTypeId"
            label="通道类型ID"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="channelName"
            label="通道名称"
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
            prop="stationId"
            label="站点ID"
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
                class="btnStyle "
                @click="updateOpen(scope.row)"
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
        :current-page.sync="devicePageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="devicePageInfo.totalCount"
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
        <el-form-item label="设备ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.deviceId"
            @focus="openDevice"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.stationId"
            @focus="openStation"
          ></el-input>
        </el-form-item>
        <el-form-item label="通道名称:">
          <el-input
            style="width:350px;"
            v-model="addForm.channelName"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.deviceTypeId"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="通道类型ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.channelTypeId"
            @focus="openChannelType"
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
        <el-form-item label="配电站STU:">
          <el-input
            style="width:350px;"
            v-model="addForm.deviceSubId"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="子站STU:">
          <el-input
            style="width:350px;"
            v-model="addForm.stationSubId"
            disabled
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
    <!-- 点击设备ID弹框 -->
    <el-dialog
      title="设备ID"
      :visible.sync="deviceDialogFormVisible"
      class="deviceDialogs"
    >
      <template>
        <el-table
          :data="deviceDialogData"
          @current-change="selectPeople"
          style="width: 100%;color:#fff;"
          @row-click="openDeviceType"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="selectPeople(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
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
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="deviceDialogPageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="deviceDialogPageInfo.totalCount"
      >
      </el-pagination>
    </el-dialog>
    <!-- 点击行弹出框 -->
    <el-dialog
      title="设备ID"
      :visible.sync="lineDialogFormVisible"
      class="lineDialogs"
    >
      <template>
        <el-table
          :data="lineDialogData"
          @current-change="selectPeoples"
          style="width: 100%;color:#fff;"
          @row-click="deviceLine"
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
          <el-table-column
            prop="modelNumber"
            label="型号"
            align="center"
          >
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="deviceTypeSizeChange"
          @current-change="deviceTypeCurrentChange"
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
          @click="lineDialogFormVisible = false,deviceDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="bit"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 站点ID弹框 -->
    <el-dialog
      title="设备类型ID"
      :visible.sync="standingDialogFormVisible"
      class="deviceDialogs"
    >
      <template>
        <el-table
          :data="StationData"
          @current-change="selectStation"
          style="width: 100%;color:#fff;"
          @row-click="standingLine"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="selectStation(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
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
            label="站点STU"
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
          @click="deviceTypeLineDialogFormVisible = false,standingDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="pit"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 通道类型ID弹框 -->
    <el-dialog
      title="通道类型ID"
      :visible.sync="thoroughfareLineTypeDialogFormVisible"
      class="deviceDialogs"
    >
      <template>
        <el-table
          :data="ChannelTypeData"
          @current-change="selectChannelType"
          style="width: 100%;color:#fff;"
          @row-click="tgfLine"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="selectChannelType(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="通道类型ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="channelTypeName"
            label="通道类型名称"
            align="center"
          >
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="ChannelTypeSizeChange"
        @current-change="ChannelTypeCurrentChange"
        :current-page.sync="ChannelTypePageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="ChannelTypePageInfo.totalCount"
      >
      </el-pagination>
      <div style="text-align:center;padding-top:20px;">
        <el-button
          class="btnClose"
          @click="thoroughfareLineTypeDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="cit"
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

        <el-form-item label="设备ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.deviceId"
            @focus="openUpdateDevice"
          ></el-input>
        </el-form-item>
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
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="通道类型ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.channelTypeId"
            @focus="openUpdateChannelType"
          ></el-input>
        </el-form-item>
        <el-form-item label="通道名称:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.channelName"
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
        <el-form-item label="配电站STU:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.deviceSubId"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="子站STU:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.stationSubId"
            disabled
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
    <!-- 修改的，点击设备ID弹框 -->
    <el-dialog
      title="设备ID"
      :visible.sync="ReviseDeviceDialogFormVisible"
      class="deviceDialogs"
    >
      <template>
        <el-table
          :data="deviceDialogData"
          style="width: 100%;color:#fff;"
          @row-click="openUpdateDeviceType"
          @current-change="selectUpdatePeople"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="selectUpdatePeople(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
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
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="deviceHandleSizeChange"
        @current-change="deviceHandleCurrentChange"
        :current-page.sync="deviceDialogPageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="deviceDialogPageInfo.totalCount"
      >
      </el-pagination>
    </el-dialog>
    <!-- 修改的，点击设备ID行弹出框 -->
    <el-dialog
      title="设备ID"
      :visible.sync="ReviseLineDialogFormVisible"
      class="lineDialogs"
    >
      <template>
        <el-table
          :data="lineDialogData"
          @current-change="selectUpdatePeoples"
          style="width: 100%;color:#fff;"
          @row-click="editDeLine"
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
          <el-table-column
            prop="modelNumber"
            label="型号"
            align="center"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="deviceTypeSizeChange"
          @current-change="deviceTypeCurrentChange"
          :current-page="dTypePageInfo.pageNo"
          :page-size="3"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dTypePageInfo.totalCount"
        >
        </el-pagination>
      </template>
      <div style="text-align:center;padding-top:20px;">
        <el-button
          class="btnClose"
          @click="ReviseDeviceDialogFormVisible = false,ReviseLineDialogFormVisible = false"
        >取 消</el-button>
         <el-button
          class="btnDet"
          @click="upBit"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改的站点ID弹框 -->
    <el-dialog
      title="设备类型ID"
      :visible.sync="RvDeviceTypeDialogFormVisible"
      class="deviceDialogs"
    >
      <template>
        <el-table
          :data="StationData"
          @current-change="selectUpdateStation"
          style="width: 100%;color:#fff;"
          @row-click="editSdLine"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="selectUpdateStation(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
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
            label="站点STU"
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
          @click="RvDeviceTypeDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="upPit"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改的、通道类型ID弹框 -->
    <el-dialog
      title="通道类型ID"
      :visible.sync="RvThoroughfareTypeDialogFormVisible"
      class="deviceDialogs"
    >
      <template>
        <el-table
          :data="ChannelTypeData"
          @current-change="selectUpdateChannelType"
          style="width: 100%;color:#fff;"
          @row-click="editTgLine"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="selectChannelType(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="通道类型ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="channelTypeName"
            label="通道类型名称"
            align="center"
          >
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="ChannelTypeSizeChange"
        @current-change="ChannelTypeCurrentChange"
        :current-page.sync="ChannelTypePageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="ChannelTypePageInfo.totalCount"
      >
      </el-pagination>
      <div style="text-align:center;padding-top:20px;">
        <el-button
          class="btnDet"
          @click="upCit"
        >确 定</el-button>
        <el-button
          class="btnClose"
          @click="RvThoroughfareTypeDialogFormVisible = false"
        >取 消</el-button>
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
        currentPage4: "",
        // 修改
        reviseDialogFormVisible: false,
        // 新增
        addDialogFormVisible: false,
        // 设备ID
        deviceDialogFormVisible: false,
        // 设备行
        lineDialogFormVisible: false,
        // 通道类型ID
        thoroughfareTypeDialogFormVisible: false,
        // 通道类型ID行
        thoroughfareLineTypeDialogFormVisible: false,
        // 修改的设备ID弹框
        ReviseDeviceDialogFormVisible: false,
        // 修改的设备ID行弹框
        ReviseLineDialogFormVisible: false,
        // 修改的站点类型ID弹框
        RvDeviceTypeDialogFormVisible: false,
        // 修改的通道类型ID弹框
        RvThoroughfareTypeDialogFormVisible: false,
        standingDialogFormVisible:false,
        paginationShow: false,
        devicePageInfo: {
          page: 1,
          pageNo: 1,
          /*总页数*/
          totalPage: 0,
          /*总条数*/
          totalCount: 0,
          size: 10
        },
        deviceDialogPageInfo: {
          page: 1,
          pageNo: 1,
          /*总页数*/
          totalPage: 0,
          /*总条数*/
          totalCount: 0,
          size: 10
        }
        ,
        dTypePageInfo: {
          page: 1,
          pageNo: 1,
          /*总页数*/
          totalPage: 0,
          /*总条数*/
          totalCount: 0,
          size: 10
        },
        sighPageInfo: {
          page: 1,
          pageNo: 1,
          /*总页数*/
          totalPage: 0,
          /*总条数*/
          totalCount: 0,
          size: 10
        },
        addForm: {
          deviceId: "",
          deviceTypeId: "",
          channelTypeId: "",
          channelName: "",
          valueType: "",
          unit: "",
          stationId: "",
          deviceSubId: "",
          stationSubId: ""
        },
        reviseForm: {},
        devieForm: {
          id: "",
          deviceId: ""
        },
        typeIdc:{
          id:""
        },
        deviceData: [{}],
        // 点击设备ID
        deviceDialogData: [{}],
        // 点击行
        lineDialogData: [{},{},{},{}],
        // 点击站点ID
        zhandianIDDialogData: [
          {
            deviceID: "三级单位001",
            slteID: "MMCP001",
            deviceName: "1",
            deviceTypeID: "192.168.1.25",
            switchID: "2000",
            openID: "qwww112",
            thoroughfareID: "123"
          }
        ],
        // 点击站点行
        zhandianDialogData: [{}],
        // 设备类型ID
        deviceTypesDialogData: [
          {
            deviceTypeID: "123"
          }
        ],
        // 设备类型ID行
        deviceLineDialogData: [{}],
        // 通道类型ID
        thoroughTypesDialogData: [{}],
        // 通道类型ID行
        tflDialogData:[{}],
        currentRow: '',
        currentRows:'',
        StationRows:'',
        ChannelTypeRows:'',
        tflDialogData: [{}],
        ChannelTypePageInfo: {
          page: 1,
          pageNo: 1,
          /*总页数*/
          totalPage: 0,
          /*总条数*/
          totalCount: 0,
          size: 10
        },
        ChannelTypeData:[{},{},{}],
        StationBoxPageInfo: {
          page: 1,
          pageNo: 1,
          /*总页数*/
          totalPage: 0,
          /*总条数*/
          totalCount: 0,
          size: 10
        },
        StationData: [
          {
          }
        ],
      };
    },
    created() {
      this.searchList();
    },
    methods: {
      searchList() {
        var param = this.devicePageInfo;
        param.page = parseInt(this.devicePageInfo.pageNo);
        param.param = this.devieForm;
        http(api.infoup.queryChannel, param).then(res => {
          this.deviceData = res.data.list;
          this.devicePageInfo.totalPage = res.data.pages;
          this.devicePageInfo.totalCount = res.data.total;
          this.paginationShow = true;
          if (res.data.pageNum > res.data.pages && res.data.total != 0) {
            this.devicePageInfo.page = res.data.pages;
            this.searchList();
          } else {
            this.devicePageInfo.page = res.data.pageNum;
          }
        });
      },
      selectPeople(val){
        this.currentRow = val;
      },
      selectPeoples(val){
        this.currentRows = val;
      },
      selectStation(val){
        this.StationRows = val;
      },
      selectChannelType(val){
        this.ChannelTypeRows=val;
      },
      selectUpdatePeople(val){
        this.currentRow = val;
      },
      selectUpdatePeoples(val){
        this.currentRows = val;
      },
      selectUpdateStation(val){
        this.StationRows = val;
      },
      selectUpdateChannelType(val){
        this.ChannelTypeRows=val;
      },
      cit(){
        this.addForm.channelTypeId=this.ChannelTypeRows.id;
        this.thoroughfareLineTypeDialogFormVisible = false
      },
      pit(){
        this.addForm.stationId=this.StationRows.id;
        this.addForm.stationSubId=this.StationRows.stationSubId;
        this.standingDialogFormVisible = false
      }
      ,
      bit(){
        this.addForm.deviceId=this.currentRow.id;
        this.addForm.deviceSubId=this.currentRow.deviceSubId;
        this.addForm.deviceTypeId=this.currentRows.id;
        this.lineDialogFormVisible = false,this.deviceDialogFormVisible = false
      },
      upCit(){
        this.reviseForm.channelTypeId=this.ChannelTypeRows.id;
        this.RvThoroughfareTypeDialogFormVisible = false
      },
      upPit(){
        this.reviseForm.stationId=this.StationRows.id;
        this.reviseForm.stationSubId=this.StationRows.stationSubId;
        this.RvDeviceTypeDialogFormVisible = false
      }
      ,
      upBit(){
        this.reviseForm.deviceId=this.currentRow.id;
        this.reviseForm.deviceSubId=this.currentRow.deviceSubId;
        this.reviseForm.deviceTypeId=this.currentRows.id;
        this.ReviseDeviceDialogFormVisible = false,this.ReviseLineDialogFormVisible = false
      },
      handleSizeChange(val) {
        this.$nextTick(() => this.searchList());
      },
      handleCurrentChange(val) {
        this.searchList();
      },
      updateOpen(row) {
        this.reviseForm = row;
        this.reviseDialogFormVisible = true;
      },
      update() {
        http(api.infoup.updateChannel, this.reviseForm)
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
        http(api.infoup.deleteChannel, row)
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
        http(api.infoup.saveChannel, this.addForm)
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
        this.addForm={}
      },
      deviceHandleSizeChange(val) {
        this.$nextTick(() => this.deviceSelect());
      },
      deviceHandleCurrentChange(val) {
        this.deviceSelect();
      },
      deviceSelect() {
        var param = this.deviceDialogPageInfo;
        param.page = parseInt(this.deviceDialogPageInfo.pageNo);
        http(api.infoup.queryDevice, param).then(res => {
          this.deviceDialogData = res.data.list;
          this.deviceDialogPageInfo.totalPage = res.data.pages;
          this.deviceDialogPageInfo.totalCount = res.data.total;
          this.paginationShow = true;
          if (res.data.pageNum > res.data.pages && res.data.total != 0) {
            this.deviceDialogPageInfo.page = res.data.pages;
            this.deviceSelect();
          } else {
            this.deviceDialogPageInfo.page = res.data.pageNum;
          }
        });
      },
      openDevice() {
        this.deviceSelect();
        this.deviceDialogFormVisible=true;
      },
      openDeviceType(){
        this.lineDialogFormVisible = true;
        this.deviceTypeSelect();
      },
      openUpdateDevice() {
        this.deviceSelect();
        this.ReviseDeviceDialogFormVisible=true;
      },
      openUpdateDeviceType(){
        this.ReviseLineDialogFormVisible = true;
        this.deviceTypeSelect();
      },
      deviceTypeSizeChange(val) {
        this.$nextTick(() => this.deviceTypeSelect());
      },
      deviceTypeCurrentChange(val) {
        this.deviceTypeSelect();
      },
      deviceTypeSelect() {
        var param = this.dTypePageInfo;
        param.page = parseInt(this.dTypePageInfo.pageNo);
        this.typeIdc.id=this.currentRow.deviceTypeId;
        param.param = this.typeIdc;
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
      openStation(){
        this.standingDialogFormVisible = true;
        this.StationList();
      },
      openUpdateStation(){
        this.RvDeviceTypeDialogFormVisible = true;
        this.StationList();
      },
      StationSizeChange(val) {
        this.$nextTick(() => this.StationList());
      },
      StationCurrentChange(val) {
        this.StationList();
      },
      StationList() {
        var param = this.StationBoxPageInfo;
        param.page = parseInt(this.StationBoxPageInfo.pageNo);
        http(api.infoup.queryStation, param).then(res => {
          this.StationData = res.data.list;
          this.StationBoxPageInfo.totalPage = res.data.pages;
          this.StationBoxPageInfo.totalCount = res.data.total;
          this.paginationShow = true;
          if (res.data.pageNum > res.data.pages &&res.data.total!=0) {
            this.StationBoxPageInfo.page = res.data.pages;
            this.searchList();
          } else {
            this.StationBoxPageInfo.page = res.data.pageNum;
          }
        })
      },
      ChannelTypeSizeChange(val) {
        this.$nextTick(() => this.StationList());
      },
      ChannelTypeCurrentChange(val) {
        this.StationList();
      },
      openChannelType(){
        this.thoroughfareLineTypeDialogFormVisible=true;
        this.ChannelTypeList()
      },
      openUpdateChannelType(){
        this.RvThoroughfareTypeDialogFormVisible=true;
        this.ChannelTypeList()
      },
      ChannelTypeList(){
        var param = this.ChannelTypePageInfo;
        param.page = parseInt(this.ChannelTypePageInfo.pageNo);
        http(api.infoup.queryChanneltype, param).then(res => {
          this.ChannelTypeData = res.data.list;
          this.ChannelTypePageInfo.totalPage = res.data.pages;
          this.ChannelTypePageInfo.totalCount = res.data.total;
          this.paginationShow = true;
          if (res.data.pageNum > res.data.pages &&res.data.total!=0) {
            this.ChannelTypePageInfo.page = res.data.pages;
            this.searchList();
          } else {
            this.ChannelTypePageInfo.page = res.data.pageNum;
          }
        })
      },
      /* 设备ID行弹框的点击每行选中 */
      deviceLine(val) {
        this.lineDialogData.forEach((item, index) => {
          if (item.id == val.id) {
            this.$set(this.lineDialogData[index], "checked", true);
          } else {
            this.$set(this.lineDialogData[index], "checked", false);
          }
        });
      },
      /* 站点ID弹框的点击每行选中 */
      standingLine(val) {
        this.StationData.forEach((item, index) => {
          if (item.id == val.id) {
            this.$set(this.StationData[index], "checked", true);
          } else {
            this.$set(this.StationData[index], "checked", false);
          }
        });
      },
      /* 通道类型ID弹框的点击每行选中 */
      tgfLine(val) {
        this.ChannelTypeData.forEach((item, index) => {
          if (item.id == val.id) {
            this.$set(this.ChannelTypeData[index], "checked", true);
          } else {
            this.$set(this.ChannelTypeData[index], "checked", false);
          }
        });
      },
       /* 修改设备ID行弹框的点击每行选中 */
      editDeLine(val) {
        this.lineDialogData.forEach((item, index) => {
          if (item.id == val.id) {
            this.$set(this.lineDialogData[index], "checked", true);
          } else {
            this.$set(this.lineDialogData[index], "checked", false);
          }
        });
      },
      /* 修改站点ID弹框的点击每行选中 */
      editSdLine(val) {
        this.StationData.forEach((item, index) => {
          if (item.id == val.id) {
            this.$set(this.StationData[index], "checked", true);
          } else {
            this.$set(this.StationData[index], "checked", false);
          }
        });
      },
      /* 通道类型ID弹框的点击每行选中 */
      editTgLine(val) {
        this.ChannelTypeData.forEach((item, index) => {
          if (item.id == val.id) {
            this.$set(this.ChannelTypeData[index], "checked", true);
          } else {
            this.$set(this.ChannelTypeData[index], "checked", false);
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
