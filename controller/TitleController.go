package controller

import (
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"
	"model"
	"service"
	"tool"
)

type TitleController struct {

}

func (t *TitleController) List(ctx *gin.Context){

	/*fmt.Println("555555555555")
	us := service.UserService{}
	userList := us.GrpcGetUser(map[string]interface{}{
		"mobile": "15874296765",
	})
	fmt.Println(userList)*/



	titleId := ctx.DefaultQuery("typeId", "1")
	titleType := ctx.DefaultQuery("type", "php")
	ts := service.TitleService{}
	params := map[string]interface{}{
		"typeId" : titleId,
	}
	titleList, err := ts.List(params)
	if err != nil {
		ctx.HTML(http.StatusOK, "title/list.html",gin.H{
			"List" : nil,
			"type" : titleType,
		})
	}
	ctx.HTML(http.StatusOK, "title/list.html", gin.H{
		"List" : titleList,
		"type" : titleType,
	})
}

func (t *TitleController) Detail(ctx *gin.Context){
	id, _ := strconv.ParseInt(ctx.Query("id"), 10 ,64)

	if id == 0 {

	}

	ts := service.TitleService{}
	condition := map[string]interface{}{
		"id": id,
	}
	info := ts.GetByCondition(condition)

	ctx.HTML(http.StatusOK, "title/detail.html", gin.H{
		"info": info,
	})

}

func (t *TitleController) AjaxDetail(ctx *gin.Context){
	id, _ := strconv.ParseInt(ctx.Query("id"), 10 ,64)

	if id == 0 {
		tool.Failed(ctx, "参数错误", "")
	}

	ts := service.TitleService{}
	condition := map[string]interface{}{
		"id": id,
	}
	info := ts.GetByCondition(condition)

	tts := service.TitleCategoryService{}
	categoryList := tts.List()

	result := map[string]interface{}{
		"titleInfo": info,
		"categoryList": categoryList,
	}

	tool.Success(ctx, result)

}

//新增页面
func (t *TitleController) Add(ctx *gin.Context) {

	//查询文章分类
	ts := service.TitleCategoryService{}
	categoryList := ts.List()

	ctx.HTML(http.StatusOK, "title/add.html", gin.H{
		"List" : categoryList,
	})
}

//新增
func (t *TitleController) Create(ctx *gin.Context) {

	cateId := ctx.PostForm("cateId")
	name := ctx.PostForm("name")
	content := ctx.PostForm("editorValue")

	if cateId == "" || name=="" || content=="" {
		tool.Failed(ctx, "新增失败", "")
		return
	}

	typeId,_ := strconv.Atoi(cateId)
	tm := model.Title{
		Name: name,
		TypeId: int64(typeId),
		Content: content,
		Status: 1,
		CreateTime: time.Now().Format("2006-01-03 15:01:02"),
	}

	ts := service.TitleService{}
	result := ts.Create(tm)

	if result == 0 {
		tool.Failed(ctx, "插入失败", "")
		return
	}
	tool.Success(ctx, &result)
	return
}

func (t *TitleController) UmeditorUpload(ctx *gin.Context){

	//从请求中读取文件
	f, err := ctx.FormFile("upfile")
	if err != nil {
		tool.Failed(ctx, "上传失败", "")
	}else {
		//将读取到的文件保存在本地(服务器端本地)
		//dst := fmt.Sprintf("./%s", f.Filename)
		fileName := strconv.FormatInt(time.Now().Unix(), 10) + f.Filename
		fileUrl := "./uploadfile/" + fileName
		//dst := path.Join("./uploadfile/", f.Filename)
		err = ctx.SaveUploadedFile(f, fileUrl)
		if err != nil {
			tool.Failed(ctx, "上传失败", "")
			return
		}
		/*data := map[string]string{
			"filename" : fileName,
		}*/

		data := map[string]interface{}{
			"state":"SUCCESS",
			"url": "D:\\goproject\\src\\yunke\\uploadfile\\15931618633.png",
			"title": "picture_1",
			"original": "picture_1",
			"type": "png",
		}

		tool.Success(ctx, data)
		return
	}
}

//图片展示
func (t *TitleController) GetImage(c *gin.Context) {

	filePath := "D:\\goproject\\src\\yunke\\static\\upload\\images\\" + c.Query("datepath") + "\\" + c.Query("imgname")

	file, _ := ioutil.ReadFile(filePath)
	c.Writer.WriteString(string(file))
}

//删除
func (t *TitleController) Delete (ctx *gin.Context) {
	id, _ := strconv.ParseInt(ctx.Query("id"), 10 ,64)

	if id == 0 {
		//定义一个404页面跳转404
		tool.Success(ctx, "参数错误")
		return
	}

	ts := service.TitleService{}
	affect := ts.DeleteById(id)

	if affect == true {
		tool.Success(ctx, "删除成功")
		return
	}
	tool.Failed(ctx, "删除失败", "")
	return
}

//编辑页面
func (t *TitleController) Edit (ctx *gin.Context) {
	//查询文章分类
	ts := service.TitleCategoryService{}
	categoryList := ts.List()
	id := ctx.Query("id")

	ctx.HTML(http.StatusOK, "title/edit.html", gin.H{
		"List" : categoryList,
		"id": id,
	})
}

//编辑
func (t *TitleController) Update (ctx *gin.Context)  {
	cateId := ctx.PostForm("cateId")
	cateName := ctx.PostForm("cateName")
	titleId ,_ := strconv.ParseInt(ctx.PostForm("titleId"), 10, 64)
	name := ctx.PostForm("name")
	content := ctx.PostForm("editorValue")

	if cateId == "" || name=="" || content==""  || titleId == 0{
		tool.Failed(ctx, "更新失败", "")
		return
	}

	typeId,_ := strconv.Atoi(cateId)
	tm := model.Title{
		Name: name,
		TypeId: int64(typeId),
		Content: content,
	}

	ts := service.TitleService{}
	result := ts.UpdateById(titleId, &tm)

	if result == false {
		tool.Failed(ctx, "更新失败", "")
		return
	}

	cateInfo := map[string]string{
		"cateId": cateId,
		"cateName": cateName,
	}

	tool.Success(ctx, &cateInfo)
	return
}


