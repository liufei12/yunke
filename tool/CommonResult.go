package tool

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	SUCCESS int = 0  //操作成功
	FAILED int = 1   //操作失败
)

//操作成功
func Success(ctx *gin.Context, v interface{})  {
	ctx.JSON(http.StatusOK, map[string]interface{}{
		"code": SUCCESS,
		"sms": "成功",
		"data": v,
	})
}

//操作失败
func Failed(ctx *gin.Context, v interface{}, data interface{}) {
	ctx.JSON(http.StatusOK, map[string]interface{}{
		"code": FAILED,
		"msg":  v,
		"data": data,
	})
}