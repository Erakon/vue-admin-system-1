<template>
  <div class="order-detail" v-loading="loading">
    <el-tabs v-model="activeName" type="card" class="order-detail-tab">
      <el-tab-pane label="订单信息" name="orderInfo">
        <div class="detail-box" :class="parentData.colNum">
          <div class="fill">
            <div>订单号</div>
            <div>{{ detailsInfo.orderNo }}</div>
          </div>
          <div class="fill">
            <div>流水号</div>
            <div>{{ detailsInfo.serialNumber }}</div>
          </div>
          <div>
            <div>订单名称</div>
            <div>{{ detailsInfo.name }}</div>
          </div>
          <div>
            <div>订单用户</div>
            <div>{{ detailsInfo.nickName }}</div>
          </div>
          <div>
            <div>下单时间</div>
            <div>{{ detailsInfo.orderTime }}</div>
          </div>
          <div>
            <div>订单状态</div>
            <div>{{ detailsInfo.orderStateName }}</div>
          </div>
          <div>
            <div>待付金额</div>
            <div>￥{{ detailsInfo.amountToBePaid || 0 }}</div>
          </div>
          <div>
            <div>折扣金额</div>
            <div>￥{{ detailsInfo.discountAmount || 0 }}</div>
          </div>
          <div>
            <div>支付金额</div>
            <div>￥{{ detailsInfo.amountPay || 0 }}</div>
          </div>
          <div>
            <div>运费</div>
            <div>￥{{ detailsInfo.freight || 0 }}</div>
          </div>
          <div>
            <div>总金额</div>
            <div>￥{{ detailsInfo.totalAmount || 0 }}</div>
          </div>
          <div>
            <div>付款方式</div>
            <div>{{ detailsInfo.modePayment || "无" }}</div>
          </div>
          <div>
            <div>供应商名</div>
            <div>{{ detailsInfo.supplierName || "无" }}</div>
          </div>
          <div>
            <div>分配状态</div>
            <div>{{ detailsInfo.osStatusName || "未分配" }}</div>
          </div>
          <div>
            <div>分配时间</div>
            <div>{{ detailsInfo.allocationTime }}</div>
          </div>
          <div>
            <div>订单备注</div>
            <div>{{ detailsInfo.remark || "无" }}</div>
          </div>
          <div>
            <div>联系人</div>
            <div>
              {{
                detailsInfo.shippingAddress
                  ? detailsInfo.shippingAddress.name
                  : "无"
              }}
            </div>
          </div>
          <div>
            <div>联系电话</div>
            <div>
              {{
                detailsInfo.shippingAddress
                  ? detailsInfo.shippingAddress.phone
                  : "无"
              }}
            </div>
          </div>
          <div class="fill">
            <div>订单地址</div>
            <div>
              {{
                detailsInfo.shippingAddress
                  ? detailsInfo.shippingAddress.address
                  : "无"
              }}
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品信息" name="materialInfo">
        <el-table :data="detailsInfo.orderMaterialList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品图">
                  <el-image
                    v-if="props.row.coverFigurePath"
                    style="width: 100px; height: 100px"
                    :src="props.row.coverFigurePath"
                    :preview-src-list="[props.row.coverFigurePath]"
                  >
                  </el-image>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="商品数量">
                  <span>{{ props.row.number }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品单位">
                  <span>{{ props.row.unitName }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="商品数量" prop="number"></el-table-column>
          <el-table-column label="商品价格" prop="price"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="button__bottom" v-if="showButton">
      <el-button type="info" size="small" @click="handleClick('reject')"
        >退回</el-button
      >
      <el-button type="primary" size="small" @click="handleClick('resolve')"
        >接收</el-button
      >
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import base from "@/api/base";
import format from "@/utils/format";
export default {
  name: "order-list-details-page",
  data() {
    return {
      detailsInfo: {},
      activeName: "orderInfo",
      showButton: false,
      loading: true
    };
  },
  methods: {
    handleClick(state) {
      switch (state) {
        case "resolve":
          // 接收
          this.$confirm("确认接收吗?", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.orderManageAPI
                .agreeReceiveOrder({
                  orderId: this.detailsInfo.orderId,
                  orderSupplierId: this.detailsInfo.orderSupplierId
                })
                .then(res => {
                  if (_.isEqual(res.code, "success")) {
                    this.$layer.msg(res.msg);
                    this.$parent.search();
                    this.$layer.close(this.layerid);
                  } else {
                    self.$vb.plugin.message.error("失败", res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        case "reject":
          // 退回
          this.$confirm("确认退回吗?", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.orderManageAPI
                .rejectReceiveOrder({
                  orderId: this.detailsInfo.orderId,
                  orderSupplierId: this.detailsInfo.orderSupplierId
                })
                .then(res => {
                  if (_.isEqual(res.code, "success")) {
                    this.$layer.msg(res.msg);
                    this.$parent.search();
                    this.$layer.close(this.layerid);
                  } else {
                    self.$vb.plugin.message.error("失败", res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.showButton = this.parentData.state === "todo";
    this.$api.orderManageAPI
      .getOrderDetail({
        orderId: this.parentData.orderId
      })
      .then(res => {
        if (_.isEqual(res.code, "success")) {
          Array.prototype.forEach.call(res.data.orderMaterialList, item => {
            item.coverFigurePath = base.defaultBaseUrl + item.coverFigurePath;
            item.price = `￥ ${item.price}`;
            item.allocationTime = format.formatDate(
              item.allocationTime,
              "yyyy-MM-dd hh:mm"
            );
            item.orderTime = format.formatDate(
              item.orderTime,
              "yyyy-MM-dd hh:mm"
            );
          });
          res.data.orderTime = format.formatDate(
            res.data.orderTime,
            "yyyy-MM-dd hh:mm"
          );
          res.data.allocationTime = format.formatDate(
            res.data.allocationTime,
            "yyyy-MM-dd hh:mm"
          );
          this.detailsInfo = res.data;
          console.log(res.data);
        } else {
          this.$layer.close(this.layerid);
          this.$vb.plugin.message.error(`获取订单信息失败:${res.code}`);
        }
        this.loading = false;
      });
  },
  props: {
    // 父组件传的数据
    parentData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    layerid: {
      // 当前弹层id，用于关闭弹层
      type: String,
      default: ""
    },
    lydata: {
      // 该值为父组件data的浅拷贝,更改父窗口传递的数据的时候，可以直接使用lydata来修改
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/order/order-list-details-page.scss";
</style>
