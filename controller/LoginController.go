package controller

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"yunke/service"
	"yunke/tool"
	"yunke/model"
)

type LoginController struct {

}

func NewLoginController()  *LoginController {
	return &LoginController{}
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
	if member == nil {
		tool.Failed(ctx, "登录失败", "")
		return
	}
	if member.Id != 0 {
		//用户信息保存到session中

		sessKey := "member"
		sessVal, _:= json.Marshal(member)
		err := tool.SetSess(ctx, sessKey, sessVal)
		if err != nil {
			tool.Failed(ctx, "登录失败", "")
		}

		tool.Success(ctx, &member)
		return
	}
}

//退出登录
func (lc *LoginController) Logout(ctx *gin.Context) {

	r := tool.DelSess(ctx, "member")
	if r == true {
		//跳转首页
		ctx.Redirect(http.StatusMovedPermanently,"/user/login")
	}
	ctx.Redirect(http.StatusMovedPermanently,"/title/list")

}

func (lc *LoginController) UserInfo(ctx *gin.Context){
	memberInfo := tool.GetSess(ctx, "member")

	if memberInfo == nil {
		//未登陆
		tool.Failed(ctx, "没有用户信息", "")
		return
	}

	var member model.Member
	json.Unmarshal(memberInfo.([]byte), &member)
	tool.Success(ctx, &member)
	return


}