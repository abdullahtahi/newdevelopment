import {
  faCar,
  faUser,
  faList,
  faUserShield,
  faMoneyBill,
  faListAlt,
  faMapMarker,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

const dataList = {
  admin_data: [
    {
      id: 1,
      title: "Users",
      url: "user",
      icon: faUser,
      list: [
        {
          id: 20,
          title: "Customers",
          url: "customers",
          icon: faUser,
        },
        {
          id: 21,
          title: "Captains",
          url: "captains",
          icon: faUser,
        },

        {
          id: 13,
          title: "User Summary",
          url: "usersummary",
          icon: faListAlt,
        },
      ],
    },

    {
      id: 3,
      title: "Vehicle",
      url: "cars",
      icon: faCar,
      list: [
        {
          id: 1,
          title: "All Vehicle",
          url: "cars",
          icon: faCar,
        },
        {
          id: 5,
          title: "Add Vehicle",
          url: "addcar",
          icon: faCar,
        },
      ],
    },
    {
      id: 4,
      title: "Trips",
      url: "bookings",
      icon: faList,
      list: [
        {
          id: 1,
          title: "All Trips",
          url: "bookings",
          icon: faList,
        },
      ],
    },
    {
      id: 100,
      title: "Disputes",
      url: "disputes",
      icon: faList,
    },
    {
      id: 30,
      title: "Settings",
      url: "dashboard",
      icon: faCogs,
      list: [
        {
          id: 8,
          title: "Vehicle Types",
          url: "types",
          icon: faList,
        },
        {
          id: 21,
          title: "Make",
          url: "company",
          icon: faList,
        },
        {
          id: 20,
          title: "Vehicle Name",
          url: "carname",
          icon: faList,
        },
      ],
    },
  ],

  superadmin_data: [
    {
      id: 1,
      title: "Users",
      url: "user",
      icon: faUser,
      list: [
        {
          id: 20,
          title: "Customers",
          url: "customers",
          icon: faUser,
        },
        {
          id: 21,
          title: "Captains",
          url: "captains",
          icon: faUser,
        },
        {
          id: 7,
          title: "Support",
          url: "support",
          icon: faUserShield,
        },
        {
          id: 6,
          title: "Admin",
          url: "admins",
          icon: faUserShield,
        },
        {
          id: 13,
          title: "User Summary",
          url: "usersummary",
          icon: faListAlt,
        },
      ],
    },

    {
      id: 3,
      title: "Vehicle",
      url: "cars",
      icon: faCar,
      list: [
        {
          id: 1,
          title: "All Vehicle",
          url: "cars",
          icon: faCar,
        },
        {
          id: 5,
          title: "Add Vehicle",
          url: "addcar",
          icon: faCar,
        },
      ],
    },
    {
      id: 4,
      title: "Trips",
      url: "bookings",
      icon: faList,
      list: [
        {
          id: 1,
          title: "All Trips",
          url: "bookings",
          icon: faList,
        },
      ],
    },
    {
      id: 14,
      title: "Company Earnings",
      url: "companyearnings",
      icon: faMoneyBill,
    },
    {
      id: 100,
      title: "Disputes",
      url: "disputes",
      icon: faList,
    },
    {
      id: 15,
      title: "Map",
      url: "mapbounds",
      icon: faMapMarker,
      list: [
        {
          id: 1,
          title: "Create/Edit Map",
          url: "mapbounds",
          icon: faMapMarker,
        },
        {
          id: 5,
          title: "View Regions",
          url: "regions",
          icon: faMapMarker,
        },
      ],
    },
    {
      id: 30,
      title: "Settings",
      url: "dashboard",
      icon: faCogs,
      list: [
        {
          id: 8,
          title: "Vehicle Types",
          url: "types",
          icon: faList,
        },
        {
          id: 21,
          title: "Make",
          url: "company",
          icon: faList,
        },
        {
          id: 20,
          title: "Vehicle Name",
          url: "carname",
          icon: faList,
        },
      ],
    },
  ],

  representative_data: [
    {
      id: 1,
      title: "Users",
      url: "user",
      icon: faUser,
      list: [
        {
          id: 20,
          title: "Customers",
          url: "customers",
          icon: faUser,
        },
        {
          id: 21,
          title: "Captains",
          url: "captains",
          icon: faUser,
        },
        {
          id: 13,
          title: "User Summary",
          url: "usersummary",
          icon: faListAlt,
        },
      ],
    },
    {
      id: 3,
      title: "Vehicle",
      url: "cars",
      icon: faCar,
      list: [
        {
          id: 1,
          title: "All Vehicle",
          url: "cars",
          icon: faCar,
        },
        {
          id: 5,
          title: "Add Vehicle",
          url: "addcar",
          icon: faCar,
        },
      ],
    },

    {
      id: 4,
      title: "Trips",
      url: "bookings",
      icon: faList,
      list: [
        {
          id: 1,
          title: "All Trips",
          url: "bookings",
          icon: faList,
        },
      ],
    },

    {
      id: 100,
      title: "Disputes",
      url: "disputes",
      // icon: faList,
    },

    {
      id: 30,
      title: "Settings",
      url: "dashboard",
      icon: faCogs,
      list: [
        {
          id: 8,
          title: "Vehicle Types",
          url: "types",
          icon: faList,
        },
        {
          id: 21,
          title: "Make",
          url: "company",
          icon: faList,
        },
        {
          id: 20,
          title: "Vehicle Name",
          url: "carname",
          icon: faList,
        },
      ],
    },
  ],

  saveList: (list, userId) => {
    if (!localStorage.getItem(userId)) {
      localStorage.removeItem(userId);
      localStorage.setItem(userId, JSON.stringify(list));
    }
    localStorage.setItem(userId, JSON.stringify(list));
  },
  getList: function (userId, userRole) {
    if (userRole == "admin") {
      return this.admin_data;
    } else if (userRole == "super_admin") {
      return this.superadmin_data;
    } else if (userRole == "support") {
      return this.representative_data;
    }
  },
};
export default dataList;
