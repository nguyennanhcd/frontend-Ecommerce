import { ROUTE_CONFIG } from './route'

export const VerticalItem = [
  {
    title: 'Hệ thống',
    icon: 'icon-park-outline:system',
    children: [
      {
        title: 'Người dùng',
        icon: 'clarity:users-line',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.SYSTEM.USER
      },
      {
        title: 'Nhóm vai trò',
        icon: 'oui:app-users-roles',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.SYSTEM.ROLE
      }
    ]
  },
  {
    title: 'Quản trị sản phẩm',
    icon: 'ep:goods',
    children: [
      {
        title: 'Danh sách sản phẩm',
        icon: 'fluent-mdl2:product-list',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_PRODUCT
      },
      {
        title: 'Danh mục sản phẩm',
        icon: 'carbon:category',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_PRODUCT_TYPES
      },
      {
        title: 'Danh sách đơn hàng',
        icon: 'material-symbols:draft-orders-rounded',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_ORDER
      },
      {
        title: 'Danh sách đánh giá',
        icon: 'material-symbols:feedback-outline',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_REVIEW
      }
    ]
  },
  {
    title: 'Cài đặt',
    icon: 'ant-design:setting-outlined',
    children: [
      {
        title: 'Thành phố',
        icon: 'emojione:cityscape',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.SETTINGS.CITY
      },
      {
        title: 'Phương thức giao hàng',
        icon: 'emojione:delivery-truck',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.SETTINGS.DELIVERY_TYPES
      },
      {
        title: 'Phương thức thanh toán',
        icon: 'streamline:payment-10',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.SETTINGS.PAYMENT_TYPES
      }
    ]
  }
]
