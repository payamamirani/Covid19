import Logout from "../logout";
import Profile from "../profile";
import Request from "../request";
import AddItem from "../addItem";
import NeedItem from "../needItem";
import HumanService from "../humanService";
import HumanServiceReport from "../humanServiceReport";

export default [
  { path: "/logout", component: Logout },
  { path: "/profile", component: Profile },
  {
    path: "/request",
    Gid: "F67AB424-3C33-42BB-967A-7F783FFC9C79",
    component: Request,
    title: "گزارش درخواستها"
  },
  {
    path: "/addItem",
    Gid: "E04597DB-ADA7-486B-A29F-66709DAD72E5",
    component: AddItem,
    title: "ثبت درخواست کمک رسانی"
  },
  {
    path: "/needItem",
    Gid: "0E749937-B58C-4B7D-AB20-E833AF083651",
    component: NeedItem,
    title: "ثبت درخواست کمک گرفتن"
  },
  {
    path: "/humanService/:id?",
    Gid: "AFB78863-303F-4E73-9E32-529845D97BF7",
    component: HumanService,
    title: "کنترل منابع انسانی"
  },
  {
    path: "/humanServiceReport",
    Gid: "161089F6-F630-4641-BA02-0CB39B006981",
    component: HumanServiceReport,
    title: "گزارش منابع انسانی"
  }
];
