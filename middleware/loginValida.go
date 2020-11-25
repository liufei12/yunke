package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"

	/*"net/http"
	"yunke/gin/api"*/
	"tool"
)

func Login(routerAsName string)  gin.HandlerFunc {
	return func(c *gin.Context) {
		//apiG := api.Gin{C: c}

		memberInfo := tool.GetSess(c, "member")

		if memberInfo == nil {
			//未登陆
			//apiG.Response(http.StatusOK,400001005,nil)
			//return
			c.Redirect(http.StatusMovedPermanently,"/user/login")
		}
		/*var member model.Member
		json.Unmarshal(memberInfo.([]byte), &member)
		fmt.Println(member.UserName)*/
	}
}