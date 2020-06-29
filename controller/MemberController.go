package controller

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"yunke/param"
	"yunke/service"
	"yunke/tool"
)

type MemberController struct {

}

func NewMemberContrller() *MemberController {
	return &MemberController{}
}

type member interface {
	List(*gin.Context)
}

func (mc *MemberController) Router(engine *gin.Engine){
	//生成、发送验证码
	engine.GET("api/sendcode", mc.sendSmsCode)
	//验证码登录
	engine.POST("api/login_sms", mc.smsLogin)
	//用户名、密码登录
	engine.POST("api/user_login", mc.userLogin)
	//上传头像
	engine.POST("/api/upload/avatov", mc.uploadAvator)
}

func (mc *MemberController) uploadAvator(context *gin.Context) {
	//1 解析上传的参数 file、user_id
	//userId :=

	//2 判断user_id对应的用户是否已经登录

	//3 file保存到本地

	//4 将保存后的文件路径 保存到用户表中的头像字段

	//5 返回结果
}

func (mc *MemberController) userLogin(context *gin.Context) {
	//1 解析用户登录传递参数
	var userLoginParam param.UserLoginParam

	err := tool.Decode(context.Request.Body, &userLoginParam)
	if err != nil {
		tool.Failed(context, "参数解析失败", err.Error())
		return
	}

	//2 验证图形验证码是否正确  这一步暂时不用

	//3 登录
	us := service.MemberService{}
	member := us.UserLogin(userLoginParam.Name, userLoginParam.Password)
	if member.Id != 0 {
		//用户信息保存到session中
		sess, _ := json.Marshal(member)
		err := tool.SetSess(context, "user_" + string(member.Id), sess)
		if err != nil {
			tool.Failed(context, "登录失败", "")
		}
		tool.Success(context, &member)
		return
	}
	tool.Failed(context, "登录失败", "")
	return

}

func (mc *MemberController) sendSmsCode(context *gin.Context)  {
	phone, exists := context.GetQuery("phone")

	if !exists {
		tool.Failed(context, "参数解析失败", "")
		return
	}

	//调用短信接口
	ms := service.MemberService{}
	isSend := ms.Sendcode(phone)
	if isSend{
		tool.Success(context, "发送成功")
		return
	}

	tool.Failed(context, "发送失败","")
	return

}

//手机号+短信 登录
func (mc *MemberController) smsLogin(context *gin.Context)  {
	var smsLoginParam param.SmsLoginParams
	err := tool.Decode(context.Request.Body, &smsLoginParam)
	if err != nil {
		tool.Failed(context, "参数解析失败", err.Error())
		return
	}

	//完成手机登录验证
	us := service.MemberService{};
	member := us.SmsLogin(smsLoginParam)
	if member != nil {
		sess, _ := json.Marshal(member)
		if err :=  tool.SetSess(context, "user_" + string(member.Id), sess); err != nil{
			tool.Failed(context, "登录失败", "")
		}

		tool.Success(context, member)
		return
	}
	tool.Failed(context, "登录失败","")
}

//用户展示
func (mc *MemberController) List(ctx *gin.Context) {

	pageLength := tool.PageLength;

	//搜索条件
	uid := ctx.DefaultQuery("uid", "")
	phone := ctx.DefaultQuery("phone", "")
	name := ctx.DefaultQuery("name", "")
	page := ctx.DefaultQuery("page", "1")
	length := ctx.DefaultQuery("length", strconv.Itoa(pageLength))

	path := "/member/list"
	condition := make(map[string]interface{})
	if uid!= "" {
		condition["id"], _ = strconv.ParseInt(uid, 10, 64)
		if path != "/member/list" {
			path = path + "?uid=" + uid
		}else{
			path = path + "&uid=" + uid
		}
	}
	if phone != "" {
		condition["phone"] = phone
		if path != "/member/list" {
			path = path + "?phone=" + phone
		}else{
			path = path + "&phone=" + phone
		}
	}
	if name != "" {
		condition["name"] = name
		if path != "/member/list" {
			path = path + "?name=" + name
		}else{
			path = path + "&name=" + name
		}
	}

	us := service.MemberService{};

	//查询总数
	memberCount := us.MemberCount(condition)
	total := int((memberCount/int64(pageLength)))+1

	startPage, _ := strconv.Atoi(page)
	condition["startRow"] = (startPage-1) * pageLength
	condition["lengthNum"], _ = strconv.Atoi(length)

	//查询
	member := us.MemberList(condition)

	activeC := "member"
	activeV := "list"
	ctx.HTML(http.StatusOK, "user/list.html", gin.H{
		"MemberList" : member,
		"uid" : uid,
		"phone" : phone,
		"name" : name,
		"path" : path,
		"page" : startPage,
		"length" : pageLength,
		"total" : total,
		"activeC" : activeC,
		"activeV" : activeV,
	})
}


