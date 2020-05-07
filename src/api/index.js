/**
 * api统一出口
 *  将api接口根据功能划分为多个模块，利于多人开发，一个人负责一个模块的开发，方便每个模块中接口的命名
 * */
// 网站管理接口
import websiteManageAPI from "./websiteManageAPI";
// 系统管理接口
import systemManageAPI from "@/api/systemManageAPI";
// 文件管理接口
import fileManageAPI from "@/api/fileManageAPI";
// 系统用户管理接口
import sysUserInfoAPI from "@/api/sysUserInfoAPI";
// 微信用户管理接口
import weChatUserInfoAPI from "@/api/weChatUserInfoAPI";
// 供应商管理接口
import supplierManageAPI from "@/api/supplierManageAPI";
// 商品管理接口
import materialManageAPI from "@/api/materialManageAPI";
// 商品分类接口
import commodityClassifyMangeAPI from "@/api/commodityClassifyMangeAPI";
// 商品类别接口
import commodityCategoryMangeAPI from "@/api/commodityCategoryMangeAPI";
// 商品品牌接口
import commodityBrandMangeAPI from "@/api/commodityBrandMangeAPI";
// 订单管理接口
import orderManageAPI from "@/api/orderManageAPI";
// 即时通讯管理接口
import imManageAPI from "@/api/imManageAPI";
// 系统公告接口
import sysBulletinBoardManageAPI from "@/api/sysBulletinBoardManageAPI";
// 活动接口
import sysSalesManageAPI from "@/api/sysSalesPromotionManageAPI";

// 导出接口
export default {
  websiteManageAPI,
  sysUserInfoAPI,
  systemManageAPI,
  fileManageAPI,
  weChatUserInfoAPI,
  supplierManageAPI,
  materialManageAPI,
  commodityClassifyMangeAPI,
  commodityCategoryMangeAPI,
  commodityBrandMangeAPI,
  orderManageAPI,
  imManageAPI,
  sysBulletinBoardManageAPI,
  sysSalesManageAPI
};
