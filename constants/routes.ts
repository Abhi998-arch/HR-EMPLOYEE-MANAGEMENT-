export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    VERIFY: '/verify',
  },
  EMPLOYEE: {
    HOME: '/employee/home',
    ATTENDANCE: '/employee/attendance',
    LEAVE: '/employee/leave',
    PAYROLL: '/employee/payroll',
    PROFILE: '/employee/profile',
  },
  HR: {
    DASHBOARD: '/hr/dashboard',
    EMPLOYEES: '/hr/employees',
    ATTENDANCE: '/hr/attendance',
    LEAVE: '/hr/leave',
    PAYROLL: '/hr/payroll',
  },
} as const;
