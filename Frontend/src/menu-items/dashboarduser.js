// assets
import { CalendarOutlined } from '@ant-design/icons';

// icons
const icons = {
  CalendarOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboarduser = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboarduser',
      title: 'Dashboarduser',
      type: 'item',
      url: 'src/pages/dashboard/indexuser',
      icon: icons.CalendarOutlined,
      breadcrumbs: false
    },
  ]
};

export default dashboarduser;