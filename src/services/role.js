// # roleService
//      direct copy of https://github.com/miro/dakdak-api/blob/development/services/role.js
//      these must be kept in sync!

export const UNREGISTERED = 'UNREGISTERED';
export const USER = 'USER';
export const EDITOR = 'EDITOR';
export const ADMIN = 'ADMIN';

const rolesConfig = [
  UNREGISTERED,
  USER,
  EDITOR,
  ADMIN
];

// Check if user is allowed to run stuff which are available only for requiredRole,
// returns the result as boolean. Will fallback to false
export function isAuthorized(userRole, requiredRole) {
  const userRoleIndex = rolesConfig.indexOf(userRole);
  const requiredRoleIndex = rolesConfig.indexOf(requiredRole);

  if (userRoleIndex >= 0 && requiredRoleIndex >= 0) {
    return (userRoleIndex >= requiredRoleIndex);
  }
  else if (userRoleIndex < 0 && requiredRoleIndex < 0) {
    // user had unregistered/undefined role, but so was the required role -> return true
    // NOTE: this might be again begging for errors..
    return true;
  }
  else {
    // otherwise, fallback to false
    return false;
  }
}
