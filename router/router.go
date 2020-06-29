package router

import (
	"github.com/gin-gonic/gin"
	"yunke/controller"
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

	}

	//用户管理
	M := r.Group("member")
	{
		member := controller.NewMemberContrller()
		M.GET("list", member.List)
	}

	//文章分类管理
	Tc := r.Group("tc")
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
		T.GET("list", title.List)
		T.GET("detail", title.Detail)
		T.GET("ajaxdetail", title.AjaxDetail)
		T.GET("add", title.Add)
		T.POST("create", title.Create)
		T.GET("edit", title.Edit)
		T.POST("update", title.Update)
		T.POST("imageUpload", title.UmeditorUpload)
		T.GET("images", title.GetImage)
		T.GET("delete", title.Delete)
	}

	return  r
}