import React from "react";

const DashboardIcon = <i className="bx bx-home side-menu__icon"></i>;

const PagesIcon = <i className="bx bx-file-blank side-menu__icon"></i>;

const TaskIcon = <i className="bx bx-task side-menu__icon"></i>;

const AuthenticationIcon = (
  <i className="bx bx-fingerprint side-menu__icon"></i>
);

const ErrorIcon = <i className="bx bx-error side-menu__icon"></i>;

const UiElementsIcon = <i className="bx bx-box side-menu__icon"></i>;

const Utilities = <i className="bx bx-medal side-menu__icon"></i>;

const FormsIcon = <i className="bx bx-file  side-menu__icon"></i>;

const AdvancedUiIcon = <i className="bx bx-party side-menu__icon"></i>;

const WidgetsIcon = <i className="bx bx-gift side-menu__icon"></i>;

const AppsIcon = <i className="bx bx-grid-alt side-menu__icon"></i>;

const NestedmenuIcon = <i className="bx bx-layer side-menu__icon"></i>;

const TablesIcon = <i className="bx bx-table side-menu__icon"></i>;

const ChartsIcon = <i className="bx bx-bar-chart-square side-menu__icon"></i>;

const MapsIcon = <i className="bx bx-map side-menu__icon"></i>;

const Icons = <i className="bx bx-store-alt side-menu__icon"></i>;

const badge = (
  <span className="badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2">
    12
  </span>
);
const badge1 = (
  <span className="text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2">
    New
  </span>
);
const badge2 = (
  <span className="text-danger text-[0.75em] rounded-sm badge !py-[0.25rem] !px-[0.45rem] !bg-danger/10 ms-2">
    Hot
  </span>
);
const badge4 = (
  <span className="text-success text-[0.75em] badge !py-[0.25rem] !px-[0.45rem] rounded-sm bg-success/10 ms-2">
    3
  </span>
);

export const MenuItems = [
  {
    menutitle: "",
    Items: [
      {
        path: "/components/dashboards/crm",
        title: "Home",
        icon: DashboardIcon,
        badgetxt: "",
        type: "link",
        active: false,
        selected: false,
      },
    ],
  },
  {
    menutitle: "",
    Items: [
      {
        icon: DashboardIcon,
        badgetxt: badge,
        title: "Orders",
        type: "sub",
        active: false,
        children: [
          {
            path: "#",
            type: "link",
            active: false,
            selected: false,
            title: "Orders",
          },
          {
            path: "#",
            type: "link",
            active: false,
            selected: false,
            title: "Confirmed",
          },
          {
            path: "#",
            type: "link",
            active: false,
            selected: false,
            title: "Fulfilled",
          },
          {
            path: "#",
            type: "link",
            active: false,
            selected: false,
            title: "Cancelled",
          },
        ],
      },
    ],
  },
  {
    menutitle: "",
    Items: [
      {
        icon: DashboardIcon,
        badgetxt: "",
        title: "Products",
        type: "sub",
        active: false,
        children: [
          {
            path: "#",
            type: "link",
            active: false,
            selected: false,
            title: "Products",
          },
          {
            path: "#",
            type: "link",
            active: false,
            selected: false,
            title: "Collections",
          },
          {
            path: "#",
            type: "link",
            active: false,
            selected: false,
            title: "Inventory",
          },
        ],
      },
    ],
  },
  {
    menutitle: "",
    Items: [
      {
        icon: DashboardIcon,
        badgetxt: "",
        title: "Customers",
        type: "sub",
        active: false,
        children: [
          {
            path: "#",
            type: "link",
            active: false,
            selected: false,
            title: "Customers",
          },
          {
            path: "#",
            type: "link",
            active: false,
            selected: false,
            title: "Segments",
          },
        ],
      },
    ],
  },
  {
    menutitle: "",
    Items: [
      {
        path: "#",
        title: "Landing Pages",
        icon: WidgetsIcon,
        badgetxt: "",
        type: "link",
        active: false,
        selected: false,
      },
    ],
  },
  {
    menutitle: "",
    Items: [
      {
        path: "#",
        title: "Analytics",
        icon: WidgetsIcon,
        badgetxt: "",
        type: "link",
        active: false,
        selected: false,
      },
    ],
  },
  {
    menutitle: "",
    Items: [
      {
        path: "#",
        title: "Marketing",
        icon: WidgetsIcon,
        badgetxt: "",
        type: "link",
        active: false,
        selected: false,
      },
    ],
  },
];
export default MenuItems;
