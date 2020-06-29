package controller

import (
	"github.com/gin-gonic/gin"
)

type V interface {
	MyValidate() gin.HandlerFunc
}

type SomeValidate struct {
	NewLoginController 		V
}

func NewValidate() *SomeValidate {
	return &SomeValidate{
		NewLoginController: 			&LoginController{},
	}
}
