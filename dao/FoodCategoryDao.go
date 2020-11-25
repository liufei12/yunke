package dao

import (
	"model"
	"tool"
)

type FoodCategoryDao struct {
	*tool.Orm
}

//实例化Dao对象
func NewFoodCategoryDao() *FoodCategoryDao {
	return &FoodCategoryDao{tool.DbEngine}
}

//从数据库中查询所有食品类别，并返回
func (fcd *FoodCategoryDao) QueryCategoryies() ([]model.FoodCatagory, error){
	var category []model.FoodCatagory
	if err := fcd.Engine.Find(&category); err != nil {
		return nil, err
	}
	return category, nil
}


