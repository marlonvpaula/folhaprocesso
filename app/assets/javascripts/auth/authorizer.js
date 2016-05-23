angular.module('common.services')
.service("Authorizer", function(APP_PERMISSIONS, USER_ROLES) {
  return function(user) {
    return {
      canAccess: function(permission) {
        /*var i, len, permission;
        if (!angular.isArray(permissions)) {
          permissions = [permissions];
        }
        for (i = 0, len = permissions.length; i < len; i++) {
          permission = permissions[i];
          if (APP_PERMISSIONS[permission] == null) {
            throw "Bad permission value";
          }*/
        if (user && user.role) {
          switch (permission) {
            case APP_PERMISSIONS.Acessorio:    
            case APP_PERMISSIONS.Comando:      
            case APP_PERMISSIONS.Desenho:      
            case APP_PERMISSIONS.Fabricante:   
            case APP_PERMISSIONS.FolhaProcesso:
            case APP_PERMISSIONS.GrupoModelo:  
            case APP_PERMISSIONS.Inserto:      
            case APP_PERMISSIONS.Modelo:       
            case APP_PERMISSIONS.Operacao:     
            case APP_PERMISSIONS.Programador:  
            case APP_PERMISSIONS.Suporte:      
              return user.role === USER_ROLES.superadmin || 
                     user.role === USER_ROLES.admin || 
                     user.role === USER_ROLES.normal;
            case APP_PERMISSIONS.User:
              return user.role === USER_ROLES.superadmin || 
                     user.role === USER_ROLES.admin;
            case APP_PERMISSIONS.Empresa:
              return user.role === USER_ROLES.superadmin;
          }
        } else {
          return false;
        }
        /*}
        return false;*/
      }
    };
  };
});