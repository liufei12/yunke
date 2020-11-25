package service

import (
	"dao"
	"model"
)

type FoodCategoryService struct {

}


/**
 * 获取食品类别
 */
func (fcs *FoodCategoryService) Categorys() ([]model.FoodCatagory, error) {
	//数据库操作层
	foodCategoryDao := dao.NewFoodCategoryDao()
	return foodCategoryDao.QueryCategoryies()
}