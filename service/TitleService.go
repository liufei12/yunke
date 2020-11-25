package service

import (
	"strconv"
	"yunke/dao"
	"yunke/model"
)

type TitleService struct {

}

func (ts *TitleService)List(params map[string]interface{}) ([]*model.Title, error) {

	//1. 查询文章类型列表
	typeId, _ :=  strconv.ParseInt(params["typeId"].(string), 10, 64)

	t := new(TitleCategoryService)
	cateParams := map[string]interface{}{
		"id" : typeId,
	}
	if titleCate := t.GetByCondition(cateParams); titleCate == nil {
		return nil, nil
	}

	//2. 条件
	//paramsMap := make(map[string]interface{})
	var paramsMap = &model.Title{}

	paramsMap = &model.Title{
		TypeId: typeId,
		Status: 1,
	}

	//3. 根据对应的类型找出文章
	td := dao.NewTitle()
	titleList, err := td.List(paramsMap)
	if err != nil {
		return nil, err
	}
	return titleList, err
}

func (ts *TitleService) Create(params model.Title) int64 {
	td := dao.NewTitle()
	result := td.Create(params)
	return result
}

func (ts *TitleService) GetByCondition(params map[string]interface{}) (*model.TitleType) {
	paramsModel := &model.Title{}
	if _,ok := params["id"]; ok == true {
		paramsModel = &model.Title {
			Id: params["id"].(int64),
		}
	}

	td := dao.NewTitle()
	//td := dao.NewTitleType()
	info := td.QueryByCondition(paramsModel)
	return info

}

//删除
func (ts *TitleService) DeleteById(id int64) bool {
	td := dao.NewTitle()

	if aff := td.DeleteById(id); aff ==true {
		return true
	}
	return false
}

//更新
func (ts *TitleService) UpdateById(id int64, updateData *model.Title) bool {

	td := dao.NewTitle()
	res := td.UpdateById(id, updateData)
	return res
}


