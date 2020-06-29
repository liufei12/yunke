package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"yunke/service"
	"yunke/tool"
)

type TitleCategoryController struct {

}

func NewTitleCategoryController() *TitleCategoryController {
	return &TitleCategoryController{}
}

func (tc *TitleCategoryController) List(ctx *gin.Context) {

	ts := service.TitleCategoryService{}
	categoryList := ts.List()

	ctx.HTML(http.StatusOK, "titlecategory/list.html", gin.H{
		"categoryList": categoryList,
	})
}

func (tc *TitleCategoryController) AjaxList(ctx *gin.Context) {
	ts := service.TitleCategoryService{}
	cateList := ts.List()

	if cateList != nil {
		tool.Success(ctx, cateList)
		return
	}
	tool.Failed(ctx, "暂无数据", "")

}

func (tc *TitleCategoryController) Create(ctx *gin.Context)  {
	cname := ctx.PostForm("cname")
	decription := ctx.PostForm("decription")

	if cname == "" || decription == "" {
		tool.Failed(ctx, "插入失败", "")
		return
	}

	ts := service.TitleCategoryService{}

	//查询此分类是否存在，存在则不写入
	titleCategoryRow := ts.Get(cname)

	if titleCategoryRow.Id > 0 {
		tool.Failed(ctx, "该分类已经存在", "")
		return
	}

	insert := make(map[string]string)
	insert["cname"] = cname
	insert["decription"] = decription


	id := ts.Create(insert)
	if id >0 {
		tool.Success(ctx, "")
		return
	}
	tool.Failed(ctx, "插入失败", "")
}

func (tc *TitleCategoryController) Update(ctx *gin.Context) {

	cid := ctx.PostForm("id")
	cname := ctx.PostForm("cname")
	decription := ctx.PostForm("decription")

	id, _ := strconv.Atoi(cid)
	if id == 0 || cname=="" || decription=="" {
		tool.Failed(ctx, "参数错误", "")
		return
	}

	ts := service.TitleCategoryService{}

	//查询此分类是否存在，存在则不写入
	titleCategoryRow := ts.Get(cname)
	if titleCategoryRow.Id > 0 {
		tool.Failed(ctx, "该分类已经存在", "")
		return
	}

	data := map[string]string{
		"cname" : cname,
		"decription" : decription,
	}
	if err := ts.Update(int64(id), data); err != nil {
		tool.Failed(ctx, "更新失败", "")
		return
	}
	tool.Success(ctx, "更新成功")
	return
}

func (tc *TitleCategoryController) Get(ctx *gin.Context){
	ts := service.TitleCategoryService{}
	uid , _:= strconv.Atoi(ctx.DefaultQuery("id", ""))
	id := int64(uid)

	condition := map[string]interface{}{
		"id" : id,
	}
	titleCategory := ts.GetByCondition(condition)

	if titleCategory != nil {
		tool.Success(ctx, titleCategory)
		return
	}
	tool.Failed(ctx, "暂无查询数据", "")
	return
}