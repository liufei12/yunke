package controller

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"strings"
	"yunke/service"
	"yunke/tool"
)

type LoginController struct {

}

func NewLoginController() Console {
	return &LoginController{}
}

type Console interface {
	Login(*gin.Context)
	LoginVerify(*gin.Context)
}

func (lc *LoginController) MyValidate() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
	}
}

//登录页面
func (lc *LoginController) Login(ctx *gin.Context)  {
	ctx.HTML(http.StatusOK, "login.html", "")
}

//登录验证
func (lc *LoginController) LoginVerify(ctx *gin.Context) {
	//1 解析用户登录传递参数
	/*var userLoginParam param.UserLoginParam
	err := tool.Decode(context.Request.Body, &userLoginParam)
	if err != nil {
		tool.Failed(context, "参数解析失败", err.Error())
		return
	}*/

	name := ctx.PostForm("name")
	password := ctx.PostForm("password")

	//2 验证图形验证码是否正确  todo::这一步暂时不用

	//3 登录
	us := service.MemberService{}
	member := us.UserLogin(name, password)
	if member.Id != 0 {
		//用户信息保存到session中
		sess, _ := json.Marshal(member)
		//key := "user_" + string(member.Id)
		var keyTem strings.Builder
		keyTem.WriteString("user_")
		keyTem.WriteString(strconv.Itoa(int(member.Id)))
		key := keyTem.String()

		err := tool.SetSess(ctx, key, sess)
		if err != nil {
			tool.Failed(ctx, "登录失败", "")
		}
		tool.Success(ctx, &member)
		return
	}
	tool.Failed(ctx, "登录失败", "")
	return

}