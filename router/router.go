package router

import (
	"github.com/gin-gonic/gin"
	"yunke/controller"
	m2 "yunke/middleware"
)


func RegisterRouter(r *gin.Engine) *gin.Engine{

	//处理/demo的GET requests
	//r.GET("/demo", controllers.ShowDemo)
	// 处理ueditor的各类requests
	r.Any("/ueditor/controller", controller.Action)

	//定义静态资源
	r.Static("/static", "static")
	r.LoadHTMLGlob("template/**/*")

	//登录模块
	U := r.Group("/user")
	{
		//user := controller.NewValidate().NewLoginController   //这里可以放中间件，权限

		user := controller.NewLoginController()
		U.GET("login", user.Login)
		U.POST("verify", user.LoginVerify)
		U.GET("logout", user.Logout)
		U.GET("userinfo", user.UserInfo)

	}

	//用户管理
	M := r.Group("member", m2.Login("member/list"))
	{
		member := controller.NewMemberContrller()
		M.GET("list", member.List)
	}

	//文章分类管理
	Tc := r.Group("tc", m2.Login("tc"))
	{
		titleCategory := controller.NewTitleCategoryController()
		Tc.GET("list", titleCategory.List)
		Tc.GET("ajaxlist", titleCategory.AjaxList)
		Tc.GET("info", titleCategory.Get)
		Tc.POST("create", titleCategory.Create)
		Tc.POST("update", titleCategory.Update)
		Tc.POST("getimg", titleCategory.Update)
	}

	//文章管理
	T := r.Group("title")
	{
		title := controller.TitleController{}
		T.GET("list", m2.Login("title/list"), title.List)
		T.GET("detail", m2.Login("title/Detail"), title.Detail)
		T.GET("ajaxdetail", m2.Login("title/ajaxdetail"),title.AjaxDetail)
		T.GET("add", m2.Login("title/add"), title.Add)
		T.POST("create", m2.Login("title/create"), title.Create)
		T.GET("edit", m2.Login("title/edit"), title.Edit)
		T.POST("update", m2.Login("title/update"), title.Update)
		T.POST("imageUpload", m2.Login("title/imageUpload"), title.UmeditorUpload)
		T.GET("images", m2.Login("title/images"), title.GetImage)
		T.GET("delete", m2.Login("title/delete"), title.Delete)
	}

	return  r
}