package dao

import (
	"fmt"
	"yunke/model"
	"yunke/tool"
)

type TitleCategoryDao struct {
	*tool.Orm
}

func NewTitleCategoryDao() *TitleCategoryDao {
	return &TitleCategoryDao{tool.DbEngine}
}

func (td *TitleCategoryDao) Create(tcm model.TitleCategory) int64 {
	result, err := td.InsertOne(tcm)
	if err != nil {
		return 0
	}
	return  result
}

func (td *TitleCategoryDao) List()([]*model.TitleCategory, error) {

	var titleCategorys []*model.TitleCategory

	err := td.Find(&titleCategorys)
	if err != nil {
		return nil, err
	}

	return titleCategorys, nil
}


func (td *TitleCategoryDao) QueryGet(cname string) *model.TitleCategory{
	var titleCate model.TitleCategory

	if _, err := td.Where("cname = ? ", cname).Get(&titleCate); err != nil {
		fmt.Println(err)
		return nil
	}
	return &titleCate
}

func (td *TitleCategoryDao) QueryGetByCondition(params *model.TitleCategory) *model.TitleCategory{

	if _, err := td.Get(params); err != nil {
		return nil
	}
	return params
}

func (td *TitleCategoryDao) Update(id int64, params map[string]string) error {

	titleCate := model.TitleCategory{Cname: params["cname"], Decription: params["decription"]}
	if _, err := td.Where("id = ? ", id).Update(&titleCate); err != nil {
		return err
	}
	return nil
	
}
