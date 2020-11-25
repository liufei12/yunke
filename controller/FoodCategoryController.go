package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"service"
	"tool"
)

type FoodCatrgoryController struct {

}

func (fcc *FoodCatrgoryController) Router(engine *gin.Engine){
	engine.GET("api/food_category_list", fcc.foodCategoryList)
}

func (fcc *FoodCatrgoryController) foodCategoryList(ctx *gin.Context) {
	//调用service功能获取视频种类信息
	foodCategoryService := &service.FoodCategoryService{}
	category, err := foodCategoryService.Categorys()
	if err != nil {
		fmt.Printf("%v", err.Error())
		tool.Failed(ctx, "没有食品种类", "")
		return
	}

	tool.Success(ctx, category)

}
