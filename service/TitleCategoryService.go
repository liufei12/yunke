package service

import (
	"time"
	"dao"
	"model"
)

type TitleCategoryService struct {

}

func (tc *TitleCategoryService)NewTitleCategoryService() *TitleCategoryService  {
	return &TitleCategoryService{}
}

func (ts *TitleCategoryService) Create(params map[string]string) int64 {

	td := dao.NewTitleCategoryDao()

	tm := model.TitleCategory{}
	tm.Cname = params["cname"]
	tm.Decription = params["decription"]
	tm.ImageUrl = ""
	tm.Status = 0
	tm.CreateTime = time.Now().Format("2006-01-03 01:02:07")

	tm.Id = td.Create(tm)
	return tm.Id
}

func (ts *TitleCategoryService) Update(id int64, params map[string]string) error  {
	dao := dao.NewTitleCategoryDao()
	if err := dao.Update(id, params); err != nil{
		return err
	}
	return nil
}

func (ts *TitleCategoryService) List() []*model.TitleCategory {
	td := dao.NewTitleCategoryDao()

	categoryList, err := td.List()
	if err != nil {
		return nil
	}
	return categoryList

}

func (ts *TitleCategoryService) Get(cname string) *model.TitleCategory {

	dao := dao.NewTitleCategoryDao()
	titleCate := dao.QueryGet(cname)

	return titleCate
}

func (ts *TitleCategoryService) GetByCondition(params map[string]interface{}) *model.TitleCategory {

	paramsMap := &model.TitleCategory{}
	if _, ok := params["id"]; ok == true{
		paramsMap = &model.TitleCategory{
			Id: params["id"].(int64),
		}
	}

	dao := dao.NewTitleCategoryDao()
	titleCategory := dao.QueryGetByCondition(paramsMap)

	return titleCategory
}



