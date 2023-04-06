terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

provider "azurerm" {
  features {

  }
}
# provider "azuread" {

# }

resource "azurerm_resource_group" "aacsl-rg" {
  name     = var.resource_group_name
  location = var.REGION
  tags = {
    "environment" = "dev"
    "source"      = "Terraform"
    # "team"        = "DevOps"
  }
}


# data "azuread_client_config" "aacsl" {}

# data "azuread_application_published_app_ids" "well_known" {}

# resource "azuread_service_principal" "aacsl-msgraph" {
#   application_id = data.azuread_application_published_app_ids.well_known.id
#   use_existing   = true
  
# }


# resource "azuread_application" "app-api" {
#   display_name = "aacls-orgs"
#   owners       = [data.azuread_client_config.aacsl.object_id]


#   api {
#     oauth2_permission_scope {
#       admin_consent_description  = "Allow the application to access example on behalf of the signed-in user."
#       admin_consent_display_name = "Access example"
#       enabled                    = true
#       id                         = "96183846-204b-4b43-82e1-5d2222eb4b9b"
#       type                       = "User"
#       user_consent_description   = "Allow the application to access example on your behalf."
#       user_consent_display_name  = "Access example"
#       value                      = "user_impersonation"
#     }
#   }

#   app_role {
#     allowed_member_types = ["User", "Application"]
#     description          = "Admins can manage roles and perform all task actions"
#     display_name         = "Admin"
#     enabled              = true
#     id                   = data.azuread_client_config.aacsl.object_id
#     value                = "application-administrator"
#   }

#   web {
#     homepage_url  = "https://app.example.net"
#     logout_url    = "https://app.example.net/logout"
#     redirect_uris = ["https://app.example.net/account"]

#     implicit_grant {
#       access_token_issuance_enabled = true
#       id_token_issuance_enabled     = true
#     }
#   }

#   required_resource_access {
#     resource_app_id = data.azuread_application_published_app_ids.well_known.id # Microsoft Graph result



#     resource_access {
#       id   = azuread_service_principal.aacsl-msgraph.app_role_ids["User.Read.All"]
#       type = "Role"
#     }

#     resource_access {
#       id   = azuread_service_principal.aacsl-msgraph.oauth2_permission_scope_ids["User.ReadWrite"] # User.Read.All
#       type = "Scope"
#     }
#   }
# }


# data "azuread_client_config" "aacsl" {}

# resource "azuread_application" "aacsl-application" {
#   display_name    = "aacsl-orgs"
#   identifier_uris = ["api://example-app"]
#   # logo_image       = filebase64("/path/to/logo.png")
#   owners           = [data.azuread_client_config.aacsl.object_id]
#   sign_in_audience = "AzureADMultipleOrgs"

#   api {
#     mapped_claims_enabled          = true
#     requested_access_token_version = 2

#     # known_client_applications = [
#     #   azuread_application.known1.application_id,
#     #   azuread_application.known2.application_id,
#     # ]

#     oauth2_permission_scope {
#       admin_consent_description  = "Allow the application to access aacls on behalf of the signed-in user."
#       admin_consent_display_name = "Access aacls"
#       enabled                    = true
#       id                         = "96183846-204b-4b43-82e1-5d2222eb4b9b"
#       type                       = "User"
#       user_consent_description   = "Allow the application to access aacls on your behalf."
#       user_consent_display_name  = "Access aacls"
#       value                      = "user_impersonation"
#     }

#     oauth2_permission_scope {
#       admin_consent_description  = "Administer the example application"
#       admin_consent_display_name = "Administer"
#       enabled                    = true
#       id                         = "be98fa3e-ab5b-4b11-83d9-04ba2b7946bc"
#       type                       = "Admin"
#       value                      = "administer"
#     }
#   }

#   app_role {
#     allowed_member_types = ["User", "Application"]
#     description          = "Admins can manage roles and perform all task actions"
#     display_name         = "Admin"
#     enabled              = true
#     id                   = "1b19509b-32b1-4e9f-b71d-4992aa991967"
#     value                = "admin"
#   }

#   app_role {
#     allowed_member_types = ["User"]
#     description          = "ReadOnly roles have limited query access"
#     display_name         = "ReadOnly"
#     enabled              = true
#     id                   = "497406e4-012a-4267-bf18-45a1cb148a01"
#     value                = "User"
#   }

#   feature_tags {
#     enterprise = true
#     gallery    = true
#   }

#   optional_claims {
#     access_token {
#       name = "myclaim"
#     }

#     access_token {
#       name = "otherclaim"
#     }

#     id_token {
#       name                  = "userclaim"
#       source                = "user"
#       essential             = true
#       additional_properties = ["emit_as_roles"]
#     }

#     saml2_token {
#       name = "samlexample"
#     }
#   }

#   required_resource_access {
#     resource_app_id = "00000003-0000-0000-c000-000000000000" # Microsoft Graph

#     resource_access {
#       id   = "df021288-bdef-4463-88db-98f22de89214" # User.Read.All
#       type = "Role"
#     }

#     resource_access {
#       id   = "b4e74841-8e56-480b-be8b-910348b18b4c" # User.ReadWrite
#       type = "Scope"
#     }
#   }

#   required_resource_access {
#     resource_app_id = "c5393580-f805-4401-95e8-94b7a6ef2fc2" # Office 365 Management

#     resource_access {
#       id   = "594c1fb6-4f81-4475-ae41-0c394909246c" # ActivityFeed.Read
#       type = "Role"
#     }
#   }

#   web {
#     homepage_url  = "https://app.example.net"
#     logout_url    = "https://app.example.net/logout"
#     redirect_uris = ["https://app.example.net/account"]

#     implicit_grant {
#       access_token_issuance_enabled = true
#       id_token_issuance_enabled     = true
#     }
#   }
# }



resource "azurerm_service_plan" "aacsl_service_plan" {
  name                = "aacls-service_plan"
  resource_group_name = azurerm_resource_group.aacsl-rg.name
  location            = azurerm_resource_group.aacsl-rg.location
  os_type             = "Linux"
  sku_name            = "B1"
}


resource "azurerm_linux_web_app" "aacls_service" {
  name                = "aacls-web-app"
  resource_group_name = azurerm_resource_group.aacsl-rg.name
  location            = azurerm_resource_group.aacsl-rg.location
  service_plan_id     = azurerm_service_plan.aacsl_service_plan.id

  site_config {
    application_stack {
      node_version = "16-lts"
    }
  }


}

resource "azurerm_application_insights" "aacsl_insights" {
  name                = "aacsl-application-insights"
  location            = var.REGION
  resource_group_name = azurerm_resource_group.aacsl-rg.name
  application_type    = "Node.JS"

  depends_on = [
    azurerm_service_plan.aacsl_service_plan
  ]

}

resource "azurerm_virtual_network" "aacsl-vnetwork" {
  name                = "aacsl-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.aacsl-rg.location
  resource_group_name = azurerm_resource_group.aacsl-rg.name
}

resource "azurerm_subnet" "aacsl-subnet" {
  name                 = "aacsl-subnet"
  resource_group_name  = azurerm_resource_group.aacsl-rg.name
  virtual_network_name = azurerm_virtual_network.aacsl-vnetwork.name
  address_prefixes     = ["10.0.1.0/24"]
  service_endpoints    = ["Microsoft.Sql"]
}

resource "azurerm_storage_account" "aacsl-sa" {
  name                     = "aacslstorageacc"
  resource_group_name      = azurerm_resource_group.aacsl-rg.name
  location                 = var.REGION
  account_tier             = "Standard"
  account_replication_type = "LRS"
}


resource "azurerm_mssql_server" "aacsl-server" {
  name                         = "myaacsl-sqlserver"
  resource_group_name          = azurerm_resource_group.aacsl-rg.name
  location                     = azurerm_resource_group.aacsl-rg.location
  version                      = "12.0"
  administrator_login          = var.administrator_login
  administrator_login_password = var.administrator_login_password
}

resource "azurerm_mssql_database" "aacsl-database" {
  name                 = "myaacsl-dbase"
  server_id            = azurerm_mssql_server.aacsl-server.id
  collation            = "SQL_Latin1_General_CP1_CI_AS"
  license_type         = "LicenseIncluded"
  max_size_gb          = 10
  read_scale           = false
  sku_name             = "S0"
  zone_redundant       = false
  # storage_account_type = [Local]
  threat_detection_policy {
    state                      = "Enabled"
    storage_endpoint           = azurerm_storage_account.aacsl-sa.primary_blob_endpoint
    storage_account_access_key = azurerm_storage_account.aacsl-sa.primary_access_key
  }

  tags = {
    foo         = "bar"
    environment = "dev"
  }
}

resource "azurerm_mssql_firewall_rule" "aacsl-firewall_rule" {
  name             = "aacslFirewallRule"
  server_id        = azurerm_mssql_server.aacsl-server.id
  start_ip_address = "10.0.17.62"
  end_ip_address   = "10.0.17.62"
}
resource "azurerm_mssql_firewall_rule" "aacsl-firewall_rule" {
  name             = "aacslFirewallRule1"
  server_id        = azurerm_mssql_server.aacsl-server.id
  start_ip_address = "10.0.17.62"
  end_ip_address   = "10.0.17.62"
}

resource "azurerm_mssql_firewall_rule" "aacsl-firewall_rule" {
  name             = "aacslFirewallRule2"
  server_id        = azurerm_mssql_server.aacsl-server.id
  start_ip_address = "10.0.17.62"
  end_ip_address   = "10.0.17.62"
}

resource "azurerm_mssql_virtual_network_rule" "aacsl_vnet_rule" {
  name      = "aacsl-sql-vnet-rule"
  server_id = azurerm_mssql_server.aacsl-server.id
  subnet_id = azurerm_subnet.aacsl-subnet.id
}



# resource "azurerm_network_security_group" "aacsl_sg" {
#   name                = "aacsl-sg"
#   resource_group_name = azurerm_resource_group.aacsl-rg.name
#   location            = var.REGION
#   tags = {
#     "environment" = "dev"
#   }
# }

# resource "azurerm_network_security_rule" "aacsl_dev_rule" {
#   name                        = "aacsl-dev-rule"
#   priority                    = 100
#   direction                   = "Inbound"
#   access                      = "Allow"
#   protocol                    = "Tcp"
#   source_port_range           = "*"
#   destination_port_range      = "*"
#   source_address_prefix       = "*"
#   destination_address_prefix  = "*"
#   resource_group_name         = azurerm_resource_group.aacsl-rg.name
#   network_security_group_name = azurerm_network_security_group.aacsl_sg.name
# }

# resource "azurerm_subnet_network_security_group_association" "aacsl-sga" {
#   subnet_id                 = azurerm_subnet.aacsl-subnet.id
#   network_security_group_id = azurerm_network_security_group.aacsl_sg.id
# }