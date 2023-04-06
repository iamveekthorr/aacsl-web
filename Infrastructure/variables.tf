# variable "host_os" {
#   type = string
#   default = "windows"
# }

variable "resource_group_name" {
  default     = "aacsl-resourceGroup"
  description = "The name of the resource group"
  # aacsl
}

variable "REGION" {
  description = "Azure region"
  type        = string
  default     = "Uk South"
}

variable "administrator_login" {
  description = "Administrator login"
  type        = string
  sensitive   = true
  default     = "4dm1n157r470r"
}

variable "administrator_login_password" {
  description = "Administrator login password"
  type        = string
  sensitive   = true
  default     = "4-v3ry-53cr37-p455w0rd"
}