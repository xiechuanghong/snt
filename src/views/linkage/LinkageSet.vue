<template>
  <div class="linkageSet common deviceManagent dialogTan">
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
                  v-model="devieForm.id"
                  placeholder="请输入ID"
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="联动类型:">
                <el-input
                  v-model="devieForm.linkageType"
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
          :data="linkageData"
          style="width: 100%;color:#fff;"
        >
          <el-table-column
            prop="id"
            label="联动配置ID"
            align="center"
            width="100"
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
            <template slot-scope="scope">
              <span v-if="scope.row.linkageType==1">设备联动</span>
              <span v-if="scope.row.linkageType==2">告警联动</span>
              <span v-if="scope.row.linkageType==3">时间联动</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="linkageMinValue"
            label="下限联动值"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="linkageMaxValue"
            label="上限联动值"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="linkageScripts"
            label="联动脚本"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="linkStationId"
            label="被联动站点ID"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="linkDeviceId"
            label="被联动设备ID"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="linkChannelId"
            label="被联动通道ID"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="linkageSwitchValue"
            label="开关联动值"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="linkageTime"
            label="联动时间"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="is_enable"
            label="是否启用"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enables"
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
        v-if="paginationShow"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="linkagePageInfo.pageNo"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="linkagePageInfo.totalCount"
      >
      </el-pagination>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      title="新增联动"
      :visible.sync="addDialogFormVisible"
      class="addDialog"
    >
      <el-form
        class="formInput"
        :model="addForm"
      >
        <el-form-item v-if="hidden" label="设备ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.deviceId"
            @focus="openDevice"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="hidden" label="站点ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.stationId"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item v-if="hidden" label="通道ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.channelId"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="联动类型:">
          <el-select v-model="addForm.linkageType" placeholder="请选择类型" style="width:350px;" @change="linkageDis">
            <el-option label="设备联动" value="1"></el-option>
            <el-option label="告警联动" value="2"></el-option>
            <el-option label="时间联动" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联动脚本:">
          <el-input
            style="width:350px;"
            v-model="addForm.linkageScripts"
          ></el-input>
        </el-form-item>
        <el-form-item label="被联动站点ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.linkStationId"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="被联动设备ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.linkDeviceId"
            @focus="openUpRelevance"
          ></el-input>
        </el-form-item>
        <el-form-item label=" 被联动通道ID:">
          <el-input
            style="width:350px;"
            v-model="addForm.linkChannelId"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="控制值:">
          <el-input
            style="width:350px;"
            v-model="addForm.controlValue"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="showPrise"  label="上限联动值:">
          <el-input
            style="width:350px;"
            v-model="addForm.linkageMaxValue"
            @change="inputValues"
            :disabled="max_isDis"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="showPrise" label="下限联动值:">
          <el-input
            style="width:350px;"
            v-model="addForm.linkageMinValue"
            @change="inputValue"
            :disabled="min_isDis"
          ></el-input>
        </el-form-item>
        <el-form-item  v-if="showTime" prop="linkageTime" label="时间联动:">
          <el-time-picker
            style="width:350px;font-size:16px;"
            value-format="hh:mm:ss"
            format="hh:mm:ss"
            type="fixed-time"
            placeholder="选择时间"
            v-model="addForm.linkageTimes"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="是否启用:">
          <template >
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
          @click="addDialogFormVisible=false"
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
      <template slot-scope="scope">
        <el-table
          :data="deviceDialogData"
          style="width: 100%;color:#fff;"
          @current-change="selectPeople"
          @row-click="stationEvent(deviceDialogData)"
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
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="powerBoxSubid"
            label="开关柜ID"
            width="180"
            align="center"
          >
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="deviceSizeChange"
          @current-change="deviceCurrentChange"
          :current-page.sync="devicePageInfo.pageNo"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="devicePageInfo.totalCount"
        >
        </el-pagination>
      </template>

    </el-dialog>
    <!-- 点击行弹出框 -->
    <el-dialog
      title="通道ID"
      :visible.sync="lineDialogFormVisible"
      class="lineDialogs"
    >
      <template>
        <el-table
          :data="lineDialogData"
          style="width: 100%;color:#fff;"
          @current-change="selectPeoples"
          @row-click="deviceIDLine"
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
            prop="deviceID"
            label="设备ID"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deviceTypeId"
            label="设备类型id"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="channelTypeId"
            label="通道类型ID"
            align="center"
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
        </el-table>
        <el-pagination
        @size-change="sighSizeChange"
        @current-change="sighCurrentChange"
        :current-page="sighPageInfo.pageNo"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sighPageInfo.totalCount">
      </el-pagination>
      </template>
       <div style="text-align:center;padding-top:20px;">
        <el-button
          class="btnClose"
          @click="lineDialogFormVisible = false,deviceDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="bitup"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 被联动设备ID -->
    <el-dialog
      title="被联动设备ID"
      :visible.sync="linkDeDialogFormVisible"
      class="deviceDialogs"
    >
      <template slot-scope="scope">
        <el-table
          :data="deviceDialogData"
          style="width: 100%;color:#fff;"
          @current-change="selectlinkage"
          @row-click="lineDialogEvent(deviceDialogData)"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="selectlinkage(scope.row)"
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
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="powerBoxSubid"
            label="开关柜ID"
            width="180"
            align="center"
          >
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="deviceSizeChange"
          @current-change="deviceCurrentChange"
          :current-page.sync="devicePageInfo.pageNo"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="devicePageInfo.totalCount"
        >
        </el-pagination>
      </template>

    </el-dialog>
    <!-- 点击被联动设备ID行 -->
    <el-dialog
      title="被联动设备ID"
      :visible.sync="linkDeLineDialogFormVisible"
      class="lineDialogs"
    >
      <template>
        <el-table
          :data="lineDialogData"
          @current-change="selectlinkages"
          style="width: 100%;color:#fff;"
          @row-click="deIDLine"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="selectlinkages(scope.row)"
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
            prop="channelTypeId"
            label="通道类型ID"
            align="center"
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
        </el-table>
        <el-pagination
        @size-change="sighSizeChange"
        @current-change="sighCurrentChange"
        :current-page.sync="sighPageInfo.pageNo"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sighPageInfo.totalCount">
      </el-pagination>
      </template>
       <div style="text-align:center;padding-top:20px;">
        <el-button
          class="btnClose"
          @click="linkDeDialogFormVisible = false,linkDeLineDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="stotup"
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
        <el-form-item v-if="editHidden" label="设备ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.deviceId"
            @focus="openUpopenDevice"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="editHidden" label="站点ID">
          <el-input
            style="width:350px;"
            v-model="reviseForm.stationId"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item v-if="editHidden" label="通道ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.channelId"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="联动类型:">
          <el-select v-model="reviseForm.linkageType"
            placeholder="请选择类型" style="width:350px;" @change="editLinkageDis">
            <el-option label="设备联动" value="1">
            </el-option>
            <el-option label="告警联动" value="2">告警联动</el-option>
            <el-option label="时间联动" value="3">时间联动</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联动脚本:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.linkageScripts"
          ></el-input>
        </el-form-item>
        <el-form-item label="被联动设备ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.linkDeviceId"
            @focus="openRelevance"
          ></el-input>
        </el-form-item>
        <el-form-item label="被联动站点ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.linkStationId"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="被联动通道ID:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.linkChannelId"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item v-if="editPrise" label="上限联动值:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.linkageMaxValue"
            @change="inputValues"
            :disabled="max_isDis"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="editPrise" label="下限联动值:">
          <el-input
            style="width:350px;"
            v-model="reviseForm.linkageMinValue"
            @change="inputValue"
            :disabled="min_isDis"
          ></el-input>
        </el-form-item>
        <el-form-item  v-if="editTime" prop="linkageTimes" label="时间联动:">
          <el-time-picker
            style="width:350px;font-size:16px;"
            value-format="hh:mm:ss"
            format="hh:mm:ss"
            type="fixed-time"
            placeholder="选择时间"
            v-model="reviseForm.linkageTimes"
          ></el-time-picker>
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
    <!-- 修改的设备ID弹框 -->
    <el-dialog
      title="设备ID"
      :visible.sync="deviceReviseDialogFormVisible"
      class="deviceDialogs"
    >
      <template slot-scope="scope">
        <el-table
          :data="deviceDialogData"
          style="width: 100%;color:#fff;"
          @current-change="selectUpdatePeople"
          @row-click="stationUpdateEvent(deviceDialogData)"
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
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="powerBoxSubid"
            label="开关柜ID"
            width="180"
            align="center"
          >
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="deviceSizeChange"
          @current-change="deviceCurrentChange"
          :current-page.sync="devicePageInfo.pageNo"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="devicePageInfo.totalCount"
        >
        </el-pagination>
      </template>

    </el-dialog>
    <!-- 修改的点击设备ID行弹出框 -->
    <el-dialog
      title="通道ID"
      :visible.sync="reviselineDialogFormVisible"
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
            prop="deviceID"
            label="设备ID"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deviceTypeId"
            label="设备类型id"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="channelTypeId"
            label="通道类型ID"
            align="center"
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
        </el-table>
        <el-pagination
        @size-change="sighSizeChange"
        @current-change="sighCurrentChange"
        :current-page.sync="sighPageInfo.pageNo"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sighPageInfo.totalCount">
      </el-pagination>
      </template>
       <div style="text-align:center;padding-top:20px;">
        <el-button
          class="btnClose"
          @click="deviceReviseDialogFormVisible = false,reviselineDialogFormVisible = false,this.currentRow=null,this.currentRows=null"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="bitupdate"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改被联动设备ID -->
    <el-dialog
      title="被联动设备ID"
      :visible.sync="rdvedDialogFormVisible"
      class="deviceDialogs"
    >
      <template slot-scope="scope">
        <el-table
          :data="deviceDialogData"
          style="width: 100%;color:#fff;"
          @current-change="selectlinkage"
          @row-click="lineDialogEvents(deviceDialogData)"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="selectlinkage(scope.row)"
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
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="powerBoxSubid"
            label="开关柜ID"
            width="180"
            align="center"
          >
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="deviceSizeChange"
          @current-change="deviceCurrentChange"
          :current-page.sync="devicePageInfo.pageNo"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="devicePageInfo.totalCount"
        >
        </el-pagination>
      </template>

    </el-dialog>
    <!-- 修改的点击被联动设备ID行 -->
    <el-dialog
      title="被联动设备ID"
      :visible.sync="rdvedLineDialogFormVisible"
      class="lineDialogs"
    >
      <template>
        <el-table
          :data="lineDialogData"
          @current-change="selectlinkages"
          style="width: 100%;color:#fff;"
          @row-click="editLine"
        >
          <el-table-column
            label=""
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @click="selectlinkages(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="deviceTypeId"
            label="设备类型id"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="channelTypeId"
            label="通道类型ID"
            align="center"
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
        </el-table>
        <el-pagination
        @size-change="sighSizeChange"
        @current-change="sighCurrentChange"
        :current-page.sync="sighPageInfo.pageNo"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sighPageInfo.totalCount">
      </el-pagination>
      </template>
       <div style="text-align:center;padding-top:20px;">
        <el-button
          class="btnClose"
          @click="linkDeDialogFormVisible = false,linkDeLineDialogFormVisible = false"
        >取 消</el-button>
        <el-button
          class="btnDet"
          @click="stotupDate"
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
      deviceDialogFormVisible: false,
      lineDialogFormVisible: false,
      paginationShow: false,
      // 修改的设备ID弹框
      deviceReviseDialogFormVisible:false,
      // 修改的设备ID行弹框
      reviselineDialogFormVisible:false,
      // 修改的被联动设备ID弹框
      rdvedDialogFormVisible:false,
      // 修改的被联动设备ID行弹出框
      rdvedLineDialogFormVisible:false,
      currentRow: '',
      currentRows:'',
      linkageRows:'',
      linkageRow:'',
      max_isDis:false,
      min_isDis:false,
      addForm: {
        stationId: "",
        deviceId: "",
        channelId: "",
        linkageType: "1",
        linkageMinValue: "",
        linkageMaxValue: "",
        linkageScripts: "",
        linkStationId: "",
        linkDeviceId: "",
        linkChannelId: "",
        controlValue: "",
        isEnable: "1",
        linkageSwitchValue:"",
        linkageTimes:""
      },
      //新增
      showPrise:false,
      showDevice:false,
      showTime:false,
        //修改的
      editPrise:false,
      editDevice:false,
      editTime:false,
      editHidden:true,
        // 被联动设备ID
      linkDeDialogFormVisible:false,
      linkDeLineDialogFormVisible:false,
      sigfrom: {
        deviceId: ''
      },
      hidden:true,
      reviseForm: {
      },
      devieForm: {
        id: "",
        linkageType: ""
      },
      linkageData: [{}],
      linkagePageInfo: {
        page: 1,
        pageNo: 1,
        /*总页数*/
        totalPage: 0,
        /*总条数*/
        totalCount: 0,
        size: 10
      },
      deviceDialogData: [
        {
        }
      ],
      lineDialogData: [
        {
        }
      ],
      // 修改的设备ID数据
      rdvDialogData:[{}],
      rdvlineDialogData:[{}],
      // 修改的被联动设备ID数据
      revedData:[{}],
      revedLineData:[{}],
      // ------------
      devicePageInfo: {
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
      // 被联动设备ID
      linkDeDialogData:[{}],
      linkDeLineDialogData:[{}],
      linkageTime: new Date()
    };
  },
  created(){
    this.searchList()
  },
  methods: {
    searchList() {
      var param = this.linkagePageInfo;
      param.page = parseInt(this.linkagePageInfo.pageNo);
      param.param = this.devieForm;
      http(api.likageup.queryLinkageSet, param).then(res => {
        this.linkageData = res.data.list;
        this.linkagePageInfo.totalPage = res.data.pages;
        this.linkagePageInfo.totalCount = res.data.total;
        this.paginationShow = true;
        if (res.data.pageNum > res.data.pages&&res.data.total!=0) {
          this.linkagePageInfo.page = res.data.pages;
          this.searchList();
        } else {
          this.linkagePageInfo.page = res.data.pageNum;
        }
      })
    },
    openDevice(){
      this.deviceDialogFormVisible = true,
        this.deviceSelect();
    },
    openUpopenDevice(){
      this.deviceReviseDialogFormVisible=true;
      this.deviceSelect();
    },
    openUpRelevance(){
      this.linkDeDialogFormVisible=true,
        this.deviceSelect();
    },
    openRelevance(){
      this.rdvedDialogFormVisible=true,
      this.deviceSelect();
    },
    deviceSelect(){
      var param = this.devicePageInfo;
      param.page = parseInt(this.devicePageInfo.pageNo);
      param.param = this.devieForm;
      http(api.infoup.queryDevice, param).then(res => {
        this.deviceDialogData = res.data.list;
        this.devicePageInfo.totalPage = res.data.pages;
        this.devicePageInfo.totalCount = res.data.total;
        this.paginationShow = true;
        if (res.data.pageNum > res.data.pages &&res.data.total!=0) {
          this.devicePageInfo.page = res.data.pages;
          this.deviceSelect();
        } else {
          this.devicePageInfo.page = res.data.pageNum;
        }
      })
    },
    sighSelect(val){
      var param = this.sighPageInfo;
      param.page = parseInt(this.sighPageInfo.pageNo);
     this.sigfrom.deviceId =val.id;
      param.param = this.sigfrom;
      http(api.infoup.queryChannel, param).then(res => {
        this.lineDialogData = res.data.list;
        this.sighPageInfo.totalPage = res.data.pages;
        this.sighPageInfo.totalCount = res.data.total;
        this.paginationShow = true;
        if (res.data.pageNum > res.data.pages &&res.data.total!=0) {
          this.sighPageInfo.page = res.data.pages;
          this.searchList();
        } else {
          this.sighPageInfo.page = res.data.pageNum;
        }
      })
    },
    handleSizeChange(val) {
      this.$nextTick(() =>this.searchList());
    },
    handleCurrentChange(val) {
      this.searchList();
    },
    deviceSizeChange(val) {
      this.$nextTick(() =>this.deviceSelect());
    },
    deviceCurrentChange(val) {
      this.deviceSelect();
    },
    sighSizeChange(val) {
      this.$nextTick(() =>this.sighSelect());
    },
    sighCurrentChange(val) {
      this.sighSelect();
    },
    updateOpen(row){
      this.reviseForm=row;
      if(this.reviseForm.isEnable==0){
        this.reviseForm.isEnable="0";
      }else if( this.reviseForm.isEnable==1){
        this.reviseForm.isEnable="1";
      }
      this.reviseDialogFormVisible=true;
      if(row.linkageType==1){
        this.editDevice = true;
      }else{
        this.editDevice = false;
      }
      if(row.linkageType == 2){
        this.editPrise = true;
      }else{
        this.editPrise = false;
      }
      if(row.linkageType == 3){
        this.editTime = true;
        this.editHidden = false;
      }else{
        this.editTime = false;
        this.editHidden = true;
      }
    },
    update(){
      if(this.reviseForm.isEnable=="1"){
        this.reviseForm.isEnable==1
      }else if(this.reviseForm.isEnable=="0"){
        this.reviseForm.isEnable==0
      }
      if(this.reviseForm.linkageType=="1"){
        this.reviseForm.linkageMinValue='';
        this.reviseForm.linkageMaxValue='';
        this.reviseForm.linkageTimes='';
      }else if(this.reviseForm.linkageType=="2"){
        this.reviseForm.linkageTimes='';
      }else if(this.reviseForm.linkageType=="3"){
        this.reviseForm.stationId='';
        this.reviseForm.deviceId='';
        this.reviseForm.channelId='';
        this.reviseForm.linkageMinValue='';
        this.reviseForm.linkageMaxValue='';
      }
      http(api.likageup.updateLinkageSet, this.reviseForm)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.reviseForm="";
          this.searchList();
          this.reviseDialogFormVisible = false
        }).catch(() => {
        this.$message({
          type: "info",
          message: "修改失败，请稍后再试"
        })
      });
    },
    deletemanage(row){
      http(api.likageup.deleteLinkageSet, row)
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.searchList();
          this.reviseDialogFormVisible = false
        }).catch(() => {
        this.$message({
          type: "info",
          message: "删除失败，请稍后再试"
        })
      });
    },
    save(){
      http(api.likageup.saveLinkageSet, this.addForm)
        .then(res => {
          this.addDialogFormVisible=false;
          this.$message({
            type: "success",
            message: "新增成功"
          });
          this.searchList();
        }).catch(() => {
        this.addDialogFormVisible=false;
        this.$message({
          type: "info",
          message: "新增失败，请稍后再试"
        })
      });
      this.addForm={}
      this.addForm.linkageType = "1"
    },
    changeUserState(row) {
      if (row.isEnable == 1) {
        row.isEnable = 0;
      } else if (row.isEnable == 0) {
        row.isEnable = 1;
      }
      http(api.likageup.updateLinkageSet, row)
        .then(res => {
          console.log(res);
        })
    },
    inputValues(value) {
      if (value.length > 0) {
        this.min_isDis = true;
      } else {
        this.min_isDis = false;
      }
    },
    selectPeople(row){
      this.currentRow = row;
    },
    selectPeoples(row){
      this.currentRows = row;
    },
    selectUpdatePeople(row){
      this.currentRow = row;
    },
    selectUpdatePeoples(row){
      this.currentRows = row;
    },
    selectlinkage(row){
      this.linkageRow = row;
    },
    selectlinkages(row){
      this.linkageRows = row;
    },
    bitup(){
      this.addForm.channelId=this.currentRows.id;
      this.addForm.deviceId=this.currentRow.id;
      this.addForm.stationId=this.currentRow.stationId;
      this.lineDialogFormVisible = false,this.deviceDialogFormVisible = false
    },
    bitupdate(){
      this.reviseForm.channelId=this.currentRows.id;
      this.reviseForm.deviceId=this.currentRow.id;
      this.reviseForm.stationId=this.currentRow.stationId;
      this.reviselineDialogFormVisible = false,this.deviceReviseDialogFormVisible = false
    },
    stotup(){
      this.addForm.linkChannelId=this.linkageRows.id;
      this.addForm.linkDeviceId=this.linkageRow.id;
      this.addForm.linkStationId=this.linkageRow.stationId;
      this.linkDeDialogFormVisible = false,this.linkDeLineDialogFormVisible = false
    },
    stotupDate(){
      this.reviseForm.linkChannelId=this.linkageRows.id;
      this.reviseForm.linkDeviceId=this.linkageRow.id;
      this.reviseForm.linkStationId=this.linkageRow.stationId;
      this.rdvedDialogFormVisible = false,this.rdvedLineDialogFormVisible = false
    },
    stationEvent(row) {
      this.lineDialogFormVisible = true;
      this.sighSelect(this.currentRow)
    },
    stationUpdateEvent(row) {
      this.reviselineDialogFormVisible = true;
      this.sighSelect(this.currentRow)
    },
    lineDialogEvent(row) {
      this.linkDeLineDialogFormVisible = true;
      this.sighSelect(this.linkageRow)
    },
    lineDialogEvents(row) {
      this.rdvedLineDialogFormVisible = true;
      this.sighSelect(this.linkageRow)
    },
    /* 新增的 */
    linkageDis(value){
      console.log(value)
      if(value == 1){
        this.showDevice = true;
      }else{
        this.showDevice = false;
      }
      if(value == 2){
        this.showPrise = true;
      }else{
        this.showPrise = false;
      }
      if(value == 3){
        this.showTime = true;
        this.hidden = false;
      }else{
        this.showTime = false;
        this.hidden = true;
      }
    },
    /* 修改的的 */
    editLinkageDis(value) {
      console.log(value);
      if (value == "1") {
        this.editDevice = true;
      } else {
        this.editDevice = false;
      }
      if (value == "2") {
        this.editPrise = true;
      } else {
        this.editPrise = false;
      }
      if (value == "3") {
        this.editTime = true;
        this.editHidden = false;
      } else {
        this.editTime = false;
        this.editHidden = true;
      }
    },
    /* 设备ID行弹框的点击每行选中 */
    deviceIDLine(val) {
      this.lineDialogData.forEach((item, index) => {
        if (item.id == val.id) {
          this.$set(this.lineDialogData[index], "checked", true);
        } else {
          this.$set(this.lineDialogData[index], "checked", false);
        }
      });
    },
    /* 被联动设备ID行弹框的点击每行选中 */
    deIDLine(val) {
      this.lineDialogData.forEach((item, index) => {
        if (item.id == val.id) {
          this.$set(this.lineDialogData[index], "checked", true);
        } else {
          this.$set(this.lineDialogData[index], "checked", false);
        }
      });
    },
    /* 修改的设备ID行弹框的点击每行选中 */
    editDeLine(val) {
      this.lineDialogData.forEach((item, index) => {
        if (item.id == val.id) {
          this.$set(this.lineDialogData[index], "checked", true);
        } else {
          this.$set(this.lineDialogData[index], "checked", false);
        }
      });
    },
    /* 修改的被联动设备ID行弹框的点击每行选中 */
    editLine(val) {
      this.lineDialogData.forEach((item, index) => {
        if (item.id == val.id) {
          this.$set(this.lineDialogData[index], "checked", true);
        } else {
          this.$set(this.lineDialogData[index], "checked", false);
        }
      });
    },
    getTime(val){
      this.addForm.linkageTime = val;
    }
  },
  mounted(){
  }
};
</script>
<style lang="scss" scoped>
.linkageSet .deviceDialogs {
  width: 90%;
  margin: 30px auto;
}
.linkageSet .lineDialogs {
  width: 80%;
  margin: 60px auto;
}
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
