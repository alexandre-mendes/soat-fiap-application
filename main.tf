terraform {
  backend "s3" {
    bucket  = "soat-terraform-state-5dc9264c8c230a834fe2a59b744523fd"
    key     = "dynamo/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

provider "aws" {
  region = "us-east-1" 
}

resource "aws_ecr_repository" "fastfood_api" {
  name                 = "fastfood-api"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
}
